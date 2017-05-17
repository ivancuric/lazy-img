const scriptCache = {};
const scriptsUrl = document
  .querySelector('[name="scripts-url"]')
  .getAttribute('content');

const csrfToken = document
  .querySelector('[name="csrf"]')
  .getAttribute('content');

/**
 * Async script load
 * @param {URL} url
 */
export function loadScript(url) {
  scriptCache[url] =
    scriptCache[url] ||
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = scriptsUrl + url;
      script.async = true;
      // resolve?
      script.onload = resolve(script);
      script.onerror = reject;
      document.body.appendChild(script);
    });

  return scriptCache[url];
}

/**
 * Remove element
 * @param {HTMLElement} el
 */
export function removeElement(el) {
  el.parentNode.removeChild(el);
}

/**
 * Create HTML Fragment from a html string
 * @param {String} html - A snippet of HTML
 * @returns {DocumentFragment}
 */
export function createFragment(html) {
  return document.createRange().createContextualFragment(html);
}

/**
 * Preload an image
 * @param {URL} url - The image URL
 */
export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });
}

/**
 * Fire an event
 * @param {HTMLElement} el
 * @param {Event} eventName
 * @param {*} detail
 * @param {Boolean} bubbles
 * @param {Boolean} cancelable
 */
export function fire(
  el,
  eventName,
  detail = null,
  bubbles = true,
  cancelable = true
) {
  const evt = new CustomEvent(eventName, {
    detail,
    bubbles,
    cancelable,
  });

  el.dispatchEvent(evt);
}

/**
 * Clamp a value
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Data loader, GET by default
 * @param {URL} url - The url
 * @param {JSON} [body] - Optional POST data
 * @returns {JSON|String}
 */
export async function load(url, body) {
  const headers = new Headers({
    'X-Requested-With': 'XMLHttpRequest',
  });

  const options = {
    credentials: 'include',
    headers: headers,
  };

  if (typeof body === 'object') {
    headers.set('X-CSRFToken', csrfToken);
    headers.set('Content-Type', 'application/json');
    options.method = 'POST';
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const type = response.headers.get('Content-Type');
  return type.includes('json') ? response.json() : response.text();
}

/**
 * A Promise wrapper for requestAnimationFrame
 */
export function rafPromise() {
  return new Promise(requestAnimationFrame);
}

/**
 * Runs a function on each element matching the selector
 * @param {String} selector
 * @param {Function} fn
 * @param {*} args
 */
export function each(selector, fn, ...args) {
  const elements = [...document.querySelectorAll(selector)];
  if (!elements) return;
  elements.forEach(el => fn(el, ...args));
}

/**
 * Used for detecting when an element is rendered
 * @param {HTMLElement} element - The element that is waiting to be rendered
 * @returns {Number} - frametime
 */
export async function render(element) {
  window.getComputedStyle(element);
  const f1 = await rafPromise();
  const f2 = await rafPromise();
  return f2 - f1;
}

/**
 * Generic 'run once'
 * @param {HTMLElement} element - Element
 * @param {Event} event - Event to listen
 * @param {Function} callback - what to do
 */
export function listenOnce(element, event, callback) {
  const onceCallback = () => {
    element.removeEventListener(event, onceCallback);
    callback();
  };
  element.addEventListener(event, onceCallback);
}
