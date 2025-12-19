// menu (initial duplicate removed) - consolidated initialization is defined later




// Consolidated main.js: menu, interactions, and contact handling

/*
  main.js — Guía para principiantes

  Este archivo contiene la lógica mínima necesaria para que el sitio web sea
  interactivo. Aquí se registran los manejadores de eventos (listeners) y las
  funciones que actualizan el DOM (la página que ves en el navegador).

  Resumen de responsabilidades:
  - Menú hamburguesa (responsive): abre/cierra el menú en móviles.
  - Paneles dinámicos: mostrar/ocultar contenido en 'Conceptos', 'Herramientas' y FAQ.
  - Formulario de contacto: evita recargar la página y muestra un mensaje de agradecimiento.

  Consejos para entender el código:
  - Lee las funciones pequeñas primero (`mostrarDefinicion`, `toggleSeccion`).
  - `init()` conecta los elementos HTML con las funciones (registra eventos).
  - Ver en el navegador: al pulsar los botones verás cambios visibles (texto, paneles, menú).
*/

/**
 * mostrarDefinicion(concepto)
 * Muestra una definición predefinida en el elemento con id "definicion".
 * - `concepto` es la clave que identifica la definición a mostrar.
 * - Si no existe `#definicion` la función sale sin errores.
 * @param {string} concepto
 */
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
  const destino = document.getElementById("definicion");
  if (destino) destino.innerHTML = "<p>" + texto + "</p>";
}


/**
 * toggleSeccion(id)
 * - Alterna la visibilidad del elemento con el identificador `id`.
 * - Añade/remueve clases de fallback (`open`) que permiten que el CSS
 *   aplique estilos en navegadores que no soportan selectores modernos.
 * - Actualiza `aria-expanded` en encabezados dentro de `.pregunta`.
 * @param {string} id
 */
function toggleSeccion(id) {
  const seccion = document.getElementById(id);
  if (!seccion) return;

  const isHidden = seccion.style.display === 'none' || seccion.style.display === '';
  seccion.style.display = isHidden ? 'block' : 'none';

  const categoria = seccion.closest('.categoria');
  if (categoria) categoria.classList.toggle('open', isHidden);

  const pregunta = seccion.closest('.pregunta');
  if (pregunta) {
    pregunta.classList.toggle('open', isHidden);
    const h2 = pregunta.querySelector('h2');
    if (h2) h2.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
  }
}


/**
 * init()
 * - Registra todos los listeners y aplica estados iniciales.
 * - Maneja: menú responsive, fallbacks CSS, formulario de contacto y ARIA.
 */
function init() {
  // Menu hamburguesa
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    // Handler que abre/cierra el menú: alterna clases usadas por CSS para mostrar
    // u ocultar la navegación en pantallas pequeñas.
    const onToggle = (e) => {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('is-active');
    };
    menuToggle.addEventListener('click', onToggle);
    menuToggle.addEventListener('touchstart', onToggle);

    // Cerrar el menú cuando se pulsa un enlace: comportamiento esperado en móvil
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('is-active');
      });
    });
  }

  // Añadir clase fallback si existe la sección bienvenida (para CSS sin :has())
  if (document.querySelector('.bienvenida')) document.body.classList.add('has-bienvenida');

  // Manejo de formulario de contacto (cliente): evitar recarga y mostrar mensaje
  // Notar: esto no envía datos a un servidor; para recepción real hace falta un endpoint.
  const form = document.getElementById('contactForm');
  const respuesta = document.getElementById('respuesta');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const nombre = document.getElementById('nombre')?.value || '';
      if (respuesta) respuesta.innerHTML = `<p>¡Gracias, <strong>${nombre}</strong>! Tu comentario fue recibido.</p>`;
      form.reset();
    });
  }

  // Preparar encabezados FAQ como controles accesibles (role + estado inicial)
  // JavaScript actualiza `aria-expanded` cuando se abre/cierra la respuesta.
  document.querySelectorAll('.pregunta h2').forEach(h2 => {
    h2.setAttribute('role', 'button');
    if (!h2.hasAttribute('aria-expanded')) h2.setAttribute('aria-expanded', 'false');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
