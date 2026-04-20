// Team Space - 主要功能脚本

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadSavedData();
});

// 初始化页面
function initializePage() {
    // 添加淡入动画
    const elements = document.querySelectorAll('.feature-card, .member-card, .assignment-item, .project-card, .exercise-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s forwards`;
    });
}

// 从 localStorage 加载保存的数据
function loadSavedData() {
    const editableElements = document.querySelectorAll('[data-field]');
    editableElements.forEach(element => {
        const field = element.getAttribute('data-field');
        const savedContent = localStorage.getItem(field);
        if (savedContent) {
            // 保留编辑按钮，只更新文本内容
            const editBtn = element.querySelector('.edit-btn');
            if (editBtn) {
                element.innerHTML = savedContent + editBtn.outerHTML;
            } else {
                element.textContent = savedContent;
            }
        }
    });
}

// 打开编辑模态框
function openEditModal(field) {
    const modal = document.getElementById('editModal');
    const fieldInput = document.getElementById('editField');
    const contentInput = document.getElementById('editContent');
    
    // 获取当前内容
    const element = document.querySelector(`[data-field="${field}"]`);
    if (element) {
        const editBtn = element.querySelector('.edit-btn');
        let currentContent = '';
        
        if (editBtn) {
            // 获取不包含编辑按钮的文本内容
            const clone = element.cloneNode(true);
            const btn = clone.querySelector('.edit-btn');
            if (btn) btn.remove();
            currentContent = clone.textContent.trim();
        } else {
            currentContent = element.textContent.trim();
        }
        
        fieldInput.value = field;
        contentInput.value = currentContent;
        modal.classList.add('active');
    }
}

// 关闭模态框
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// 保存编辑内容
function saveEdit(event) {
    event.preventDefault();
    
    const field = document.getElementById('editField').value;
    const content = document.getElementById('editContent').value;
    
    // 保存到 localStorage
    localStorage.setItem(field, content);
    
    // 更新页面显示
    const element = document.querySelector(`[data-field="${field}"]`);
    if (element) {
        const editBtn = element.querySelector('.edit-btn');
        if (editBtn) {
            element.innerHTML = content + '\n            ' + editBtn.outerHTML;
        } else {
            element.textContent = content;
        }
    }
    
    // 关闭模态框
    closeModal('editModal');
    
    // 显示成功提示
    showNotification('保存成功！', 'success');
}

// 打开添加成员模态框
function openAddMemberModal() {
    const modal = document.getElementById('addMemberModal');
    modal.classList.add('active');
}

// 保存新成员
function saveNewMember(event) {
    event.preventDefault();
    
    const name = document.getElementById('memberName').value;
    const role = document.getElementById('memberRole').value;
    const bio = document.getElementById('memberBio').value;
    const avatar = document.getElementById('memberAvatar').value;
    
    // 创建新成员卡片
    const teamGrid = document.getElementById('teamGrid');
    const memberId = Date.now(); // 使用时间戳作为唯一ID
    
    const memberCard = document.createElement('div');
    memberCard.className = 'member-card';
    memberCard.onclick = function() { window.location.href = `member.html?id=${memberId}`; };
    memberCard.innerHTML = `
        <div class="member-avatar">${avatar}</div>
        <div class="member-info">
            <h3 class="member-name">${name}</h3>
            <p class="member-role">${role}</p>
            <p class="member-bio">${bio}</p>
        </div>
    `;
    
    teamGrid.appendChild(memberCard);
    
    // 保存到 localStorage
    const members = JSON.parse(localStorage.getItem('teamMembers') || '[]');
    members.push({
        id: memberId,
        name: name,
        role: role,
        bio: bio,
        avatar: avatar
    });
    localStorage.setItem('teamMembers', JSON.stringify(members));
    
    // 关闭模态框并重置表单
    closeModal('addMemberModal');
    document.getElementById('addMemberForm').reset();
    
    showNotification('成员添加成功！', 'success');
}

// 打开添加作业模态框
function openAddAssignmentModal() {
    const modal = document.getElementById('addAssignmentModal');
    modal.classList.add('active');
}

