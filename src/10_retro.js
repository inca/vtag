$.vtag.renderers.retro = function(opts) {

  var g = this.getContext("2d");

  var w = opts.width;
  var h = opts.height;
  var ratio = (w + h) / 16;

  // Calculate colors

  var hue, sat, val;

  hue = opts.bytes[0] * 360. / 255;      // [0, 360)
  sat = opts.bytes[1] * 20. / 255 + 60;  // [60, 80)
  val = opts.bytes[2] * 20. / 255 + 50;  // [50, 70)
  var bg = $.vtag.hsv2hex(hue, sat, val);

  sat = opts.bytes[5] * 40. / 255;       // [0, 40)
  val = opts.bytes[6] * 20. / 255 + 80;  // [80, 100)
  var fg = $.vtag.hsv2hex(hue, sat, val);

  // Inverse option
  if (opts.inverse) {
    var t = bg;
    bg = fg;
    fg = t;
  }

  // Fill background

  if (!opts.transparent) {
    g.beginPath();
    g.rect(0, 0, w, h);
    g.fillStyle = bg;
    g.fill();
  }

  // Now draw some pixels

  function pix(x, y) {
    g.fillStyle = fg;
    g.beginPath();
    g.rect(x * ratio, y * ratio, ratio, ratio);
    g.fill();
  }

  for (var i = 0; i < 8; i++) {
    var x = opts.bytes[i] % 3;
    var y = opts.bytes[i + 1] % 6;
    pix(x + 1, y + 1);
    pix(6 - x, y + 1);
  }

};