//menu
/* --- MENÚ HAMBURGUESA --- */
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {

      menuToggle.addEventListener('click', () => {
          // Alternar clases para mostrar/ocultar menú y animar el botón
         navMenu.classList.toggle('active');
         menuToggle.classList.toggle('is-active');
      });
        
        // Cerrar el menú al hacer clic en un enlace (opcional pero recomendado)
      document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
              navMenu.classList.remove('active');
              menuToggle.classList.remove('is-active');
            });
      });
    }
});





//conceptos
function mostrarDefinicion(concepto) {
  let texto = "";
  switch(concepto) {
    case "ia":
      texto = "La Inteligencia Artificial (IA) es el campo de la informática que busca crear sistemas capaces de imitar funciones propias de la inteligencia humana, como el aprendizaje, el razonamiento, la percepción y la resolución de problemas.";
      break;
    case "datos":
      texto = "Los datos son la materia prima de la IA: números, textos, imágenes o cualquier información sin procesar. El conocimiento surge cuando esos datos se organizan e interpretan para tomar decisiones.";
      break;
    case "algoritmos":
      texto = "Un algoritmo es un conjunto de instrucciones paso a paso para resolver un problema. Un modelo es la representación matemática que resulta de aplicar un algoritmo a los datos, capturando patrones y relaciones.";
      break;
    case "entrenamiento":
      texto = "El entrenamiento es el proceso en el que un modelo aprende a partir de grandes volúmenes de datos. La inferencia ocurre después, cuando el modelo ya entrenado aplica lo aprendido para dar respuestas o predicciones.";
      break;
    case "redes":
      texto = "Las redes neuronales son estructuras inspiradas en el cerebro humano, formadas por nodos conectados en capas. El Deep Learning utiliza redes profundas para analizar datos complejos como imágenes, texto o audio.";
      break;
  }
  document.getElementById("definicion").innerHTML = "<p>" + texto + "</p>";
}




//herramientas
function toggleSeccion(id) {
  const seccion = document.getElementById(id);
  seccion.style.display = (seccion.style.display === "none") ? "block" : "none";
}




//etica
function toggleSeccion(id) {
  const seccion = document.getElementById(id);
  if (seccion) {
    seccion.style.display = (seccion.style.display === "none" || seccion.style.display === "") 
      ? "block" 
      : "none";
  }
}




//contacto
// CONTACTO - Manejo de formulario de comentarios
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const respuesta = document.getElementById("respuesta");

  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // evita recargar la página

      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const mensaje = document.getElementById("mensaje").value;

      // Mostrar confirmación en pantalla
      respuesta.innerHTML = `
        <p>¡Gracias, <strong>${nombre}</strong>! Tu comentario fue recibido.</p>`;
      // Limpiar formulario
      form.reset();
    });
  }
});