// 保存新作业
function saveNewAssignment(event) {
    event.preventDefault();
    
    const title = document.getElementById('assignmentTitleInput').value;
    const description = document.getElementById('assignmentDescInput').value;
    const deadline = document.getElementById('assignmentDeadlineInput').value;
    const submitter = document.getElementById('assignmentSubmitterInput').value;
    
    // 保存到 localStorage
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignId = Date.now();
    
    assignments.push({
        id: assignId,
        title: title,
        description: description,
        deadline: deadline,
        submitter: submitter,
        status: 'pending',
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('assignments', JSON.stringify(assignments));
    
    // 关闭模态框并重置表单
    closeModal('addAssignmentModal');
    document.getElementById('addAssignmentForm').reset();
    
    showNotification('作业创建成功！', 'success');
    
    // 刷新作业列表
    if (window.location.pathname.includes('assignments.html')) {
        loadAssignments();
    }
}

// 打开添加项目模态框
function openAddProjectModal() {
    const modal = document.getElementById('addProjectModal');
    modal.classList.add('active');
}

// 保存新项目
function saveNewProject(event) {
    event.preventDefault();
    
    const name = document.getElementById('projectNameInput').value;
    const description = document.getElementById('projectDescInput').value;
    const tagsStr = document.getElementById('projectTagsInput').value;
    const demoLink = document.getElementById('projectDemoInput').value;
    const githubLink = document.getElementById('projectGithubInput').value;
    
    // 解析标签
    const tags = tagsStr.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    // 创建新项目卡片
    const projectShowcase = document.getElementById('projectShowcase');
    const projectId = Date.now();
    
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const emojis = ['🚀', '💡', '⚡', '🎯', '🔥', '✨'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const tagsHtml = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    const buttonsHtml = `
        ${demoLink ? `<a href="${demoLink}" class="btn btn-primary btn-small" target="_blank">查看演示</a>` : ''}
        ${githubLink ? `<a href="${githubLink}" class="btn btn-secondary btn-small" target="_blank">GitHub</a>` : ''}
    `;
    
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <div class="project-image" style="background: ${randomColor};">${randomEmoji}</div>
        <div class="project-content">
            <h3 class="project-title">${name}</h3>
            <p class="project-description">${description}</p>
            <div class="project-tags">${tagsHtml}</div>
            <div style="margin-top: 20px; display: flex; gap: 12px;">${buttonsHtml}</div>
        </div>
    `;
    
    projectShowcase.appendChild(projectCard);
    
    // 保存到 localStorage
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    projects.push({
        id: projectId,
        name: name,
        description: description,
        tags: tags,
        demoLink: demoLink,
        githubLink: githubLink
    });
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // 关闭模态框并重置表单
    closeModal('addProjectModal');
    document.getElementById('addProjectForm').reset();
    
    showNotification('项目创建成功！', 'success');
}

// 打开添加练习模态框
function openAddExerciseModal() {
    const modal = document.getElementById('addExerciseModal');
    modal.classList.add('active');
}

// 保存新练习
function saveNewExercise(event) {
    event.preventDefault();
    
    const title = document.getElementById('exerciseTitleInput').value;
    const content = document.getElementById('exerciseContentInput').value;
    const tagsStr = document.getElementById('exerciseTagsInput').value;
    const date = document.getElementById('exerciseDateInput').value;
    
    // 解析标签
    const tags = tagsStr.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    // 创建新练习卡片
    const exerciseGrid = document.getElementById('exerciseGrid');
    const exerciseId = Date.now();
    
    const tagsHtml = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    const exerciseCard = document.createElement('div');
    exerciseCard.className = 'exercise-card';
    exerciseCard.innerHTML = `
        <div class="exercise-date">${date}</div>
        <h3 class="exercise-title">${title}</h3>
        <p class="exercise-content">${content}</p>
        <div style="margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;">${tagsHtml}</div>
    `;
    
    // 插入到最前面
    if (exerciseGrid.firstChild) {
        exerciseGrid.insertBefore(exerciseCard, exerciseGrid.firstChild);
    } else {
        exerciseGrid.appendChild(exerciseCard);
    }
    
    // 保存到 localStorage
    const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
    exercises.unshift({
        id: exerciseId,
        title: title,
        content: content,
        tags: tags,
        date: date
    });
    localStorage.setItem('exercises', JSON.stringify(exercises));
    
    // 关闭模态框并重置表单
    closeModal('addExerciseModal');
    document.getElementById('addExerciseForm').reset();
    
    showNotification('练习记录创建成功！', 'success');
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#34c759' : '#0071e3'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        font-size: 15px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 3秒后自动消失
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 点击模态框外部关闭
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// ESC键关闭模态框
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 工具函数：格式化日期
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 工具函数：生成唯一ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ==================== 作业管理功能 ====================

// 全局变量存储选中的文件
let selectedFiles = [];

// 打开 GitHub 配置模态框
function openGithubConfigModal() {
    const modal = document.getElementById('githubConfigModal');
    if (!modal) return;
    
    // 加载已保存的配置
    const config = JSON.parse(localStorage.getItem('githubConfig') || '{}');
    if (config.username) document.getElementById('githubUsername').value = config.username;
    if (config.repo) document.getElementById('githubRepo').value = config.repo;
    if (config.token) document.getElementById('githubToken').value = config.token;
    if (config.branch) document.getElementById('githubBranch').value = config.branch;
    
    modal.classList.add('active');
}

// 保存 GitHub 配置
function saveGithubConfig(event) {
    event.preventDefault();
    
    const config = {
        username: document.getElementById('githubUsername').value,
        repo: document.getElementById('githubRepo').value,
        token: document.getElementById('githubToken').value,
        branch: document.getElementById('githubBranch').value || 'main'
    };
    
    localStorage.setItem('githubConfig', JSON.stringify(config));
    closeModal('githubConfigModal');
    showNotification('✅ GitHub 配置已保存！', 'success');
}

// 测试 GitHub 连接
async function testGithubConnection() {
    const username = document.getElementById('githubUsername').value;
    const repo = document.getElementById('githubRepo').value;
    const token = document.getElementById('githubToken').value;
    const branch = document.getElementById('githubBranch').value || 'main';
    
    if (!username || !repo || !token) {
        showNotification('⚠️ 请先填写所有必填字段', 'error');
        return;
    }
    
    showNotification('🔍 正在测试连接...', 'info');
    
    try {
        // 测试仓库访问
        const url = `https://api.github.com/repos/${username}/${repo}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('仓库不存在，请检查用户名和仓库名');
            } else if (response.status === 401) {
                throw new Error('Token 无效或已过期');
            } else if (response.status === 403) {
                throw new Error('没有访问此仓库的权限');
            } else {
                throw new Error('连接失败: ' + response.statusText);
            }
        }
        
        const repoData = await response.json();
        
        // 测试分支是否存在
        const branchUrl = `https://api.github.com/repos/${username}/${repo}/branches/${branch}`;
        const branchResponse = await fetch(branchUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!branchResponse.ok) {
            throw new Error(`分支 '${branch}' 不存在`);
        }
        
        showNotification(`✅ 连接成功！\n仓库: ${repoData.full_name}\n分支: ${branch}\n文件数: ${repoData.size} KB`, 'success');
    } catch (error) {
        console.error('连接测试失败:', error);
        showNotification('❌ 连接失败: ' + error.message, 'error');
    }
}

