# Chen Yuzhe 个人页面 Favicon 快速配置脚本

## 🚀 自动化配置方法

这个脚本会自动为您的个人页面添加 favicon 图标。

### 前提条件

1. 确保您已安装 Git
2. 确保您的 GitHub Pages 仓库已设置好
3. 知道您的 HTML 文件路径（通常是 `index.html`）

### 使用方法

#### Windows 用户：

1. **下载本项目的 favicon.svg 文件**
   - 访问：https://github.com/NexMaker-Fab/zwu-2026-1-003/blob/main/favicon.svg
   - 点击 "Download" 按钮下载文件
   - 将文件保存到您的 GitHub Pages 仓库根目录

2. **修改您的 HTML 文件**
   
   打开您的 `index.html` 文件，在 `<head>` 部分找到 `<title>` 标签，在其后添加：
   
   ```html
   <link rel="icon" href="favicon.svg?v=1" type="image/svg+xml">
   ```

3. **提交更改**
   
   打开命令提示符或 PowerShell，进入您的仓库目录，运行：
   
   ```bash
   git add index.html favicon.svg
   git commit -m "Add favicon to personal page"
   git push origin main
   ```

4. **等待部署**
   
   GitHub Pages 会在几分钟内自动重新部署。

#### 或者使用 Python 脚本（推荐）：

如果您熟悉 Python，可以使用以下脚本自动完成：

```python
import os
import shutil

# 配置
REPO_PATH = input("请输入您的 GitHub Pages 仓库路径: ")
HTML_FILE = "index.html"  # 如果您的 HTML 文件在其他位置，请修改这里
FAVICON_URL = "https://raw.githubusercontent.com/NexMaker-Fab/zwu-2026-1-003/main/favicon.svg"

print(f"\n 仓库路径: {REPO_PATH}")
print(f"📄 HTML 文件: {HTML_FILE}")

# 下载 favicon.svg
import urllib.request
print("\n️  下载 favicon.svg...")
urllib.request.urlretrieve(FAVICON_URL, os.path.join(REPO_PATH, "favicon.svg"))
print("✅ favicon.svg 下载成功")

# 修改 HTML 文件
html_path = os.path.join(REPO_PATH, HTML_FILE)
print(f"\n️  修改 {HTML_FILE}...")

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 检查是否已经包含 favicon
if 'rel="icon"' in content:
    print("⚠️  HTML 文件中已存在 favicon 配置，跳过修改")
else:
    # 在 </title> 后插入 favicon
    if '</title>' in content:
        content = content.replace('</title>', '</title>\n    <link rel="icon" href="favicon.svg?v=1" type="image/svg+xml">')
        
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("✅ HTML 文件修改成功")
    else:
        print("❌ 未找到 </title> 标签，请手动添加 favicon 配置")

print("\n 配置完成！")
print("\n 下一步：")
print(f"1. 进入仓库目录: cd {REPO_PATH}")
print("2. 提交更改:")
print("   git add index.html favicon.svg")
print('   git commit -m "Add favicon to personal page"')
print("   git push origin main")
print("\n3. 等待 GitHub Pages 部署（通常几分钟）")
print("4. 访问您的页面并刷新查看效果")
```

**使用方法：**
1. 将上述代码保存为 `add_favicon.py`
2. 运行：`python add_favicon.py`
3. 输入您的仓库路径
4. 按照提示完成配置

## 📋 手动配置步骤（如果自动化失败）

### 步骤1：获取 favicon.svg

从我们的项目复制 favicon.svg：
- URL: https://raw.githubusercontent.com/NexMaker-Fab/zwu-2026-1-003/main/favicon.svg
- 右键链接 → "另存为" → 保存到桌面

### 步骤2：上传到 GitHub

1. 访问您的 GitHub Pages 仓库
2. 点击 "Upload files"
3. 拖拽 favicon.svg 文件
4. 提交更改

### 步骤3：编辑 HTML 文件

1. 在仓库中找到 `index.html`
2. 点击铅笔图标编辑
3. 在 `<head>` 部分的 `</title>` 后添加：
   ```html
   <link rel="icon" href="favicon.svg?v=1" type="image/svg+xml">
   ```
4. 提交更改

### 步骤4：验证

1. 等待几分钟让 GitHub Pages 部署
2. 访问 https://cyz9880.github.io/1111/
3. 按 `Ctrl + F5` 强制刷新
4. 检查浏览器标签页是否显示图标

## ❓ 常见问题

**Q: 为什么看不到图标？**
A: GitHub Pages CDN 需要时间同步，可能需要几小时。清除浏览器缓存或等待后再试。

**Q: 我的 HTML 文件不在根目录怎么办？**
A: 如果您的页面在子目录（如 `/1111/index.html`），需要将 favicon.svg 放在同一目录，或调整路径为 `../favicon.svg`。

**Q: 可以使用其他格式的图标吗？**
A: 可以，但推荐使用 SVG 格式，兼容性最好。也可以使用 PNG、ICO 等格式。

##  需要帮助？

如果遇到问题，请：
1. 检查浏览器控制台（F12）是否有错误
2. 确认文件路径正确
3. 联系项目维护者寻求帮助

---

**参考实现：** 
- chen-kangwen.html: https://github.com/NexMaker-Fab/zwu-2026-1-003/blob/main/chen-kangwen.html
