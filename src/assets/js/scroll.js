const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  mobile: {
    smooth: true
},
});

// Escuchar el evento de desplazamiento
scroll.on('scroll', (args) => {
  const currentScrollY = args.scroll.y;

  if (currentScrollY >= 250) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});

document.querySelectorAll('.link_a_contacta, .link_a_contacta_2').forEach(element => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    scroll.scrollTo('#contacta_4');
  });
});



// Actualizar Locomotive Scroll después de cargar contenido dinámico si es necesario
scroll.update();