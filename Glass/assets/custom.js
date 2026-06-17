/* =============================================================
   Xboard-airplane  •  Glass 主题  •  custom.js
   作用:
   1) 给 body 打上主题 class
   2) 注入动态彩色渐变背景（缓慢漂移的光晕）
   3) 根据 theme_color 切换 深色/浅色玻璃变体
   4) 应用背景图（若后台设置了 background_url）
   5) 为 CTA / 主按钮叠加霓虹辉光跟随
   说明: 由 dashboard.blade.php 在 umi.js 之后加载。
   ============================================================= */
(function () {
  'use strict';

  var s = (window.settings = window.settings || {});
  var theme = (s.theme = s.theme || {});
  var body = document.body;

  // 1) 主题作用域
  body.classList.add('xb-theme-glass');

  // 2) 深色 / 浅色玻璃变体
  if (theme.color && String(theme.color).toLowerCase() === 'light') {
    body.classList.add('xb-glass-light');
  }
  if (theme.sidebar && String(theme.sidebar).toLowerCase() === 'dark') {
    body.classList.add('xb-sidebar-dark');
  }

  // 3) 动态渐变背景层（漂移光晕）
  function injectBg() {
    if (document.getElementById('glass-bg')) return;
    var bg = document.createElement('div');
    bg.id = 'glass-bg';
    bg.style.cssText = [
      'position:fixed', 'inset:-20%', 'z-index:-1', 'pointer-events:none',
      'filter:saturate(120%)', 'opacity:0.9',
      'background:',
        'radial-gradient(40vw 40vw at 20% 20%, rgba(110,168,254,.30), transparent 60%),',
        'radial-gradient(38vw 38vw at 80% 18%, rgba(196,181,253,.28), transparent 60%),',
        'radial-gradient(42vw 42vw at 70% 85%, rgba(103,232,249,.24), transparent 60%)',
      'background-attachment:fixed',
      'animation: glass-drift 18s ease-in-out infinite alternate'
    ].join(';');
    document.body.appendChild(bg);

    // 注入关键帧（仅一次）
    if (!document.getElementById('glass-keyframes')) {
      var st = document.createElement('style');
      st.id = 'glass-keyframes';
      st.textContent =
        '@keyframes glass-drift {' +
        '0%   { transform: translate3d(-2%,-1%,0) scale(1); }' +
        '50%  { transform: translate3d(2%,2%,0) scale(1.05); }' +
        '100% { transform: translate3d(-1%,-2%,0) scale(1.02); }' +
        '}';
      document.head.appendChild(st);
    }
  }
  injectBg();

  // 4) 背景图叠加（若设置）
  if (s.background_url) {
    var bg = document.getElementById('glass-bg');
    if (bg) {
      bg.style.opacity = '0.55';
      document.body.style.backgroundImage =
        'url("' + s.background_url + '")';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
    }
  }

  // 5) 主按钮霓虹辉光跟随鼠标
  function attachGlow() {
    var btns = document.querySelectorAll(
      '.xb-theme-glass .ant-btn-primary:not([data-glass-glow])'
    );
    for (var i = 0; i < btns.length; i++) {
      (function (el) {
        el.setAttribute('data-glass-glow', '1');
        el.addEventListener('pointermove', function (ev) {
          var r = el.getBoundingClientRect();
          var x = ev.clientX - r.left;
          var y = ev.clientY - r.top;
          el.style.background =
            'radial-gradient(120px 80px at ' + x + 'px ' + y +
            'px, rgba(255,255,255,.55), transparent 60%),' +
            'linear-gradient(135deg,#6EA8FE,#C4B5FD 50%,#67E8F9)';
        });
        el.addEventListener('pointerleave', function () {
          el.style.background = '';
        });
      })(btns[i]);
    }
  }

  var tries = 0;
  var iv = setInterval(function () {
    attachGlow();
    if (++tries > 40) clearInterval(iv);
  }, 500);
  document.addEventListener('DOMContentLoaded', attachGlow);

  console.log(
    '%cXboard Glass 主题已加载', 'color:#6EA8FE;font-weight:600;font-size:13px;'
  );
})();
