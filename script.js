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
    
    // 创建新作业项
    const assignmentList = document.getElementById('assignmentList');
    const assignId = Date.now();
    
    const assignmentItem = document.createElement('div');
    assignmentItem.className = 'assignment-item';
    assignmentItem.innerHTML = `
        <div class="assignment-header">
            <h3 class="assignment-title">${title}</h3>
            <span class="assignment-status status-pending">待提交</span>
        </div>
        <div class="assignment-meta">
            <span>📅 截止日期: ${deadline}</span>
            <span>👤 提交人: ${submitter}</span>
        </div>
        <p class="assignment-description">${description}</p>
    `;
    
    assignmentList.appendChild(assignmentItem);
    
    // 保存到 localStorage
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    assignments.push({
        id: assignId,
        title: title,
        description: description,
        deadline: deadline,
        submitter: submitter,
        status: 'pending'
    });
    localStorage.setItem('assignments', JSON.stringify(assignments));
    
    // 关闭模态框并重置表单
    closeModal('addAssignmentModal');
    document.getElementById('addAssignmentForm').reset();
    
    showNotification('作业创建成功！', 'success');
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

console.log('Team Space 已加载完成！');
