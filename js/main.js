// =====================================================
//  Turismo Extremo Sur — main.js
//  Servicios y equipo dinámicos (DOM), validación del
//  formulario y efectos de la interfaz.
// =====================================================

// ─────────────────────────────────────────
// DATOS
// ─────────────────────────────────────────

let servicios = [
  {
    nombre: "Monte Tarn",
    tipo: "Caminata",
    precio: 25000,
    duracion: "8 hrs",
    dificultad: "Alta",
    descripcion: "Ascenso guiado a uno de los cerros emblemáticos de la península de Brunswick. Bosque subantártico, nieve en altura y vistas panorámicas al Estrecho de Magallanes.",
    imagen: "img/monte-tarn.jpg",
    posicion: "center 12%"
  },
  {
    nombre: "Laguna Parrillar",
    tipo: "Caminata",
    precio: 18000,
    duracion: "6 hrs",
    dificultad: "Media",
    descripcion: "Recorrido por la Reserva Nacional Laguna Parrillar: bosques de lenga y ñirre, humedales con fauna nativa y una laguna de aguas tranquilas rodeada de cerros.",
    imagen: "img/parrillar.jpg"
  },
  {
    nombre: "Mirador Zapador Austral",
    tipo: "Caminata",
    precio: 15000,
    duracion: "4 hrs",
    dificultad: "Baja",
    descripcion: "Caminata hasta el mirador con vista de 360° sobre Punta Arenas, el bosque de coihues y lengas y el Estrecho de Magallanes en días despejados.",
    imagen: "img/mirador-zapador.jpg"
  },
  {
    nombre: "Cabalgata Patagónica",
    tipo: "Cabalgata",
    precio: 35000,
    duracion: "1 día",
    dificultad: "Media",
    descripcion: "Viaje a caballo por la estepa patagónica. Una experiencia para conectar con la naturaleza al ritmo de los caballos criollos y el viento del sur.",
    imagen: "img/cabalgata.jpg"
  }
];

let integrantes = [
  {
    nombre: "Daniela Muñoz",
    rol: "Estudiante Analista Programador",
    email: "[correo eliminado]",
    foto: null // ruta a la foto, por ejemplo "img/daniela.jpg"
  }
];

const CAMPOS = ["nombre", "celular", "email", "pais", "ciudad", "consulta"];

// ─────────────────────────────────────────
// SERVICIOS Y EQUIPO (DOM)
// ─────────────────────────────────────────

function mostrarServicios() {
  const grid = document.getElementById("servicios-grid");
  grid.innerHTML = "";

  servicios.forEach(function (s, i) {
    const card = document.createElement("article");
    card.className = "servicio-card spotlight reveal";
    card.style.transitionDelay = (i % 2) * 120 + "ms";

    card.innerHTML = `
      <div class="servicio-img-wrap">
        <img src="${s.imagen}" alt="${s.nombre}" loading="lazy" />
        <div class="servicio-tags">
          <span class="tag tag-tipo">${s.tipo === "Cabalgata" ? "🐴" : "🥾"} ${s.tipo}</span>
          <span class="tag tag-duracion">⏱ ${s.duracion}</span>
        </div>
      </div>
      <div class="servicio-body">
        <h3 class="servicio-nombre">${s.nombre}</h3>
        <p class="servicio-desc">${s.descripcion}</p>
        <div class="servicio-meta">
          <span>Dificultad: ${s.dificultad}</span>
          <span>Guía incluido</span>
        </div>
        <div class="servicio-footer">
          <div class="servicio-precio">
            $${s.precio.toLocaleString("es-CL")}
            <small>por persona</small>
          </div>
          <a href="#contactanos" class="btn-reservar" data-servicio="${s.nombre}">Reservar</a>
        </div>
      </div>
    `;

    const img = card.querySelector("img");
    // Encuadre por CSSOM (no atributo style inline, que la CSP bloquea)
    img.style.objectPosition = s.posicion || "center";

    // Si la imagen no carga, se muestra un marcador
    img.addEventListener("error", function () {
      this.replaceWith(crearPlaceholder());
    });

    grid.appendChild(card);
  });
}

function crearPlaceholder() {
  const div = document.createElement("div");
  div.className = "servicio-img-placeholder";
  div.innerHTML = "<span>🏔️</span><p>Imagen no disponible</p>";
  return div;
}

