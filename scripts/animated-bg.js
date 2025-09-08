/* ===========================================================
   animated-bg.js — Canvas animated background:
   - gradient waves
   - floating particles
   - subtle parallax on mouse move
   - configurable
   =========================================================== */

(function(){
  const container = document.getElementById('animated-bg');
  if (!container) return;

  // create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { alpha: true });
  container.appendChild(canvas);
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.zIndex = -1;
  canvas.style.pointerEvents = 'none';

  // device pixel ratio
  let dpr = Math.max(1, window.devicePixelRatio || 1);

  // state
  let W = 0, H = 0;
  function resize() {
    dpr = Math.max(1, window.devicePixelRatio || 1);
    W = Math.floor(container.clientWidth);
    H = Math.floor(container.clientHeight);
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener('resize', resize);
  resize();

  // particles
  const particles = [];
  const PARTICLE_COUNT = Math.max(40, Math.floor((W*H) / 40000));
  for (let i=0;i<PARTICLE_COUNT;i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random()-0.5) * 0.3,
      vy: (Math.random()-0.5) * 0.2,
      size: 6 + Math.random()*10,
      alpha: 0.05 + Math.random()*0.12,
      hue: 230 + Math.random()*40
    });
  }

  // gradient wave parameters
  const waves = [
    { amp: 20, freq: 0.0025, phase: 0, speed: 0.15, colorStop: 0.06 },
    { amp: 32, freq: 0.0018, phase: 1.2, speed: 0.08, colorStop: 0.12 },
    { amp: 46, freq: 0.0011, phase: 2.5, speed: 0.04, colorStop: 0.2 }
  ];

  let t = 0;

  // mouse parallax
  const mouse = { x: W/2, y: H/2, tx: 0, ty: 0 };
  window.addEventListener('mousemove', (e) => {
    const r = container.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / Math.max(1, r.width);
    mouse.y = (e.clientY - r.top) / Math.max(1, r.height);
  });

  function drawBackgroundGradient() {
    // nice sweeping gradient
    const g = ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0, 'rgba(143,148,251,0.14)');
    g.addColorStop(0.4, 'rgba(78,84,200,0.08)');
    g.addColorStop(1, 'rgba(255,255,255,0.02)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);
  }

  function drawWaves(time) {
    // Blend multiple sine waves with soft fills
    for (let i=0;i<waves.length;i++){
      const w = waves[i];
      ctx.beginPath();
      const baseY = H * (0.5 + (i-1)*0.12);
      for (let x = 0; x <= W; x += 24) {
        const px = x;
        const theta = time * w.speed + (x * w.freq) + w.phase;
        const y = baseY + Math.sin(theta) * w.amp * (1 + Math.sin(time*0.0009 + i));
        if (x === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      // close shape to bottom
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseY - 120, 0, H);
      const alpha = 0.12 + i*0.02;
      grad.addColorStop(0, `hsla(${230 + i*12}, 70%, 60%, ${alpha})`);
      grad.addColorStop(1, `hsla(${210 + i*6}, 70%, 50%, 0.02)`);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  function drawParticles() {
    for (let p of particles) {
      // parallax influenced by mouse
      const targetX = p.x + (mouse.x - 0.5) * 80;
      const targetY = p.y + (mouse.y - 0.5) * 60;
      p.x += (targetX - p.x) * 0.002 + p.vx;
      p.y += (targetY - p.y) * 0.002 + p.vy;

      // wrap
      if (p.x < -50) p.x = W + 50;
      if (p.x > W + 50) p.x = -50;
      if (p.y < -50) p.y = H + 50;
      if (p.y > H + 50) p.y = -50;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (0.45 + Math.sin(t*0.002 + p.size) * 0.2), 0, Math.PI*2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 55%, ${p.alpha})`;
      ctx.fill();
    }
  }

  function frame(ts) {
    t = ts;
    // clear
    ctx.clearRect(0,0,W,H);
    // appearance tuning for dark/light body
    const dark = document.body.classList.contains('dark');

    // subtle vignette
    drawBackgroundGradient();

    // waves
    drawWaves(ts);

    // particles
    drawParticles();

    // moving glow blobs (optional)
    for (let i=0;i<3;i++){
      const gx = (Math.sin(ts*0.0002 + i) * 0.5 + 0.5) * W;
      const gy = (Math.cos(ts*0.00017 + i*1.2) * 0.5 + 0.5) * H * 0.85;
      const r = 120 + 80 * Math.abs(Math.sin(ts*0.0004 + i));
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
      g.addColorStop(0, `rgba(137,139,255,${0.06})`);
      g.addColorStop(1, 'rgba(137,139,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(gx - r, gy - r, r*2, r*2);
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);

  // keep canvas resizable when container changes
  const ro = new ResizeObserver(() => {
    resize();
  });
  ro.observe(container);

})();
