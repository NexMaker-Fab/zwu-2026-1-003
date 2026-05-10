# Team Space - 功能使用指南

## 📋 目录
1. [添加新成员](#1-添加新成员)
2. [编辑成员简介](#2-编辑成员简介)
3. [作业上传与GitHub同步](#3-作业上传与github同步)
4. [添加新项目](#4-添加新项目)

---

## 1. 添加新成员

### 步骤：
1. 打开 `team.html` 页面
2. 点击右上角的 **"+ Add New Member"** 按钮
3. 在弹出的模态框中填写：
   - **Name**: 成员姓名（英文）
   - **Role**: 角色（如：Team Member, Developer等）
   - **Bio**: 简介描述
   - **Avatar Emoji**: 选择头像表情
4. 点击 **"Add"** 按钮保存

### 自定义头像：
1. 在团队成员卡片上，将鼠标悬停在头像上
2. 点击出现的相机图标 📷
3. 选择本地图片文件（JPG/PNG/GIF，最大5MB）
4. 预览裁剪效果
5. 点击 **"Confirm"** 保存

---

## 2. 编辑成员简介

### 方法一：通过成员详情页
1. 点击团队成员卡片，进入成员详情页 (`member.html?id=X`)
2. 悬停在任何可编辑内容上
3. 点击出现的 **"Edit"** 按钮
4. 修改内容后点击 **"Save"**

### 方法二：直接在团队页面
1. 在 `team.html` 页面上
2. 悬停在页面标题、副标题或描述上
3. 点击 **"Edit"** 按钮
4. 修改后保存

---

## 3. 作业上传与GitHub同步

### 第一步：配置GitHub（仅需一次）
1. 打开 `assignments.html` 页面
2. 点击 **"⚙️ GitHub Config"** 按钮
3. 填写以下信息：
   - **GitHub Username**: 你的GitHub用户名
   - **Repository Name**: 仓库名称（如：team-assignments）
   - **Personal Access Token**: 
     - 前往 GitHub → Settings → Developer settings → Personal access tokens
     - 生成一个新的token（需要repo权限）
     - 复制并粘贴到这里
   - **Branch Name**: 分支名称（默认：main）
4. 点击 **"🔍 Test Connection"** 测试连接
5. 连接成功后点击 **"Save Configuration"**

### 第二步：创建作业
1. 点击 **"+ New Assignment"** 按钮
2. 填写作业信息：
   - **Assignment Title**: 作业标题
   - **Description**: 作业描述
   - **Deadline**: 截止日期
   - **Submitter**: 提交人（选择成员或"All Members"）
3. 点击 **"Create"** 保存

### 第三步：上传作业文件到GitHub
1. 在作业列表中，找到要提交的作业
2. 点击 **"📤 Submit Assignment"** 按钮
3. 在弹出的模态框中：
   - 点击或拖拽文件到上传区域
   - 支持多文件上传
   - 支持格式：PPT、PDF、Word、视频、代码文件等
4. （可选）添加备注说明
5. 点击 **"Submit to GitHub"** 按钮
6. 系统会自动：
   - 上传所有文件到GitHub仓库
   - 更新作业状态为"Submitted"
   - 显示上传进度和结果

### 查看GitHub上的文件：
- 作业提交后，作业卡片上会出现 **"🔗 GitHub"** 链接
- 点击可直接跳转到GitHub仓库中的作业文件夹

---

## 4. 添加新项目

### 步骤：
1. 打开 `final-project.html` 页面
2. 点击 **"+ New Project"** 按钮
3. 在弹出的模态框中填写：
   - **Project Name**: 项目名称
   - **Description**: 项目描述
   - **Tech Tags**: 技术标签（用逗号分隔，如：React, Node.js, MongoDB）
   - **Demo Link**: 演示链接（可选）
   - **GitHub Link**: GitHub仓库链接（可选）
4. 点击 **"Create"** 保存

### 项目显示：
- 项目会自动显示在页面上
- 每个项目卡片包含：
  - 随机渐变色背景和emoji图标
  - 项目名称和描述
  - 技术标签
  - 演示和GitHub链接按钮

---

## 🔧 故障排除

### 按钮点击无反应？
1. 打开浏览器开发者工具（F12）
2. 查看Console选项卡是否有错误信息
3. 访问 `debug.html` 页面运行诊断测试
4. 确保所有必要的模态框存在于当前页面

### GitHub上传失败？
1. 检查GitHub配置是否正确
2. 确认Token有repo权限
3. 确认仓库存在且可访问
4. 检查网络连接
5. 查看Console中的详细错误信息

### 成员数据丢失？
- 数据存储在浏览器的localStorage中
- 清除浏览器数据会导致丢失
- 建议定期备份重要数据

### 图片上传失败？
1. 检查文件格式（仅支持JPG/PNG/GIF）
2. 检查文件大小（最大5MB）
3. 尝试使用不同的图片

---

## 💡 提示

- 所有数据都存储在浏览器localStorage中
- 不同浏览器之间的数据不共享
- 建议使用Chrome或Edge浏览器以获得最佳体验
- 定期清理不再需要的作业和项目以节省存储空间

---

## 📞 需要帮助？

如果遇到问题：
1. 打开 `debug.html` 运行诊断
2. 查看浏览器Console的错误信息
3. 检查是否按照上述步骤正确操作
4. 确认所有HTML文件和script.js都在同一目录下