function mostrarEquipo() {
  const grid = document.getElementById("team-grid");
  grid.innerHTML = "";

  integrantes.forEach(function (p) {
    const card = document.createElement("article");
    card.className = "team-card spotlight reveal";

    const iniciales = p.nombre.split(" ").map(function (n) { return n[0]; }).join("").slice(0, 2);
    const avatar = p.foto
      ? `<img class="team-avatar" src="${p.foto}" alt="${p.nombre}" />`
      : `<div class="team-avatar" aria-hidden="true">${iniciales}</div>`;

    card.innerHTML = `
      <div class="team-cover" aria-hidden="true"></div>
      ${avatar}
      <div class="team-info">
        <div class="team-name">${p.nombre}</div>
        <div class="team-role">${p.rol}</div>
        <a class="team-email" href="mailto:${p.email}">📧 ${p.email}</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ─────────────────────────────────────────
// FORMULARIO
// ─────────────────────────────────────────

function validarFormulario() {
  const valores = {};
  CAMPOS.forEach(function (id) {
    valores[id] = document.getElementById(id).value.trim();
    quitarError(id);
  });

  let valido = true;

  if (valores.nombre === "") {
    mostrarError("nombre", "Este campo es obligatorio.");
    valido = false;
  }

  // Celular: solo dígitos (se permiten espacios, guiones y +)
  const celularLimpio = valores.celular.replace(/[\s+-]/g, "");
  if (valores.celular === "") {
    mostrarError("celular", "Este campo es obligatorio.");
    valido = false;
  } else if (!/^\d{8,12}$/.test(celularLimpio)) {
    mostrarError("celular", "Ingresa un número válido (8 a 12 dígitos).");
    valido = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (valores.email === "") {
    mostrarError("email", "Este campo es obligatorio.");
    valido = false;
  } else if (!emailRegex.test(valores.email)) {
    mostrarError("email", "Ingresa un email válido.");
    valido = false;
  }

  if (valores.pais === "") {
    mostrarError("pais", "Este campo es obligatorio.");
    valido = false;
  }

  if (valores.ciudad === "") {
    mostrarError("ciudad", "Este campo es obligatorio.");
    valido = false;
  }

  if (valores.consulta === "") {
    mostrarError("consulta", "Por favor escribe tu consulta.");
    valido = false;
  }

  if (valido) {
    enviarFormulario();
  } else {
    // Lleva el foco al primer campo con error
    const primero = document.querySelector(".form-group.has-error input, .form-group.has-error textarea");
    if (primero) primero.focus();
  }
}

function mostrarError(campoId, mensaje) {
  const grupo = document.getElementById("grupo-" + campoId);
  const input = document.getElementById(campoId);
  const msg = grupo.querySelector(".error-msg");

  grupo.classList.add("has-error");
  input.classList.add("error");
  input.setAttribute("aria-invalid", "true");
  if (mensaje) msg.textContent = mensaje;
}

function quitarError(campoId) {
  const grupo = document.getElementById("grupo-" + campoId);
  const input = document.getElementById(campoId);

  grupo.classList.remove("has-error");
  input.classList.remove("error");
  input.removeAttribute("aria-invalid");
}

function enviarFormulario() {
  const msg = document.getElementById("mensaje-exito");
  const boton = document.getElementById("btn-enviar");

  msg.style.display = "block";
  boton.disabled = true;

  setTimeout(function () {
    limpiarFormulario();
    msg.style.display = "none";
    boton.disabled = false;
  }, 3000);
}

function limpiarFormulario() {
  CAMPOS.forEach(function (id) {
    document.getElementById(id).value = "";
    quitarError(id);
  });
}

// ─────────────────────────────────────────
// EFECTOS DE INTERFAZ
// ─────────────────────────────────────────

// Divide el título en letras para animarlas una por una
function animarTitulo() {
  let retraso = 0;
  document.querySelectorAll("[data-split]").forEach(function (el) {
    const texto = el.textContent;
    el.textContent = "";
    // Texto completo para lectores de pantalla; las letras animadas van con aria-hidden
    const accesible = document.createElement("span");
    accesible.className = "sr-only";
    accesible.textContent = texto;
    el.appendChild(accesible);
    texto.split("").forEach(function (letra) {
      const span = document.createElement("span");
      span.className = "char";
      span.setAttribute("aria-hidden", "true");
      span.textContent = letra === " " ? " " : letra;
      span.style.animationDelay = 0.15 + retraso * 0.045 + "s";
      el.appendChild(span);
      retraso++;
    });
  });
}

// Muestra los elementos .reveal cuando entran en pantalla
function activarReveal() {
  const elementos = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elementos.forEach(function (el) { el.classList.add("visible"); });
    return;
  }
  const observer = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  elementos.forEach(function (el) { observer.observe(el); });
}

// Foco de luz que sigue al cursor en las tarjetas
function activarSpotlight() {
  document.querySelectorAll(".spotlight").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });
}

// Contadores animados del hero
function animarContadores() {
  document.querySelectorAll("[data-count]").forEach(function (el) {
    const final = Number(el.dataset.count);
    const formato = el.dataset.format === "clp";
    const inicio = performance.now();
    const duracion = 1600;

    function paso(t) {
      const p = Math.min((t - inicio) / duracion, 1);
      const valor = Math.round(final * (1 - Math.pow(1 - p, 3)));
      el.textContent = formato ? valor.toLocaleString("es-CL") : valor;
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  });
}

// Navbar: fondo al hacer scroll, enlace activo y menú móvil
function activarNavbar() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  function alHacerScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", alHacerScroll, { passive: true });
  alHacerScroll();

  toggle.addEventListener("click", function () {
    const abierto = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", abierto);
    toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });

  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.querySelectorAll("a").forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("section[id]").forEach(function (s) { observer.observe(s); });
  }
}

// "Reservar" completa la consulta con el servicio elegido
function activarReservas() {
  document.getElementById("servicios-grid").addEventListener("click", function (e) {
    const boton = e.target.closest(".btn-reservar");
    if (!boton) return;
    const consulta = document.getElementById("consulta");
    if (consulta.value.trim() === "") {
      consulta.value = "Hola, me interesa reservar: " + boton.dataset.servicio + ". Somos __ personas.";
    }
  });
}

// ─────────────────────────────────────────
// INICIALIZAR
// ─────────────────────────────────────────

document.getElementById("form-contacto").addEventListener("submit", function (e) {
  e.preventDefault();
  validarFormulario();
});

document.getElementById("anio").textContent = new Date().getFullYear();

mostrarServicios();
mostrarEquipo();
animarTitulo();
animarContadores();
activarNavbar();
activarReveal();
activarSpotlight();
activarReservas();
