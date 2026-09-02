// 모바일 메뉴 열고 닫기
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// 치료사 분야 필터
(function () {
  var bar = document.querySelector('.filter');
  if (!bar) return;

  var buttons = bar.querySelectorAll('button');
  var people = document.querySelectorAll('.therapist');
  var status = document.getElementById('filter-status');

  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;

    var field = btn.dataset.field;
    var shown = 0;

    Array.prototype.forEach.call(buttons, function (b) {
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
    });

    Array.prototype.forEach.call(people, function (p) {
      var match = (field === 'all' || p.dataset.field === field);
      p.hidden = !match;
      if (match) shown++;
      var d = p.querySelector('details[open]');   // 필터를 바꾸면 열린 이력은 접는다
      if (d) d.open = false;
    });

    if (status) status.textContent = shown + '명이 표시되고 있습니다.';
  });
})();

// 센터 둘러보기 캐러셀
(function () {
  var track = document.getElementById('shots');
  if (!track) return;
  var ctrl = track.parentElement.querySelector('.carousel-ctrl');
  if (!ctrl) return;

  ctrl.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    var first = track.querySelector('figure');
    if (!first) return;
    var step = first.getBoundingClientRect().width + 24;
    track.scrollBy({ left: step * Number(btn.dataset.dir), behavior: 'smooth' });
  });
})();

// 사진이 모두 화면에 들어오면 좌우 버튼을 숨긴다
(function () {
  var track = document.getElementById('shots');
  if (!track) return;
  var ctrl = track.parentElement.querySelector('.carousel-ctrl');
  if (!ctrl) return;
  function sync() { ctrl.hidden = track.scrollWidth <= track.clientWidth + 4; }
  sync();
  window.addEventListener('resize', sync);
})();
