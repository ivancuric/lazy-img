# lazy-img
A performant & accessible responsive lazy image loader for [Cloudinary](http://cloudinary.com/).
Just configure your grid, and the plugin will do the rest.

##Example markup:
```html
<img class="js-lazy-img"
  src="{{ image.base_url }}{{ trans }},ar_{{ ar }},c_fill,f_auto,q_auto{{ image.versioned_public_id }}"
  data-id="{{ image.versioned_public_id }}"
  srcset="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw"
  data-ratio="{{ ar }}"
  alt="">
```

Background image loading just needs the selector and the `data-id` attribute.
