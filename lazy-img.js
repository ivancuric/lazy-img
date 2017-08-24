import { preloadImage } from './utils';

export default class LazyImg {
  static get OPTIONS() {
    return {
      maxWidth: 1920,
      column: 80,
      gutter: 28,
      imgParams: ['c_fill', 'f_auto', 'q_auto'].join(),
      bgParams: ['c_fill', 'f_auto', 'q_auto'].join(),
      className: '.js-lazy-img',
      handledClass: 'loaded',
      accountId: 'idemo',
    };
  }

  static get URL() {
    return `https://res.cloudinary.com/${LazyImg.OPTIONS.accountId}/image/upload/`;
  }

  static get SUPPORTS_INTERSECTION_OBSERVER() {
    return 'IntersectionObserver' in window;
  }

  constructor() {
    this.options = LazyImg.OPTIONS;

    this.getImages();
  }

  preloadImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  }

  getImages() {
    this.images = [...document.querySelectorAll('.js-lazy-load')];
    if (!LazyImg.SUPPORTS_INTERSECTION_OBSERVER) {
      this.loadAll(this.images);
      return;
    }

    this.initObserver();
  }

  initObserver() {
    if (this.observer) {
      this.observer.disconnect();
    }

    const intersectionConfig = {
      threshold: 0.01,
    };

    this.observer = new IntersectionObserver(
      this.onIntersection,
      intersectionConfig
    );

    this.observeImages();
  }

  observeImages() {
    this.count = this.images.length;
    this.images.forEach(image => {
      if (image.classList.contains(this.options.handledClass)) {
        return;
      }

      this.observer.observe(image);
    });
  }

  onIntersection = entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) {
        return;
      }

      this.count--;
      this.observer.unobserve(entry.target);
      this.loadImage(entry.target);
    });

    if (this.count === 0) {
      this.observer.disconnect();
    }
  };

  snapToGrid(renderWidth) {
    const colCalc = n =>
      n * (this.options.column + this.options.gutter) - this.options.gutter;
    let ncols = 1;
    let snapWidth = 0;
    while (snapWidth < this.options.maxWidth) {
      snapWidth = colCalc(ncols);
      if (renderWidth - snapWidth <= 0) {
        return colCalc(ncols);
      }
      ncols++;
    }
    return this.options.maxWidth;
  }

  loadAll(images) {
    images.forEach(image => this.loadImage(image));
  }

  loadImage(image) {
    if (image.classList.contains(this.options.handledClass)) {
      return;
    }

    const id = image.dataset.src;

    if (!id) {
      return;
    }

    const { width, height } = image.getBoundingClientRect();

    if (image.tagName === 'IMG') {
      this.applyImg(image, id, width);
    } else {
      this.applyBg(image, id, width, height);
    }
  }

  applyImg(image, id, width) {
    const imageParams = [
      'w_' + this.snapToGrid(width),
      LazyImg.IMG_PARAMS,
      image.dataset.ratio && 'ar_' + image.dataset.ratio,
    ].join(',');

    const url = `${LazyImg.URL}/${imageParams}/${id}`;
    preloadImage(url)
      .then(_ => {
        image.removeAttribute('srcset');
        image.setAttribute('src', url);
        image.classList.add(this.options.handledClass);
      })
      .catch(_ => console.error(`Image ${url} is broken`));
  }

  applyBg(image, id, width, height) {
    const imageParams = `w_${this.snapToGrid(width)},h_${height > 1000 ? 1000 : 100 * Math.round(height / 100)},${LazyImg.BG_PARAMS}`;
    const url = `${LazyImg.URL}/${imageParams}/${id}`;

    preloadImage(url)
      .then(_ => {
        image.style.backgroundImage = `url(${url})`;
        image.classList.add(this.options.handledClass);
      })
      .catch(_ => console.error(`Image ${url} is broken`));
  }
}
