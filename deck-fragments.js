/* Fragmentos cinematográficos para deck-stage.
 * - Todo slide ganha entrada staggered (fade + rise + desfoque).
 * - Elementos marcados com [data-frag] aparecem um a um a cada clique/→.
 * - ← volta um fragmento antes de voltar de slide.
 * - Impressão/PPTX (noscale) e miniaturas mostram tudo revelado.
 */
(function () {
  var CSS = [
    '@keyframes __deckEnter { from { opacity:0; transform:translateY(30px); filter:blur(8px); } to { opacity:1; transform:none; filter:none; } }',
    '@media screen {',
    '  section[data-deck-active] > *:not([data-frag]) { animation: __deckEnter .85s cubic-bezier(.22,1,.36,1) both; }',
    '  section[data-deck-active] > *:not([data-frag]):nth-child(2) { animation-delay:.10s; }',
    '  section[data-deck-active] > *:not([data-frag]):nth-child(3) { animation-delay:.18s; }',
    '  section[data-deck-active] > *:not([data-frag]):nth-child(4) { animation-delay:.26s; }',
    '  section[data-deck-active] > *:not([data-frag]):nth-child(5) { animation-delay:.34s; }',
    '  section[data-deck-active] > *:not([data-frag]):nth-child(6) { animation-delay:.42s; }',
    '  section[data-deck-active] > *:not([data-frag]):nth-child(7) { animation-delay:.50s; }',
    '  section[data-deck-active] > *:not([data-frag]):nth-child(n+8) { animation-delay:.58s; }',
    '  [data-frag] { transition: opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1), filter .6s ease; }',
    '  section[data-deck-active] [data-frag]:not(.frag-in) { opacity:0; transform:translateY(26px); filter:blur(10px); }',
    '}',
    'deck-stage[noscale] [data-frag] { opacity:1 !important; transform:none !important; filter:none !important; }',
    'deck-stage[noscale] section > * { animation:none !important; }',
    '@media print {',
    '  [data-frag] { opacity:1 !important; transform:none !important; filter:none !important; }',
    '  section > * { animation:none !important; }',
    '}',
  ].join('\n');

  var st = document.createElement('style');
  st.id = '__deck_fragments_css';
  st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  function stage() { return document.querySelector('deck-stage'); }
  function activeSec() {
    var s = stage();
    return s ? s.querySelector('section[data-deck-active]') : null;
  }
  function frags(sec) { return sec ? Array.prototype.slice.call(sec.querySelectorAll('[data-frag]')) : []; }
  function revealNext() {
    var p = frags(activeSec()).filter(function (f) { return !f.classList.contains('frag-in'); });
    if (!p.length) return false;
    p[0].classList.add('frag-in');
    return true;
  }
  function hideLast() {
    var s = frags(activeSec()).filter(function (f) { return f.classList.contains('frag-in'); });
    if (!s.length) return false;
    s[s.length - 1].classList.remove('frag-in');
    return true;
  }

  window.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName || ''))) return;
    var k = e.key;
    if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Spacebar') {
      if (revealNext()) { e.preventDefault(); e.stopImmediatePropagation(); }
    } else if (k === 'ArrowLeft' || k === 'PageUp') {
      if (hideLast()) { e.preventDefault(); e.stopImmediatePropagation(); }
    }
  }, true);

  window.addEventListener('click', function (e) {
    var path = e.composedPath ? e.composedPath() : [];
    var btn = null;
    for (var i = 0; i < path.length; i++) {
      var n = path[i];
      if (n && n.tagName === 'BUTTON' && n.classList && (n.classList.contains('next') || n.classList.contains('prev'))) { btn = n; break; }
    }
    if (btn) {
      if (btn.classList.contains('next') && revealNext()) { e.preventDefault(); e.stopImmediatePropagation(); }
      else if (btn.classList.contains('prev') && hideLast()) { e.preventDefault(); e.stopImmediatePropagation(); }
      return;
    }
    // Toque no corpo do slide (deck-stage só avança por toque em ponteiro grosso)
    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) return;
    for (var j = 0; j < path.length; j++) {
      var m = path[j];
      if (m && m.tagName && /^(A|BUTTON|INPUT|TEXTAREA|SELECT)$/.test(m.tagName)) return;
    }
    var sec = activeSec();
    if (sec && path.indexOf(sec) !== -1 && revealNext()) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);

  document.addEventListener('slidechange', function (e) {
    var d = e.detail || {};
    var s = stage();
    if (!s) return;
    var secs = Array.prototype.slice.call(s.querySelectorAll('section'));
    var cur = d.slide || secs[d.index];
    var back = typeof d.previousIndex === 'number' && d.previousIndex > d.index;
    secs.forEach(function (sec) {
      if (sec === cur) {
        var fl = frags(sec);
        fl.forEach(function (f) { f.style.transition = 'none'; });
        fl.forEach(function (f) { f.classList.toggle('frag-in', !!back); });
        void sec.offsetWidth;
        fl.forEach(function (f) { f.style.transition = ''; });
      } else {
        frags(sec).forEach(function (f) { f.classList.add('frag-in'); });
      }
    });
  });
})();
