// Team Space - Apple Minimalist Style
// All functionality for team management, assignments, and projects

// ==================== Utility Functions ====================

// Update dynamic logo based on team members
function updateDynamicLogo() {
    const logoElement = document.getElementById('dynamicLogo');
    if (!logoElement) return;
    
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    const memberIds = Object.keys(members);
    
    if (memberIds.length === 0) {
        // Default to black cat
        logoElement.textContent = '🐱';
        return;
    }
    
    // Get the first member's avatar
    const firstMember = members[memberIds[0]];
    if (firstMember && firstMember.avatarType === 'emoji') {
        logoElement.textContent = firstMember.avatar;
    } else if (firstMember && firstMember.avatarType === 'image') {
        // For image avatars, keep the cat but add a small indicator
        logoElement.innerHTML = '🐱<span style="font-size: 12px; position: absolute; bottom: -5px; right: -5px;">🖼️</span>';
    } else {
        logoElement.textContent = '🐱';
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ==================== Member Management ====================

// Initialize default assignments
function initializeDefaultAssignments() {
    console.log('🔧 Initializing default assignments...');
    
    const existingAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    
    // Check if the practice record already exists
    const hasPracticeRecord = existingAssignments.some(a => 
        a.title === 'Practice Record: From Git Installation to Team Website Deployment'
    );
    
    if (hasPracticeRecord) {
        console.log('✅ Practice record already exists, skip initialization');
        return;
    }
    
    // Get all member names
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    const memberNames = Object.values(members).map(m => m.name).join(', ');
    
    // Create the practice record assignment
    const practiceRecord = {
        id: Date.now(),
        title: 'Practice Record: From Git Installation to Team Website Deployment',
        description: `**Summary and Learnings:**\n\nThis comprehensive practice session covered the complete workflow from setting up Git to deploying a collaborative team website. Through hands-on experience, we gained valuable insights into version control, web development, and team collaboration.\n\n**Key Learning Points:**\n\n1. **Git Fundamentals**\n   - Installed and configured Git on local machines\n   - Learned basic Git commands: init, add, commit, push, pull\n   - Understanding of repositories, branches, and commit history\n   - Proper commit message conventions\n\n2. **GitHub Collaboration**\n   - Created and managed GitHub repositories\n   - Learned about remote repositories and synchronization\n   - Understanding of push/pull workflows\n   - Repository settings and configuration\n\n3. **Web Development Basics**\n   - HTML structure and semantic markup\n   - CSS styling and responsive design\n   - JavaScript for dynamic functionality\n   - Multi-page website architecture\n\n4. **Team Website Features**\n   - Night mode design with dark theme\n   - Dynamic member profiles with editable information\n   - Avatar upload and customization (emoji & images)\n   - Dynamic favicon that changes based on current member\n   - Assignment and project management system\n   - File upload support (images, videos, documents)\n\n5. **Version Control Best Practices**\n   - Regular commits with descriptive messages\n   - Proper file organization and structure\n   - Handling merge conflicts\n   - Backup and recovery strategies\n\n6. **Deployment Process**\n   - GitHub Pages setup and configuration\n   - Domain and URL management\n   - Cache management and version updates\n   - Testing across different browsers\n\n**Challenges Overcome:**\n- Browser caching issues with favicons (solved with version parameters)\n- Image upload and display optimization (implemented Canvas-based rendering)\n- Cross-browser compatibility for dynamic content\n- Data persistence using localStorage\n\n**Team Members:** ${memberNames}\n\n**Date:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
`,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        submitter: 'All Members',
        status: 'completed',
        createdAt: new Date().toISOString()
    };
    
    existingAssignments.unshift(practiceRecord); // Add to beginning
    localStorage.setItem('assignments', JSON.stringify(existingAssignments));
    console.log('✅ Successfully created practice record assignment');
}

// Initialize default members
function initializeDefaultMembers() {
    console.log('🔧 Initializing default members...');
    
    const existingMembers = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    
    // Always ensure we have the 8 team members
    const requiredMembers = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const needsInit = requiredMembers.some(id => !existingMembers[id]);
    
    if (!needsInit && Object.keys(existingMembers).length > 0) {
        console.log('✅ Member data already exists, skip initialization');
        return;
    }
    
    const defaultMembers = {
        '1': { 
            name: 'Wang Chengle', 
            role: 'Team Member', 
            avatar: '👨\u200d💻', 
            avatarType: 'emoji',
            bio: '',
            hobbies: [],
            email: '',
            github: '',
            skills: []
        },
        '2': { 
            name: 'Wu Changhong', 
            role: 'Team Member', 
            avatar: '👨\u200d💻', 
            avatarType: 'emoji',
            bio: '',
            hobbies: [],
            email: '',
            github: '',
            skills: []
        },
        '3': { 
            name: 'Liu Xiehan', 
            role: 'Team Member', 
            avatar: '👨\u200d💻', 
            avatarType: 'emoji',
            bio: '',
            hobbies: [],
            email: '',
            github: '',
            skills: []
        },
        '4': { 
            name: 'Chen Kangwen', 
            role: 'Team Member', 
            avatar: '👨\u200d💻', 
            avatarType: 'emoji',
            bio: '',
            hobbies: [],
            email: '',
            github: '',
            skills: []
        },
        '5': { 
            name: 'Ge Chenfei', 
            role: 'Team Member', 
            avatar: '👩\u200d💻', 
            avatarType: 'emoji',
            bio: '',
            hobbies: [],
            email: '',
            github: '',
            skills: []
        },
        '6': { 
            name: 'Xu Ke', 
            role: 'Team Member', 
            avatar: '👨\u200d💻', 
            avatarType: 'emoji',
            bio: '',
            hobbies: [],
            email: '',
            github: '',
            skills: []
        },
        '7': { 
            name: 'Zhu Yihong', 
            role: 'Team Member', 
            avatar: '👨\u200d💻', 
            avatarType: 'emoji',
            bio: '',
            hobbies: [],
            email: '',
            github: '',
            skills: []
        },
        '8': { 
            name: 'Chen Yuzhe', 
            role: 'Team Member', 
            avatar: '👨\u200d💻', 
            avatarType: 'emoji',
            bio: '',
            hobbies: [],
            email: '',
            github: '',
            skills: []
        }
    };
    
    // Merge with existing members (preserve any custom data)
    const mergedMembers = { ...defaultMembers, ...existingMembers };
    
    localStorage.setItem('teamMembers', JSON.stringify(mergedMembers));
    console.log('✅ Successfully initialized/updated 8 team members');
}

// Load and display members
function loadMembers() {
    const membersGrid = document.getElementById('membersGrid');
    if (!membersGrid) return;
    
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    console.log('📋 Loading members:', Object.keys(members).length, 'members found');
    
    if (Object.keys(members).length === 0) {
        membersGrid.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary); grid-column: 1/-1;">
                <div style="font-size: 64px; margin-bottom: 20px;">👥</div>
                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">No team members yet</h3>
                <p style="font-size: 15px;">Click "Add New Member" button to add your first member</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    Object.entries(members).forEach(([id, member]) => {
        const avatarDisplay = member.avatarType === 'image' 
            ? `<img src="${member.avatar}" style="width: 100%; height: 100%; object-fit: cover;">`
            : member.avatar;
        
        // Build skills preview
        const skillsPreview = (member.skills && member.skills.length > 0)
            ? `<div class="member-skills">${member.skills.slice(0, 3).map(s => `<span class="mini-skill-tag">${s}</span>`).join('')}</div>`
            : '';
        
        html += `
            <div class="member-card">
                <button class="edit-member-btn" onclick="event.stopPropagation(); openEditMemberModal(${id})">✏️ Edit</button>
                <div class="member-avatar" onclick="openTeamAvatarModal(${id})">
                    ${avatarDisplay}
                    <div class="avatar-upload-overlay">
                        <span>📷</span>
                    </div>
                </div>
                <div class="member-info" onclick="window.location.href='member.html?id=${id}'">
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-role">${member.role}</p>
                    ${skillsPreview}
                    <p class="member-bio">${member.bio || 'Click to view profile →'}</p>
                </div>
            </div>
        `;
    });
    
    membersGrid.innerHTML = html;
}

// Open add member modal
function openAddMemberModal() {
    openModal('addMemberModal');
}

// Save new member
function saveNewMember(event) {
    event.preventDefault();
    
    const name = document.getElementById('memberName').value.trim();
    const role = document.getElementById('memberRole').value.trim();
    const bio = document.getElementById('memberBio').value.trim();
    const avatar = document.getElementById('memberAvatar').value;
    
    if (!name || !role) {
        showNotification('❌ Please fill in all required fields!', 'error');
        return;
    }
    
    // Save to localStorage
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
    
    showNotification('✅ Member added successfully!');
    closeModal('addMemberModal');
    
    // Reset form
    event.target.reset();
    
    // Reload members
    loadMembers();
    populateSubmitterOptions();
}

// Avatar upload variables
let currentMemberId = null;
let uploadedImageData = null;

// Open avatar upload modal
function openTeamAvatarModal(memberId) {
    currentMemberId = memberId;
    uploadedImageData = null;
    document.getElementById('avatarFileInput').value = '';
    document.getElementById('avatarPreviewContainer').style.display = 'none';
    document.getElementById('confirmAvatarBtn').disabled = true;
    openModal('avatarUploadModal');
}

// Handle avatar file upload
function handleTeamAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        showNotification('❌ Please select an image file!', 'error');
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('❌ File size must be less than 5MB!', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            processImage(img, function(processedDataUrl) {
                uploadedImageData = processedDataUrl;
                
                // Show preview
                const preview = document.getElementById('avatarPreview');
                preview.src = processedDataUrl;
                document.getElementById('avatarPreviewContainer').style.display = 'block';
                document.getElementById('confirmAvatarBtn').disabled = false;
            });
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Process image: crop to square and resize
function processImage(img, callback) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Crop to square
    const size = Math.min(img.width, img.height);
    const x = (img.width - size) / 2;
    const y = (img.height - size) / 2;
    
    // Set canvas size to 200x200
    canvas.width = 200;
    canvas.height = 200;
    
    // Draw cropped and resized image
    ctx.drawImage(img, x, y, size, size, 0, 0, 200, 200);
    
    // Convert to base64
    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    callback(dataUrl);
}

// Confirm avatar upload
function confirmTeamAvatarUpload() {
    if (!uploadedImageData || !currentMemberId) return;

    // Save to localStorage
    const savedMembers = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    if (savedMembers[currentMemberId]) {
        savedMembers[currentMemberId].avatar = uploadedImageData;
        savedMembers[currentMemberId].avatarType = 'image';
        localStorage.setItem('teamMembers', JSON.stringify(savedMembers));

        showNotification('✅ Avatar updated successfully!');
        closeModal('avatarUploadModal');
        
        // Reload members
        loadMembers();
        
        // Update dynamic logo
        updateDynamicLogo();
        
        // If we're on the member profile page, reload to update favicon
        if (window.location.pathname.includes('member.html')) {
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    }
}

// Open edit member modal
function openEditMemberModal(memberId) {
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    const member = members[memberId];
    
    if (!member) {
        showNotification('❌ Member not found!', 'error');
        return;
    }
    
    document.getElementById('editMemberId').value = memberId;
    document.getElementById('editMemberName').value = member.name;
    document.getElementById('editMemberRole').value = member.role;
    document.getElementById('editMemberBio').value = member.bio || '';
    
    openModal('editMemberModal');
}

// Save edited member
function saveEditedMember(event) {
    event.preventDefault();
    
    const memberId = document.getElementById('editMemberId').value;
    const name = document.getElementById('editMemberName').value.trim();
    const role = document.getElementById('editMemberRole').value.trim();
    const bio = document.getElementById('editMemberBio').value.trim();
    
    if (!name || !role) {
        showNotification('❌ Please fill in all required fields!', 'error');
        return;
    }
    
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    if (members[memberId]) {
        members[memberId].name = name;
        members[memberId].role = role;
        members[memberId].bio = bio;
        
        localStorage.setItem('teamMembers', JSON.stringify(members));
        
        showNotification('✅ Member updated successfully!');
        closeModal('editMemberModal');
        
        // Reload members
        loadMembers();
        populateSubmitterOptions();
        
        // Update dynamic logo
        updateDynamicLogo();
    }
}

// ==================== Assignment Management ====================

// Populate submitter dropdown
function populateSubmitterOptions() {
    const submitterSelect = document.getElementById('assignmentSubmitter');
    const editSubmitterSelect = document.getElementById('editAssignmentSubmitter');
    
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    
    let options = '<option value="">Select a member</option>';
    options += '<option value="All Members">👥 All Members</option>';
    Object.entries(members).forEach(([id, member]) => {
        options += `<option value="${member.name}">${member.name}</option>`;
    });
    
    if (submitterSelect) {
        submitterSelect.innerHTML = options;
    }
    
    if (editSubmitterSelect) {
        editSubmitterSelect.innerHTML = options;
    }
}

// Open add assignment modal
function openAddAssignmentModal() {
    populateSubmitterOptions();
    openModal('addAssignmentModal');
}

// Save new assignment
function saveNewAssignment(event) {
    event.preventDefault();
    
    const title = document.getElementById('assignmentTitle').value.trim();
    const description = document.getElementById('assignmentDescription').value.trim();
    const deadline = document.getElementById('assignmentDeadline').value;
    const submitter = document.getElementById('assignmentSubmitter').value;
    
    if (!title || !deadline || !submitter) {
        showNotification('❌ Please fill in all required fields!', 'error');
        return;
    }
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const newAssignment = {
        id: Date.now(),
        title: title,
        description: description,
        deadline: deadline,
        submitter: submitter,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    assignments.push(newAssignment);
    localStorage.setItem('assignments', JSON.stringify(assignments));
    
    showNotification('✅ Assignment created successfully!');
    closeModal('addAssignmentModal');
    
    // Reset form
    event.target.reset();
    
    // Reload assignments
    loadAssignments();
}

// Simple Markdown renderer for assignment descriptions
function renderMarkdown(text) {
    if (!text) return '';
    
    // Convert **bold** to <strong>
    let html = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Convert newlines to <br>
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

// Load and display assignments
function loadAssignments() {
    const assignmentsList = document.getElementById('assignmentsList');
    if (!assignmentsList) return;
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    
    if (assignments.length === 0) {
        assignmentsList.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <div style="font-size: 64px; margin-bottom: 20px;">📝</div>
                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">No assignments yet</h3>
                <p style="font-size: 15px;">Click "New Assignment" button to create your first assignment</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    assignments.forEach(assignment => {
        const statusClass = `status-${assignment.status}`;
        const statusText = {
            'pending': '⏳ Pending',
            'submitted': '📤 Submitted',
            'grading': '🔍 Grading',
            'completed': '✅ Completed'
        }[assignment.status] || assignment.status;
        
        // Check evaluation status
        const isEvaluated = assignment.isEvaluated || false;
        const evaluationStatus = isEvaluated ? '<span class="evaluation-badge evaluated">✅ Evaluated</span>' : '<span class="evaluation-badge pending">⏸️ Not Evaluated</span>';
        
        html += `
            <div class="assignment-card">
                <div class="assignment-header">
                    <div>
                        <h3 class="assignment-title">${assignment.title}</h3>
                        <div class="assignment-meta">
                            👤 ${assignment.submitter} | 📅 Deadline: ${assignment.deadline}
                        </div>
                    </div>
                    <span class="assignment-status ${statusClass}">${statusText}</span>
                </div>
                ${assignment.description ? `<div class="assignment-description" style="white-space: pre-wrap; line-height: 1.8;">${renderMarkdown(assignment.description)}</div>` : ''}
                ${evaluationStatus}
                ${assignment.teacherEvaluation ? `<div class="teacher-evaluation"><strong>Teacher's Comments:</strong><br>${renderMarkdown(assignment.teacherEvaluation)}</div>` : ''}
                <div class="assignment-actions">
                    <button class="btn btn-primary btn-small" onclick="openSubmitAssignmentModal(${assignment.id})">📤 Submit</button>
                    <button class="btn btn-secondary btn-small" onclick="openEditAssignmentModal(${assignment.id})">✏️ Edit</button>
                    <button class="btn btn-secondary btn-small" onclick="openTeacherEvaluationModal(${assignment.id})">👨‍🏫 Evaluate</button>
                    <button class="btn btn-secondary btn-small" onclick="deleteAssignment(${assignment.id})">Delete</button>
                </div>
            </div>
        `;
    });
    
    assignmentsList.innerHTML = html;
}

// Open submit assignment modal
function openSubmitAssignmentModal(assignmentId) {
    document.getElementById('submitAssignmentId').value = assignmentId;
    openModal('submitAssignmentModal');
}

// Open edit assignment modal
function openEditAssignmentModal(assignmentId) {
    // Populate submitter options first
    populateSubmitterOptions();
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!assignment) return;
    
    // Fill form with existing data
    document.getElementById('editAssignmentId').value = assignment.id;
    document.getElementById('editAssignmentTitle').value = assignment.title;
    document.getElementById('editAssignmentDescription').value = assignment.description || '';
    document.getElementById('editAssignmentDeadline').value = assignment.deadline;
    document.getElementById('editAssignmentSubmitter').value = assignment.submitter;
    
    openModal('editAssignmentModal');
}

// Save edited assignment
function saveEditAssignment(event) {
    event.preventDefault();
    
    const assignmentId = parseInt(document.getElementById('editAssignmentId').value);
    const title = document.getElementById('editAssignmentTitle').value.trim();
    const description = document.getElementById('editAssignmentDescription').value.trim();
    const deadline = document.getElementById('editAssignmentDeadline').value;
    const submitter = document.getElementById('editAssignmentSubmitter').value;
    
    if (!title || !deadline || !submitter) {
        showNotification('❌ Please fill in all required fields!', 'error');
        return;
    }
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignmentIndex = assignments.findIndex(a => a.id === assignmentId);
    
    if (assignmentIndex !== -1) {
        // Update assignment data
        assignments[assignmentIndex].title = title;
        assignments[assignmentIndex].description = description;
        assignments[assignmentIndex].deadline = deadline;
        assignments[assignmentIndex].submitter = submitter;
        assignments[assignmentIndex].updatedAt = new Date().toISOString();
        
        localStorage.setItem('assignments', JSON.stringify(assignments));
        
        showNotification('✅ Assignment updated successfully!');
        closeModal('editAssignmentModal');
        
        // Reload assignments
        loadAssignments();
    }
}

// Handle assignment submission
async function handleSubmitAssignment(event) {
    event.preventDefault();
    
    const assignmentId = parseInt(document.getElementById('submitAssignmentId').value);
    const submissionLink = document.getElementById('submissionLink').value.trim();
    const notes = document.getElementById('submissionNotes').value.trim();
    
    // Convert files to base64
    const filesData = await convertFilesToBase64(selectedAssignmentFiles);
    
    // Update assignment status
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (assignment) {
        assignment.status = 'submitted';
        assignment.submissionLink = submissionLink;
        assignment.notes = notes;
        assignment.files = filesData;
        assignment.submittedAt = new Date().toISOString();
        
        localStorage.setItem('assignments', JSON.stringify(assignments));
        
        showNotification('✅ Assignment submitted successfully!');
        closeModal('submitAssignmentModal');
        
        // Reset form
        event.target.reset();
        selectedAssignmentFiles = [];
        document.getElementById('selectedFilesList').innerHTML = '';
        
        // Reload assignments
        loadAssignments();
        
        // Try to sync to GitHub
        uploadToGithub(assignment);
    }
}

// Delete assignment
function deleteAssignment(assignmentId) {
    if (!confirm('Are you sure you want to delete this assignment?')) return;
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const filtered = assignments.filter(a => a.id !== assignmentId);
    localStorage.setItem('assignments', JSON.stringify(filtered));
    
    showNotification('✅ Assignment deleted!');
    loadAssignments();
}

// Open teacher evaluation modal
function openTeacherEvaluationModal(assignmentId) {
    document.getElementById('evaluationAssignmentId').value = assignmentId;
    
    // Load existing evaluation if any
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (assignment && assignment.teacherEvaluation) {
        document.getElementById('teacherComments').value = assignment.teacherEvaluation;
    } else {
        document.getElementById('teacherComments').value = '';
    }
    
    openModal('teacherEvaluationModal');
}

// Save teacher evaluation
function saveTeacherEvaluation(event) {
    event.preventDefault();
    
    const assignmentId = parseInt(document.getElementById('evaluationAssignmentId').value);
    const comments = document.getElementById('teacherComments').value.trim();
    
    if (!comments) {
        showNotification('❌ Please enter evaluation comments!', 'error');
        return;
    }
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (assignment) {
        assignment.teacherEvaluation = comments;
        assignment.isEvaluated = true;
        assignment.evaluatedAt = new Date().toISOString();
        
        localStorage.setItem('assignments', JSON.stringify(assignments));
        
        showNotification('✅ Evaluation saved successfully!');
        closeModal('teacherEvaluationModal');
        
        // Reload assignments to show updated status
        loadAssignments();
    }
}

// ==================== GitHub Integration ====================

// Open GitHub config modal
function openGithubConfigModal() {
    // Load existing config
    const config = JSON.parse(localStorage.getItem('githubConfig') || '{}');
    if (config.username) {
        document.getElementById('githubUsername').value = config.username;
    }
    if (config.repo) {
        document.getElementById('githubRepo').value = config.repo;
    }
    if (config.token) {
        document.getElementById('githubToken').value = config.token;
    }
    if (config.branch) {
        document.getElementById('githubBranch').value = config.branch;
    }
    
    openModal('githubConfigModal');
}

// Save GitHub configuration
function saveGithubConfig(event) {
    event.preventDefault();
    
    const config = {
        username: document.getElementById('githubUsername').value.trim(),
        repo: document.getElementById('githubRepo').value.trim(),
        token: document.getElementById('githubToken').value.trim(),
        branch: document.getElementById('githubBranch').value.trim() || 'main'
    };
    
    if (!config.username || !config.repo) {
        showNotification('❌ Please fill in username and repository!', 'error');
        return;
    }
    
    localStorage.setItem('githubConfig', JSON.stringify(config));
    showNotification('✅ GitHub configuration saved!');
    closeModal('githubConfigModal');
}

// Test GitHub connection
async function testGithubConnection() {
    const config = JSON.parse(localStorage.getItem('githubConfig') || '{}');
    
    if (!config.username || !config.token) {
        showNotification('❌ Please configure username and token first!', 'error');
        return;
    }
    
    try {
        const response = await fetch(`https://api.github.com/users/${config.username}`, {
            headers: {
                'Authorization': `token ${config.token}`
            }
        });
        
        if (response.ok) {
            showNotification('✅ GitHub connection successful!');
        } else {
            showNotification('❌ GitHub connection failed!', 'error');
        }
    } catch (error) {
        showNotification('❌ Connection error: ' + error.message, 'error');
    }
}

// Upload assignment to GitHub
async function uploadToGithub(assignment) {
    const config = JSON.parse(localStorage.getItem('githubConfig') || '{}');
    
    if (!config.username || !config.repo || !config.token) {
        console.log('GitHub not configured, skipping sync');
        return;
    }
    
    try {
        const content = {
            title: assignment.title,
            description: assignment.description,
            submitter: assignment.submitter,
            deadline: assignment.deadline,
            submissionLink: assignment.submissionLink,
            submittedAt: assignment.submittedAt
        };
        
        const encodedContent = btoa(JSON.stringify(content, null, 2));
        
        const response = await fetch(
            `https://api.github.com/repos/${config.username}/${config.repo}/contents/assignments/${assignment.id}.json`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${config.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Add assignment: ${assignment.title}`,
                    content: encodedContent,
                    branch: config.branch
                })
            }
        );
        
        if (response.ok) {
            showNotification('✅ Synced to GitHub successfully!');
        } else {
            console.error('GitHub sync failed:', await response.text());
        }
    } catch (error) {
        console.error('GitHub sync error:', error);
    }
}

// ==================== Project Management ====================

// Open add project modal
function openAddProjectModal() {
    openModal('addProjectModal');
}

// Save new project
async function saveNewProject(event) {
    event.preventDefault();
    
    const name = document.getElementById('projectName').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const tags = document.getElementById('projectTags').value.split(',').map(t => t.trim()).filter(t => t);
    const demoLink = document.getElementById('projectDemoLink').value.trim();
    const githubLink = document.getElementById('projectGithubLink').value.trim();
    
    if (!name) {
        showNotification('❌ Please enter a project name!', 'error');
        return;
    }
    
    // Convert files to base64
    const filesData = await convertFilesToBase64(selectedProjectFiles);
    
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const newProject = {
        id: Date.now(),
        name: name,
        description: description,
        tags: tags,
        demoLink: demoLink,
        githubLink: githubLink,
        files: filesData,
        createdAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    
    showNotification('✅ Project created successfully!');
    closeModal('addProjectModal');
    
    // Reset form
    event.target.reset();
    selectedProjectFiles = [];
    document.getElementById('selectedProjectFilesList').innerHTML = '';
    
    // Reload projects
    loadProjects();
}

// Load and display projects
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    if (projects.length === 0) {
        projectsGrid.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary); grid-column: 1/-1;">
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
            'linear-gradient(135deg, #0071e3 0%, #5e5ce6 100%)',
            'linear-gradient(135deg, #ff375f 0%, #ff9f0a 100%)',
            'linear-gradient(135deg, #30d158 0%, #64d2ff 100%)',
            'linear-gradient(135deg, #bf5af2 0%, #ff375f 100%)'
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
                    <div style="display: flex; gap: 12px;">${buttonsHtml}</div>
                </div>
            </div>
        `;
    });
    
    projectsGrid.innerHTML = html;
}

// ==================== Page Initialization ====================

// Load member profile page
function loadMemberProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const memberId = urlParams.get('id');
    
    console.log('🔍 Loading member profile for ID:', memberId);
    
    if (!memberId) {
        window.location.href = 'team.html';
        return;
    }
    
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    const member = members[memberId];
    
    console.log('👤 Member data:', member);
    
    if (!member) {
        console.error('❌ Member not found with ID:', memberId);
        window.location.href = 'team.html';
        return;
    }
    
    // Update page title
    document.title = `${member.name} - Team Space`;
    
    // Update favicon to member's avatar
    updateMemberFavicon(member);
    
    // Render profile card
    const profileCard = document.getElementById('profileCard');
    if (!profileCard) return;
    
    const avatarDisplay = member.avatarType === 'image' 
        ? `<img src="${member.avatar}" style="width: 100%; height: 100%; object-fit: cover;">`
        : `<div style="font-size: 180px;">${member.avatar}</div>`;
    
    // Build skills tags
    const skillsHtml = (member.skills && member.skills.length > 0) 
        ? `<div class="profile-section">
            <h3>Skills</h3>
            <div class="skills-tags">
                ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
           </div>`
        : '';
    
    // Build hobbies tags
    const hobbiesHtml = (member.hobbies && member.hobbies.length > 0)
        ? `<div class="profile-section">
            <h3>Hobbies</h3>
            <div class="hobbies-tags">
                ${member.hobbies.map(hobby => `<span class="hobby-tag">🎯 ${hobby}</span>`).join('')}
            </div>
           </div>`
        : '';
    
    // Build contact info
    const contactHtml = `
        <div class="profile-section">
            <h3>Contact</h3>
            <div class="contact-info">
                ${member.email ? `<div class="contact-item"><span class="contact-icon">📧</span><a href="mailto:${member.email}">${member.email}</a></div>` : ''}
                ${member.github ? `<div class="contact-item"><span class="contact-icon">💻</span><a href="https://github.com/${member.github}" target="_blank">github.com/${member.github}</a></div>` : ''}
            </div>
        </div>
    `;
    
    profileCard.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar" onclick="openChangeAvatarModal(${memberId})">
                ${avatarDisplay}
                <div class="avatar-edit-overlay">
                    <span>📷 Change Avatar</span>
                </div>
            </div>
            <div class="profile-info">
                <h1 class="profile-name">${member.name}</h1>
                <p class="profile-role">${member.role}</p>
                <button class="btn btn-primary" onclick="openEditProfileModal(${memberId})">✏️ Edit Profile</button>
            </div>
        </div>
        <div class="profile-body">
            ${member.bio ? `<div class="profile-section"><h3>About</h3><p class="profile-bio">${member.bio}</p></div>` : ''}
            ${contactHtml}
            ${skillsHtml}
            ${hobbiesHtml}
        </div>
    `;
}

// Update favicon to member's avatar
function updateMemberFavicon(member) {
    const faviconLink = document.getElementById('dynamicFavicon');
    if (!faviconLink) return;
    
    // Clean up old object URLs to prevent memory leaks
    if (faviconLink.href && faviconLink.href.startsWith('blob:')) {
        URL.revokeObjectURL(faviconLink.href);
    }
    
    if (member.avatarType === 'image' && member.avatar) {
        // For image avatars, create a canvas-based favicon
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        
        // Draw background circle
        ctx.fillStyle = '#2d2d44';
        ctx.beginPath();
        ctx.arc(50, 50, 45, 0, Math.PI * 2);
        ctx.fill();
        
        // Load and draw the image
        const img = new Image();
        img.onload = function() {
            // Create circular clipping path
            ctx.save();
            ctx.beginPath();
            ctx.arc(50, 50, 40, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            
            // Draw image centered and scaled
            const size = 80;
            const offset = (100 - size) / 2;
            ctx.drawImage(img, offset, offset, size, size);
            ctx.restore();
            
            // Convert canvas to blob and update favicon
            canvas.toBlob(function(blob) {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    faviconLink.href = url;
                }
            }, 'image/png');
        };
        img.onerror = function() {
            // If image fails to load, fallback to emoji
            const svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="#2d2d44"/>
                    <text x="50" y="70" font-size="60" text-anchor="middle">👤</text>
                </svg>
            `;
            const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            faviconLink.href = url;
        };
        img.src = member.avatar;
    } else {
        // Use emoji avatar - properly encode it
        const emoji = member.avatar || '🐱';
        const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#2d2d44"/>
                <text x="50" y="70" font-size="60" text-anchor="middle">${emoji}</text>
            </svg>
        `;
        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        faviconLink.href = url;
    }
}

// Open edit profile modal
function openEditProfileModal(memberId) {
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    const member = members[memberId];
    
    if (!member) return;
    
    document.getElementById('editProfileId').value = memberId;
    document.getElementById('editProfileName').value = member.name;
    document.getElementById('editProfileRole').value = member.role;
    document.getElementById('editProfileEmail').value = member.email || '';
    document.getElementById('editProfileGithub').value = member.github || '';
    document.getElementById('editProfileBio').value = member.bio || '';
    document.getElementById('editProfileSkills').value = (member.skills || []).join(', ');
    document.getElementById('editProfileHobbies').value = (member.hobbies || []).join(', ');
    
    openModal('editProfileModal');
}

// Save profile edit
function saveProfileEdit(event) {
    event.preventDefault();
    
    const memberId = document.getElementById('editProfileId').value;
    const name = document.getElementById('editProfileName').value.trim();
    const role = document.getElementById('editProfileRole').value.trim();
    const email = document.getElementById('editProfileEmail').value.trim();
    const github = document.getElementById('editProfileGithub').value.trim();
    const bio = document.getElementById('editProfileBio').value.trim();
    const skills = document.getElementById('editProfileSkills').value.split(',').map(s => s.trim()).filter(s => s);
    const hobbies = document.getElementById('editProfileHobbies').value.split(',').map(h => h.trim()).filter(h => h);
    
    if (!name || !role) {
        showNotification('❌ Please fill in all required fields!', 'error');
        return;
    }
    
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    if (members[memberId]) {
        members[memberId].name = name;
        members[memberId].role = role;
        members[memberId].email = email;
        members[memberId].github = github;
        members[memberId].bio = bio;
        members[memberId].skills = skills;
        members[memberId].hobbies = hobbies;
        
        localStorage.setItem('teamMembers', JSON.stringify(members));
        
        showNotification('✅ Profile updated successfully!');
        closeModal('editProfileModal');
        
        // Reload profile
        loadMemberProfile();
        updateDynamicLogo();
    }
}

// Avatar change variables for profile page
let profileAvatarData = null;
let selectedEmoji = null;

// Open change avatar modal
function openChangeAvatarModal(memberId) {
    currentMemberId = memberId;
    profileAvatarData = null;
    selectedEmoji = null;
    document.getElementById('profileAvatarFileInput').value = '';
    document.getElementById('profileAvatarPreviewContainer').style.display = 'none';
    document.getElementById('confirmProfileAvatarBtn').disabled = true;
    openModal('changeAvatarModal');
}

// Select emoji avatar
function selectEmoji(emoji) {
    selectedEmoji = emoji;
    profileAvatarData = null;
    
    // Show preview
    const preview = document.getElementById('profileAvatarPreview');
    preview.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><text x="100" y="140" font-size="120" text-anchor="middle">${encodeURIComponent(emoji)}</text></svg>`;
    document.getElementById('profileAvatarPreviewContainer').style.display = 'block';
    document.getElementById('confirmProfileAvatarBtn').disabled = false;
}

// Handle profile avatar upload
function handleProfileAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showNotification('❌ Please select an image file!', 'error');
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        showNotification('❌ File size must be less than 5MB!', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            processImage(img, function(processedDataUrl) {
                profileAvatarData = processedDataUrl;
                selectedEmoji = null;
                
                const preview = document.getElementById('profileAvatarPreview');
                preview.src = processedDataUrl;
                document.getElementById('profileAvatarPreviewContainer').style.display = 'block';
                document.getElementById('confirmProfileAvatarBtn').disabled = false;
            });
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Confirm profile avatar change
function confirmProfileAvatarChange() {
    if (!currentMemberId) return;
    
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    if (members[currentMemberId]) {
        if (selectedEmoji) {
            members[currentMemberId].avatar = selectedEmoji;
            members[currentMemberId].avatarType = 'emoji';
        } else if (profileAvatarData) {
            members[currentMemberId].avatar = profileAvatarData;
            members[currentMemberId].avatarType = 'image';
        }
        
        localStorage.setItem('teamMembers', JSON.stringify(members));
        
        showNotification('✅ Avatar updated successfully!');
        closeModal('changeAvatarModal');
        
        // Reload profile to show new avatar
        loadMemberProfile();
        
        // Update sidebar logo
        updateDynamicLogo();
        
        // Update favicon immediately with new avatar
        updateMemberFavicon(members[currentMemberId]);
    }
}

// ==================== File Upload Functions ====================

let selectedAssignmentFiles = [];
let selectedProjectFiles = [];

// Handle file selection for assignments
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    selectedAssignmentFiles = files;
    displaySelectedFiles('selectedFilesList', files);
}

// Handle file selection for projects
function handleProjectFileSelect(event) {
    const files = Array.from(event.target.files);
    selectedProjectFiles = files;
    displaySelectedFiles('selectedProjectFilesList', files);
}

// Display selected files
function displaySelectedFiles(containerId, files) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (files.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<div style="margin-top: 12px;">';
    files.forEach((file, index) => {
        const fileSize = formatFileSize(file.size);
        const icon = getFileIcon(file.type);
        html += `
            <div class="file-item">
                <span class="file-icon">${icon}</span>
                <span class="file-name">${file.name}</span>
                <span class="file-size">${fileSize}</span>
                <button type="button" class="file-remove" onclick="removeFile('${containerId}', ${index})">&times;</button>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Get file icon based on type
function getFileIcon(mimeType) {
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType.startsWith('video/')) return '🎥';
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('word') || mimeType.includes('document')) return '📝';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📽️';
    if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('archive')) return '📦';
    return '📄';
}

// Remove file from selection
function removeFile(containerId, index) {
    if (containerId === 'selectedFilesList') {
        selectedAssignmentFiles.splice(index, 1);
        displaySelectedFiles('selectedFilesList', selectedAssignmentFiles);
    } else if (containerId === 'selectedProjectFilesList') {
        selectedProjectFiles.splice(index, 1);
        displaySelectedFiles('selectedProjectFilesList', selectedProjectFiles);
    }
}

// Convert files to base64 for storage
async function convertFilesToBase64(files) {
    const promises = files.map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: e.target.result
                });
            };
            reader.readAsDataURL(file);
        });
    });
    
    return await Promise.all(promises);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Always initialize default members first (on all pages)
    initializeDefaultMembers();
    
    // Initialize default assignments on assignments page
    if (window.location.pathname.includes('assignments.html') || window.location.pathname.endsWith('assignments.html')) {
        initializeDefaultAssignments();
    }
    
    // Update dynamic logo on all pages
    updateDynamicLogo();
    
    // Load member profile if on member page
    if (window.location.pathname.includes('member.html') || window.location.pathname.endsWith('member.html')) {
        loadMemberProfile();
    }
    
    // Load members on team page
    if (window.location.pathname.includes('team.html') || window.location.pathname.endsWith('team.html')) {
        loadMembers();
    }
    
    // Load assignments on assignments page
    if (window.location.pathname.includes('assignments.html') || window.location.pathname.endsWith('assignments.html')) {
        loadAssignments();
        populateSubmitterOptions();
    }
    
    // Load projects on final-project page
    if (window.location.pathname.includes('final-project.html') || window.location.pathname.endsWith('final-project.html')) {
        loadProjects();
    }
    
    // Update stats on homepage
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        updateHomepageStats();
    }
    
    console.log('Team Space loaded successfully!');
});

// Update homepage statistics
function updateHomepageStats() {
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    const statMembers = document.getElementById('statMembers');
    const statAssignments = document.getElementById('statAssignments');
    const statProjects = document.getElementById('statProjects');
    
    if (statMembers) statMembers.textContent = Object.keys(members).length;
    if (statAssignments) statAssignments.textContent = assignments.length;
    if (statProjects) statProjects.textContent = projects.length;
}
