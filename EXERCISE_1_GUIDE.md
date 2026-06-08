# Exercise 1: Project Management - 使用说明

## 功能概述

我们已经为您添加了一个快速上传 Exercise 1 的功能，可以方便地将 Project Management.docx 文档作为作业提交到 assignments 页面。

## 使用步骤

### 方法一：使用快速添加按钮（推荐）

1. **打开 Assignments 页面**
   - 访问 http://localhost:8080/assignments.html
   - 或者点击导航栏中的 "Assignments"

2. **点击 " Add Exercise 1" 按钮**
   - 在页面顶部的操作栏中，找到紫色渐变的 "Add Exercise 1" 按钮
   - 位置：在 "⚙️ GitHub Config" 和 "+ New Assignment" 按钮之间

3. **选择文件**
   - 系统会弹出文件选择对话框
   - 选择 `Project Management.docx` 文件
   - 支持 `.docx` 和 `.doc` 格式

4. **自动创建作业**
   - 系统会自动创建一个名为 "Exercise 1: Project Management" 的作业
   - 包含完整的作业描述内容
   - 文件会被附加到作业中
   - 状态自动设置为 "Submitted"

5. **查看作业**
   - 作业会立即显示在作业列表中
   - 点击作业卡片可以查看完整内容和附件
   - 可以点击文件进行预览或下载

### 方法二：手动创建作业

如果您想自定义作业内容，也可以使用传统方式：

1. 点击 "+ New Assignment" 按钮
2. 填写作业标题、描述等信息
3. 在 "Upload Files" 区域上传 Project Management.docx 文件
4. 点击 "Create Assignment" 保存

## 文件预览功能

上传的 DOCX 文件支持以下功能：

### 在线预览
- 点击作业卡片中的文件名
- 系统会使用 Microsoft Office Online Viewer 嵌入显示文档内容
- 无需下载即可查看完整文档

### 下载功能
- 在预览界面下方有 "📥 Download Document" 按钮
- 点击下载可将文件保存到本地

### 其他文件类型支持
系统还支持预览以下文件类型：
- 🖼️ 图片：JPG, PNG, GIF, WebP 等
- 🎥 视频：MP4, WebM, MOV 等
- 📄 PDF 文档
- 📝 Word 文档（DOC, DOCX）
- 📊 Excel 表格（XLS, XLSX）
- 📽️ PowerPoint 演示文稿（PPT, PPTX）
-  压缩文件（ZIP, RAR, 7Z）

## GitHub 同步

如果已配置 GitHub，作业会自动同步到您的仓库：

1. 点击 "⚙️ GitHub Config" 配置 GitHub 信息
2. 填写用户名、仓库名和 Personal Access Token
3. 上传的文件和作业元数据会自动推送到 GitHub
4. 文件存储在 `assignments/{作业ID}/{文件名}` 路径下

## 注意事项

1. **文件大小限制**：单个文件最大 50MB
2. **多文件支持**：可以为一个作业上传多个文件
3. **浏览器兼容性**：建议使用 Chrome、Firefox、Edge 等现代浏览器
4. **本地存储**：所有数据默认保存在浏览器的 localStorage 中
5. **清除缓存**：清除浏览器缓存会删除所有作业数据，请谨慎操作

## 故障排除

### 问题：点击按钮后没有反应
**解决**：检查浏览器是否阻止了弹窗，允许网站打开文件选择对话框

### 问题：文件无法预览
**解决**：
- 确保网络连接正常（需要访问 Microsoft Office Online）
- 尝试下载文件后用本地应用打开

### 问题：GitHub 同步失败
**解决**：
- 检查 GitHub 配置是否正确
- 确认 Personal Access Token 有正确的权限（repo 范围）
- 检查网络连接是否正常

## 技术细节

### 实现原理
- 使用 FileReader API 将文件转换为 Base64 编码
- 数据存储在 localStorage 中
- DOCX 预览通过 iframe 嵌入 Microsoft Office Online Viewer
- GitHub 同步使用 GitHub Contents API

### 数据结构
```javascript
{
  id: 时间戳,
  title: "Exercise 1: Project Management",
  description: "作业描述内容...",
  deadline: "2026-04-13",
  submitter: "All Members",
  status: "submitted",
  createdAt: "ISO 日期时间",
  submittedAt: "ISO 日期时间",
  files: [
    {
      name: "Project Management.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 文件大小,
      data: "data:application/...;base64,..."
    }
  ]
}
```

## 更新日志

### v1.0 (2026-04-13)
- ✅ 添加 "Add Exercise 1" 快速按钮
- ✅ 实现 DOCX 文件在线预览功能
- ✅ 支持自动创建 Exercise 1 作业
- ✅ 集成 GitHub 同步功能
- ✅ 优化文件上传体验

---

如有任何问题或建议，欢迎反馈！