// 拖拽事件处理
function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.style.borderColor = 'var(--primary-color)';
    event.currentTarget.style.background = 'rgba(0, 113, 227, 0.05)';
}

function handleDragLeave(event) {
    event.currentTarget.style.borderColor = 'var(--border-color)';
    event.currentTarget.style.background = 'var(--bg-secondary)';
}

function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.style.borderColor = 'var(--border-color)';
    event.currentTarget.style.background = 'var(--bg-secondary)';
    
    const files = event.dataTransfer.files;
    handleFiles(files);
}

function handleFileSelect(event) {
    const files = event.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    selectedFiles = Array.from(files);
    displaySelectedFiles();
}

function displaySelectedFiles() {
    const container = document.getElementById('selectedFiles');
    if (!container) return;
    
    if (selectedFiles.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<div style="display: grid; gap: 10px;">';
    selectedFiles.forEach((file, index) => {
        const icon = getFileIcon(file.name);
        const size = formatFileSize(file.size);
        html += `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--bg-secondary); border-radius: 8px;">
                <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                    <span style="font-size: 24px;">${icon}</span>
                    <div style="flex: 1; min-width: 0;">
                        <div style="font-size: 14px; font-weight: 500; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${file.name}</div>
                        <div style="font-size: 12px; color: var(--text-secondary);">${size}</div>
                    </div>
                </div>
                <button type="button" onclick="removeFile(${index})" style="background: none; border: none; cursor: pointer; font-size: 18px; color: var(--text-secondary); padding: 4px;">&times;</button>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

function removeFile(index) {
    selectedFiles.splice(index, 1);
    displaySelectedFiles();
}

function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
        'pdf': '📄',
        'doc': '📝', 'docx': '📝',
        'ppt': '📊', 'pptx': '📊',
        'xls': '📈', 'xlsx': '📈',
        'mp4': '🎥', 'avi': '🎥', 'mov': '🎥', 'wmv': '🎥', 'flv': '🎥', 'mkv': '🎥',
        'jpg': '🖼️', 'jpeg': '🖼️', 'png': '🖼️', 'gif': '🖼️', 'svg': '🖼️',
        'zip': '📦', 'rar': '📦', '7z': '📦',
        'txt': '📃', 'md': '📃',
        'py': '🐍', 'js': '⚡', 'html': '🌐', 'css': '🎨'
    };
    return icons[ext] || '📎';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// 打开提交作业模态框
function openSubmitAssignmentModal(assignmentId) {
    const modal = document.getElementById('submitAssignmentModal');
    if (!modal) return;
    
    document.getElementById('submitAssignmentId').value = assignmentId;
    selectedFiles = [];
    displaySelectedFiles();
    document.getElementById('submissionNote').value = '';
    
    modal.classList.add('active');
}

// 处理作业提交
async function handleSubmitAssignment(event) {
    event.preventDefault();
    
    const assignmentId = document.getElementById('submitAssignmentId').value;
    const note = document.getElementById('submissionNote').value;
    
    if (selectedFiles.length === 0) {
        showNotification('请至少选择一个文件！', 'error');
        return;
    }
    
    // 获取 GitHub 配置
    const config = JSON.parse(localStorage.getItem('githubConfig') || '{}');
    if (!config.username || !config.repo || !config.token) {
        showNotification('⚠️ 请先配置 GitHub 信息！', 'error');
        setTimeout(() => openGithubConfigModal(), 1500);
        return;
    }
    
    showNotification('📤 正在上传到 GitHub...', 'info');
    
    try {
        let uploadCount = 0;
        const totalFiles = selectedFiles.length;
        
        // 上传所有文件到 GitHub
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            showNotification(`📤 正在上传 ${i + 1}/${totalFiles}: ${file.name}`, 'info');
            
            try {
                await uploadToGithub(file, config, assignmentId);
                uploadCount++;
            } catch (fileError) {
                console.error(`文件 ${file.name} 上传失败:`, fileError);
                throw new Error(`文件 ${file.name} 上传失败: ${fileError.message}`);
            }
        }
        
        // 自动更新作业状态为"已提交"
        updateAssignmentStatus(assignmentId, 'submitted', note);
        
        // 添加状态历史记录
        addStatusHistory(assignmentId, 'submitted', `学生提交作业，共${uploadCount}个文件`);
        
        // 关闭模态框
        closeModal('submitAssignmentModal');
        selectedFiles = [];
        
        showNotification(`✅ 作业提交成功！${uploadCount}个文件已同步到 GitHub`, 'success');
        
        // 刷新作业列表
        loadAssignments();
    } catch (error) {
        console.error('上传失败:', error);
        showNotification('❌ 上传失败: ' + error.message, 'error');
    }
}

// 上传文件到 GitHub
async function uploadToGithub(file, config, assignmentId) {
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
        reader.onload = async function(e) {
            try {
                const content = e.target.result.split(',')[1]; // 获取 Base64 内容
                const path = `assignments/${assignmentId}/${file.name}`;
                
                // GitHub API URL
                const url = `https://api.github.com/repos/${config.username}/${config.repo}/contents/${path}`;
                
                // 检查文件是否已存在
                let sha = null;
                try {
                    const checkResponse = await fetch(url, {
                        headers: {
                            'Authorization': `token ${config.token}`,
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    });
                    
                    if (checkResponse.ok) {
                        const existingFile = await checkResponse.json();
                        sha = existingFile.sha;
                        console.log(`文件已存在，将更新: ${file.name}`);
                    }
                } catch (e) {
                    // 文件不存在，继续上传
                    console.log(`新文件上传: ${file.name}`);
                }
                
                // 上传或更新文件
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${config.token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.github.v3+json'
                    },
                    body: JSON.stringify({
                        message: sha ? `Update ${file.name} for assignment ${assignmentId}` : `Upload ${file.name} for assignment ${assignmentId}`,
                        content: content,
                        branch: config.branch,
                        ...(sha && { sha: sha })
                    })
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMsg = errorData.message || '上传失败';
                    
                    // 提供更详细的错误信息
                    if (response.status === 404) {
                        throw new Error('仓库不存在或没有访问权限');
                    } else if (response.status === 403) {
                        throw new Error('Token 无效或权限不足');
                    } else if (response.status === 422) {
                        throw new Error('文件格式错误或太大（最大 25MB）');
                    } else {
                        throw new Error(errorMsg);
                    }
                }
                
                const result = await response.json();
                console.log(`✅ 文件上传成功: ${file.name}`, result.content.html_url);
                resolve(result);
            } catch (error) {
                console.error('❌ 上传错误:', error);
                reject(error);
            }
        };
        
        reader.onerror = () => {
            console.error('文件读取失败');
            reject(new Error('文件读取失败'));
        };
        
        reader.readAsDataURL(file);
    });
}

