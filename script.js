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
    console.log('🔧 Initializing default members...');
    
    // FORCE RESET: Always clear existing data and reload defaults
    console.log('🔄 Force resetting all member data to defaults...');
    localStorage.removeItem('teamMembers');
    
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
        }
    };
    
    localStorage.setItem('teamMembers', JSON.stringify(defaultMembers));
    console.log('✅ Successfully initialized 1 team member: Wang Chengle');
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
                <button class="edit-member-btn" onclick="event.stopPropagation(); openEditMemberModal(${id})">✏️ Edit</button>
                <div class="member-avatar">
                    ${avatarDisplay}
                </div>
                <div class="member-info" onclick="window.location.href='wang-chengle.html'">
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-role">${member.role}</p>
                    ${skillsPreview}
                    <p class="member-bio">${member.bio || 'Click to view profile →'}</p>
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
    
    if (assignments.length === 0) {
        assignmentsList.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                <div style="font-size: 64px; margin-bottom: 20px;">📝</div>
                <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: var(--text-primary);">No assignments yet</h3>
                <p style="font-size: 15px;">Assignments will appear here when added</p>
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
        loadAssignments();
        populateSubmitterOptions();
        
        // Auto-create Exercise 1 assignment
        autoCreateExercise1();
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

// Quick add Exercise 1 with Project Management document
async function quickAddExercise1() {
    // Check if file input exists
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.docx,.doc';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            showNotification('📄 Processing Project Management document...');
            
            // Convert file to base64
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fileData = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: event.target.result
                };
                
                // Create assignment
                const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
                const exercise1 = {
                    id: Date.now(),
                    title: 'Exercise 1: Project Management',
                    description: `We have created a webpage for storing daily and final assignments.

**Website Development Guide**

Prepare tool for website:
- Github: Our website will be placed here.
- GitHub Desktop: Used for cloning libraries and uploading local files.
- AI agent (TONGYI Lingma): Used to write website code.

**Step one:** Create a new repository on GitHub to host your website.

Create a public repository where you can collaborate with your team to create web content.

Name your repository, choose whether it's public or private. Add a README file to share your information, then click the "create repository" button.

Set the page to be empty. Click on the settings of the repository and select "Pages" on the left. Choose "main" and "/root" and save. The link above allows you to view the page.

Wait for Github to search and create pages, and once all projects are completed, the website will be initially established.

**Step two:** Clone the repository to GitHub.

Click on "Add", "Clone a resource", find the repository you want to clone. Finally, click "Clone".

**Step three:** Design website with your team in AI agent

Use AI agents to design the functions and layout of web pages.

**Step four:** Upload them to Github.

Upload directly to the corresponding GitHub account via Lingma.`,
                    deadline: new Date().toISOString().split('T')[0],
                    submitter: 'All Members',
                    status: 'submitted',
                    createdAt: new Date().toISOString(),
                    submittedAt: new Date().toISOString(),
                    files: [fileData]
                };
                
                assignments.push(exercise1);
                localStorage.setItem('assignments', JSON.stringify(assignments));
                
                showNotification('✅ Exercise 1 created successfully!');
                
                // Reload if on assignments page
                if (window.location.pathname.includes('assignments.html')) {
                    loadAssignments();
                }
                
                // Try to sync to GitHub
                uploadToGithub(exercise1);
                
                // Clean up
                document.body.removeChild(fileInput);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error:', error);
            showNotification('❌ Failed to process file: ' + error.message, 'error');
            document.body.removeChild(fileInput);
        }
    };
    
    fileInput.click();
}

