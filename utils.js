/**
 * Generic 'run once'
 * @param {Node} element - Element
 * @param {Event} event - Event to listen
 */

export function listenOnce(element, ...events) {
  return new Promise(resolve => {
    const onEvent = event => {
      resolve(event);
      element.removeEventListener(event, onEvent);
    };
    events.forEach(event => {
      element.addEventListener(event, onEvent);
    });
  });
}

/**
 * Preload an image
 * @param {URL} url - The image URL
 * https://github.com/bfred-it/image-promise
 */
export function preloadImage(url) {
  const image = new Image();

  if (!url) {
    return Promise.reject();
  } else if (typeof url === 'string') {
    image.src = url;
  }

  const promise = new Promise((resolve, reject) => {
    if (image.naturalWidth) {
      resolve(image);
    } else if (image.complete) {
      reject(image);
    } else {
      listenOnce(image, 'load', 'error').then(fullfill);
    }
    function fullfill() {
      if (image.naturalWidth) {
        resolve(image);
      } else {
        reject(image);
      }
    }
  });

  promise.image = image;
  return promise;
}
