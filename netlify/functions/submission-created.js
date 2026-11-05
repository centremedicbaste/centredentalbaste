// ============================================================
// Copia cada lead del formulario en Citapanel (ver lib/citapanel.js).
//
// Netlify invoca esta función sola al registrar un envío verificado de
// Netlify Forms: el nombre del fichero (submission-created) es lo que activa
// el disparador. Va aparte de form-to-sheets, que sigue guardando en Google
// Sheets como hasta ahora.
//
// Quien avisa por Telegram es Citapanel (con sus botones). Si Citapanel no
// responde, sale un aviso de reserva desde aquí, igual que en Centre Mèdic,
// para que ningún lead se quede sin avisar.
//
// Variables de entorno (Netlify → Site settings → Environment):
//   CITAPANEL_TOKEN     token del negocio en Citapanel (sin él no hace nada)
//   TELEGRAM_BOT_TOKEN  token del bot, solo para el aviso de reserva
//   TELEGRAM_CHAT_ID    canal centredentalleads (-1004356390055)
// ============================================================

const { copiaEnCitapanel } = require("../lib/citapanel");

exports.handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body).payload;
  } catch (e) {
    console.error("Cuerpo de la petición ilegible:", e.message);
    return { statusCode: 200, body: "cuerpo ilegible" };
  }

  const d = payload.data || {};

  // EmailSecurizado es la trampa del formulario: una persona no lo ve. Si
  // viene relleno, es un robot que Netlify no ha cazado.
  if (String(d.EmailSecurizado || "").trim()) {
    return { statusCode: 200, body: "descartado" };
  }

  const copia = await copiaEnCitapanel({
    nombre: d.nombre,
    // El campo del formulario se llama «teléfono», con tilde
    telefono: d["teléfono"] || d.telefono,
    email: d.email,
    mensaje: d.mensaje,
    empresa: d.empresa,
    pagina: d.origen,
    origen: "web",
    formulario: payload.form_name,
    // El id del envío: si Netlify reintenta, Citapanel no lo duplica
    referencia: payload.id ? `netlify:${payload.id}` : undefined,
  });

  if (copia.enviado) {
    return { statusCode: 200, body: copia.creado ? "avisa Citapanel" : "duplicado en Citapanel" };
  }

  // Citapanel no lo recibió: aviso de reserva, sin botones.
  console.warn("Citapanel no recibió el lead:", copia.motivo);
  await avisoDeReserva(d, payload.form_name);

  // Siempre 200: el lead ya está en Netlify y un error solo provocaría
  // reintentos.
  return { statusCode: 200, body: "ok" };
};

const escapar = (t) => String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function avisoDeReserva(d, formulario) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) {
    console.warn("Sin aviso de reserva: faltan TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID");
    return;
  }
  const lineas = [
    `<b>Lead nuevo · Centre Dental Basté</b>${formulario ? ` · ${escapar(formulario)}` : ""}`,
    "<i>(aviso de reserva: Citapanel no respondió; míralo en Netlify)</i>",
    "",
    d.nombre && `Nombre: ${escapar(d.nombre)}`,
    (d["teléfono"] || d.telefono) && `Teléfono: ${escapar(d["teléfono"] || d.telefono)}`,
    d.email && `Email: ${escapar(d.email)}`,
    d.mensaje && `Mensaje: ${escapar(String(d.mensaje).slice(0, 600))}`,
  ].filter((l) => l !== undefined && l !== null && l !== false);
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text: lineas.join("\n"), parse_mode: "HTML", disable_web_page_preview: true }),
    });
    if (!r.ok) console.error("Telegram respondió", r.status, await r.text());
  } catch (e) {
    console.error("No se pudo avisar por Telegram:", e.message);
  }
}
