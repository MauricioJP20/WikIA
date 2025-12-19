/* main.js — Interacciones simples de UI
   - `mostrarDefinicion(concepto)`: muestra la definición seleccionada en la sección de conceptos.
   - `toggleSeccion(id)`: muestra/oculta secciones tipo FAQ o categorías en herramientas.
   - `init()`: configura el botón de menú, el formulario de contacto y atributos ARIA.
   Este archivo mantiene la lógica de interacción mínima sin dependencias externas. */

/**
 * Mostrar la definición de un concepto en la sección `#definicion`.
 * Recibe la clave `concepto` (ej: 'ia', 'datos') y escribe el texto correspondiente.
 * Esta función es llamada desde botones con `onclick="mostrarDefinicion('ia')"`.
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
  // Inserta la definición en el contenedor con id `definicion`.
  const destino = document.getElementById("definicion");
  if (destino) destino.innerHTML = "<p>" + texto + "</p>";
}





/**
 * Mostrar u ocultar una sección por `id`.
 * - Usado para FAQ y categorías en `pages/herramientas.html`.
 * - Actualiza clases y atributos ARIA para accesibilidad.
 */
function toggleSeccion(id) {
  const seccion = document.getElementById(id);
  if (!seccion) return; // Si no existe el id, salimos sin error

  // Determina si está oculta (por estilo inline) y alterna entre 'block' y 'none'
  const isHidden = seccion.style.display === 'none' || seccion.style.display === '';
  seccion.style.display = isHidden ? 'block' : 'none';

  // Si la sección está dentro de un `.categoria`, alternamos la clase `open` para estilos
  const categoria = seccion.closest('.categoria');
  if (categoria) categoria.classList.toggle('open', isHidden);

  // Si la sección está dentro de un `.pregunta` (FAQ) actualizamos ARIA y clase
  const pregunta = seccion.closest('.pregunta');
  if (pregunta) {
    pregunta.classList.toggle('open', isHidden);
    const h2 = pregunta.querySelector('h2');
    if (h2) h2.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
  }
}






function init() {
  /**
   * init() — Inicializador de interacciones UI
   *
   * Partes principales:
   * 1) Configuración del botón de menú (`.menu-toggle`) y de la navegación (`.nav-menu`):
   *    - Alterna clases `active` / `is-active` para mostrar/ocultar el menú en pantallas pequeñas.
   *    - Registra listeners de `click` y `touchstart` para soportar dispositivos táctiles.
   *    - Previene comportamiento por defecto cuando procede.
   *
   * 2) Cerrar menú al navegar:
   *    - Cada enlace dentro de `.nav-menu` cierra el menú al hacer click, mejorando UX móvil.
   *
   * 3) Clase de layout condicional (`has-bienvenida`):
   *    - Si la página contiene `.bienvenida` se añade `has-bienvenida` al `body` para activar
   *      reglas CSS específicas (por ejemplo en la página principal).
   *
   * 4) Manejo del formulario de contacto:
   *    - Intercepta el `submit` del formulario `#contactForm` para evitar recarga de página.
   *    - Muestra un mensaje de confirmación en `#respuesta` usando el nombre proporcionado.
   *    - Resetea el formulario tras mostrar la confirmación.
   *    - Nota: actualmente esto solo realiza una acción en cliente; no envía datos a servidor.
   *
   * 5) Accesibilidad para FAQs:
   *    - Asigna `role="button"` a `.pregunta h2` y establece `aria-expanded="false"` por defecto.
   *    - `toggleSeccion()` actualiza `aria-expanded` a `true` cuando la respuesta se muestra.
   *
   * 6) Registro seguro de inicialización:
   *    - `init()` se registra para ejecutarse en `DOMContentLoaded` si el documento está cargando,
   *      o se ejecuta inmediatamente si el DOM ya está listo.
   */
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    const onToggle = (e) => {
      if (e && typeof e.preventDefault === 'function') e.preventDefault();
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('is-active');
    };
    menuToggle.addEventListener('click', onToggle);
    menuToggle.addEventListener('touchstart', onToggle);

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('is-active');
      });
    });
  }

  if (document.querySelector('.bienvenida')) document.body.classList.add('has-bienvenida');



  const form = document.getElementById('contactForm');
  const respuesta = document.getElementById('respuesta');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const nombre = document.getElementById('nombre')?.value || '';
      // Mostrar confirmación al usuario en el DOM (no se envia al servidor)
      if (respuesta) respuesta.innerHTML = `<p>¡Gracias, <strong>${nombre}</strong>! Tu comentario fue recibido.</p>`;
      form.reset();
    });
  }

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
