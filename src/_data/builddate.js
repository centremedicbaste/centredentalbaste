// Fecha de la última compilación (señal de frescura para Google y buscadores de IA).
// Se actualiza automáticamente en cada build/despliegue.
module.exports = () => new Date().toISOString();
