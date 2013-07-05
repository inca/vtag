// All module stuff is bound to `$.vtag` global variable.

$.vtag = {
  renderers: {}
};

// Plugin exposes itself through JQuery `vtag` function.

$.fn.vtag = function(options) {

  // Vtag uses renderers -- functions which do the drawing.
  // The `type` option designates the renderer ("curve" is default).

  var type = (options && options.type) || "retro";

  var renderer = $.vtag.renderers[type];

  if (typeof(renderer) != "function") {
    if (console && console.log)
      console.log("Unknown renderer: " + type);
    return this;
  }

  // Each element is passed to renderer separately

  this.each(function() {

    // Only canvas elements accepted

    if (typeof(this.getContext) != "function")
      return;

    // Renderers accept some mandatory data gathered from markup

    var e = $(this);

    var hash = $.vtag.md5(e.attr("data-tag") || e.text());

    var bytes = (function() {
      var result = [];
      for (var i = 0; i < 16; i++) {
        var hex = hash.substring(i * 2, i * 2 + 2);
        result.push(parseInt(hex, 16));
      }
      return result;
    })();

    var opts = {
      width: parseInt(e.attr("width") || e.width()),
      height: parseInt(e.attr("height") || e.height()),
      hash: hash,
      bytes: bytes
    };

    for (var i in options) {
      opts[i] = options[i];
    }

    renderer.call(this, opts);

  });

  return this;

};