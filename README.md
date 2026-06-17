# Xboard 主题合集（Fluent2 + Glass）

为 [cedar2025/Xboard](https://github.com/cedar2025/Xboard)（新版，Vue3 + Naive UI 前端）设计的两套用户端主题。

| 主题 | 风格 | 目录 |
|------|------|------|
| **Fluent2** | Windows 11 / Fluent 2 — Mica 背景 + 亚克力玻璃卡片 + Fluent 蓝 | `Fluent2/` |
| **Glass** | Glassmorphism 玻璃态 — 雾面玻璃卡片 + 深色动态渐变背景 + 霓虹高光 | `Glass/` |

两套主题都基于 Xboard 默认的 **Xboard 主题（Naive UI / Vue3）前端包** 构建，在其之上用独立的 `custom.css` / `custom.js` 做了完整视觉重绘，**导入即用，无需重新编译前端**。

> 📥 **直接下载**：到 [Releases](../../releases) 下载 `Fluent2-x.x.x.zip` / `Glass-x.x.x.zip`，在后台「主题管理 → 上传主题」导入即可。

---

## ✨ 主题一：Fluent2

面向希望界面「现代、轻盈、系统感强」的场景。保留微软 Fluent 2 的视觉 DNA：

- **Mica 背景**：柔和去饱和渐变，随鼠标缓慢漂移的高光，像系统自带的桌面材质。
- **亚克力（Acrylic）材质**：侧栏、顶栏、卡片、模态框均为半透明 + 高斯模糊 + 内高光描边。
- **Fluent 蓝色体系**：主色 `#0078D4`，覆盖按钮、选中态、链接、开关、进度条。
- **等距圆角与分层阴影**：卡片 8px、控件 6px，Fluent 标准 elevation 阴影。
- **Reveal 悬停**：卡片悬停时随光标出现柔和高光并轻微上浮。
- **顺滑动效**：150–300ms `cubic-bezier(0.1,0.9,0.2,1)`，系统级稳定感。
- 主题色选 `black` / `darkblue` 自动切换**深色侧栏**。

## ✨ 主题二：Glass

面向科技产品着陆页、云服务资讯页，通透、优雅又有科技感：

- **深色渐变背景 + 动态光晕**：靛蓝/紫罗兰/青三色光斑缓慢漂移。
- **雾面玻璃卡片**：`rgba` 半透明 + `backdrop-filter` 模糊 + 高光描边 + 悬停辉光。
- **霓虹强调色**：主按钮为冷蓝→紫→青渐变并带辉光，Hover 时随鼠标产生流光。
- **高对比文字**：主文字接近纯白，次级文字半透明。
- **轻盈反馈**：Hover 透明度上升、Active 缩放 `0.98`，180ms 平滑缓动，无弹跳。
- 主题色可选 **深色玻璃**（默认）或 **浅色玻璃**（`.xb-glass-light` 变体）。

---

## 📦 安装（两种方式）

### 方式 A：后台上传 zip（推荐）

1. 到本仓库 [Releases](../../releases) 下载主题压缩包，如 `Fluent2-1.0.0.zip`。
2. 进入后台 → **主题管理** → **上传主题**，选择该 zip 文件上传。
3. 上传后主题会安装到 `storage/theme/{主题名}/`，并自动初始化默认配置。
4. 在主题列表点击 **启用** 切换到该主题；可点 **配置** 调整主题色 / 背景 / 自定义页脚 HTML。

### 方式 B：手动放置

将 `Fluent2/` 或 `Glass/` 目录整个放到站点的 `storage/theme/`：

```
storage/theme/Fluent2/{config.json, dashboard.blade.php, assets/...}
storage/theme/Glass/{config.json, dashboard.blade.php, assets/...}
```

再到后台「主题管理」启用即可。切换主题时，系统会自动把主题文件复制到 `public/theme/{主题名}/` 供前端加载。

---

## ⚙️ 配置项（后台「主题配置」）

两套主题均沿用 Xboard 的 `config.json` 字段机制（`name` / `version` / `configs[]`）。

| field_name | 说明 | 取值 |
|------------|------|------|
| `theme_color` | 主题色 / 玻璃底色 | Fluent2: `blue`/`default`/`darkblue`/`black`；Glass: `dark`/`light`/`darkblue`/`black` |
| `background_url` | 背景图 URL | 留空使用内置渐变背景 |
| `custom_html` | 自定义页脚 HTML | 可塞客服代码、统计脚本等 |

---

## 🧩 工作原理

cedar2025/Xboard 的主题存放在两处：

- **系统主题**：`theme/`（镜像内置，如 `Xboard`，不可删除）
- **用户主题**：`storage/theme/`（上传/手动放入，可删除）

每个主题包含：`config.json`（元数据 + 可配置字段）、`dashboard.blade.php`（入口模板，注入 `window.settings` 并加载 `umi.js`）、`assets/`（Naive UI 前端包 + 主题自定义文件）。

活动主题由 `v2_settings.current_theme` 决定；切换时 `ThemeService` 会把主题从 `storage/theme/` 复制到 `public/theme/` 供 Web 加载。本两套主题正是在 `dashboard.blade.php` 里额外加载了 `custom.css` / `custom.js`，在不改动后端、不重新编译前端的前提下完成 Naive UI 视觉重绘（Naive UI 在运行时以内联 `--n-*` 变量注入样式，主题用直接属性 + 必要 `!important` 覆盖生效）。

---

## 📝 目录结构

```
xboard-themes/
├─ README.md
├─ LICENSE
├─ Fluent2/
│  ├─ config.json
│  ├─ dashboard.blade.php      ← 加载 umi.js + custom.css + custom.js
│  └─ assets/
│     ├─ custom.css            ← Fluent 2 视觉重绘(Naive UI .n-* 覆盖)
│     ├─ custom.js             ← Mica 背景 / Reveal 悬停 / 深色侧栏
│     ├─ umi.js                ← Naive UI 前端包(取自 Xboard 默认主题)
│     └─ images/background.svg
└─ Glass/
   ├─ config.json
   ├─ dashboard.blade.php
   └─ assets/
      ├─ custom.css            ← 玻璃态视觉重绘
      ├─ custom.js             ← 动态渐变背景 / 流光按钮 / 深浅变体
      ├─ umi.js
      └─ images/background.svg
```

---

## ⚠️ 注意

- 本主题针对 **cedar2025/Xboard（新版，Naive UI 前端）**。如果你用的是 [Yohann0617/Xboard-airplane](https://github.com/Yohann0617/Xboard-airplane)（v2board React 前端）等其他分支，前端包不同，需另行适配。
- 升级 Xboard 后，若默认前端包有变化，用新版 `theme/Xboard/assets/umi.js` 替换本主题 `assets/umi.js`，**保留 `custom.css` 与 `custom.js`** 即可。
- 亚克力/玻璃材质依赖浏览器 `backdrop-filter`（Safari 经 `-webkit-` 前缀已兼容）。
- 上传 zip 大小需 ≤ 10MB、文件名仅含字母/数字/`-`/`_`/`.`（后端校验）。

## 📄 License

MIT — 随意使用、修改、分发。前端包版权归 Xboard 原作者所有。
