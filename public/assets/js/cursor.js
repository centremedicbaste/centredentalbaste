function cursor() {
  var cursor = document.querySelector(".cursor");
  var cursorinner = document.querySelector(".cursor-inner");
  var hoverable_link = document.querySelectorAll(".hoverable_link");

  var posX = 0, posY = 0;
  var posX2 = 0, posY2 = 0;
  var mouseX = 0, mouseY = 0;
  var isHovering = false;
  var defaultCursorText = 'Ver más'; // Texto predeterminado del cursor

  gsap.to({}, {
    duration: 0.016,
    repeat: -1,
    onRepeat: () => {
      posX += (mouseX - posX) / 7;
      posY += (mouseY - posY) / 7;
      posX2 += (mouseX - posX2) / 4;
      posY2 += (mouseY - posY2) / 4;
      gsap.set(cursor, { css: { left: posX2 - 75, top: posY2 - 75 } });
    },
  });

  document.addEventListener("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  hoverable_link.forEach(link => {
    link.addEventListener("mouseenter", onMouseHoverScale);
    link.addEventListener("mouseleave", onMouseHoverOutScale);
  });

  function onMouseHoverScale() {
    var text = this.getAttribute('data-text') || defaultCursorText; // Obtener texto de data-text o usar el predeterminado
    if (!isHovering) {
      isHovering = true;
      cursorinner.textContent = text; // Actualizar el texto del cursor
      gsap.to(cursorinner, {
        duration: 0.2,
        css: {
          scale:1,
          opacity: 1,
      
          
        },
      });
      document.body.style.cursor = 'none';

    }
  }

  function onMouseHoverOutScale() {
    if (isHovering) {
      isHovering = false;
      cursorinner.textContent = defaultCursorText; // Restablecer el texto del cursor
      gsap.to(cursorinner, {
        duration: 0.2,
        css: {
          scale:0,
          opacity: 0,
 

        },
      });
      document.body.style.cursor = 'auto';
    }
  }
}

cursor(); // Iniciar la función cursor

