(function($) {

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

// MD5 hash

$.vtag.md5=function(e){function h(a,b){var c,d,e,f,g;e=a&2147483648;f=b&2147483648;c=a&1073741824;d=b&1073741824;g=(a&1073741823)+(b&1073741823);return c&d?g^2147483648^e^f:c|d?g&1073741824?g^3221225472^e^f:g^1073741824^e^f:g^e^f}function k(a,b,c,d,e,f,g){a=h(a,h(h(b&c|~b&d,e),g));return h(a<<f|a>>>32-f,b)}function l(a,b,c,d,e,f,g){a=h(a,h(h(b&d|c&~d,e),g));return h(a<<f|a>>>32-f,b)}function m(a,b,d,c,e,f,g){a=h(a,h(h(b^d^c,e),g));return h(a<<f|a>>>32-f,b)}function n(a,b,d,c,e,f,g){a=h(a,
  h(h(d^(b|~c),e),g));return h(a<<f|a>>>32-f,b)}function p(a){var b="",d="",c;for(c=0;3>=c;c++)d=a>>>8*c&255,d="0"+d.toString(16),b+=d.substr(d.length-2,2);return b}var f=[],q,r,s,t,a,b,c,d;e=function(a){a=a.replace(/\r\n/g,"\n");for(var b="",d=0;d<a.length;d++){var c=a.charCodeAt(d);128>c?b+=String.fromCharCode(c):(127<c&&2048>c?b+=String.fromCharCode(c>>6|192):(b+=String.fromCharCode(c>>12|224),b+=String.fromCharCode(c>>6&63|128)),b+=String.fromCharCode(c&63|128))}return b}(e);f=function(b){var a,
  c=b.length;a=c+8;for(var d=16*((a-a%64)/64+1),e=Array(d-1),f=0,g=0;g<c;)a=(g-g%4)/4,f=8*(g%4),e[a]|=b.charCodeAt(g)<<f,g++;a=(g-g%4)/4;e[a]|=128<<8*(g%4);e[d-2]=c<<3;e[d-1]=c>>>29;return e}(e);a=1732584193;b=4023233417;c=2562383102;d=271733878;for(e=0;e<f.length;e+=16)q=a,r=b,s=c,t=d,a=k(a,b,c,d,f[e+0],7,3614090360),d=k(d,a,b,c,f[e+1],12,3905402710),c=k(c,d,a,b,f[e+2],17,606105819),b=k(b,c,d,a,f[e+3],22,3250441966),a=k(a,b,c,d,f[e+4],7,4118548399),d=k(d,a,b,c,f[e+5],12,1200080426),c=k(c,d,a,b,f[e+
  6],17,2821735955),b=k(b,c,d,a,f[e+7],22,4249261313),a=k(a,b,c,d,f[e+8],7,1770035416),d=k(d,a,b,c,f[e+9],12,2336552879),c=k(c,d,a,b,f[e+10],17,4294925233),b=k(b,c,d,a,f[e+11],22,2304563134),a=k(a,b,c,d,f[e+12],7,1804603682),d=k(d,a,b,c,f[e+13],12,4254626195),c=k(c,d,a,b,f[e+14],17,2792965006),b=k(b,c,d,a,f[e+15],22,1236535329),a=l(a,b,c,d,f[e+1],5,4129170786),d=l(d,a,b,c,f[e+6],9,3225465664),c=l(c,d,a,b,f[e+11],14,643717713),b=l(b,c,d,a,f[e+0],20,3921069994),a=l(a,b,c,d,f[e+5],5,3593408605),d=l(d,
  a,b,c,f[e+10],9,38016083),c=l(c,d,a,b,f[e+15],14,3634488961),b=l(b,c,d,a,f[e+4],20,3889429448),a=l(a,b,c,d,f[e+9],5,568446438),d=l(d,a,b,c,f[e+14],9,3275163606),c=l(c,d,a,b,f[e+3],14,4107603335),b=l(b,c,d,a,f[e+8],20,1163531501),a=l(a,b,c,d,f[e+13],5,2850285829),d=l(d,a,b,c,f[e+2],9,4243563512),c=l(c,d,a,b,f[e+7],14,1735328473),b=l(b,c,d,a,f[e+12],20,2368359562),a=m(a,b,c,d,f[e+5],4,4294588738),d=m(d,a,b,c,f[e+8],11,2272392833),c=m(c,d,a,b,f[e+11],16,1839030562),b=m(b,c,d,a,f[e+14],23,4259657740),
  a=m(a,b,c,d,f[e+1],4,2763975236),d=m(d,a,b,c,f[e+4],11,1272893353),c=m(c,d,a,b,f[e+7],16,4139469664),b=m(b,c,d,a,f[e+10],23,3200236656),a=m(a,b,c,d,f[e+13],4,681279174),d=m(d,a,b,c,f[e+0],11,3936430074),c=m(c,d,a,b,f[e+3],16,3572445317),b=m(b,c,d,a,f[e+6],23,76029189),a=m(a,b,c,d,f[e+9],4,3654602809),d=m(d,a,b,c,f[e+12],11,3873151461),c=m(c,d,a,b,f[e+15],16,530742520),b=m(b,c,d,a,f[e+2],23,3299628645),a=n(a,b,c,d,f[e+0],6,4096336452),d=n(d,a,b,c,f[e+7],10,1126891415),c=n(c,d,a,b,f[e+14],15,2878612391),
  b=n(b,c,d,a,f[e+5],21,4237533241),a=n(a,b,c,d,f[e+12],6,1700485571),d=n(d,a,b,c,f[e+3],10,2399980690),c=n(c,d,a,b,f[e+10],15,4293915773),b=n(b,c,d,a,f[e+1],21,2240044497),a=n(a,b,c,d,f[e+8],6,1873313359),d=n(d,a,b,c,f[e+15],10,4264355552),c=n(c,d,a,b,f[e+6],15,2734768916),b=n(b,c,d,a,f[e+13],21,1309151649),a=n(a,b,c,d,f[e+4],6,4149444226),d=n(d,a,b,c,f[e+11],10,3174756917),c=n(c,d,a,b,f[e+2],15,718787259),b=n(b,c,d,a,f[e+9],21,3951481745),a=h(a,q),b=h(b,r),c=h(c,s),d=h(d,t);return(p(a)+p(b)+p(c)+
  p(d)).toLowerCase()}

// HSV to RGB conversion

$.vtag.hsv2rgb = function (h, s, v) {
  var r, g, b;
  var i;
  var f, p, q, t;

  // Make sure our arguments stay in-range
  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(100, s));
  v = Math.max(0, Math.min(100, v));

  // We accept saturation and value arguments from 0 to 100.

  s /= 100;
  v /= 100;

  if(s == 0) {
    // Achromatic (grey)
    r = g = b = v;
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  h /= 60; // sector 0 to 5
  i = Math.floor(h);
  f = h - i; // factorial part of h
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));

  switch(i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;

    case 1:
      r = q;
      g = v;
      b = p;
      break;

    case 2:
      r = p;
      g = v;
      b = t;
      break;

    case 3:
      r = p;
      g = q;
      b = v;
      break;

    case 4:
      r = t;
      g = p;
      b = v;
      break;

    default: // case 5:
      r = v;
      g = p;
      b = q;
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

$.vtag.hsv2hex = function(h, s, v) {
  var col = $.vtag.hsv2rgb(h, s, v);
  for (var i in col) {
    var c = col[i].toString(16);
    if (c.length == 1) col[i] = "0" + c;
    else col[i] = c;
  }
  return "#" + col.join("");
};

$.vtag.renderers.retro = function(opts) {

  var g = this.getContext("2d");

  var w = opts.width;
  var h = opts.height;
  var ratio = (w + h) / 16;

  // Calculate colors

  var hue, sat, val;

  hue = opts.bytes[0] * 360. / 255;      // [0, 360)
  sat = opts.bytes[1] * 40. / 255 + 60;  // [60, 100)
  val = opts.bytes[2] * 30. / 255 + 60;  // [60, 90)
  var bg = $.vtag.hsv2hex(hue, sat, val);

  hue += (30 * (opts.bytes[4] % 12));      // [0, 360)
  hue %= 360;
  sat = opts.bytes[5] * 50. / 255;       // [0, 50)
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
})(jQuery);
