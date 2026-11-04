---
layout: pages/_precios.njk
permalink: /precios/
tags: ["pages"]
seccion: precios
orden: 6

title: Precios y financiación
image: /assets/static/images/clinica-1.webp
imageAlt: Gabinete de Centre Dental Basté en Sant Boi de Llobregat

metaTitle: "Precios de dentista en Sant Boi de Llobregat | Basté"
metaDescription: "Qué cuesta tratarte en Centre Dental Basté: primera visita 60 € a cuenta, precios de partida por tratamiento y financiación sin intereses hasta 30 meses."
metaKeywords: "precio dentista Sant Boi, precio implantes dentales Sant Boi, cuánto cuesta un implante, financiación tratamiento dental"

# La página se indexa sola cuando precios.json tenga al menos 6 tratamientos con
# precio. Mientras tanto va noindex y, como el sitemap excluye las noindex,
# tampoco se envía a Google.
eleventyComputed:
  metaRobots: "{% if preciosEstado.listo %}index, follow{% else %}noindex, follow{% endif %}"

faq:
  - q: "¿Cuánto cuesta la primera visita?"
    a: "60 €, e incluye la revisión clínica, la radiografía y el presupuesto. Ese importe se descuenta del tratamiento si lo haces con nosotros, así que si sigues adelante la visita te sale gratis."
  - q: "¿Me podéis dar un precio por teléfono?"
    a: "No, y desconfía de quien lo haga. Para poner precio a un implante o a una ortodoncia hay que haber visto la boca y la radiografía: lo que se ve en el espejo no dice si hay hueso suficiente o si el nervio está afectado, y eso cambia el presupuesto."
  - q: "¿El presupuesto tiene algún compromiso?"
    a: "Ninguno. Te lo damos por escrito en la primera visita y te lo llevas para pensarlo o para compararlo con otra clínica."
  - q: "¿Se puede pagar a plazos?"
    a: "Sí. Financiamos sin intereses hasta 30 meses, promoción vigente hasta enero de 2027, y hasta 72 meses con gastos incluidos. En el simulador de esta página puedes ver la cuota aproximada metiendo el importe."
  - q: "¿Por qué el mismo tratamiento cuesta distinto en cada clínica?"
    a: "Sobre todo por tres cosas: lo que hay que tratar antes (encías o falta de hueso), los materiales que se usan (no es lo mismo una corona de zirconio que una de metal-porcelana, ni un implante con garantía que uno sin trazabilidad) y cuántas piezas entran en el tratamiento."
  - q: "¿Hacéis descuento si os recomiendo a alguien?"
    a: "Sí. Quien venga de tu parte tiene 20 € de descuento en cualquiera de nuestros tratamientos."
---
