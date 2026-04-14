// ─── Modo captura: detectar antes de inicializar scroll ──────────────────────
const _scrollCaptureMode = document.body.classList.contains('capture-mode');

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: !_scrollCaptureMode,  // Desactivar smooth scroll en modo captura
  mobile: {
    smooth: !_scrollCaptureMode
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

// Escuchar el evento de desplazamiento
scroll.on('scroll', (args) => {
  const currentScrollY = args.scroll.y;

  if (currentScrollY >= 250) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});

document.querySelectorAll('.link_a_contacta_2').forEach(element => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    scroll.scrollTo('#contacta_4');
  });
});



// Actualizar Locomotive Scroll después de cargar contenido dinámico si es necesario
scroll.update();