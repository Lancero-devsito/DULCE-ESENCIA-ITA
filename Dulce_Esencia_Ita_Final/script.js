const botonMenu = document.querySelector(".boton-menu");
const menuNavegacion = document.querySelector(".enlaces-menu");

function cerrarMenu() {
  menuNavegacion.classList.remove("abierto");
  botonMenu.setAttribute("aria-expanded", "false");
  botonMenu.setAttribute("aria-label", "Abrir menú");
}

function cambiarMenu() {
  const menuAbierto = menuNavegacion.classList.toggle("abierto");

  botonMenu.setAttribute("aria-expanded", menuAbierto ? "true" : "false");
  botonMenu.setAttribute(
    "aria-label",
    menuAbierto ? "Cerrar menú" : "Abrir menú"
  );
}

if (botonMenu && menuNavegacion) {
  botonMenu.addEventListener("click", cambiarMenu);

  const enlacesMenu = menuNavegacion.querySelectorAll("a");

  enlacesMenu.forEach(function (enlace) {
    enlace.addEventListener("click", cerrarMenu);
  });

  document.addEventListener("keydown", function (tecla) {
    if (tecla.key === "Escape") {
      cerrarMenu();
    }
  });
}

const elementosAnimados = document.querySelectorAll(".animar-al-desplazarse");
const movimientoReducido = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !movimientoReducido) {
  document.documentElement.classList.add("animaciones-activas");

  const observador = new IntersectionObserver(
    function (elementos, observador) {
      elementos.forEach(function (elemento) {
        if (elemento.isIntersecting) {
          elemento.target.classList.add("ya-visible");
        } else {
          elemento.target.classList.remove("ya-visible");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  elementosAnimados.forEach(function (elemento) {
    observador.observe(elemento);
  });
}
