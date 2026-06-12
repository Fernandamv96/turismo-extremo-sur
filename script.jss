console.log("Sitio cargado correctamente 🚀");

// ejemplo interacción
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    console.log("Navegando...");
  });
});
