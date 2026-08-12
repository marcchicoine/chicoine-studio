// turbulenceeffect.js
(() => {
  const SVGNS = 'http://www.w3.org/2000/svg';
  const TARGET_SELECTOR = '.turbulence-target'; // add this class to any element you want affected

  // --- Hardened environment checks (primary-pointer based) ---
  const isMobileUA = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
  const primaryFine  = matchMedia('(pointer: fine)').matches;   // primary pointer is mouse/trackpad
  const primaryHover = matchMedia('(hover: hover)').matches;    // primary pointer supports hover
  const prefersRM    = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Enable only if primary pointer is fine + hover, and not mobile UA, and not reduced motion.
  // (Do NOT use (any-pointer) or (any-hover); they disable for touch-enabled desktops.)
  const shouldDisable = () =>
    prefersRM ||
    window.innerWidth < 768 ||
    isMobileUA ||
    !(primaryFine && primaryHover);

  let defsSVG = null;
  let turbulenceEl = null;
  let onMouseMove = null;
  let active = false;
  let targets = [];
  let killStyleEl = null;

  // Build the SVG filter once (hidden <svg><defs> so CSS can reference url(#noiseFilter))
  function createFilterDefs() {
    defsSVG = document.createElementNS(SVGNS, 'svg');
    defsSVG.setAttribute('aria-hidden', 'true');
    defsSVG.setAttribute('width', '0');
    defsSVG.setAttribute('height', '0');
    Object.assign(defsSVG.style, { position: 'absolute', width: '0', height: '0', overflow: 'hidden' });

    const defs = document.createElementNS(SVGNS, 'defs');
    const filter = document.createElementNS(SVGNS, 'filter');
    filter.setAttribute('id', 'noiseFilter');

    // Expand filter region to avoid clipping near edges of text blocks
    filter.setAttribute('x', '-20%');
    filter.setAttribute('y', '-20%');
    filter.setAttribute('width', '140%');
    filter.setAttribute('height', '140%');
    filter.setAttribute('filterUnits', 'objectBoundingBox');

    // --- Filter chain (based on your original setup) ---
    turbulenceEl = document.createElementNS(SVGNS, 'feTurbulence');
    turbulenceEl.setAttribute('type', 'fractalNoise');
    turbulenceEl.setAttribute('baseFrequency', '0.05');
    turbulenceEl.setAttribute('numOctaves', '3');
    turbulenceEl.setAttribute('seed', '2');
    turbulenceEl.setAttribute('result', 'turbulence');
    filter.appendChild(turbulenceEl);

    const blur = document.createElementNS(SVGNS, 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '10');
    blur.setAttribute('in', 'turbulence');
    blur.setAttribute('result', 'blur');
    filter.appendChild(blur);

    const sat = document.createElementNS(SVGNS, 'feColorMatrix');
    sat.setAttribute('type', 'saturate');
    sat.setAttribute('values', '15');
    sat.setAttribute('in', 'blur');
    sat.setAttribute('result', 'colormatrix');
    filter.appendChild(sat);

    const mat = document.createElementNS(SVGNS, 'feColorMatrix');
    mat.setAttribute('type', 'matrix');
    mat.setAttribute('values', [
      '1 0 0 0 0',
      '0 1 0 0 0',
      '0 0 1 0 0',
      '0 0 0 150 -15'
    ].join(' '));
    mat.setAttribute('in', 'colormatrix');
    mat.setAttribute('result', 'colormatrix1');
    filter.appendChild(mat);

    const comp = document.createElementNS(SVGNS, 'feComposite');
    comp.setAttribute('in', 'SourceGraphic');
    comp.setAttribute('in2', 'colormatrix1');
    comp.setAttribute('operator', 'in');
    comp.setAttribute('result', 'composite');
    filter.appendChild(comp);

    const disp = document.createElementNS(SVGNS, 'feDisplacementMap');
    disp.setAttribute('in', 'SourceGraphic');
    disp.setAttribute('in2', 'colormatrix1');
    disp.setAttribute('scale', '8');
    disp.setAttribute('xChannelSelector', 'R');
    disp.setAttribute('yChannelSelector', 'A');
    disp.setAttribute('result', 'displacementMap');
    filter.appendChild(disp);
    // ----------------------------------------------------

    defs.appendChild(filter);
    defsSVG.appendChild(defs);
    document.body.appendChild(defsSVG);
  }

  function applyFilterToTargets() {
    targets = Array.from(document.querySelectorAll(TARGET_SELECTOR));
    if (!targets.length) return false;
    for (const el of targets) {
      el.style.filter = 'url(#noiseFilter)';
      el.style.willChange = 'filter'; // small perf hint
    }
    return true;
  }

  function removeFilterFromTargets() {
    for (const el of targets) {
      el.style.filter = '';
      el.style.willChange = '';
    }
    targets = [];
  }

  // Hard kill CSS to ensure no filter leaks on devices where we disable
  function applyKillCSS() {
    if (killStyleEl) return;
    killStyleEl = document.createElement('style');
    killStyleEl.setAttribute('data-turbulence-kill', 'true');
    killStyleEl.textContent = `${TARGET_SELECTOR} { filter: none !important; }`;
    document.head.appendChild(killStyleEl);
  }

  function removeKillCSS() {
    if (killStyleEl) {
      killStyleEl.remove();
      killStyleEl = null;
    }
  }

  // Select the target whose center is closest to the cursor (nice if multiple targets)
  function getClosestRect(mouseX, mouseY) {
    let best = null, minD = Infinity;
    for (const el of targets) {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const d = Math.hypot(mouseX - cx, mouseY - cy);
      if (d < minD) { minD = d; best = r; }
    }
    return best;
  }

  function enable() {
    if (active) return;
    removeKillCSS(); // allow effect on desktop-like envs
    createFilterDefs();
    const ok = applyFilterToTargets();
    if (!ok || !turbulenceEl) return;

    onMouseMove = (e) => {
      const r = getClosestRect(e.clientX, e.clientY);
      if (!r) return;

      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const maxDist = Math.hypot(r.width, r.height);

      const minFreq = 0.02, maxFreq = 0.1;
      const t = Math.min(1, Math.max(0, dist / maxDist));
      const freq = (minFreq + (maxFreq - minFreq) * t).toFixed(4);
      turbulenceEl.setAttribute('baseFrequency', `${freq}`);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    active = true;
  }

  function disable() {
    if (active) {
      document.removeEventListener('mousemove', onMouseMove);
      onMouseMove = null;
      removeFilterFromTargets();
      if (defsSVG && defsSVG.parentNode) defsSVG.parentNode.removeChild(defsSVG);
      defsSVG = turbulenceEl = null;
      active = false;
    }
    // Force-kill any residual filters via CSS and inline styles
    applyKillCSS();
    document.querySelectorAll(TARGET_SELECTOR).forEach(el => {
      el.style.filter = 'none';
      el.style.willChange = '';
    });
  }

  function refresh() {
    if (shouldDisable()) disable();
    else enable();
  }

  // Re-evaluate on resize (useful during responsive testing)
  let raf = null;
  window.addEventListener('resize', () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(refresh);
  });

  // If script is in <head>, wait for DOM; otherwise run now
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refresh);
  } else {
    refresh();
  }
})();
