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
    // Remove existing notifications to prevent overlap
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);  // Increased to 4 seconds for better readability
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

// Initialize default members
function initializeDefaultMembers() {
    console.log('🔧 Checking member data...');
    
    // Check if members exist in localStorage
    const existingMembers = localStorage.getItem('teamMembers');
    
    if (existingMembers) {
        console.log('✅ Member data already exists, updating profile pages...');
        try {
            const members = JSON.parse(existingMembers);
            
            // Update Chen Kangwen's profile page to external URL
            if (members['2']) {
                members['2'].profilePage = 'https://kevinslayer0131.github.io/111111/';
                console.log('✅ Updated Chen Kangwen profile page to external URL');
            }
            
            // Save updated members back to localStorage
            localStorage.setItem('teamMembers', JSON.stringify(members));
        } catch (e) {
            console.error('❌ Error updating members:', e);
        }
        return;
    }
    
    console.log('🔄 Initializing default members for the first time...');
    
    const defaultMembers = {
        '1': { 
            name: 'Wang Chengle', 
            role: 'Team Member', 
            avatar: 'images/christmas-cat.jpg', 
            avatarType: 'image',
            bio: '',
            hobbies: [],
            email: '',
            github: '19550265177',
            skills: []
        },
        '2': {
            name: 'Chen Kangwen',
            role: 'Team Member',
            avatar: 'data:image/jpeg;base64,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',
            avatarType: 'image',
            bio: '',
            hobbies: [],
            email: '',
            github: 'Kevinslayer0131',
            skills: [],
            profilePage: 'https://kevinslayer0131.github.io/111111/'
        }
    };
    
    localStorage.setItem('teamMembers', JSON.stringify(defaultMembers));
    console.log('✅ Successfully initialized 2 team members: Wang Chengle, Chen Kangwen');
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
        
        // GitHub button - show link if github field exists, otherwise show disabled icon
        const githubButton = member.github 
            ? `<button class="member-github-btn" onclick="event.stopPropagation(); window.open('https://github.com/${member.github}', '_blank')" title="Visit GitHub: ${member.github}">⚫ GitHub</button>`
            : `<button class="member-github-btn disabled" onclick="event.stopPropagation()" title="No GitHub account set">⚪ GitHub</button>`;
        
        html += `
            <div class="member-card">
                <button class="edit-member-btn" onclick="event.stopPropagation(); openEditMemberModal(${id})">️ Edit</button>
                <div class="member-avatar">
                    ${avatarDisplay}
                </div>
                <div class="member-info"${member.profilePage ? ` onclick="window.location.href='${member.profilePage}'"` : ''}>
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-role">${member.role}</p>
                    ${skillsPreview}
                    <p class="member-bio">${member.bio || (member.profilePage ? 'View profile →' : 'Profile coming soon →')}</p>
                </div>
                ${githubButton}
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

// Simple Markdown renderer for assignment descriptions
function renderMarkdown(text) {
    if (!text) return '';
    
    // Convert **bold** to <strong>
    let html = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Convert [link](url) to <a>
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color: #0071e3; text-decoration: none;">$1</a>');
    
    // Convert newlines to <br>
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

// Format time ago
function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    
    return date.toLocaleDateString();
}

// Render submitted files in assignment card
function renderSubmittedFiles(files, assignmentId) {
    let html = '<div class="submitted-files-section">';
    html += '<h4 style="margin: 16px 0 12px 0; color: var(--text-primary); font-size: 15px;">📎 Submitted Files:</h4>';
    html += '<div class="submitted-files-grid">';
    
    files.forEach((file, index) => {
        const isImage = file.type && file.type.startsWith('image/');
        const isVideo = file.type && file.type.startsWith('video/');
        const isPDF = file.name.toLowerCase().endsWith('.pdf');
        const icon = getFileIcon(file.type || '');
        
        html += `
            <div class="submitted-file-item">
                ${isImage ? `
                    <div class="submitted-file-preview" onclick="openSubmittedFilePreview(${assignmentId}, ${index})">
                        <img src="${file.data}" alt="${file.name}">
                        <div class="preview-overlay">
                            <span class="preview-icon">🔍</span>
                        </div>
                    </div>
                ` : isVideo ? `
                    <div class="submitted-file-preview" onclick="openSubmittedFilePreview(${assignmentId}, ${index})">
                        <video src="${file.data}"></video>
                        <div class="preview-overlay">
                            <span class="preview-icon">▶️</span>
                        </div>
                    </div>
                ` : isPDF ? `
                    <div class="submitted-file-pdf-preview">
                        <embed src="${file.data}" type="application/pdf" width="100%" height="400px" 
                               style="border: none; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
                        <div style="margin-top: 10px; display: flex; gap: 8px; justify-content: center;">
                            <button onclick="downloadFile('${file.data}', '${file.name}')" class="btn btn-small btn-secondary" style="padding: 6px 12px; font-size: 13px;">📥 Download</button>
                            <button onclick="window.open('${file.data}', '_blank')" class="btn btn-small btn-primary" style="padding: 6px 12px; font-size: 13px;">🔗 Open Fullscreen</button>
                        </div>
                    </div>
                ` : `
                    <div class="submitted-file-icon" onclick="downloadFile('${file.data}', '${file.name}')">
                        <span style="font-size: 48px;">${icon}</span>
                        <span style="font-size: 12px; margin-top: 8px;">Click to download</span>
                    </div>
                `}
                <div class="submitted-file-info">
                    <div class="submitted-file-name" title="${file.name}">${file.name}</div>
                    <div class="submitted-file-size">${formatFileSize(file.size)}</div>
                </div>
                <button class="delete-file-btn" onclick="deleteSubmittedFile(${assignmentId}, ${index})" title="Delete this file">❌</button>
            </div>
        `;
    });
    
    html += '</div></div>';
    return html;
}

// Open preview for submitted file
function openSubmittedFilePreview(assignmentId, fileIndex) {
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!assignment || !assignment.files || !assignment.files[fileIndex]) return;
    
    const file = assignment.files[fileIndex];
    openFilePreview(file.data, file.type, file.name);
}

// Open PDF in new tab for Exercise 1
function openPDFInNewTab(assignmentId) {
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!assignment || !assignment.files) return;
    
    // Find the PDF file
    const pdfFile = assignment.files.find(f => f.name.toLowerCase().endsWith('.pdf'));
    if (!pdfFile) return;
    
    // Create a new window with embed tag for better compatibility
    const newWindow = window.open('', '_blank');
    if (!newWindow) {
        // If popup blocked, fallback to direct open
        window.open(pdfFile.data, '_blank');
        return;
    }
    
    // Write HTML content with embed tag
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${pdfFile.name} - PDF Viewer</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: #f5f5f7;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                }
                .header {
                    background: white;
                    padding: 15px 20px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .header h1 {
                    font-size: 16px;
                    color: #1d1d1f;
                    font-weight: 600;
                }
                .header-actions {
                    display: flex;
                    gap: 10px;
                }
                .btn {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 980px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-block;
                }
                .btn-primary {
                    background: #0071e3;
                    color: white;
                }
                .btn-secondary {
                    background: #86868b;
                    color: white;
                }
                .pdf-container {
                    flex: 1;
                    padding: 20px;
                    overflow: auto;
                }
                embed {
                    width: 100%;
                    height: 100%;
                    border: none;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📄 ${pdfFile.name}</h1>
                <div class="header-actions">
                    <a href="${pdfFile.data}" download="${pdfFile.name}" class="btn btn-primary">📥 Download</a>
                    <button onclick="window.close()" class="btn btn-secondary">✕ Close</button>
                </div>
            </div>
            <div class="pdf-container">
                <embed src="${pdfFile.data}" type="application/pdf" />
            </div>
        </body>
        </html>
    `);
    
    newWindow.document.close();
}

