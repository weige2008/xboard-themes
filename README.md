# Xboard-airplane 主题合集

为 [Yohann0617/Xboard-airplane](https://github.com/Yohann0617/Xboard-airplane) 设计的两套全新用户端主题。

| 主题 | 风格 | 预览 |
|------|------|------|
| **Fluent2** | Windows 11 / Fluent 2 — Mica 背景 + 亚克力玻璃卡片 + Fluent 蓝 | `Fluent2/` |
| **Glass** | Glassmorphism 玻璃态 — 雾面玻璃卡片 + 深色动态渐变背景 + 霓虹高光 | `Glass/` |

两套主题都基于 v2board（React + Ant Design 3）基础前端包构建，在其之上用独立的 `custom.css` / `custom.js` 做了完整的视觉重绘，**复制即用，无需重新编译前端**。

---

## ✨ 主题一：Fluent2

面向希望界面「现代、轻盈、系统感强」的场景。保留微软 Fluent 2 的视觉 DNA：

- **Mica 背景**：柔和、去饱和的渐变，随鼠标缓慢漂移的高光，像系统自带的桌面材质。
- **亚克力（Acrylic）材质**：侧栏、顶栏、卡片、模态框均为半透明 + 高斯模糊 + 内高光描边。
- **Fluent 蓝色体系**：主色 `#0078D4`，覆盖按钮、选中态、链接、开关、进度条。
- **等距圆角与分层阴影**：卡片 8px、控件 6px，使用 Fluent 标准 elevation 阴影。
- **Reveal 悬停**：卡片悬停时随光标出现一道柔和高光并轻微上浮。
- **顺滑动效**：150–300ms `cubic-bezier(0.1,0.9,0.2,1)`，系统级稳定感。
- 支持亮/暗侧栏切换（后台「侧栏风格」选「暗」即切换云母黑侧栏）。

## ✨ 主题二：Glass

面向科技产品着陆页、云服务资讯页，通透、优雅又有科技感：

- **深色渐变背景 + 动态光晕**：靛蓝/紫罗兰/青三色光斑缓慢漂移。
- **雾面玻璃卡片**：`rgba` 半透明 + `backdrop-filter` 模糊 + 1px 渐变高光描边 + 顶部光切面（伪元素 `::before`）。
- **霓虹强调色**：主按钮为冷蓝→紫→青的渐变并带辉光，Hover 时 CTA 亮度提高、阴影加深、并随鼠标产生流光。
- **高对比文字**：主文字接近纯白，次级文字半透明。
- **轻盈反馈**：Hover 透明度上升、Active 缩放 `0.98`，180ms 平滑缓动，无弹跳。
- 后台「主题色」可选 **深色玻璃**（默认）或 **浅色玻璃**（`.xb-glass-light` 变体）。

---

## 📦 安装

> 适用于 Yohann0617/Xboard-airplane（v2board 主题兼容的用户端）。

### 方式 A：直接上传（推荐）

1. 将本仓库中的 **`Fluent2`** 和/或 **`Glass`** 整个目录，上传到你的 Xboard 站点：

   ```
   public/theme/Fluent2/
   public/theme/Glass/
   ```

   每个目录里应包含：`config.json`、`dashboard.blade.php`、`assets/`（含前端包与 `custom.css`/`custom.js`）。

2. 进入后台 → **主题管理**（主题会被自动发现并初始化默认配置）。
3. 在 **网站设置 / 前端设置** 中，把 **`前端主题`**（`frontend_theme`）改为 `Fluent2` 或 `Glass`。
4. （可选）在该主题的「主题配置」里调整主题色 / 背景 / 侧栏风格 / 自定义页脚 HTML。
5. 保存后刷新前台即可生效（如未生效，执行 `docker compose restart` 或重启 webman 守护进程）。

### 方式 B：命令行（Docker Compose 部署）

```bash
cd /root/Xboard/Xboard   # 你的项目目录
# 以 Fluent2 为例
git clone https://github.com/weige2008/xboard-themes /tmp/xboard-themes
cp -r /tmp/xboard-themes/Fluent2 public/theme/
cp -r /tmp/xboard-themes/Glass   public/theme/
chown -R www:www public/theme/Fluent2 public/theme/Glass
# 然后到后台设置 frontend_theme = Fluent2
docker compose restart
```

---

## ⚙️ 配置项（后台「主题配置」）

两个主题均沿用 Xboard 的 `config.json` 字段机制，由后端 `ThemeService` 读取、`ThemeController` 保存。

| field_name | 说明 | 取值 |
|------------|------|------|
| `theme_color` | 主题色 / 玻璃底色 | Fluent2: `default`/`darkblue`/`black`/`green`；Glass: `dark`/`light`/`darkblue`/`black` |
| `background_url` | 背景图 URL | 留空使用内置渐变背景 |
| `theme_sidebar` | 侧栏风格 | `light` / `dark` |
| `theme_header` | 顶部风格 | `light` / `dark` |
| `custom_html` | 自定义页脚 HTML | 可塞客服代码、统计脚本等 |

> 说明：主题视觉完全由各自的 `assets/custom.css` 接管；`assets/theme/*.css`（基础包自带的配色文件）已被置为中性，避免与主题冲突。

---

## 🧩 工作原理

Xboard-airplane 的用户端主题存放在 `public/theme/{主题名}/`，每个主题包含：

- `config.json` —— 主题元数据与可配置字段（后端据此渲染后台配置表单）。
- `dashboard.blade.php` —— 入口模板，注入 `window.settings` 并加载前端资源；**内置 `custom.css` / `custom.js` 自动加载钩子**。
- `assets/` —— 前端包 + 主题自定义文件。

活动主题由数据库 `v2_settings.frontend_theme` 决定；具体视觉参数存于 `v2_settings.theme_{主题名}`（JSON）。这两套主题正是利用上述机制，在不改动后端、不重新编译前端的前提下完成换肤。

---

## 📝 目录结构

```
xboard-themes/
├─ README.md
├─ LICENSE
├─ Fluent2/
│  ├─ config.json
│  ├─ dashboard.blade.php
│  └─ assets/
│     ├─ custom.css        ← Fluent 2 视觉重绘
│     ├─ custom.js         ← Mica 背景 / Reveal 悬停 / 明暗侧栏
│     ├─ umi.js, umi.css, components.*, vendors.async.js, i18n/, static/ ...
│     └─ theme/*.css       ← 已中性化
└─ Glass/
   ├─ config.json
   ├─ dashboard.blade.php
   └─ assets/
      ├─ custom.css        ← 玻璃态视觉重绘
      ├─ custom.js         ← 动态渐变背景 / 流光按钮 / 深浅变体
      ├─ umi.js, umi.css, components.*, vendors.async.js, i18n/, static/ ...
      └─ theme/*.css       ← 已中性化
```

---

## ⚠️ 注意

- 本主题基于 v2board（React + Ant Design 3）用户端基础包。若你的 Xboard-airplane 升级了用户端前端包，请用新版 `public/theme/v2board/assets/` 中的 `umi.js` / `umi.css` / `components.*` / `vendors.async.js` / `i18n/` / `static/` 替换本主题 `assets/` 下对应的同名文件，**保留 `custom.css` 与 `custom.js`** 即可。
- 修改 `secure_path` 等设置后需重启服务才生效。
- 亚克力/玻璃材质依赖浏览器的 `backdrop-filter`，Safari 经 `-webkit-` 前缀已兼容。

## 📄 License

MIT — 随意使用、修改、分发。基础前端包版权归 Xboard / V2board 原作者所有。
