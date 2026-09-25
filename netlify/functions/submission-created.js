// ============================================================
// Copia cada lead del formulario en Citapanel (ver lib/citapanel.js).
//
// Netlify invoca esta función sola al registrar un envío verificado de
// Netlify Forms: el nombre del fichero (submission-created) es lo que activa
// el disparador. Va aparte de form-to-sheets, que sigue guardando en Google
// Sheets como hasta ahora.
//
// Variables de entorno (Netlify → Site settings → Environment):
//   CITAPANEL_TOKEN  token del negocio en Citapanel (sin él no hace nada)
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

  await copiaEnCitapanel({
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

  // Siempre 200: el lead ya está en Netlify y un error solo provocaría
  // reintentos.
  return { statusCode: 200, body: "ok" };
};