// Delete submitted file
function deleteSubmittedFile(assignmentId, fileIndex) {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!assignment || !assignment.files) return;
    
    // Remove the file at the specified index
    assignment.files.splice(fileIndex, 1);
    
    // If no files left, optionally reset status
    if (assignment.files.length === 0) {
        assignment.status = 'pending';
    }
    
    localStorage.setItem('assignments', JSON.stringify(assignments));
    
    showNotification('✅ File deleted successfully!');
    
    // Reload assignments to reflect changes
    loadAssignments();
}

// Render GitHub sync status badge
function renderGithubSyncStatus(assignment) {
    const isSynced = assignment.githubSynced || false;
    const syncedAt = assignment.githubSyncedAt || null;
    
    if (isSynced && syncedAt) {
        const syncDate = new Date(syncedAt).toLocaleString();
        return `
            <div class="github-sync-status synced">
                <span class="sync-badge">✅ Synced to GitHub</span>
                <span class="sync-time" title="${syncDate}">Last synced: ${timeAgo(syncedAt)}</span>
            </div>
        `;
    } else {
        return `
            <div class="github-sync-status not-synced">
                <span class="sync-badge">⏸️ Not Synced</span>
            </div>
        `;
    }
}

// Manual sync assignment to GitHub
async function syncAssignmentToGithub(assignmentId) {
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!assignment) {
        showNotification('❌ Assignment not found!', 'error');
        return;
    }
    
    // Show loading notification
    showNotification('🔄 Syncing to GitHub...');
    
    try {
        const success = await uploadToGithub(assignment);
        
        if (success) {
            // Update sync status in localStorage
            assignment.githubSynced = true;
            assignment.githubSyncedAt = new Date().toISOString();
            localStorage.setItem('assignments', JSON.stringify(assignments));
            
            // Reload to update status badge
            loadAssignments();
        }
        // Note: uploadToGithub already shows success/error notification
    } catch (error) {
        console.error('Sync error:', error);
        showNotification('❌ Failed to sync to GitHub. Please check your configuration.', 'error');
    }
}

