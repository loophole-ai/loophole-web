/* =====================================================
   RULER SYSTEM — draws measurement tick marks on
   canvas elements & handles resize
   ===================================================== */

const RULER = {
  /* visual config */
  MINOR_TICK_EVERY:  12,   // px between minor ticks
  MAJOR_TICK_EVERY:  60,   // px between major ticks (must be multiple of minor)
  MINOR_TICK_H:       8,   // height of minor tick
  MAJOR_TICK_H:      18,   // height of major tick
  LABEL_EVERY:      160,   // px between number labels on horizontal rulers
  LABEL_FONT:  '7px "Space Mono", monospace',
  COLOR_MINOR:  'rgba(0,0,0,0.22)',
  COLOR_MAJOR:  'rgba(0,0,0,0.42)',
  COLOR_LABEL:  'rgba(0,0,0,0.30)',
  COLOR_LINE:   'rgba(0,0,0,0.35)',

  /* Draw a horizontal ruler into a canvas */
  drawH(canvas, { flip = false, showLabels = true, offsetX = 0 } = {}) {
    const dpr = window.devicePixelRatio || 1;
    const W   = canvas.offsetWidth;
    const H   = canvas.offsetHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    // baseline
    const baseY = flip ? 0 : H;
    ctx.strokeStyle = RULER.COLOR_LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    ctx.lineTo(W, baseY);
    ctx.stroke();

    // ticks
    for (let x = 0; x <= W; x += RULER.MINOR_TICK_EVERY) {
      const isMajor = (x % RULER.MAJOR_TICK_EVERY) === 0;
      const tickH   = isMajor ? RULER.MAJOR_TICK_H : RULER.MINOR_TICK_H;
      ctx.strokeStyle = isMajor ? RULER.COLOR_MAJOR : RULER.COLOR_MINOR;
      ctx.lineWidth = isMajor ? 1 : 0.75;
      ctx.beginPath();
      if (flip) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, tickH);
      } else {
        ctx.moveTo(x, H);
        ctx.lineTo(x, H - tickH);
      }
      ctx.stroke();

      // no number labels
    }
  },

  /* Draw a vertical ruler into a canvas */
  drawV(canvas, { flip = false, showLabels = false } = {}) {
    const dpr = window.devicePixelRatio || 1;
    const W   = canvas.offsetWidth;
    const H   = canvas.offsetHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    // baseline
    const baseX = flip ? W : 0;
    ctx.strokeStyle = RULER.COLOR_LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(baseX, 0);
    ctx.lineTo(baseX, H);
    ctx.stroke();

    // ticks
    for (let y = 0; y <= H; y += RULER.MINOR_TICK_EVERY) {
      const isMajor = (y % RULER.MAJOR_TICK_EVERY) === 0;
      const tickW   = isMajor ? RULER.MAJOR_TICK_H : RULER.MINOR_TICK_H;
      ctx.strokeStyle = isMajor ? RULER.COLOR_MAJOR : RULER.COLOR_MINOR;
      ctx.lineWidth = isMajor ? 1 : 0.75;
      ctx.beginPath();
      if (flip) {
        ctx.moveTo(W, y);
        ctx.lineTo(W - tickW, y);
      } else {
        ctx.moveTo(0, y);
        ctx.lineTo(tickW, y);
      }
      ctx.stroke();
    }
  },

  /* Init all ruler canvases on the page */
  initAll() {
    document.querySelectorAll('.ruler-canvas[data-dir="h"]').forEach(c => {
      RULER.drawH(c, {
        flip:       c.dataset.flip === 'true',
        showLabels: c.dataset.labels !== 'false',
        offsetX:    parseInt(c.dataset.offsetx || '0', 10)
      });
    });
    document.querySelectorAll('.ruler-canvas[data-dir="v"]').forEach(c => {
      RULER.drawV(c, {
        flip: c.dataset.flip === 'true'
      });
    });
  }
};

/* Draw on load and on resize (debounced) */
document.addEventListener('DOMContentLoaded', () => {
  RULER.initAll();
});

let _rulerTimer;
window.addEventListener('resize', () => {
  clearTimeout(_rulerTimer);
  _rulerTimer = setTimeout(() => RULER.initAll(), 120);
});