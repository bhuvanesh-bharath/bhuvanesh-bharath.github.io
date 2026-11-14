(() => {
  const bar = document.querySelector('.bar');
  const nav = document.getElementById('nav');
  const btn = document.querySelector('.menu');
  document.getElementById('year').textContent = new Date().getFullYear();

  const onScroll = () => bar.classList.toggle('scrolled', scrollY > 10);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  });
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
  });

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.rule').forEach(r => r.classList.add('in'));
    return;
  }
  const rules = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); rules.unobserve(e.target); }
  }), { threshold: .6 });
  document.querySelectorAll('.rule').forEach(r => rules.observe(r));

  const links = [...nav.querySelectorAll('a')];
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));
})();
