document.addEventListener("DOMContentLoaded", function(e) {
  var ua = navigator.userAgent;
  if (ua.match(/Mobile/) && ua.match(/Firefox/)) return;

  var cnv = document.createElement('canvas'),
      ctx = cnv.getContext('2d'),
      px = ctx.createImageData(1,1),
      d = px.data,

      i = 1,
      x = 75,
      y = 75,
      cc = 'hrc',
      limit = 22650;

  d[3] = 255;

  var spiralFlow = {
    hrc: { c: 1, next: 'vuc', opposite: 'hlc', x:  1 },
    vuc: { c: 1, next: 'hlc', opposite: 'vdc', y: -1 },
    hlc: { c: 0, next: 'vdc', opposite: 'hrc', x: -1 },
    vdc: { c: 0, next: 'hrc', opposite: 'vuc', y:  1 }
  }


  function isPrime(num) {
    if (num === 1) return false;

    var sqrt = Math.sqrt(num),
        n = Math.floor(sqrt);

    if (sqrt - n === 0) return false;
    for(var i = 2; i <= n; i++) { if(num % i === 0) return false; };

    return true;
  }


  function drawSpiralPx() {
    var current = spiralFlow[cc],
        opposite= spiralFlow[current.opposite],
        xx = current.x,
        yy = current.y;

    x = xx ? x + xx : x;
    y = yy ? y + yy : y;

    current.c-=1;
    opposite.c+=1;

    if (!current.c) {
      opposite.c+=1;
      cc = current.next;
    }

    i+=1;

    if (isPrime(i)) {
      d[0] = 0;
      d[1] = 0;
      d[2] = 0;
    } else {
      d[0] = 255;
      d[1] = 255;
      d[2] = 255;
    }

    ctx.putImageData(px, x, y);
  }

  while (i < limit) { drawSpiralPx() }
  document.getElementById('cnv_container').appendChild(cnv);
});
