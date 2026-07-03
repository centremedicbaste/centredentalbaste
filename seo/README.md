# Plan SEO — Centre Dental Basté

Basado en el análisis de Search Console (últimos 3 meses, a 03/07/2026).
Este directorio documenta el plan y lo ya aplicado.

- [`google-business-profile.md`](google-business-profile.md) — Fase 1, acciones del cliente.
- [`seguimiento-keywords.md`](seguimiento-keywords.md) — Fase 5, keywords objetivo y medición.

---

## Diagnóstico (resumen)
- La **home concentra el 74 % de los clics**: faltaba fuerza en las páginas internas.
- **Canibalización / duplicados** heredados del WordPress (en gran parte ya con 301).
- **CTR ~1 %**, bajísimo incluso en posiciones 3-5 → faltaban rich results y pesa el pack local.
- Mucha **impresión informativa nacional** ("aparatos dentales") que no convierte.

---

## ✅ Aplicado (en web)

### Fase 0 — Técnica
- **Consolidada la canibalización de ortodoncia**: eliminada la ficha thin `/ortodoncia-dental/`
  y 301 → `/tratamientos/ortodoncia-dental/`.
- Verificado: canonical self-referencial y en minúsculas; mapa de 301 heredado ya cubre los
  duplicados raíz→/blog/; schema `Dentist`/`LocalBusiness` completo en la home
  (areaServed, horarios, priceRange, sameAs, hasOfferCatalog); BreadcrumbList en internas.

### Fase 2 / 4 — On-page y datos estructurados
- **FAQ (schema FAQPage + acordeón visible) añadido a las 16 fichas de tratamiento** que no lo
  tenían. Impacto directo en CTR (rich results) y en visibilidad en buscadores de IA
  (ChatGPT/Perplexity ya traen leads). JSON-LD validado (16/16 correctos).
- Títulos y meta descripciones: revisados; ya estaban bien optimizados (trabajo previo).

### Fase 3 — Contenido y enlazado interno
- El post informativo de mayor volumen ("qué son los aparatos dentales", miles de impresiones)
  ahora **enlaza a la página comercial de ortodoncia** y a la de ortodoncia invisible
  (SureSmile), para convertir tráfico informativo en comercial.

---

## ⏳ Pendiente / acciones del cliente
- **Fase 1 — Google Business Profile**: la mayor palanca para "dentista sant boi". Ver guía.
  *(No se puede hacer desde la web; requiere acceso a la ficha.)*
- **Pedir reseñas** activamente (impacta ranking local y conversión).
- **`aggregateRating` en el schema de la home**: listo para añadir en cuanto el cliente facilite
  la **valoración media y el nº de reseñas reales** de Google (no se inventan datos).
- **Fotos reales** del equipo (para reactivar la sección "Equipo médico") y de las instalaciones
  (web y ficha de Google).

---

## Próximas iteraciones sugeridas (Fase 3 continuación)
- Reforzar el **contenido de ortodoncia** (hoy pos ~35-43 pese a demanda) con más profundidad
  sobre invisible/brackets estéticos y casos.
- Reforzar cluster de **estética** (carillas, composite bonding, blanqueamiento) y **all-on-4**
  (autoridad + enlaces internos; es página nueva y necesita tiempo).
