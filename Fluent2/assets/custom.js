/* =============================================================
   Xboard-airplane  •  Fluent2 主题  •  custom.js
   作用:
   1) 给 body 打上主题 class（供 CSS 变量与作用域使用）
   2) 注入 Mica 动态背景层（柔和随鼠标漂移的高光）
   3) 根据 config(theme_sidebar/theme_header) 叠加深/亮 class
   4) 为卡片叠加 Fluent “Reveal” 悬停高光
   5) 应用背景图（若后台设置了 background_url）
   说明: 由 dashboard.blade.php 在 umi.js 之后加载。
   ============================================================= */
(function () {
  'use strict';

  var s = (window.settings = window.settings || {});
  var theme = (s.theme = s.theme || {});
  var body = document.body;

  // 1) 主题作用域 class
  body.classList.add('xb-theme-fluent2');

  // 2) 侧栏 / 顶栏明暗（来自后台主题配置）
  if (theme.sidebar && String(theme.sidebar).toLowerCase() === 'dark') {
    body.classList.add('xb-sidebar-dark');
  }
  if (theme.header && String(theme.header).toLowerCase() === 'dark') {
    body.classList.add('xb-header-dark');
  }

  // 3) 注入 Mica 背景层
  function injectMica() {
    if (document.getElementById('fluent-mica')) return;
    var mica = document.createElement('div');
    mica.id = 'fluent-mica';
    document.body.appendChild(mica);
  }
  injectMica();

  // 4) 背景图（若设置），以低透明度叠在 Mica 之上，避免喧宾夺主
  if (s.background_url) {
    var bg = document.getElementById('fluent-mica');
    if (bg) {
      bg.style.background +=
        ', url("' + s.background_url + '") center/cover no-repeat fixed';
      bg.style.opacity = '0.92';
    }
  }

  // 5) 鼠标漂移：让 Mica 高光随光标缓慢移动（仅桌面端）
  var mica = document.getElementById('fluent-mica');
  var raf = null;
  if (window.matchMedia('(pointer:fine)').matches && mica) {
    window.addEventListener('pointermove', function (e) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var x = (e.clientX / window.innerWidth) * 100;
        var y = (e.clientY / window.innerHeight) * 100;
        mica.style.setProperty('--mx', x.toFixed(1) + '%');
        mica.style.setProperty('--my', y.toFixed(1) + '%');
      });
    }, { passive: true });
  }

  // 6) Reveal 效果：卡片悬停时根据鼠标位置出现一道柔和高光描边
  function attachReveal() {
    var cards = document.querySelectorAll(
      '.xb-theme-fluent2 .ant-card:not([data-fluent-reveal])'
    );
    for (var i = 0; i < cards.length; i++) {
      (function (el) {
        el.setAttribute('data-fluent-reveal', '1');
        el.addEventListener('pointermove', function (ev) {
          var r = el.getBoundingClientRect();
          var x = ev.clientX - r.left;
          var y = ev.clientY - r.top;
          el.style.setProperty(
            'box-shadow',
            '0 4px 8px rgba(0,0,0,.10), 0 0 2px rgba(0,0,0,.06),' +
            'inset 0 1px 0 rgba(255,255,255,.7),' +
            'inset 0 0 0 1px rgba(255,255,255,0),' +
            'inset 0 0 60px 40px rgba(0,120,212,0) '
          );
          // 用伪层模拟：这里直接用 radial 渐变描边
          el.style.backgroundImage =
            'radial-gradient(240px 180px at ' + x + 'px ' + y +
            'px, rgba(0,120,212,.06), rgba(0,120,212,0) 70%)';
        });
        el.addEventListener('pointerleave', function () {
          el.style.backgroundImage = '';
        });
      })(cards[i]);
    }
  }

  // SPA 首屏可能晚于脚本执行，轮询绑定
  var tries = 0;
  var iv = setInterval(function () {
    attachReveal();
    if (++tries > 40) clearInterval(iv);
  }, 500);
  document.addEventListener('DOMContentLoaded', attachReveal);

  // 7) 控制台标识
  console.log(
    '%cXboard Fluent2 主题已加载', 'color:#0078D4;font-weight:600;font-size:13px;'
  );
})();