// Download file
function downloadFile(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Load and display assignments
function loadAssignments() {
    const assignmentsList = document.getElementById('assignmentsList');
    if (!assignmentsList) return;
    
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    
    // If no assignments, show empty container (no message)
    if (assignments.length === 0) {
        assignmentsList.innerHTML = '';
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
        
        // Render submitted files if any
        const submittedFilesHtml = (assignment.files && assignment.files.length > 0) 
            ? renderSubmittedFiles(assignment.files, assignment.id)
            : '';
        
        // Check if this is Exercise 1 with PDF - make title clickable
        const isExercise1WithPDF = assignment.title === 'Exercise 1: Project Management' && 
                                   assignment.files && 
                                   assignment.files.some(f => f.name.toLowerCase().endsWith('.pdf'));
        
        const titleHtml = isExercise1WithPDF 
            ? `<h3 class="assignment-title" onclick="openPDFInNewTab(${assignment.id})" style="cursor: pointer; color: #0071e3; text-decoration: underline;">${assignment.title} 🔗</h3>`
            : `<h3 class="assignment-title">${assignment.title}</h3>`;
        
        html += `
            <div class="assignment-card" onclick="navigateToAssignment(${assignment.id})" style="cursor: pointer;">
                <div class="assignment-header">
                    <div>
                        ${titleHtml}
                        <div class="assignment-meta">
                            👤 ${assignment.submitter} | 📅 Deadline: ${assignment.deadline}
                        </div>
                    </div>
                    <span class="assignment-status ${statusClass}">${statusText}</span>
                </div>
                ${isExercise1WithPDF ? '' : (assignment.description ? `<div class="assignment-description" style="white-space: pre-wrap; line-height: 1.8;">${renderMarkdown(assignment.description)}</div>` : '')}
                ${isExercise1WithPDF ? '<p style="color: #86868b; font-size: 14px; margin: 12px 0;">💡 Click the title above to view the PDF document</p>' : submittedFilesHtml}
                ${evaluationStatus}
                ${assignment.teacherEvaluation ? `<div class="teacher-evaluation"><strong>Teacher's Comments:</strong><br>${renderMarkdown(assignment.teacherEvaluation)}</div>` : ''}
                <div class="assignment-actions">
                    <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); openSubmitAssignmentModal(${assignment.id})"> Submit</button>
                    <button class="btn btn-secondary btn-small" onclick="event.stopPropagation(); openTeacherEvaluationModal(${assignment.id})">👨‍🏫 Evaluate</button>
                    <button class="btn btn-secondary btn-small" onclick="event.stopPropagation(); deleteAssignment(${assignment.id})">Delete</button>
                </div>
            </div>
        `;
    });
    
    assignmentsList.innerHTML = html;
}

// Navigate to assignment detail page
function navigateToAssignment(assignmentId) {
    // Get assignment details
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (!assignment) {
        alert('Assignment not found!');
        return;
    }
    
    // Create a temporary form to submit data to the detail page
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'assignment-detail.html';
    form.target = '_blank';
    
    // Add assignment ID as hidden input
    const idInput = document.createElement('input');
    idInput.type = 'hidden';
    idInput.name = 'assignmentId';
    idInput.value = assignmentId;
    form.appendChild(idInput);
    
    // Store assignment data in sessionStorage for the detail page
    sessionStorage.setItem('currentAssignment', JSON.stringify(assignment));
    
    // Open the detail page in a new tab
    window.open('assignment-detail.html?assignmentId=' + assignmentId, '_blank');
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
    
    // Update assignment status
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (assignment) {
        assignment.status = 'submitted';
        assignment.submissionLink = submissionLink;
        assignment.notes = notes;
        assignment.submittedAt = new Date().toISOString();
        
        localStorage.setItem('assignments', JSON.stringify(assignments));
        
        showNotification('✅ Assignment submitted successfully!');
        closeModal('submitAssignmentModal');
        
        // Reset form
        event.target.reset();
        
        // Reload assignments
        loadAssignments();
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
        showNotification('⚠️ GitHub not configured. Please configure in Settings.', 'error');
        return false;
    }
    
    try {
        console.log('📤 Starting upload to GitHub:', {
            username: config.username,
            repo: config.repo,
            branch: config.branch || 'main',
            assignmentId: assignment.id
        });
        
        // Step 1: Upload all files first
        let fileUrls = [];
        if (assignment.files && assignment.files.length > 0) {
            showNotification('📤 Uploading files to GitHub...');
            
            for (let i = 0; i < assignment.files.length; i++) {
                const file = assignment.files[i];
                console.log(`📁 Uploading file ${i + 1}/${assignment.files.length}: ${file.name}`);
                
                // Extract base64 data from data URL
                let base64Data = '';
                if (file.data && file.data.startsWith('data:')) {
                    base64Data = file.data.split(',')[1]; // Remove data:image/xxx;base64, prefix
                } else if (file.content) {
                    base64Data = file.content;
                }
                
                if (!base64Data) {
                    console.warn('⚠️ No file data found for:', file.name);
                    continue;
                }
                
                const filePath = `assignments/${assignment.id}/${file.name}`;
                const apiUrl = `https://api.github.com/repos/${config.username}/${config.repo}/contents/${filePath}`;
                
                // Get sha if file exists
                let sha = null;
                try {
                    const getResponse = await fetch(apiUrl, {
                        headers: { 'Authorization': `token ${config.token}` }
                    });
                    if (getResponse.ok) {
                        const existingFile = await getResponse.json();
                        sha = existingFile.sha;
                    }
                } catch (e) {
                    // File doesn't exist yet
                }
                
                // Upload file
                const requestBody = {
                    message: `Upload file: ${file.name}`,
                    content: base64Data,
                    branch: config.branch || 'main'
                };
                
                if (sha) {
                    requestBody.sha = sha;
                }
                
                const response = await fetch(apiUrl, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${config.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('❌ Failed to upload file:', file.name, errorData);
                    showNotification(`❌ Failed to upload ${file.name}`, 'error');
                    return false;
                }
                
                const uploadResult = await response.json();
                fileUrls.push({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    url: uploadResult.content.download_url,
                    githubUrl: uploadResult.content.html_url
                });
                
                console.log(`✅ Uploaded ${file.name}:`, uploadResult.content.html_url);
            }
        }
        
        // Step 2: Upload assignment metadata JSON
        showNotification(' Uploading assignment data...');
        
        const metadata = {
            title: assignment.title,
            description: assignment.description,
            submitter: assignment.submitter,
            deadline: assignment.deadline,
            submissionLink: assignment.submissionLink,
            submittedAt: assignment.submittedAt,
            teacherEvaluation: assignment.teacherEvaluation,
            status: assignment.status,
            files: fileUrls.length > 0 ? fileUrls : (assignment.files ? assignment.files.map(f => ({ name: f.name, type: f.type, size: f.size })) : [])
        };
        
        const encodedContent = btoa(unescape(encodeURIComponent(JSON.stringify(metadata, null, 2))));
        const filePath = `assignments/${assignment.id}.json`;
        const apiUrl = `https://api.github.com/repos/${config.username}/${config.repo}/contents/${filePath}`;
        
        // Get sha if file exists
        let sha = null;
        try {
            const getResponse = await fetch(apiUrl, {
                headers: { 'Authorization': `token ${config.token}` }
            });
            if (getResponse.ok) {
                const existingFile = await getResponse.json();
                sha = existingFile.sha;
            }
        } catch (e) {
            // File doesn't exist yet
        }
        
        // Upload metadata
        const requestBody = {
            message: `Sync assignment: ${assignment.title}`,
            content: encodedContent,
            branch: config.branch || 'main'
        };
        
        if (sha) {
            requestBody.sha = sha;
        }
        
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${config.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        const responseData = await response.json();
        
        if (response.ok) {
            console.log('✅ GitHub sync successful');
            console.log('📁 Uploaded files:', fileUrls.length);
            console.log('📄 Metadata URL:', responseData.content?.html_url);
            
            // Update sync status in localStorage
            const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
            const updatedAssignment = assignments.find(a => a.id === assignment.id);
            if (updatedAssignment) {
                updatedAssignment.githubSynced = true;
                updatedAssignment.githubSyncedAt = new Date().toISOString();
                localStorage.setItem('assignments', JSON.stringify(assignments));
            }
            
            showNotification(`✅ Synced to GitHub! (${fileUrls.length} files uploaded)`);
            return true;
        } else {
            console.error('❌ GitHub sync failed:', response.status, responseData);
            
            let errorMessage = 'GitHub sync failed: ';
            if (responseData.message) {
                errorMessage += responseData.message;
            }
            if (responseData.errors && responseData.errors.length > 0) {
                errorMessage += ' - ' + responseData.errors[0].message;
            }
            
            showNotification(errorMessage, 'error');
            return false;
        }
    } catch (error) {
        console.error('❌ GitHub sync error:', error);
        showNotification('❌ Connection error: ' + error.message, 'error');
        return false;
    }
}

