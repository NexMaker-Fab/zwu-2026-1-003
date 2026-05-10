// Team Space - Main Functionality Script

// Initialize after page load
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadSavedData();
});

// Initialize page
function initializePage() {
    // Add fade-in animation
    const elements = document.querySelectorAll('.feature-card, .member-card, .assignment-item, .project-card, .exercise-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s forwards`;
    });
}

// Load saved data from localStorage
function loadSavedData() {
    const editableElements = document.querySelectorAll('[data-field]');
    editableElements.forEach(element => {
        const field = element.getAttribute('data-field');
        const savedContent = localStorage.getItem(field);
        if (savedContent) {
            // Keep edit button, only update text content
            const editBtn = element.querySelector('.edit-btn');
            if (editBtn) {
                element.innerHTML = savedContent + editBtn.outerHTML;
            } else {
                element.textContent = savedContent;
            }
        }
    });
}

// Open edit modal
function openEditModal(field) {
    const modal = document.getElementById('editModal');
    const fieldInput = document.getElementById('editField');
    const contentInput = document.getElementById('editContent');
    
    // Get current content
    const element = document.querySelector(`[data-field="${field}"]`);
    if (element) {
        const editBtn = element.querySelector('.edit-btn');
        let currentContent = '';
        
        if (editBtn) {
            // Get text content without edit button
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

// Generic open modal function
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// Save edited content
function saveEdit(event) {
    event.preventDefault();
    
    const field = document.getElementById('editField').value;
    const content = document.getElementById('editContent').value;
    
    // Save to localStorage
    localStorage.setItem(field, content);
    
    // Update page display
    const element = document.querySelector(`[data-field="${field}"]`);
    if (element) {
        const editBtn = element.querySelector('.edit-btn');
        if (editBtn) {
            element.innerHTML = content + '\n            ' + editBtn.outerHTML;
        } else {
            element.textContent = content;
        }
    }
    
    // Close modal
    closeModal('editModal');
    
    // Show success notification
    showNotification('Saved successfully!', 'success');
}

// Open add member modal
function openAddMemberModal() {
    const modal = document.getElementById('addMemberModal');
    modal.classList.add('active');
}

// Save new member
function saveNewMember(event) {
    event.preventDefault();
    
    const name = document.getElementById('memberName').value;
    const role = document.getElementById('memberRole').value;
    const bio = document.getElementById('memberBio').value;
    const avatar = document.getElementById('memberAvatar').value;
    
    // Create new member card
    const teamGrid = document.getElementById('teamGrid');
    const memberId = Date.now(); // Use timestamp as unique ID
    
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
    
    // Save to localStorage (using object format to match initialization)
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    const newId = Object.keys(members).length + 1;
    members[newId] = {
        name: name,
        role: role,
        bio: bio,
        avatar: avatar,
        avatarType: 'emoji'
    };
    localStorage.setItem('teamMembers', JSON.stringify(members));
    
    // Close modal and reset form
    closeModal('addMemberModal');
    document.getElementById('addMemberForm').reset();
    
    showNotification('Member added successfully!', 'success');
}

// Open add assignment modal
function openAddAssignmentModal() {
    const modal = document.getElementById('addAssignmentModal');
    modal.classList.add('active');
}

// Save new assignment
function saveNewAssignment(event) {
    event.preventDefault();
    
    const title = document.getElementById('assignmentTitleInput').value;
    const description = document.getElementById('assignmentDescInput').value;
    const deadline = document.getElementById('assignmentDeadlineInput').value;
    const submitter = document.getElementById('assignmentSubmitterInput').value;
    
    // Save to localStorage
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
    
    // Close modal and reset form
    closeModal('addAssignmentModal');
    document.getElementById('addAssignmentForm').reset();
    
    showNotification('Assignment created successfully!', 'success');
    
    // Refresh assignment list
    if (window.location.pathname.includes('assignments.html')) {
        loadAssignments();
    }
}

// Open add project modal
function openAddProjectModal() {
    const modal = document.getElementById('addProjectModal');
    modal.classList.add('active');
}

// Save new project
function saveNewProject(event) {
    event.preventDefault();
    
    const name = document.getElementById('projectNameInput').value;
    const description = document.getElementById('projectDescInput').value;
    const tagsStr = document.getElementById('projectTagsInput').value;
    const demoLink = document.getElementById('projectDemoInput').value;
    const githubLink = document.getElementById('projectGithubInput').value;
    
    // Parse tags
    const tags = tagsStr.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    // Create new project card
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
        ${demoLink ? `<a href="${demoLink}" class="btn btn-primary btn-small" target="_blank">View Demo</a>` : ''}
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
    
    // Save to localStorage
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
    
    // Close modal and reset form
    closeModal('addProjectModal');
    document.getElementById('addProjectForm').reset();
    
    showNotification('Project created successfully!', 'success');
}

// Open add exercise modal
function openAddExerciseModal() {
    const modal = document.getElementById('addExerciseModal');
    modal.classList.add('active');
}

// Save new exercise
function saveNewExercise(event) {
    event.preventDefault();
    
    const title = document.getElementById('exerciseTitleInput').value;
    const content = document.getElementById('exerciseContentInput').value;
    const tagsStr = document.getElementById('exerciseTagsInput').value;
    const date = document.getElementById('exerciseDateInput').value;
    
    // Parse tags
    const tags = tagsStr.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    // Create new exercise card
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
    };
        
    // Insert at the beginning
    if (exerciseGrid.firstChild) {
        exerciseGrid.insertBefore(exerciseCard, exerciseGrid.firstChild);
    } else {
        exerciseGrid.appendChild(exerciseCard);
    }
    
    // Save to localStorage
    const exercises = JSON.parse(localStorage.getItem('exercises') || '[]');
    exercises.unshift({
        id: exerciseId,
        title: title,
        content: content,
        tags: tags,
        date: date
    });
    localStorage.setItem('exercises', JSON.stringify(exercises));
    
    // Close modal and reset form
    closeModal('addExerciseModal');
    document.getElementById('addExerciseForm').reset();
    
    showNotification('Exercise created successfully!', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
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
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// Add CSS animations
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

// Utility function: format date
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Utility function: generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ==================== Assignment Management ====================

// Global variable to store selected files
let selectedFiles = [];

// Open GitHub config modal
function openGithubConfigModal() {
    const modal = document.getElementById('githubConfigModal');
    if (!modal) return;
    
    // Load saved configuration
    const config = JSON.parse(localStorage.getItem('githubConfig') || '{}');
    if (config.username) document.getElementById('githubUsername').value = config.username;
    if (config.repo) document.getElementById('githubRepo').value = config.repo;
    if (config.token) document.getElementById('githubToken').value = config.token;
    if (config.branch) document.getElementById('githubBranch').value = config.branch;
    
    modal.classList.add('active');
}

// Save GitHub configuration
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
    showNotification('✅ GitHub configuration saved!', 'success');
}

// Test GitHub connection
async function testGithubConnection() {
    const username = document.getElementById('githubUsername').value;
    const repo = document.getElementById('githubRepo').value;
    const token = document.getElementById('githubToken').value;
    const branch = document.getElementById('githubBranch').value || 'main';
    
    if (!username || !repo || !token) {
        showNotification('⚠️ Please fill in all required fields', 'error');
        return;
    }
    
    showNotification('🔍 Testing connection...', 'info');
    
    try {
        // Test repository access
        const url = `https://api.github.com/repos/${username}/${repo}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Repository not found, please check username and repo name');
            } else if (response.status === 401) {
                throw new Error('Token is invalid or expired');
            } else if (response.status === 403) {
                throw new Error('No permission to access this repository');
            } else {
                throw new Error('Connection failed: ' + response.statusText);
            }
        }
        
        const repoData = await response.json();
        
        // Test if branch exists
        const branchUrl = `https://api.github.com/repos/${username}/${repo}/branches/${branch}`;
        const branchResponse = await fetch(branchUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!branchResponse.ok) {
            throw new Error(`Branch '${branch}' does not exist`);
        }
        
        showNotification(`✅ Connection successful!\nRepository: ${repoData.full_name}\nBranch: ${branch}\nSize: ${repoData.size} KB`, 'success');
    } catch (error) {
        console.error('Connection test failed:', error);
        showNotification('❌ Connection failed: ' + error.message, 'error');
    }
}

// Drag and drop event handling
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

// Open submit assignment modal
function openSubmitAssignmentModal(assignmentId) {
    const modal = document.getElementById('submitAssignmentModal');
    if (!modal) return;
    
    document.getElementById('submitAssignmentId').value = assignmentId;
    selectedFiles = [];
    displaySelectedFiles();
    document.getElementById('submissionNote').value = '';
    
    modal.classList.add('active');
}

// Handle assignment submission
async function handleSubmitAssignment(event) {
    event.preventDefault();
    
    const assignmentId = document.getElementById('submitAssignmentId').value;
    const note = document.getElementById('submissionNote').value;
    
    if (selectedFiles.length === 0) {
        showNotification('Please select at least one file!', 'error');
        return;
    }
    
    // Get GitHub configuration
    const config = JSON.parse(localStorage.getItem('githubConfig') || '{}');
    if (!config.username || !config.repo || !config.token) {
        showNotification('⚠️ Please configure GitHub information first!', 'error');
        setTimeout(() => openGithubConfigModal(), 1500);
        return;
    }
    
    showNotification('📤 Uploading to GitHub...', 'info');
    
    try {
        let uploadCount = 0;
        const totalFiles = selectedFiles.length;
        
        // Upload all files to GitHub
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            showNotification(`📤 Uploading ${i + 1}/${totalFiles}: ${file.name}`, 'info');
            
            try {
                await uploadToGithub(file, config, assignmentId);
                uploadCount++;
            } catch (fileError) {
                console.error(`File ${file.name} upload failed:`, fileError);
                throw new Error(`File ${file.name} upload failed: ${fileError.message}`);
            }
        }
        
        // Automatically update assignment status to "submitted"
        updateAssignmentStatus(assignmentId, 'submitted', note);
                
        // Add status history record
        addStatusHistory(assignmentId, 'submitted', `Student submitted assignment with ${uploadCount} file(s)`);
        
        // Close modal
        closeModal('submitAssignmentModal');
        selectedFiles = [];
        
        showNotification(`✅ Assignment submitted successfully! ${uploadCount} file(s) synced to GitHub`, 'success');
        
        // Refresh assignment list
        loadAssignments();
    } catch (error) {
        console.error('Upload failed:', error);
        showNotification('❌ Upload failed: ' + error.message, 'error');
    }
}

// Upload file to GitHub
async function uploadToGithub(file, config, assignmentId) {
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
        reader.onload = async function(e) {
            try {
                const content = e.target.result.split(',')[1]; // Get Base64 content
                const path = `assignments/${assignmentId}/${file.name}`;
                
                // GitHub API URL
                const url = `https://api.github.com/repos/${config.username}/${config.repo}/contents/${path}`;
                
                // Check if file already exists
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
                        console.log(`File already exists, will update: ${file.name}`);
                    }
                } catch (e) {
                    // File does not exist, continue upload
                    console.log(`New file upload: ${file.name}`);
                }
                
                // Upload or update file
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
                    const errorMsg = errorData.message || 'Upload failed';
                    
                    // Provide more detailed error information
                    if (response.status === 404) {
                        throw new Error('Repository not found or no access permission');
                    } else if (response.status === 403) {
                        throw new Error('Token is invalid or insufficient permissions');
                    } else if (response.status === 422) {
                        throw new Error('Invalid file format or too large (max 25MB)');
                    } else {
                        throw new Error(errorMsg);
                    }
                }
                
                const result = await response.json();
                console.log(`✅ File uploaded successfully: ${file.name}`, result.content.html_url);
                resolve(result);
            } catch (error) {
                console.error('❌ Upload error:', error);
                reject(error);
            }
        };
        
        reader.onerror = () => {
            console.error('File read failed');
            reject(new Error('File read failed'));
        };
        
        reader.readAsDataURL(file);
    });
}