// 更新作业状态
function updateAssignmentStatus(assignmentId, status, note = '') {
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id == assignmentId);
    
    if (assignment) {
        const oldStatus = assignment.status;
        assignment.status = status;
        assignment.submittedAt = new Date().toISOString();
        
        // 如果有备注，保存备注
        if (note) {
            assignment.submissionNote = note;
        }
        
        localStorage.setItem('assignments', JSON.stringify(assignments));
        
        // 记录状态变更
        console.log(`作业 ${assignmentId} 状态从 ${oldStatus} 变更为 ${status}`);
    }
}

// 添加状态历史记录
function addStatusHistory(assignmentId, newStatus, action) {
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id == assignmentId);
    
    if (assignment) {
        if (!assignment.statusHistory) {
            assignment.statusHistory = [];
        }
        
        assignment.statusHistory.push({
            status: newStatus,
            action: action,
            timestamp: new Date().toISOString(),
            operator: getCurrentUser()
        });
        
        // 只保留最近10条记录
        if (assignment.statusHistory.length > 10) {
            assignment.statusHistory = assignment.statusHistory.slice(-10);
        }
        
        localStorage.setItem('assignments', JSON.stringify(assignments));
    }
}

// 获取当前用户（简化版，实际应该从登录系统获取）
function getCurrentUser() {
    // 这里可以扩展为从 localStorage 或登录系统获取
    return '当前用户';
}

