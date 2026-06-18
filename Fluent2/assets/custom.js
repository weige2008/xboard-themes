/* =============================================================
   Xboard (cedar2025)  •  Fluent2 主题  •  custom.js
   1) 给 body 打主题 class
   2) 注入 Mica 动态背景层（随鼠标漂移高光）
   3) 根据 theme_color 叠加深色侧栏变体
   4) 应用背景图（若后台设置 background_url）
   5) 卡片 Reveal 悬停高光
   ============================================================= */
(function () {
  'use strict';
  // 确保处于 light 模式(若用户此前用过 Glass 主题,localStorage 可能是 dark)
  try { localStorage.setItem('vueuse-color-scheme', 'light'); } catch (e) {}
  var s = (window.settings = window.settings || {});
  var theme = (s.theme = s.theme || {});
  var body = document.body;
  body.classList.add('xb-theme-fluent2');

  var color = String(theme.color || 'default').toLowerCase();
  if (color === 'black' || color === 'darkblue') body.classList.add('xb-fl-dark');

  function injectMica() {
    if (document.getElementById('fluent-mica')) return;
    var m = document.createElement('div');
    m.id = 'fluent-mica';
    document.body.appendChild(m);
  }
  injectMica();

  if (s.background_url) {
    var bg = document.getElementById('fluent-mica');
    if (bg) {
      bg.style.background += ', url("' + s.background_url + '") center/cover no-repeat fixed';
      bg.style.opacity = '0.92';
    }
  }

  var mica = document.getElementById('fluent-mica');
  var raf = null;
  if (window.matchMedia('(pointer:fine)').matches && mica) {
    window.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        mica.style.setProperty('--mx', ((e.clientX / window.innerWidth) * 100).toFixed(1) + '%');
        mica.style.setProperty('--my', ((e.clientY / window.innerHeight) * 100).toFixed(1) + '%');
      });
    }, { passive: true });
  }

  function attachReveal() {
    var cards = document.querySelectorAll('.xb-theme-fluent2 .n-card:not([data-fluent-reveal])');
    for (var i = 0; i < cards.length; i++) {
      (function (el) {
        el.setAttribute('data-fluent-reveal', '1');
        el.addEventListener('pointermove', function (ev) {
          var r = el.getBoundingClientRect();
          el.style.backgroundImage =
            'radial-gradient(260px 180px at ' + (ev.clientX - r.left) + 'px ' + (ev.clientY - r.top) +
            'px, rgba(0,120,212,.06), rgba(0,120,212,0) 70%)';
        });
        el.addEventListener('pointerleave', function () { el.style.backgroundImage = ''; });
      })(cards[i]);
    }
  }
  var tries = 0;
  var iv = setInterval(function () { attachReveal(); if (++tries > 40) clearInterval(iv); }, 500);
  document.addEventListener('DOMContentLoaded', attachReveal);

  console.log('%cXboard Fluent2 主题已加载', 'color:#0078D4;font-weight:600;font-size:13px;');
})();
