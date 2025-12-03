// Noticeboard JavaScript - Store and display feedback posts

// Get current time string
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleString('en-AU', { 
        month: 'short',
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    });
}

// Get all notices from localStorage
function getNotices() {
    const stored = localStorage.getItem('noticeboardPosts');
    return stored ? JSON.parse(stored) : [];
}

// Save notices to localStorage
function saveNotices(notices) {
    localStorage.setItem('noticeboardPosts', JSON.stringify(notices));
}

// Add a new notice
function addNotice(name, type, message) {
    const notices = getNotices();
    const newNotice = {
        id: Date.now(),
        name: name.trim() || 'Anonymous Quokka',
        type: type,
        message: message.trim(),
        time: getCurrentTime()
    };
    
    // Add to beginning of array (newest first)
    notices.unshift(newNotice);
    
    // Keep only last 50 posts to avoid localStorage limits
    if (notices.length > 50) {
        notices.pop();
    }
    
    saveNotices(notices);
    return newNotice;
}

// Delete a notice
function deleteNotice(noticeId) {
    const notices = getNotices();
    const filtered = notices.filter(notice => notice.id !== noticeId);
    saveNotices(filtered);
}

// Clear all notices
function clearAllNotices() {
    if (confirm('Are you sure you want to clear all posts? This cannot be undone.')) {
        saveNotices([]);
        renderNoticeboard();
    }
}

// Get type emoji
function getTypeEmoji(type) {
    const emojis = {
        'feedback': '💡',
        'question': '❓',
        'shoutout': '🎉',
        'general': '💬'
    };
    return emojis[type] || '💬';
}

// Get type label
function getTypeLabel(type) {
    const labels = {
        'feedback': 'Feedback/Suggestion',
        'question': 'Question',
        'shoutout': 'Shout-out',
        'general': 'General'
    };
    return labels[type] || 'General';
}

// Render the noticeboard
function renderNoticeboard() {
    const notices = getNotices();
    const noticeboardContent = document.getElementById('noticeboardContent');
    
    if (notices.length === 0) {
        noticeboardContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📌</div>
                <p>No posts yet! Be the first to share something with the squad.</p>
            </div>
        `;
        return;
    }
    
    const noticesHTML = notices.map(notice => `
        <div class="notice-post ${notice.type}">
            <div class="notice-header">
                <div class="notice-meta">
                    <span class="notice-type ${notice.type}">${getTypeEmoji(notice.type)} ${getTypeLabel(notice.type)}</span>
                    <div class="notice-author">${escapeHtml(notice.name)}</div>
                    <div class="notice-time">${notice.time}</div>
                </div>
                <div class="notice-actions">
                    <button class="btn-delete-notice" onclick="handleDeleteNotice(${notice.id})" title="Delete post">
                        🗑️
                    </button>
                </div>
            </div>
            <div class="notice-content">${escapeHtml(notice.message)}</div>
        </div>
    `).join('');
    
    noticeboardContent.innerHTML = `<div class="notices-container">${noticesHTML}</div>`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('studentName').value;
    const type = document.getElementById('feedbackType').value;
    const message = document.getElementById('feedbackText').value;
    const messageDiv = document.getElementById('submitMessage');
    
    // Validation
    if (!type) {
        showMessage('Please select a type!', 'error');
        return;
    }
    
    if (!message.trim()) {
        showMessage('Please enter a message!', 'error');
        return;
    }
    
    if (message.trim().length < 5) {
        showMessage('Message is too short! Please write at least 5 characters.', 'error');
        return;
    }
    
    // Add notice
    const newNotice = addNotice(name, type, message);
    
    // Show success message
    showMessage('✅ Posted to noticeboard successfully!', 'success');
    
    // Clear form
    document.getElementById('feedbackForm').reset();
    
    // Update display
    renderNoticeboard();
    
    // Scroll to noticeboard
    document.querySelector('.noticeboard-display').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Hide message after 3 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.getElementById('submitMessage');
    messageDiv.textContent = message;
    messageDiv.className = `submit-message ${type}`;
    messageDiv.style.display = 'block';
}

// Handle delete notice
function handleDeleteNotice(noticeId) {
    if (confirm('Delete this post?')) {
        deleteNotice(noticeId);
        renderNoticeboard();
    }
}

// Initialize page
function initializePage() {
    // Render noticeboard
    renderNoticeboard();
    
    // Set up event listeners
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFormSubmit);
    }
    
    const clearAllBtn = document.getElementById('clearAllBtn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAllNotices);
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}