// 加载作业列表
function loadAssignments() {
    const assignmentList = document.getElementById('assignmentList');
    if (!assignmentList) return;
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    
    if (assignments.length === 0) {
        assignmentList.innerHTML = `
            <div id="emptyState" style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <div style="font-size: 64px; margin-bottom: 20px;">📝</div>
                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">暂无作业</h3>
                <p style="font-size: 15px;">点击“新建作业”按钮创建第一个作业</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    assignments.forEach(assignment => {
        const statusInfo = getStatusInfo(assignment.status);
        
        html += `
            <div class="assignment-item">
                <div class="assignment-header">
                    <h3 class="assignment-title">${assignment.title}</h3>
                    <span class="assignment-status ${statusInfo.class}" title="${statusInfo.description}">${statusInfo.text}</span>
                </div>
                <div class="assignment-meta">
                    <span>📅 截止日期: ${assignment.deadline}</span>
                    <span>👤 提交人: ${assignment.submitter === '全体成员' ? '👥 全体成员' : assignment.submitter}</span>
                    ${assignment.grade ? `<span>⭐ 成绩: ${assignment.grade}</span>` : ''}
                </div>
                <p class="assignment-description">${assignment.description}</p>
                ${assignment.feedback ? `
                    <div style="margin-top: 12px; padding: 12px; background: #fff9e6; border-left: 4px solid #ffa500; border-radius: 8px;">
                        <p style="font-size: 14px; color: var(--text-primary); margin: 0;">
                            <strong>💬 评语：</strong>${assignment.feedback}
                        </p>
                    </div>
                ` : ''}
                ${assignment.statusHistory && assignment.statusHistory.length > 0 ? `
                    <div style="margin-top: 12px; padding: 10px; background: #f5f5f7; border-radius: 8px; font-size: 13px;">
                        <details>
                            <summary style="cursor: pointer; color: var(--text-secondary); font-weight: 500;">📋 查看状态历史 (${assignment.statusHistory.length})</summary>
                            <div style="margin-top: 10px; max-height: 150px; overflow-y: auto;">
                                ${assignment.statusHistory.slice().reverse().map(h => `
                                    <div style="padding: 6px 0; border-bottom: 1px solid #e0e0e0;">
                                        <span style="color: var(--primary-color);">${getStatusInfo(h.status).text}</span>
                                        <span style="color: var(--text-secondary); margin-left: 8px;">${h.action}</span>
                                        <span style="color: #999; margin-left: 8px; font-size: 12px;">${new Date(h.timestamp).toLocaleString('zh-CN')}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </details>
                    </div>
                ` : ''}
                <div style="margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap;">
                    ${assignment.status !== 'submitted' && assignment.status !== 'grading' && assignment.status !== 'graded' && assignment.status !== 'excellent' ? `
                        <button class="btn btn-primary btn-small" onclick="openSubmitAssignmentModal('${assignment.id}')">📤 提交作业</button>
                    ` : ''}
                    <button class="btn btn-secondary btn-small" onclick="openUpdateStatusModal('${assignment.id}')">📊 修改状态</button>
                    <button class="btn btn-secondary btn-small" onclick="openEditAssignmentModal('${assignment.id}')">✏️ 编辑</button>
                    <button class="btn btn-small" style="background: #ff4444; color: white;" onclick="deleteAssignment('${assignment.id}')">🗑️ 删除</button>
                    ${(assignment.status === 'submitted' || assignment.status === 'grading' || assignment.status === 'graded' || assignment.status === 'excellent' || assignment.status === 'needs_revision') ? `
                        <a href="https://github.com/${JSON.parse(localStorage.getItem('githubConfig') || '{}').username}/${JSON.parse(localStorage.getItem('githubConfig') || '{}').repo}/tree/main/assignments/${assignment.id}" 
                           target="_blank" 
                           class="btn btn-secondary btn-small">
                            🔗 GitHub
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    });
    
    assignmentList.innerHTML = html;
}

