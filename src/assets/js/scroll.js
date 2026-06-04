// ─── Modo captura: detectar antes de inicializar scroll ──────────────────────
const _scrollCaptureMode = document.body.classList.contains('capture-mode');

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: false,        // Scroll nativo (sin suavizado)
  smoothMobile: false,
  mobile: {
    smooth: false
  },
  tablet: {
    smooth: false
  },
});

// En modo captura: forzar estado final visible
if (_scrollCaptureMode) {
  document.body.classList.add('scrolled');
  // Forzar que todos los elementos con data-scroll se marquen como in-view
  document.querySelectorAll('[data-scroll]').forEach(function(el) {
    el.classList.add('is-inview');
  });
  document.querySelectorAll('[data-scroll-class]').forEach(function(el) {
    var className = el.getAttribute('data-scroll-class');
    if (className) el.classList.add(className);
  });
}

// NOTA: el toggle de la barra blanca (.scrolled) se gestiona en index.js con
// un listener de window (scroll nativo). NO añadir aquí un scroll.on('scroll')
// con smooth:false: emite eventos tardíos con un valor desfasado y provoca
// que el header se quede blanco al subir rápido (carrera entre handlers).

document.querySelectorAll('.link_a_contacta_2').forEach(element => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    scroll.scrollTo('#contacta_4');
  });
});



// Actualizar Locomotive Scroll después de cargar contenido dinámico si es necesario
scroll.update();