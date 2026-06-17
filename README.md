# 飞旗寨 · 大别山云端度假酒店 🏔️

> 安徽安庆岳西飞旗寨旅游酒店项目官方网站

一个融合 **自然风光** 与 **红色文化** 的品牌展示网站，带后台管理系统，可在浏览器中直接编辑内容。

---

## ✨ 功能特点

- 🎨 **简洁自然风设计** — 森林绿色主题，响应式布局，手机/电脑都好看
- 📝 **在线编辑内容** — 通过后台管理系统修改文字，无需懂代码
- 🏔️ **飞旗寨介绍** — 海拔1064米、380年古寨、5000亩景区
- 🔴 **红色文化板块** — 岳西革命老区、红二十八军旧址、大别山烈士陵园
- ⚡ **一键部署** — 免费托管在 Netlify，全球加速访问
- 📬 **咨询表单** — 访客可以发送预订咨询

---

## 🚀 三步部署上线

### 第一步：注册账号（免费）

1. **[注册 GitHub](https://github.com/signup)** — 用来存放网站代码
2. **[注册 Netlify](https://app.netlify.com/signup)** — 用来托管网站（用 GitHub 账号登录最快）

### 第二步：上传代码到 GitHub

```bash
# 1. 在 GitHub 上创建一个新仓库（点击右上角 + → New repository）
#    仓库名填 your-brand-name（你的品牌名）
#    设为 Public（公开）

# 2. 打开电脑终端，执行以下命令（替换仓库地址为你自己的）
cd brand-site
git init
git add .
git commit -m "🎉 初始化品牌官网"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

### 第三步：部署到 Netlify

1. 登录 [Netlify](https://app.netlify.com)
2. 点击 **「Add new site」→「Import an existing project」**
3. 选择 **「Deploy with GitHub」**
4. 授权后找到你刚上传的仓库
5. Netlify 会自动识别配置，直接点击 **「Deploy」**
6. 等待 1-2 分钟，部署完成！🎉
7. 点击生成的网址（如 `https://xxx.netlify.app`）就能看到了

---

## 🖊️ 如何管理网站内容

### 方式一：在线后台编辑器（推荐）

1. 打开你的网站，在网址后加 `/admin/`
   - 例如：`https://你的网站名.netlify.app/admin/`
2. 点击 **「Login with Netlify Identity」**
3. 注册账号登录后，即可编辑：
   - 🏠 **首页英雄区** — 修改大标题和副标题
   - 📖 **关于我们** — 修改品牌故事
   - 🛠️ **服务项目** — 增删改服务卡片
   - 📞 **联系方式** — 修改地址、电话、邮箱

> **注意：** 第一次使用时需要启用 Netlify Identity（身份验证功能）：
> 1. 在 Netlify 后台 → **Site settings** → **Identity**
> 2. 点击 **「Enable Identity」**
> 3. 在 **Registration preferences** 中选择 **「Invite only」**
> 4. 在 **Services** → **Git Gateway** 点击 **「Enable Git Gateway」**
> 5. 然后回到你的网站 `/admin/` 登录即可

### 方式二：直接修改文字文件

直接在 `content/` 文件夹中编辑 Markdown 文件（用记事本就能打开），然后重新部署。

---

## 📁 项目文件说明

```
brand-site/
├── index.html           # 网站主页（可直接打开预览）
├── src/
│   ├── template.html    # HTML 模板（构建用）
│   └── build.js         # 构建脚本
├── content/             # 网站内容（可编辑）
│   ├── hero.md          # 首页英雄区内容
│   ├── about.md         # 关于我们内容
│   ├── services.md      # 服务项目列表
│   └── contact.md       # 联系方式
├── admin/
│   ├── index.html       # 后台管理系统入口
│   └── config.yml       # 后台配置
├── css/style.css        # 样式文件
├── js/main.js           # 交互脚本
├── netlify.toml         # Netlify 部署配置
└── package.json         # Node.js 项目配置
```

---

## 🎨 自定义修改

### 修改品牌名称和颜色

打开 `css/style.css`，修改顶部的 CSS 变量：

```css
:root {
  --primary: #2563eb;        /* 主色调（蓝色） */
  --primary-dark: #1d4ed8;   /* 深色主色调 */
  /* ... */
}
```

### 替换图片

将你的品牌图片放到 `images/` 文件夹中，然后修改 `content/about.md` 或 `src/template.html` 中的图片引用。

---

## 💡 常见问题

**Q：我没有编程基础，能搞定吗？**
A：完全没问题！你只需要在后台管理系统中点鼠标编辑文字，不需要写任何代码。

**Q：网站是免费的吗？**
A：是的！GitHub + Netlify 的免费套餐足够个人/小企业使用。

**Q：我可以用自己的域名吗？**
A：可以。在 Netlify 后台 → **Domain settings** 中添加你的域名（需单独购买）。

---

## 📞 需要帮助？

如果有任何问题，随时联系我！