// 获取状态信息
function getStatusInfo(status) {
    const statusMap = {
        'pending': { 
            text: '⏳ 待提交', 
            class: 'status-pending',
            description: '作业已创建，等待学生提交'
        },
        'submitted': { 
            text: '📤 已提交', 
            class: 'status-submitted',
            description: '学生已提交，等待老师批改'
        },
        'grading': { 
            text: '🔍 待批改', 
            class: 'status-graded',
            description: '老师正在批改中'
        },
        'needs_revision': { 
            text: '✏️ 需修改', 
            class: 'status-needs-revision',
            description: '需要学生根据评语修改后重新提交'
        },
        'graded': { 
            text: '✅ 已批改', 
            class: 'status-graded',
            description: '老师已完成批改'
        },
        'excellent': { 
            text: '🌟 优秀', 
            class: 'status-excellent',
            description: '优秀作业，值得表扬'
        }
    };
    return statusMap[status] || statusMap['pending'];
}

// 打开编辑作业模态框
function openEditAssignmentModal(assignmentId) {
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id == assignmentId);
    
    if (!assignment) {
        showNotification('作业不存在！', 'error');
        return;
    }
    
    document.getElementById('editAssignmentId').value = assignmentId;
    document.getElementById('editAssignmentTitle').value = assignment.title;
    document.getElementById('editAssignmentDesc').value = assignment.description;
    document.getElementById('editAssignmentDeadline').value = assignment.deadline;
    document.getElementById('editAssignmentSubmitter').value = assignment.submitter;
    
    const modal = document.getElementById('editAssignmentModal');
    modal.classList.add('active');
}

