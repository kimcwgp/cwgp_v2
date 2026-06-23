document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('[data-rb-rotating]');

  nodes.forEach(node => {
    // Read config from data attributes
    const phrases = JSON.parse(node.getAttribute('data-phrases') || '[]');
    const pause   = parseInt(node.getAttribute('data-duration') || '2500', 10); // ms
    const y       = parseInt(node.getAttribute('data-y') || '50', 10);          // px slide distance

    if (!phrases.length) return;

    // Build inner element if missing
    const inner = node.querySelector('.rb-rotating__inner') || (() => {
      const el = document.createElement('span');
      el.className = 'rb-rotating__inner';
      node.appendChild(el);
      return el;
    })();

    let i = 0;
    inner.textContent = phrases[0];

    // No animation for reduced motion users
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || phrases.length === 1) return;

    setInterval(() => {
      // slide out
      inner.style.transform = `translateY(${y}px)`;
      inner.style.opacity = '0';

      // after the slide-out completes, swap text and slide back in
      setTimeout(() => {
        i = (i + 1) % phrases.length;
        inner.textContent = phrases[i];
        inner.style.transform = 'translateY(0)';
        inner.style.opacity = '1';
      }, 300); // keep in sync with CSS transition (300ms)
    }, pause);
  });
});
