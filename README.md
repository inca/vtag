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

1. Grab uncompressed on minified version from `dist`.

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
