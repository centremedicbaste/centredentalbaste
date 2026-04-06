// ============================================================
// NETLIFY FUNCTION - Guarda envíos de formulario en Google Sheets
// Usa cuenta de servicio (sin OAuth, sin bloqueos)
// ============================================================

const crypto = require("crypto");
const https = require("https");

const SPREADSHEET_ID = "1NBod4SKEbgU--TZJHkQVWmKMEyuR5gDMSU_HbZVVWLI";
const SHEET_NAME = "centredentalbaste";

// ─── JWT: crea el token firmado con la clave privada del service account ───
function createJWT(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })).toString("base64url");

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(`${header}.${payload}`);
  const signature = sign.sign(serviceAccount.private_key, "base64url");

  return `${header}.${payload}.${signature}`;
}

// ─── Intercambia el JWT por un access token de Google ───
function getAccessToken(jwt) {
  return new Promise((resolve, reject) => {
    const body = new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }).toString();

    const req = https.request(
      {
        hostname: "oauth2.googleapis.com",
        path: "/token",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          const parsed = JSON.parse(data);
          if (parsed.access_token) resolve(parsed.access_token);
          else reject(new Error("No se pudo obtener access_token: " + data));
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ─── Llama a Google Sheets API para añadir una fila ───
function appendRow(accessToken, values) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      values: [values],
    });

    const range = encodeURIComponent(`'${SHEET_NAME}'!A:F`);
    const path = `/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const req = https.request(
      {
        hostname: "sheets.googleapis.com",
        path,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(JSON.parse(data)));
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ─── Handler principal ───
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  try {
    // Lee las credenciales dentro del handler para capturar errores en los logs
    const SERVICE_ACCOUNT = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

    const submission = JSON.parse(event.body);
    const data = submission.data || submission;

    const fecha    = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" });
    const nombre   = data.nombre   || data.name    || "";
    const email    = data.email    || "";
    const telefono = data.telefono || data["teléfono"] || data.phone || "";
    const empresa  = data.empresa  || "";
    const mensaje  = data.mensaje  || data.message || "";

    // Autenticación con la cuenta de servicio
    const jwt = createJWT(SERVICE_ACCOUNT);
    const accessToken = await getAccessToken(jwt);

    // Escribir en Google Sheets (columnas A:F)
    const result = await appendRow(accessToken, [fecha, nombre, email, telefono, empresa, mensaje]);

    if (result.error) {
      throw new Error(result.error.message);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