// Update assignment status
function updateAssignmentStatus(assignmentId, status, note = '') {
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id == assignmentId);
    
    if (assignment) {
        const oldStatus = assignment.status;
        assignment.status = status;
        assignment.submittedAt = new Date().toISOString();
        
        // Save note if provided
        if (note) {
            assignment.submissionNote = note;
        }
        
        localStorage.setItem('assignments', JSON.stringify(assignments));
        
        // Record status change
        console.log(`Assignment ${assignmentId} status changed from ${oldStatus} to ${status}`);
    }
}

// Add status history record
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
        
        // Keep only the last 10 records
        if (assignment.statusHistory.length > 10) {
            assignment.statusHistory = assignment.statusHistory.slice(-10);
        }
        
        localStorage.setItem('assignments', JSON.stringify(assignments));
    }
}

// Get current user (simplified version, should actually get from login system)
function getCurrentUser() {
    // This can be extended to get from localStorage or login system
    return 'Current User';
}

// Load assignment list
function loadAssignments() {
    const assignmentList = document.getElementById('assignmentList');
    if (!assignmentList) return;
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    
    if (assignments.length === 0) {
        assignmentList.innerHTML = `
            <div id="emptyState" style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <div style="font-size: 64px; margin-bottom: 20px;">📝</div>
                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">No assignments yet</h3>
                <p style="font-size: 15px;">Click "New Assignment" button to create your first assignment</p>
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
                    <span>📅 Deadline: ${assignment.deadline}</span>
                    <span>👤 Submitter: ${assignment.submitter === '全体成员' ? '👥 All Members' : assignment.submitter}</span>
                    ${assignment.grade ? `<span>⭐ Grade: ${assignment.grade}</span>` : ''}
                </div>
                <p class="assignment-description">${assignment.description}</p>
                ${assignment.feedback ? `
                    <div style="margin-top: 12px; padding: 12px; background: #fff9e6; border-left: 4px solid #ffa500; border-radius: 8px;">
                        <p style="font-size: 14px; color: var(--text-primary); margin: 0;">
                            <strong>💬 Feedback:</strong>${assignment.feedback}
                        </p>
                    </div>
                ` : ''}
                ${assignment.statusHistory && assignment.statusHistory.length > 0 ? `
                    <div style="margin-top: 12px; padding: 10px; background: #f5f5f7; border-radius: 8px; font-size: 13px;">
                        <details>
                            <summary style="cursor: pointer; color: var(--text-secondary); font-weight: 500;">📋 View Status History (${assignment.statusHistory.length})</summary>
                            <div style="margin-top: 10px; max-height: 150px; overflow-y: auto;">
                                ${assignment.statusHistory.slice().reverse().map(h => `
                                    <div style="padding: 6px 0; border-bottom: 1px solid #e0e0e0;">
                                        <span style="color: var(--primary-color);">${getStatusInfo(h.status).text}</span>
                                        <span style="color: var(--text-secondary); margin-left: 8px;">${h.action}</span>
                                        <span style="color: #999; margin-left: 8px; font-size: 12px;">${new Date(h.timestamp).toLocaleString('en-US')}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </details>
                    </div>
                ` : ''}
                <div style="margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap;">
                    ${assignment.status !== 'submitted' && assignment.status !== 'grading' && assignment.status !== 'graded' && assignment.status !== 'excellent' ? `
                        <button class="btn btn-primary btn-small" onclick="openSubmitAssignmentModal('${assignment.id}')">📤 Submit Assignment</button>
                    ` : ''}
                    <button class="btn btn-secondary btn-small" onclick="openUpdateStatusModal('${assignment.id}')">📊 Update Status</button>
                    <button class="btn btn-secondary btn-small" onclick="openEditAssignmentModal('${assignment.id}')">✏️ Edit</button>
                    <button class="btn btn-small" style="background: #ff4444; color: white;" onclick="deleteAssignment('${assignment.id}')">🗑️ Delete</button>
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

// Get status information
function getStatusInfo(status) {
    const statusMap = {
        'pending': { 
            text: '⏳ Pending', 
            class: 'status-pending',
            description: 'Assignment created, waiting for student submission'
        },
        'submitted': { 
            text: '📤 Submitted', 
            class: 'status-submitted',
            description: 'Student submitted, waiting for teacher grading'
        },
        'grading': { 
            text: '🔍 Grading', 
            class: 'status-graded',
            description: 'Teacher is grading'
        },
        'needs_revision': { 
            text: '✏️ Needs Revision', 
            class: 'status-needs-revision',
            description: 'Student needs to revise based on feedback and resubmit'
        },
        'graded': { 
            text: '✅ Graded', 
            class: 'status-graded',
            description: 'Teacher has completed grading'
        },
        'excellent': { 
            text: '🌟 Excellent', 
            class: 'status-excellent',
            description: 'Excellent work, worthy of praise'
        }
    };
    return statusMap[status] || statusMap['pending'];
}

// Open edit assignment modal
function openEditAssignmentModal(assignmentId) {
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id == assignmentId);
    
    if (!assignment) {
        showNotification('Assignment not found!', 'error');
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

// Save edited assignment
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
        showNotification('Assignment updated successfully!', 'success');
        loadAssignments();
    }
}

// Delete assignment
async function deleteAssignment(assignmentId) {
    if (!confirm('Are you sure you want to delete this assignment? This will also delete related files from GitHub repository.')) {
        return;
    }
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id == assignmentId);
    
    if (!assignment) {
        showNotification('Assignment not found!', 'error');
        return;
    }
    
    // If assignment is submitted, try to delete files from GitHub
    if (assignment.status === 'submitted' || assignment.status === 'grading' || 
        assignment.status === 'graded' || assignment.status === 'excellent' || 
        assignment.status === 'needs_revision') {
        
        const config = JSON.parse(localStorage.getItem('githubConfig') || '{}');
        if (config.username && config.repo && config.token) {
            try {
                showNotification('Deleting files from GitHub...', 'info');
                await deleteAssignmentFromGithub(assignmentId, config);
                showNotification('✅ GitHub files deleted', 'success');
            } catch (error) {
                console.error('Failed to delete GitHub files:', error);
                showNotification('⚠️ Local assignment deleted, but GitHub file deletion failed: ' + error.message, 'error');
            }
        }
    }
    
    // Delete assignment from localStorage
    const filtered = assignments.filter(a => a.id != assignmentId);
    localStorage.setItem('assignments', JSON.stringify(filtered));
    showNotification('🗑️ Assignment deleted', 'success');
    loadAssignments();
}

// Delete assignment files from GitHub
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
        showNotification('Assignment not found!', 'error');
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

// ===== 工具函数：根据作业提交人员预生成团队成员 =====
// 已废弃，改用 initializeDefaultMembers

// ===== 初始化默认成员数据 =====
function initializeDefaultMembers() {
    console.log('🔧 初始化默认成员数据...');
    
    // 检查是否已有成员数据
    const existingMembers = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    
    // 如果已经有成员数据，不覆盖
    if (Object.keys(existingMembers).length > 0) {
        console.log('✅ 成员数据已存在，跳过初始化');
        return;
    }
    
    // 预设的7个成员
    const defaultMembers = {
        '1': {
            name: 'Wang Chengle',
            role: 'Team Member',
            avatar: '👨‍💻',
            avatarType: 'emoji'
        },
        '2': {
            name: 'Chen Kangwen',
            role: 'Team Member',
            avatar: '👨‍💻',
            avatarType: 'emoji'
        },
        '3': {
            name: 'Wu Changhong',
            role: 'Team Member',
            avatar: '👨‍💻',
            avatarType: 'emoji'
        },
        '4': {
            name: 'Liu Xiehan',
            role: 'Team Member',
            avatar: '👨‍💻',
            avatarType: 'emoji'
        },
        '5': {
            name: 'Zhu Yihong',
            role: 'Team Member',
            avatar: '👨‍💻',
            avatarType: 'emoji'
        },
        '6': {
            name: 'Xu Ke',
            role: 'Team Member',
            avatar: '👨‍💻',
            avatarType: 'emoji'
        },
        '7': {
            name: 'Ge Chenfei',
            role: 'Team Member',
            avatar: '👩‍💻',
            avatarType: 'emoji'
        }
    };
    
    // 保存到 localStorage
    localStorage.setItem('teamMembers', JSON.stringify(defaultMembers));
    
    console.log('✅ Successfully initialized 7 default members');
    console.log('Member list:', Object.values(defaultMembers).map(m => m.name).join(', '));
}

// Initialize default members on page load
if (window.location.pathname.includes('team.html') || window.location.pathname.endsWith('team.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeDefaultMembers();
    });
}