// ==================== Project Management ====================

// Open add project modal
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
                <p style="font-size: 15px;">Projects will appear here when added</p>
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



// Load and render PDF using PDF.js
function loadPDFViewer(pdfUrl, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Load PDF.js from CDN
    if (typeof pdfjsLib === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => {
            // Set worker source
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            renderPDF(pdfUrl, container);
        };
        document.head.appendChild(script);
    } else {
        renderPDF(pdfUrl, container);
    }
}

// Render PDF pages
async function renderPDF(pdfUrl, container) {
    try {
        // Show loading message
        container.innerHTML = '<div style="padding: 40px; text-align: center; color: #666;"><p>📄 Loading PDF...</p></div>';
        
        // Load the PDF
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        
        // Clear container
        container.innerHTML = '';
        
        // Render all pages
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            
            // Create canvas for this page
            const canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.maxWidth = '900px';
            canvas.style.margin = '20px auto';
            canvas.style.display = 'block';
            canvas.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            canvas.style.borderRadius = '4px';
            
            container.appendChild(canvas);
            
            // Set scale for good quality
            const viewport = page.getViewport({ scale: 2.0 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            // Render page
            const renderContext = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            };
            await page.render(renderContext).promise;
            
            // Add page number
            const pageNumDiv = document.createElement('div');
            pageNumDiv.textContent = `Page ${pageNum} of ${pdf.numPages}`;
            pageNumDiv.style.textAlign = 'center';
            pageNumDiv.style.color = '#666';
            pageNumDiv.style.fontSize = '14px';
            pageNumDiv.style.marginBottom = '20px';
            container.appendChild(pageNumDiv);
        }
        
        console.log(`✅ PDF loaded successfully: ${pdf.numPages} pages`);
    } catch (error) {
        console.error('Error loading PDF:', error);
        container.innerHTML = `
            <div style="padding: 40px; text-align: center; color: #dc3545;">
                <p style="font-size: 16px; margin-bottom: 10px;">❌ Failed to load PDF</p>
                <p style="font-size: 14px;">${error.message}</p>
                <p style="font-size: 14px; margin-top: 15px;">Please download the file to view it locally.</p>
            </div>
        `;
    }
}

