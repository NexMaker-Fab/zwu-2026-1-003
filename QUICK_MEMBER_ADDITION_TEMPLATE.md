# 新成员添加 - 简化版操作指南 

## 📧 发送给成员的模板消息

您可以直接复制以下内容发送给需要添加的成员：

---

```markdown
你好！欢迎加入我们的团队网站项目 🎉

为了让你的个人主页显示图标，请先完成以下步骤：

## ✅ 第一步：配置个人主页 Favicon（必须先完成）

### 快速步骤：

1️⃣ **下载 favicon.svg 文件**
   访问：https://raw.githubusercontent.com/NexMaker-Fab/zwu-2026-1-003/main/favicon.svg
   右键 → "另存为" → 保存到桌面

2️⃣ **上传到你的 GitHub Pages 仓库**
   - 访问你的 GitHub Pages 仓库
   - 点击 "Upload files"
   - 拖拽 favicon.svg 文件
   - 提交更改

3️ **编辑你的 HTML 文件**（通常是 index.html）
   找到 </title> 标签，在它后面添加：
   ```html
   <link rel="icon" href="favicon.svg?v=1" type="image/svg+xml">
   ```

4️⃣ **提交并验证**
   ```bash
   git add index.html favicon.svg
   git commit -m "Add favicon to personal page"
   git push origin main
   ```

5️⃣ **检查效果**
   - 访问你的个人主页
   - 按 Ctrl + F5 强制刷新
   - 查看浏览器标签页是否显示黑色猫咪图标 

**如果看不到图标：**
- 等待几分钟让 GitHub Pages 部署
- 清除浏览器缓存（Ctrl + Shift + Delete）
- 或使用无痕模式测试

---

## 📝 第二步：提供个人信息

配置完成后，请提供以下信息：

### 必填：
- 姓名：____________________
- GitHub 用户名：____________________
- 个人主页 URL：____________________
- 头像图片：（通过微信/QQ/邮件发送）

### 选填：
- 角色：Team Member / Developer / Designer
- 个人简介：（1-2句话）
- 技能：（用逗号分隔）
- 兴趣爱好：（用逗号分隔）
- 邮箱：____________________

---

##  第三步：等待添加

我会验证你的 favicon 配置是否正确，然后把你添加到团队页面中！

**完整指南：** https://github.com/NexMaker-Fab/zwu-2026-1-003/blob/main/ADD_FAVICON_TO_CYZ_PAGE.md

有任何问题随时问我！😊
```

---

## 📊 您的操作流程

### 收到成员信息后：

1. **验证 Favicon**
   - 访问成员提供的个人主页 URL
   - 检查浏览器标签页是否有图标
   - ❌ 如果没有 → 提醒成员重新配置
   - ✅ 如果有 → 继续下一步

2. **保存头像**
   - 接收成员发送的头像图片
   - 保存到 `images/` 目录
   - 命名规范：`member-name-avatar.jpg`

3. **修改 script.js**
   - 打开 `script.js`
   - 在 `defaultMembers` 中添加新成员数据
   - 更新成员数量检查逻辑
   - 添加 profilePage 自动更新代码
   - 更新日志消息

4. **提交到 GitHub**
   ```bash
   git add -A
   git commit -m "Add [成员姓名] to team members..."
   git push origin main
   ```

5. **测试验证**
   - 打开 `fix-all.html`
   - 点击 "Clear & Reinitialize Members"
   - 访问 `team.html` 并刷新
   - 确认新成员卡片显示正常
   - 测试点击跳转功能
   - 无痕模式测试

---

##  额外工具

### 自动化脚本（可选）

如果成员熟悉 Python，可以使用自动化脚本：

```python
import os
import urllib.request

# 配置
REPO_PATH = input("请输入你的 GitHub Pages 仓库路径: ")
FAVICON_URL = "https://raw.githubusercontent.com/NexMaker-Fab/zwu-2026-1-003/main/favicon.svg"

# 下载 favicon
urllib.request.urlretrieve(FAVICON_URL, os.path.join(REPO_PATH, "favicon.svg"))
print("✅ favicon.svg 下载成功")

# 修改 HTML
html_path = os.path.join(REPO_PATH, "index.html")
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

if '</title>' in content and 'rel="icon"' not in content:
    content = content.replace('</title>', '</title>\n    <link rel="icon" href="favicon.svg?v=1" type="image/svg+xml">')
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ HTML 文件修改成功")

print("\n 下一步：")
print(f"cd {REPO_PATH}")
print("git add index.html favicon.svg")
print('git commit -m "Add favicon"')
print("git push origin main")
```

成员只需：
1. 保存为 `add_favicon.py`
2. 运行：`python add_favicon.py`
3. 输入仓库路径
4. 自动完成配置

---

## 📚 相关文档

- [NEW_MEMBER_INFO_FORM.md](./NEW_MEMBER_INFO_FORM.md) - 完整信息收集表单
- [ADD_FAVICON_TO_CYZ_PAGE.md](./ADD_FAVICON_TO_CYZ_PAGE.md) - Favicon 详细配置指南
- [TEAM_MEMBER_ADDITION_GUIDE.md](./TEAM_MEMBER_ADDITION_GUIDE.md) - 添加成员完整流程
- [CHEN_YUZHE_FAVICON_GUIDE.md](./CHEN_YUZHE_FAVICON_GUIDE.md) - Chen Yuzhe 专属指南

---

## 💡 最佳实践

1. **始终先验证 favicon** - 确保成员已正确配置后再添加
2. **使用统一命名** - 头像文件使用 `member-name-avatar.jpg` 格式
3. **及时测试** - 添加后立即测试所有功能
4. **保留文档** - 将所有指南文档保存在项目中供参考

---

**祝您顺利添加新成员！** 🎉
