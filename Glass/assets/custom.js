/* =============================================================
   Xboard (cedar2025)  •  Glass 主题  •  custom.js  v1.2
   1) 关键: 在 umi.js 启动前把 app 切到原生 dark 模式
      (localStorage['vueuse-color-scheme']='dark' -> NaiveUI darkTheme + Tailwind dark)
   2) 注入缓慢漂移的彩色光斑,营造"内容漂浮在渐变之上"
   3) 主按钮霓虹流光跟随
   说明: 本脚本是 <script>(classic),位于 body 末尾,先于 <head> 里
   type="module" 的 umi.js(deferred)执行,因此 localStorage 会在 app 启动前写好。
   ============================================================= */
(function () {
  'use strict';

  // ---- 1. 触发 app 原生 dark ----
  try { localStorage.setItem('vueuse-color-scheme', 'dark'); } catch (e) {}

  var body = document.body;
  if (body) body.classList.add('xb-theme-glass');

  var s = window.settings = window.settings || {};

  // ---- 2. 动态渐变光斑层 ----
  function injectBg() {
    if (document.getElementById('glass-bg')) return;
    var bg = document.createElement('div');
    bg.id = 'glass-bg';
    bg.style.cssText = [
      'position:fixed', 'inset:-25%', 'z-index:-1', 'pointer-events:none',
      'filter:saturate(125%) blur(6px)', 'opacity:.95',
      'background:',
        'radial-gradient(42vw 42vw at 18% 22%, rgba(122,168,255,.34), transparent 60%),',
        'radial-gradient(40vw 40vw at 82% 16%, rgba(196,181,253,.30), transparent 60%),',
        'radial-gradient(44vw 44vw at 68% 88%, rgba(103,232,249,.26), transparent 60%)',
      'background-attachment:fixed',
      'animation: glass-drift 20s ease-in-out infinite alternate'
    ].join(';');
    document.body.appendChild(bg);
    if (!document.getElementById('glass-keyframes')) {
      var st = document.createElement('style');
      st.id = 'glass-keyframes';
      st.textContent = '@keyframes glass-drift{0%{transform:translate3d(-2%,-1%,0) scale(1)}50%{transform:translate3d(2%,2%,0) scale(1.06)}100%{transform:translate3d(-1%,-2%,0) scale(1.03)}}';
      document.head.appendChild(st);
    }
  }
  injectBg();

  // 背景图(若后台设置)以低透明度叠加
  if (s.background_url) {
    var bg = document.getElementById('glass-bg');
    if (bg) bg.style.opacity = '0.55';
    document.body.style.backgroundImage = 'url("' + s.background_url + '")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  }

  // ---- 3. 主按钮流光跟随 ----
  function attachGlow() {
    var btns = document.querySelectorAll('.xb-theme-glass .n-button--primary-type:not([data-gg]), .xb-theme-glass .n-button--info-type:not([data-gg])');
    for (var i = 0; i < btns.length; i++) {
      (function (el) {
        el.setAttribute('data-gg', '1');
        el.addEventListener('pointermove', function (ev) {
          var r = el.getBoundingClientRect();
          el.style.background =
            'radial-gradient(140px 90px at ' + (ev.clientX - r.left) + 'px ' + (ev.clientY - r.top) +
            'px, rgba(255,255,255,.55), transparent 60%), linear-gradient(135deg,#7AA8FF,#C4B5FD 48%,#67E8F9)';
        });
        el.addEventListener('pointerleave', function () { el.style.background = ''; });
      })(btns[i]);
    }
  }
  var tries = 0;
  var iv = setInterval(function () { attachGlow(); if (++tries > 40) clearInterval(iv); }, 500);
  document.addEventListener('DOMContentLoaded', attachGlow);

  console.log('%cXboard Glass v1.2 已加载', 'color:#7AA8FF;font-weight:600;font-size:13px;');
})();
