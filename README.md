# VTag -- simple hash tag visualization for JQuery

Inspired by [Gravatar's retro](http://en.gravatar.com/site/implement/images/)
hash visualiser, VTag is a client-side renderer of arbitrary data tags
using HTML5 canvas.

Use VTag to decorate your long and boring lists with fancy icons,
to track changes using hashes, display digital fingerprints, etc.

## Dependencies

Essentially any modern version of [JQuery](http://jquery.com) will do
(we do not use fancy stuff, so both `1.x` and `2.x` are OK).

## Usage

1. Grab [uncompressed](https://raw.github.com/inca/vtag/master/dist/vtag-0.1.js)
   or [minified](https://raw.github.com/inca/vtag/master/dist/vtag-0.1.min.js)
   version from [dist](https://github.com/inca/vtag/tree/master/dist).

2. Include VTag on your page where appropriate. Most of the time you
   would want to include it just before closing `</body>`.

   Following example should cover the basic usage:

    ```
    ...
      <script type="text/javascript" src="/js/vtag-0.1.min.js">
      </script>
      <script type="text/javascript">
      $(function() {
        $("canvas[data-tag]").vtag();
      });
      </script>
    </body>
    ```

3. Following the above (standard) configuration, VTags are inserted
   by placing the `<canvas>` element with `data-tag` attribute
   set to your data. Sizes are configured using `width` and `height`
   attributes:

   ```
   <canvas data-tag="My data" width="16" height="16"></canvas>
   ```

4. Have fun!

## License

(The MIT License)

Copyright (c) 2013 Boris Okunskiy <boris@okunskiy.name>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the 'Software'),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.