// 保存编辑的作业
function saveEditAssignment(event) {
    event.preventDefault();
    
    const assignmentId = document.getElementById('editAssignmentId').value;
    const title = document.getElementById('editAssignmentTitle').value;
    const description = document.getElementById('editAssignmentDesc').value;
    const deadline = document.getElementById('editAssignmentDeadline').value;
    const submitter = document.getElementById('editAssignmentSubmitter').value;
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const index = assignments.findIndex(a => a.id == assignmentId);
    
    if (index !== -1) {
        assignments[index].title = title;
        assignments[index].description = description;
        assignments[index].deadline = deadline;
        assignments[index].submitter = submitter;
        assignments[index].updatedAt = new Date().toISOString();
        
        localStorage.setItem('assignments', JSON.stringify(assignments));
        closeModal('editAssignmentModal');
        showNotification('作业更新成功！', 'success');
        loadAssignments();
    }
}

// 删除作业
async function deleteAssignment(assignmentId) {
    if (!confirm('确定要删除这个作业吗？此操作将同时删除 GitHub 仓库中的相关文件。')) {
        return;
    }
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id == assignmentId);
    
    if (!assignment) {
        showNotification('作业不存在！', 'error');
        return;
    }
    
    // 如果作业已提交，尝试删除 GitHub 上的文件
    if (assignment.status === 'submitted' || assignment.status === 'grading' || 
        assignment.status === 'graded' || assignment.status === 'excellent' || 
        assignment.status === 'needs_revision') {
        
        const config = JSON.parse(localStorage.getItem('githubConfig') || '{}');
        if (config.username && config.repo && config.token) {
            try {
                showNotification('正在删除 GitHub 上的文件...', 'info');
                await deleteAssignmentFromGithub(assignmentId, config);
                showNotification('✅ GitHub 文件已删除', 'success');
            } catch (error) {
                console.error('删除 GitHub 文件失败:', error);
                showNotification('⚠️ 本地作业已删除，但 GitHub 文件删除失败: ' + error.message, 'error');
            }
        }
    }
    
    // 从 localStorage 删除作业
    const filtered = assignments.filter(a => a.id != assignmentId);
    localStorage.setItem('assignments', JSON.stringify(filtered));
    showNotification('🗑️ 作业已删除', 'success');
    loadAssignments();
}

// 从 GitHub 删除作业文件
async function deleteAssignmentFromGithub(assignmentId, config) {
    const basePath = `assignments/${assignmentId}`;
    
    try {
        // 获取该作业目录下的所有文件
        const url = `https://api.github.com/repos/${config.username}/${config.repo}/contents/${basePath}`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            if (response.status === 404) {
                // 目录不存在，无需删除
                console.log('GitHub 上该作业目录不存在');
                return;
            }
            throw new Error('获取文件列表失败');
        }
        
        const files = await response.json();
        
        // 逐个删除文件
        for (const file of files) {
            if (file.type === 'file') {
                await deleteFileFromGithub(file.path, file.sha, config, `Delete ${file.name} for assignment ${assignmentId}`);
            }
        }
        
        console.log(`成功删除作业 ${assignmentId} 的所有文件`);
    } catch (error) {
        console.error('删除作业文件时出错:', error);
        throw error;
    }
}

