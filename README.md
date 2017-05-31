# lazy-img
A performant & accessible responsive lazy image loader for [Cloudinary](http://cloudinary.com/).
Configure your grid, and the loader will do the rest, snapping the image sizes to your defined grid.

Google will index the valid default image in the `src` even it doesn't run JS on your site, while your browser will load only the blank 1×1 .gif present in the `srcset`.

The ratio is used for setting up aspect ratio wrappers for the `<img>` to prevent page jumps.

## [Demo](https://codepen.io/ivancuric/project/full/AnneMM/)

## Example markup:
```html
<img class="js-lazy-img"
  src="https://res.cloudinary.com/{accountName}/image/upload/w_1440,c_fill,f_auto,q_auto/{src}"
  srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw"
  data-src="{src}"
  alt="">
```

Background image loading a separate `data-src` attribute. Avoid setting the file extension so that Cloudinary can serve the best file format your browser supports.
A full list of Cloudinary transformations can be found [here](http://cloudinary.com/documentation/image_transformations).