// Auto-create Exercise 1 assignment with embedded document
function autoCreateExercise1() {
    // Check if Exercise 1 already exists
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const existingIndex = assignments.findIndex(a => a.title === 'Exercise 1: Project Management');
    
    if (existingIndex !== -1) {
        const existing = assignments[existingIndex];
        // Check if it has the original PDF or DOCX file
        if (existing.files && existing.files.length > 0) {
            const hasOriginalFile = existing.files.some(f => 
                f.name.toLowerCase().endsWith('.pdf') ||
                f.name.toLowerCase().endsWith('.docx') || 
                f.name.toLowerCase().endsWith('.doc')
            );
            if (hasOriginalFile) {
                console.log('✅ Exercise 1 already has original document, skipping');
                return;
            } else {
                // Has old file (e.g., .txt), remove it and prompt for new upload
                console.log('⚠️ Exercise 1 has old file format, removing and prompting for PDF upload');
                assignments.splice(existingIndex, 1);
                localStorage.setItem('assignments', JSON.stringify(assignments));
            }
        }
    }
    
    // Create file input to upload the actual document (PDF recommended)
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.docx,.doc';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    
    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            document.body.removeChild(fileInput);
            return;
        }
        
        try {
            showNotification('📄 Processing Project Management document...');
            
            // Convert file to base64
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fileData = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: event.target.result
                };
                
                const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
                const existingIndex = assignments.findIndex(a => a.title === 'Exercise 1: Project Management');
                
                if (existingIndex !== -1) {
                    // Update existing assignment with the uploaded file
                    assignments[existingIndex].files = [fileData];
                    assignments[existingIndex].submittedAt = new Date().toISOString();
                    localStorage.setItem('assignments', JSON.stringify(assignments));
                    showNotification('✅ Exercise 1 updated with original document!');
                } else {
                    // Create new assignment
                    const exercise1 = {
                        id: Date.now(),
                        title: 'Exercise 1: Project Management',
                        description: `We have created a webpage for storing daily and final assignments.

**Website Development Guide**

Prepare tool for website:
- Github: Our website will be placed here.
- GitHub Desktop: Used for cloning libraries and uploading local files.
- AI agent (TONGYI Lingma): Used to write website code.

**Step one:** Create a new repository on GitHub to host your website.

Create a public repository where you can collaborate with your team to create web content.

Name your repository, choose whether it's public or private. Add a README file to share your information, then click the "create repository" button.

Set the page to be empty. Click on the settings of the repository and select "Pages" on the left. Choose "main" and "/root" and save. The link above allows you to view the page.

Wait for Github to search and create pages, and once all projects are completed, the website will be initially established.

**Step two:** Clone the repository to GitHub.

Click on "Add", "Clone a resource", find the repository you want to clone. Finally, click "Clone".

**Step three:** Design website with your team in AI agent

Use AI agents to design the functions and layout of web pages.

**Step four:** Upload them to Github.

Upload directly to the corresponding GitHub account via Lingma.

---

**Attached File:** ${file.name} (Original document with full formatting, images, and highlights)

**View Full Document:** [📄 View Complete Document with All Formatting](exercise1-document.html)

**Viewing Instructions:**
1. Click "View Complete Document" above to see the full formatted version
2. Or click on the filename to preview in Google Docs Viewer
3. Use the download button to save and open in Microsoft Word for best experience`,
                        deadline: new Date().toISOString().split('T')[0],
                        submitter: 'All Members',
                        status: 'submitted',
                        createdAt: new Date().toISOString(),
                        submittedAt: new Date().toISOString(),
                        files: [fileData]
                    };
                    
                    assignments.push(exercise1);
                    localStorage.setItem('assignments', JSON.stringify(assignments));
                    showNotification('✅ Exercise 1 created with original document!');
                }
                
                // Reload if on assignments page
                if (window.location.pathname.includes('assignments.html')) {
                    loadAssignments();
                }
                
                // Try to sync to GitHub
                const assignment = assignments.find(a => a.title === 'Exercise 1: Project Management');
                if (assignment) {
                    uploadToGithub(assignment);
                }
                
                // Clean up
                document.body.removeChild(fileInput);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error:', error);
            showNotification('❌ Failed to process file: ' + error.message, 'error');
            document.body.removeChild(fileInput);
        }
    };
    
    fileInput.click();
}
