// Cuenta cuántos tratamientos tienen precio puesto en precios.json.
//
// La página de precios se publica sola cuando hay suficientes: por debajo del
// mínimo sale con noindex y, como el sitemap ya excluye las noindex, tampoco
// se envía a Google. Una página de precios en la que todo pone "según
// valoración" decepciona a quien llega buscando una cifra y acaba restando.
const precios = require("./precios.json");

const MINIMO = 6;

const items = precios.grupos.flatMap((g) => g.items);
const rellenos = items.filter((i) => typeof i.desde === "number" && i.desde > 0).length;
const listo = rellenos >= MINIMO;

if (!listo) {
  console.warn(
    `\n  [precios] ${rellenos} de ${items.length} tratamientos tienen precio. ` +
    `La página /precios/ se construye con noindex y fuera del sitemap hasta llegar a ${MINIMO}.` +
    `\n  Rellena 'desde' en src/_data/precios.json para publicarla.\n`
  );
}

module.exports = { rellenos, total: items.length, minimo: MINIMO, listo };
