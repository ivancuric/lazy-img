# lazy-img
A performant & accessible responsive lazy image loader for [Cloudinary](http://cloudinary.com/).
Just configure your grid, and the plugin will do the rest.

Google will index the valid default image in the `src` even it doesn't run JS on your site, while your browser will load only the blank 1×1 .gif present in the `srcset`.

The ratio is used for setting up aspect ratio wrappers for the `<img>` to prevent page jumps.

## Example markup:
```html
<img class="js-lazy-img"
  src="https://res.cloudinary.com/idemo/image/upload/w_1440,c_fill,f_auto,q_auto/friends"
  srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw"
  data-id="friends"
  alt="">
```


Background image loading just needs the selector and the `data-id` attribute.
A full list of Cloudinary transformations can be found [here](http://cloudinary.com/documentation/image_transformations).
