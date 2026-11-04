// ─── Modo captura (screenshots / automatización) ─────────────────────────────
// Activa con ?screenshot o ?capture=1 → muestra todo sin esperar scroll

(function initCaptureMode() {
  var p = new URLSearchParams(window.location.search);
  if (p.get('screenshot') != null || p.get('capture') === '1') {
    document.body.classList.add('capture-mode');
    document.body.classList.add('scrolled');
  }
})();

function isCaptureMode() {
  return document.body.classList.contains('capture-mode');
}

var menuOpenScrollTop = 0;
$(document).ready(function () {
  initvideo();
  initMenuMobile();
  $("#menu-toggle, .menu-mobile-overlay, .link_cierre").click(function () {
    var $body = $("body");
    var $toggle = $("#menu-toggle");
    if ($body.hasClass("menu-open")) {
      $body.removeClass("menu-open");
      $toggle.attr("aria-expanded", "false");
      window.scrollTo(0, menuOpenScrollTop);
    } else {
      menuOpenScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      $body.addClass("menu-open");
      $toggle.attr("aria-expanded", "true");
    }
  });
});

function initMenuMobile() {
  $(document).on("click", "[data-menu-mobile-toggle]", function () {
    var $btn = $(this);
    var $li = $btn.closest(".menu-mobile-item-has-children");
    var $sub = $li.find(".menu-mobile-submenu");
    var wasOpen = $li.hasClass("is-open");
    $li.toggleClass("is-open");
    $btn.attr("aria-expanded", !wasOpen);
    $sub.attr("aria-hidden", wasOpen);
  });
}
function initvideo() {
  $(".action--play").click(function () {
    $(".video-wrap").addClass("video-wrap--show");
    $(".video-wrap").removeClass("video-wrap--hide");
    $(".video-player").attr("src", $(this).data("src"));
    $(".video-player source").attr("src", $(this).data("src"));
    $(".video-player").get(0).play();
  });
  $(".action--close").click(function () {
    $(".video-wrap").addClass("video-wrap--hide");
    $(".video-wrap").removeClass("video-wrap--show");
    $(".video-player").get(0).pause();
  });
}
const body = document.querySelector("body");
// Guardar la posición actual del scroll
let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
// Barra blanca del header: único detector fiable en scroll nativo (window).
// Se aísla en su propia función para poder sincronizarlo también al cargar y
// con el evento scrollend (evita que el header se quede blanco al subir rápido).
const HEADER_SCROLL_THRESHOLD = 60;
const syncHeader = () => {
  if (isCaptureMode()) return;
  const y = window.pageYOffset || document.documentElement.scrollTop || 0;
  body.classList.toggle("scrolled", y >= HEADER_SCROLL_THRESHOLD);
};

// Función para manejar el evento de scroll
const handleScroll = () => {
  // Obtener la nueva posición del scroll
  const newScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;

  syncHeader();

  // Comparar la posición actual con la nueva posición para determinar la dirección del scroll
  if (newScrollPosition > scrollPosition) {
    // Scroll hacia abajo
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  } else {
    // Scroll hacia arriba
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }
  // Actualizar la posición actual del scroll
  scrollPosition = newScrollPosition;
};
// Agregar el listener al evento de scroll (passive: mejor rendimiento)
window.addEventListener("scroll", handleScroll, { passive: true });
// Red de seguridad: al terminar el scroll y al cargar, re-sincroniza el estado
window.addEventListener("scrollend", syncHeader);
window.addEventListener("load", syncHeader);
syncHeader();



$({ Counter: 0 }).animate(
  {
    Counter: $(".animated-counter").text(),
  },
  {
    duration: 1000,
    easing: "swing",
    step: function () {
      $(".animated-counter").text(Math.ceil(this.Counter));
    },
  }
);


// Vídeo del hero de la portada: se carga cuando la página ya está pintada.
//
// Antes venía con autoplay y preload="auto" desde un dominio de terceros, así
// que el navegador se bajaba 8 MB en cada visita antes de enseñar nada. Ahora
// el <video> llega vacío: el src se le pone aquí, en el primer hueco libre
// después del load, y mientras tanto se ve el poster. Quien navega con ahorro
// de datos, con 2G o con el movimiento reducido activado se queda con el
// poster y no descarga el vídeo.
(function () {
  var video = document.querySelector("[data-hero-video]");
  if (!video) return;

  var con = navigator.connection || {};
  var lenta = con.saveData === true || /2g/.test(con.effectiveType || "");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || lenta) return;

  var cargar = function () {
    if (video.dataset.cargado) return;
    video.dataset.cargado = "1";

    var mp4 = video.getAttribute("data-hero-video");
    var webm = video.getAttribute("data-hero-video-webm");
    if (!mp4 && !webm) return;

    // El webm primero: el navegador que no lo entienda se queda con el mp4.
    [[webm, "video/webm"], [mp4, "video/mp4"]].forEach(function (par) {
      if (!par[0]) return;
      var source = document.createElement("source");
      source.src = par[0];
      source.type = par[1];
      video.appendChild(source);
    });

    // El relevo del poster al vídeo se funde para que no sea un corte seco.
    video.style.opacity = "0";
    video.style.transition = "opacity .6s ease";
    video.addEventListener("playing", function () {
      video.style.opacity = "1";
    }, { once: true });

    video.load();
    var p = video.play();
    if (p && p.catch) {
      p.catch(function () {
        // Reproducción denegada: se deja el poster, que es lo que había.
        video.style.opacity = "1";
      });
    }
  };

  var cuandoHayaHueco = function () {
    if ("requestIdleCallback" in window) requestIdleCallback(cargar, { timeout: 2500 });
    else setTimeout(cargar, 1200);
  };

  if (document.readyState === "complete") cuandoHayaHueco();
  else window.addEventListener("load", cuandoHayaHueco, { once: true });
})();
