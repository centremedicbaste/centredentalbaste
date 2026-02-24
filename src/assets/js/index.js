console.log("Hola, mundo!");
document.body.onscroll = function () {
  if (
    document.body.scrollTop >= 50 ||
    document.documentElement.scrollTop >= 50
  ) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
};

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
// Función para manejar el evento de scroll
const handleScroll = () => {
  // Obtener la nueva posición del scroll
  const newScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;
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
// Agregar el listener al evento de scroll
window.addEventListener("scroll", handleScroll);



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
