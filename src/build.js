/**
 * 品牌展示站 - 构建脚本
 * 读取 content/ 中的 Markdown 文件，生成 index.html
 * 
 * 使用方法: node src/build.js
 */

const fs = require("fs");
const path = require("path");

// 读取 Markdown 文件内容（去掉 frontmatter）
function readContent(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  // 去掉 frontmatter (--- 之间的内容)
  const body = raw.replace(/^---[\s\S]*?---\n*/, "").trim();
  return body;
}

// 读取服务列表
function parseServices(md) {
  const items = [];
  const lines = md.split("\n");
  let current = {};
  for (const line of lines) {
    const titleMatch = line.match(/title:\s*"(.+?)"/);
    const iconMatch = line.match(/icon:\s*"(.+?)"/);
    const descMatch = line.match(/description:\s*"(.+?)"/);
    if (titleMatch) {
      if (current.title) items.push(current);
      current = { title: titleMatch[1] };
    }
    if (iconMatch) current.icon = iconMatch[1];
    if (descMatch) current.description = descMatch[1];
  }
  if (current.title) items.push(current);
  return items;
}

// ====== 主构建逻辑 ======

const contentDir = path.join(__dirname, "..", "content");

// 1. 读取所有内容
const heroContent = readContent(path.join(contentDir, "hero.md"));
const aboutContent = readContent(path.join(contentDir, "about.md"));
const servicesRaw = readContent(path.join(contentDir, "services.md"));
const contactContent = readContent(path.join(contentDir, "contact.md"));

// 2. 解析内容
// 处理 \n 作为换行符
const heroBody = heroContent.replace(/\\n/g, "\n");
const heroLines = heroBody.split("\n").filter((l) => l.trim());
const heroTitle = heroLines[0]?.trim() || "飞旗寨 · 大别山云端度假酒店\n云端之上 · 心归自然";
const heroSub = heroLines[1]?.trim() || "云端之上 · 心归自然";

const aboutHtml = aboutContent
  .replace(/^## .*\n?/, "")
  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  .replace(/`(\d+\+?)`/g, '<span class="highlight">$1</span>')
  .split("\n")
  .filter((l) => l.trim())
  .map((l) => `<p>${l}</p>`)
  .join("\n");

const services = parseServices(servicesRaw);

const contactLines = contactContent
  .replace(/\*\*(.+?):\*\*/g, "<strong>$1：</strong>")
  .split("\n")
  .filter((l) => l.trim());

// 3. 生成服务卡片 HTML
const servicesHtml = services
  .map(
    (s) => `
        <div class="service-card">
          <div class="card-icon">${s.icon || "✨"}</div>
          <h3>${s.title}</h3>
          <p>${s.description || ""}</p>
        </div>`
  )
  .join("\n");

// 4. 生成联系信息 HTML
const contactHtml = contactLines
  .map((line) => {
    const match = line.match(/<strong>(.+?)：<\/strong>(.+)/);
    if (match) {
      return `<div class="info-item">
            <span class="info-icon">${getIcon(match[1])}</span>
            <div>
              <h4>${match[1]}</h4>
              <p>${match[2]}</p>
            </div>
          </div>`;
    }
    return `<p>${line}</p>`;
  })
  .join("\n");

function getIcon(label) {
  if (label.includes("地址")) return "📍";
  if (label.includes("电话")) return "📞";
  if (label.includes("邮箱")) return "✉️";
  return "📌";
}

// 5. 读取模板并替换
const templatePath = path.join(__dirname, "template.html");
let html = fs.readFileSync(templatePath, "utf-8");

// 替换内容占位符
html = html
  .replace("{{HERO_TITLE}}", heroTitle)
  .replace("{{HERO_SUB}}", heroSub)
  .replace("{{ABOUT_CONTENT}}", aboutHtml)
  .replace("{{SERVICES_HTML}}", servicesHtml)
  .replace("{{CONTACT_INFO}}", contactHtml);

// 6. 写入构建结果
const outputPath = path.join(__dirname, "..", "dist", "index.html");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html, "utf-8");

// 复制静态资源到 dist
const dirsToCopy = ["css", "js", "admin", "images"];
for (const dir of dirsToCopy) {
  const srcDir = path.join(__dirname, "..", dir);
  const dstDir = path.join(__dirname, "..", "dist", dir);
  if (fs.existsSync(srcDir)) {
    fs.cpSync(srcDir, dstDir, { recursive: true });
  }
}

console.log("✅ 构建完成！输出目录: dist/");
