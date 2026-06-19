# Chen Yuzhe 个人页面 Favicon 配置指南

## 📋 问题描述

您的个人页面 https://cyz9880.github.io/1111/ 目前浏览器标签页上没有显示图标（favicon）。

## ✅ 解决方案

您需要在您的 GitHub Pages 仓库中的 HTML 文件里添加 favicon 配置。

### 步骤1：找到您的 HTML 文件

在您的 GitHub 仓库 `cyz9880/cyz9880.github.io` 中，找到主 HTML 文件（通常是 `index.html` 或 `1111/index.html`）。

### 步骤2：添加 Favicon 配置

在 HTML 文件的 `<head>` 部分，在 `<title>` 标签后面添加以下代码：

```html
<link rel="icon" href="favicon.svg?v=1" type="image/svg+xml">
```

**完整示例：**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>陈宇哲 - 个人介绍</title>
    <!-- 在这里添加 favicon -->
    <link rel="icon" href="favicon.svg?v=1" type="image/svg+xml">
    <!-- 其他 head 内容 -->
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

### 步骤3：上传 Favicon 文件

您需要将 `favicon.svg` 文件上传到您的 GitHub 仓库根目录。

**获取 favicon.svg 文件的方法：**

#### 方法1：从 zwu-2026-1-003 仓库复制

从我们的项目仓库中复制 `favicon.svg` 文件：
- 文件路径：https://github.com/NexMaker-Fab/zwu-2026-1-003/blob/main/favicon.svg
- 直接下载并上传到您的仓库

#### 方法2：使用在线工具生成

如果您想自定义图标，可以使用在线 SVG favicon 生成器：
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/

### 步骤4：提交更改到 GitHub

1. 将修改后的 HTML 文件和 favicon.svg 添加到 Git
2. 提交更改
3. 推送到 GitHub

```bash
git add index.html favicon.svg
git commit -m "Add favicon to personal page"
git push origin main
```

### 步骤5：等待 GitHub Pages 部署

GitHub Pages 会在几分钟内自动重新部署您的网站。

**注意：** Favicon 可能需要几小时才能在所有浏览器中显示，因为 CDN 需要同步。

## 🔍 验证

完成以上步骤后：

1. 访问 https://cyz9880.github.io/1111/
2. 按 `Ctrl + F5` 强制刷新
3. 检查浏览器标签页是否显示图标

如果还是看不到，请：
- 清除浏览器缓存
- 使用无痕模式测试
- 等待更长时间让 CDN 同步

## 💡 提示

- 使用版本号参数（如 `?v=1`）可以强制浏览器获取最新的 favicon
- 如果将来更新 favicon，只需更改版本号即可（如 `?v=2`）
- SVG 格式的 favicon 在所有现代浏览器中都支持良好

##  需要帮助？

如果在配置过程中遇到问题，可以：
1. 检查浏览器控制台（F12）是否有错误信息
2. 确认 favicon.svg 文件已正确上传到仓库根目录
3. 确认 HTML 文件中的路径正确

---

**参考：** 我们项目的 chen-kangwen.html 已经成功配置了 favicon，您可以参考其实现方式。