// Load projects on Final Project page
if (window.location.pathname.includes('final-project.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadProjects();
    });
}

// Load projects from localStorage
function loadProjects() {
    const projectShowcase = document.getElementById('projectShowcase');
    if (!projectShowcase) return;
    
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    if (projects.length === 0) {
        projectShowcase.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <div style="font-size: 64px; margin-bottom: 20px;">🚀</div>
                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">No projects yet</h3>
                <p style="font-size: 15px;">Click "New Project" button to create your first project</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    projects.forEach(project => {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const emojis = ['🚀', '💡', '⚡', '🎯', '🔥', '✨'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        const buttonsHtml = `
            ${project.demoLink ? `<a href="${project.demoLink}" class="btn btn-primary btn-small" target="_blank">View Demo</a>` : ''}
            ${project.githubLink ? `<a href="${project.githubLink}" class="btn btn-secondary btn-small" target="_blank">GitHub</a>` : ''}
        `;
        
        html += `
            <div class="project-card">
                <div class="project-image" style="background: ${randomColor};">${randomEmoji}</div>
                <div class="project-content">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">${tagsHtml}</div>
                    <div style="margin-top: 20px; display: flex; gap: 12px;">${buttonsHtml}</div>
                </div>
            </div>
        `;
    });
    
    projectShowcase.innerHTML = html;
}

console.log('Team Space loaded successfully!');