// Open file preview modal
function openFilePreview(url, type, name) {
    document.getElementById('previewFileName').textContent = name;
    const container = document.getElementById('previewContainer');
    
    if (type.startsWith('image/')) {
        container.innerHTML = `<img src="${url}" alt="${name}" class="preview-image">`;
    } else if (type.startsWith('video/')) {
        container.innerHTML = `
            <video src="${url}" controls class="preview-video">
                Your browser does not support the video tag.
            </video>
        `;
    } else if (name.toLowerCase().endsWith('.pdf')) {
        // For PDF files, use browser's native embed for maximum compatibility
        container.innerHTML = `
            <div class="pdf-viewer-container" style="width: 100%; background: #f5f5f7; border-radius: 8px; padding: 20px;">
                <!-- Native PDF Viewer -->
                <embed src="${url}" type="application/pdf" width="100%" height="800px" 
                       style="border: none; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); background: white;" />
                
                <!-- Fallback and Download Options -->
                <div style="text-align: center; margin-top: 15px; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <p style="margin-bottom: 10px; color: #666; font-size: 14px;">💡 If the PDF doesn't display above, use the options below:</p>
                    <a href="${url}" download="${name}" class="btn btn-primary" style="display: inline-block; padding: 10px 20px; background: #0071e3; color: white; text-decoration: none; border-radius: 980px; font-weight: 600; margin: 5px;">
                        📥 Download PDF
                    </a>
                    <button onclick="window.open('${url}', '_blank')" class="btn btn-secondary" style="display: inline-block; padding: 10px 20px; background: #86868b; color: white; border: none; border-radius: 980px; font-weight: 600; margin: 5px; cursor: pointer;">
                        🔗 Open in New Tab
                    </button>
                </div>
            </div>
        `;
    } else if (name.toLowerCase().endsWith('.docx') || name.toLowerCase().endsWith('.doc')) {
        // For Word documents, use Google Docs Viewer for better compatibility with images and formatting
        // Google Docs Viewer supports more features than Microsoft Office Online Viewer
        const encodedUrl = encodeURIComponent(url);
        container.innerHTML = `
            <div class="doc-preview-container" style="width: 100%; height: 600px;">
                <iframe src="https://docs.google.com/gview?url=${encodedUrl}&embedded=true" 
                        width="100%" height="100%" frameborder="0"
                        style="border: none; border-radius: 8px;">
                </iframe>
                <div style="text-align: center; margin-top: 15px; padding: 10px; background: #f5f5f7; border-radius: 8px;">
                    <p style="margin-bottom: 10px; color: #666;">💡 Tip: If the preview doesn't load properly, you can download the file to view it locally with full formatting.</p>
                    <a href="${url}" download="${name}" class="btn btn-primary" style="display: inline-block; padding: 10px 20px; background: #0071e3; color: white; text-decoration: none; border-radius: 980px; font-weight: 600;">
                        📥 Download Original Document
                    </a>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Preview not available for this file type. Please download to view.</p>';
    }
    
    openModal('filePreviewModal');
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
        // Auto-create Exercise 1 assignment FIRST (to clean up old data)
        autoCreateExercise1();
        
        // Then load and display assignments
        loadAssignments();
        populateSubmitterOptions();
    }
    
    // Load projects on final-project page
    if (window.location.pathname.includes('final-project.html') || window.location.pathname.endsWith('final-project.html')) {
        loadProjects();
    }
    
    // Update stats on homepage
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        // Pre-load assignments data before updating stats
        autoCreateExercise1();
        updateHomepageStats();
    }
    
    console.log('Team Space loaded successfully!');
});

// Update homepage statistics
function updateHomepageStats() {
    const members = JSON.parse(localStorage.getItem('teamMembers') || '{}');
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Count active assignments (not completed)
    // Always count Exercise 1 (exercise1-edit.html) as 1 active assignment
    let activeAssignments = assignments.filter(a => a.status !== 'completed').length;
    
    // If no assignments in localStorage, still count Exercise 1 as active
    if (activeAssignments === 0) {
        activeAssignments = 1; // exercise1-edit.html exists and is active
    }
    
    const statMembers = document.getElementById('statMembers');
    const statAssignments = document.getElementById('statAssignments');
    const statProjects = document.getElementById('statProjects');
    
    if (statMembers) statMembers.textContent = Object.keys(members).length;
    if (statAssignments) statAssignments.textContent = activeAssignments;
    if (statProjects) statProjects.textContent = projects.length;
}



// Auto-create Exercise 1 assignment (DISABLED - no longer creates any assignments)
// This function is disabled to prevent creating any assignments in localStorage
function autoCreateExercise1() {
    // Function disabled - do not create any assignments
    console.log('️ autoCreateExercise1 is disabled - no assignments will be created');
    return;
}
