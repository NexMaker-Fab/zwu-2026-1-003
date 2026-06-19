# 新成员信息收集表 📝

## 🎯 使用说明

请将此表格填写完整后发送给我们，我们会将你添加到团队网站中。

---

## 📋 必填信息

### 1️⃣ 基本信息

| 项目 | 内容 | 示例 |
|------|------|------|
| **姓名** | | Chen Yuzhe |
| **角色** | | Team Member / Developer / Designer |
| **GitHub 用户名** | | cyz9880 |
| **个人主页 URL** | | https://cyz9880.github.io/1111/ |

### 2️⃣ Favicon 配置状态 ️ **重要**

请在添加前完成你个人主页的 favicon 配置：

- [ ] 我已下载 favicon.svg 文件
- [ ] 我已将 favicon.svg 上传到我的 GitHub Pages 仓库
- [ ] 我已在 HTML 文件中添加 `<link rel="icon">` 标签
- [ ] 我已提交更改到 GitHub
- [ ] 我已访问我的个人主页并确认图标显示正常

**验证方法：**
1. 访问你的个人主页 URL
2. 查看浏览器标签页是否显示黑色猫咪图标
3. 如果没有显示，请按 `Ctrl + F5` 强制刷新
4. 如果还是没有，请检查配置步骤是否正确

**Favicon 配置指南：**
- 详细文档：[ADD_FAVICON_TO_CYZ_PAGE.md](https://github.com/NexMaker-Fab/zwu-2026-1-003/blob/main/ADD_FAVICON_TO_CYZ_PAGE.md)
- 快速步骤：见下方"快速配置步骤"

---

### 3️ 头像图片

请选择以下方式之一提供头像：

#### 方式 A：上传图片文件
- 准备一张清晰的个人照片或头像
- 格式：JPG、PNG、SVG 均可
- 建议尺寸：至少 200x200 像素
- 通过邮件/微信/QQ 发送给我们

#### 方式 B：使用现有图片
如果你已经有图片在我们的项目中，请提供文件名：
- 文件名：____________________
- 位置：images/ 目录下

#### 方式 C：使用默认头像
- [ ] 使用默认头像（稍后可更换）

---

## 📝 选填信息

### 4️ 个人简介（Bio）

简短介绍你自己（1-2句话）：

```
示例：热爱编程的全栈开发者，专注于 Web 开发和人工智能应用。
```

你的简介：
```


```

### 5️⃣ 技能列表（Skills）

列出你的主要技能（用逗号分隔）：

```
示例：JavaScript, Python, React, Node.js, Machine Learning
```

你的技能：
```


```

### 6️⃣ 兴趣爱好（Hobbies）

列出你的兴趣爱好（用逗号分隔）：

```
示例：摄影, 旅行, 阅读, 游戏, 音乐
```

你的爱好：
```


```

### 7️⃣ 联系方式

- **邮箱**：____________________
- **LinkedIn**：____________________（可选）
- **个人博客**：____________________（可选）
- **其他**：____________________

---

## 🚀 快速配置步骤（Favicon）

如果你的个人主页还没有配置 favicon，请按照以下步骤操作：

### 步骤1：下载 favicon.svg

访问以下链接并保存文件：
```
https://raw.githubusercontent.com/NexMaker-Fab/zwu-2026-1-003/main/favicon.svg
```

### 步骤2：上传到 GitHub

1. 访问你的 GitHub Pages 仓库
2. 点击 "Upload files"
3. 拖拽 favicon.svg 文件
4. 提交更改

### 步骤3：编辑 HTML 文件

在你的 `index.html` 文件中，找到 `</title>` 标签，在其后添加：

```html
<link rel="icon" href="favicon.svg?v=1" type="image/svg+xml">
```

**完整示例：**
```html
<head>
    <meta charset="UTF-8">
    <title>你的名字 - 个人介绍</title>
    <!-- 在这里添加 -->
    <link rel="icon" href="favicon.svg?v=1" type="image/svg+xml">
</head>
```

### 步骤4：提交并验证

```bash
git add index.html favicon.svg
git commit -m "Add favicon to personal page"
git push origin main
```

然后访问你的个人主页，按 `Ctrl + F5` 刷新，检查是否显示图标。

---

## ❓ 常见问题

**Q: 为什么看不到图标？**
A: GitHub Pages CDN 需要时间同步，可能需要几小时。清除浏览器缓存或等待后再试。

**Q: 我的 HTML 文件不在根目录怎么办？**
A: 如果页面在子目录（如 `/1111/index.html`），需要将 favicon.svg 放在同一目录，或调整路径。

**Q: 可以使用其他格式的图标吗？**
A: 可以，但推荐使用 SVG 格式，兼容性最好。

**Q: 配置完成后如何验证？**
A: 访问你的个人主页，查看浏览器标签页是否显示黑色猫咪图标。

---

## 📬 提交方式

填写完成后，请通过以下方式之一发送给我们：

1. **复制此表格内容** → 填写完整 → 通过微信/QQ/邮件发送
2. **截图填写后的表格** → 发送给我们
3. **创建 GitHub Issue** → 在我们的仓库中创建 Issue 并填写信息

---

## ✅ 提交前检查清单

- [ ] 所有必填信息已填写
- [ ] Favicon 已配置并验证成功
- [ ] 头像图片已准备或选择使用默认头像
- [ ] 个人主页 URL 可以正常访问
- [ ] 已阅读并理解配置指南

---

**感谢你的配合！我们会尽快将你添加到团队网站中。** 🎉

如有任何问题，随时联系我们！