// 删除单个文件 from GitHub
async function deleteFileFromGithub(path, sha, config, message) {
    const url = `https://api.github.com/repos/${config.username}/${config.repo}/contents/${path}`;
    
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `token ${config.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
            message: message,
            sha: sha,
            branch: config.branch
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '删除文件失败');
    }
    
    return true;
}

// 打开修改状态模态框
function openUpdateStatusModal(assignmentId) {
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id == assignmentId);
    
    if (!assignment) {
        showNotification('作业不存在！', 'error');
        return;
    }
    
    document.getElementById('statusAssignmentId').value = assignmentId;
    
    // 显示当前状态
    const statusInfo = getStatusInfo(assignment.status);
    document.getElementById('currentStatusDisplay').innerHTML = `
        <span style="font-size: 20px; margin-right: 8px;">${statusInfo.text.split(' ')[0]}</span>
        <strong>${statusInfo.text.split(' ').slice(1).join(' ')}</strong>
    `;
    
    // 设置新状态默认值
    document.getElementById('newStatusSelect').value = assignment.status;
    
    // 填充已有成绩和评语
    document.getElementById('gradeInput').value = assignment.grade || '';
    document.getElementById('feedbackInput').value = assignment.feedback || '';
    
    const modal = document.getElementById('updateStatusModal');
    modal.classList.add('active');
}

// 保存状态更新
function saveUpdateStatus(event) {
    event.preventDefault();
    
    const assignmentId = document.getElementById('statusAssignmentId').value;
    const newStatus = document.getElementById('newStatusSelect').value;
    const grade = document.getElementById('gradeInput').value;
    const feedback = document.getElementById('feedbackInput').value;
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id == assignmentId);
    
    if (assignment) {
        const oldStatus = assignment.status;
        
        // 智能状态流转逻辑
        let autoMessage = '';
        
        // 如果从"已批改"或"优秀"改为"需修改"，自动提示学生需要重新提交
        if ((oldStatus === 'graded' || oldStatus === 'excellent') && newStatus === 'needs_revision') {
            autoMessage = '⚠️ 作业状态已变更为“需修改”，请学生根据评语修改后重新提交';
        }
        
        // 如果从"需修改"改为"已提交"，自动提示老师待批改
        if (oldStatus === 'needs_revision' && newStatus === 'submitted') {
            autoMessage = '✅ 学生已重新提交，状态自动变更为“待批改”';
            // 自动将状态改为 grading（待批改）
            assignment.status = 'grading';
        } else {
            assignment.status = newStatus;
        }
        
        // 保存成绩和评语
        if (grade) assignment.grade = grade;
        if (feedback) assignment.feedback = feedback;
        assignment.statusUpdatedAt = new Date().toISOString();
        
        // 添加状态历史
        const actionMap = {
            'pending': '设置为待提交',
            'submitted': '提交作业',
            'grading': '开始批改',
            'needs_revision': '标记为需修改',
            'graded': '完成批改',
            'excellent': '标记为优秀'
        };
        addStatusHistory(assignmentId, assignment.status, actionMap[assignment.status] || '状态变更');
        
        localStorage.setItem('assignments', JSON.stringify(assignments));
        closeModal('updateStatusModal');
        
        // 显示成功消息，如果有自动流转提示则一起显示
        if (autoMessage) {
            showNotification(autoMessage, 'info');
        } else {
            showNotification('✅ 状态更新成功！', 'success');
        }
        
        loadAssignments();
    }
}

// 页面加载时初始化作业列表
if (window.location.pathname.includes('assignments.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadAssignments();
    });
}

console.log('Team Space 已加载完成！');
