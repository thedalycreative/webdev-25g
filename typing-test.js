// Typing Test Scoreboard - Client-side JavaScript
// Data stored in localStorage with daily reset

// Get today's date string (YYYY-MM-DD)
function getTodayDateString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-AU', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Get current time string
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-AU', { 
        hour: '2-digit', 
        minute: '2-digit'
    });
}

// Initialize or get today's scores from localStorage
function getTodayScores() {
    const todayDate = getTodayDateString();
    const storedData = localStorage.getItem('typingScores');
    
    if (!storedData) {
        return { date: todayDate, scores: [] };
    }
    
    const data = JSON.parse(storedData);
    
    // Check if stored data is from today, if not, reset
    if (data.date !== todayDate) {
        return { date: todayDate, scores: [] };
    }
    
    return data;
}

// Save scores to localStorage
function saveScores(scoresData) {
    localStorage.setItem('typingScores', JSON.stringify(scoresData));
}

// Add a new score
function addScore(name, wpm, accuracy) {
    const scoresData = getTodayScores();
    const newScore = {
        id: Date.now(),
        name: name.trim(),
        wpm: parseInt(wpm),
        accuracy: parseInt(accuracy),
        time: getCurrentTime()
    };
    
    scoresData.scores.push(newScore);
    saveScores(scoresData);
    return newScore;
}

// Delete a score
function deleteScore(scoreId) {
    const scoresData = getTodayScores();
    scoresData.scores = scoresData.scores.filter(score => score.id !== scoreId);
    saveScores(scoresData);
}

// Clear all scores for today
function clearAllScores() {
    if (confirm('Are you sure you want to clear all scores for today? This cannot be undone.')) {
        const todayDate = getTodayDateString();
        saveScores({ date: todayDate, scores: [] });
        renderScoreboard();
        updateStatistics();
    }
}

// Sort scores by WPM (descending)
function sortScoresByWPM(scores) {
    return [...scores].sort((a, b) => b.wpm - a.wpm);
}

// Get rank medal emoji
function getRankMedal(rank) {
    switch(rank) {
        case 1: return '🥇';
        case 2: return '🥈';
        case 3: return '🥉';
        default: return rank;
    }
}

// Render the scoreboard
function renderScoreboard() {
    const scoresData = getTodayScores();
    const scoreboardContent = document.getElementById('scoreboardContent');
    
    if (scoresData.scores.length === 0) {
        scoreboardContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🦘</div>
                <p>No scores yet today! Be the first Quokka to submit your typing speed!</p>
            </div>
        `;
        return;
    }
    
    const sortedScores = sortScoresByWPM(scoresData.scores);
    
    let tableHTML = `
        <table class="scoreboard-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>WPM</th>
                    <th>Accuracy</th>
                    <th>Time</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
    `;
    
    sortedScores.forEach((score, index) => {
        const rank = index + 1;
        const medal = getRankMedal(rank);
        
        tableHTML += `
            <tr>
                <td class="rank-cell">
                    <span class="rank-medal">${medal}</span>
                </td>
                <td class="name-cell">${score.name}</td>
                <td class="wpm-cell">${score.wpm} WPM</td>
                <td class="accuracy-cell">${score.accuracy}%</td>
                <td class="time-cell">${score.time}</td>
                <td class="delete-cell">
                    <button class="btn-delete" onclick="handleDeleteScore(${score.id})" title="Delete score">
                        🗑️
                    </button>
                </td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    scoreboardContent.innerHTML = tableHTML;
}

// Update statistics
function updateStatistics() {
    const scoresData = getTodayScores();
    const scores = scoresData.scores;
    
    // Default values
    let topWPM = '-';
    let topAccuracy = '-';
    let avgWPM = '-';
    let totalScores = scores.length;
    
    if (scores.length > 0) {
        // Find highest WPM
        const maxWPM = Math.max(...scores.map(s => s.wpm));
        topWPM = maxWPM + ' WPM';
        
        // Find best accuracy
        const maxAccuracy = Math.max(...scores.map(s => s.accuracy));
        topAccuracy = maxAccuracy + '%';
        
        // Calculate average WPM
        const sumWPM = scores.reduce((sum, s) => sum + s.wpm, 0);
        const average = Math.round(sumWPM / scores.length);
        avgWPM = average + ' WPM';
    }
    
    // Update DOM
    document.getElementById('topWPM').textContent = topWPM;
    document.getElementById('topAccuracy').textContent = topAccuracy;
    document.getElementById('avgWPM').textContent = avgWPM;
    document.getElementById('totalScores').textContent = totalScores;
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('studentName').value;
    const wpm = document.getElementById('wpm').value;
    const accuracy = document.getElementById('accuracy').value;
    const messageDiv = document.getElementById('submitMessage');
    
    // Validation
    if (!name || !wpm || !accuracy) {
        showMessage('Please fill in all fields!', 'error');
        return;
    }
    
    if (wpm < 1 || wpm > 200) {
        showMessage('WPM must be between 1 and 200!', 'error');
        return;
    }
    
    if (accuracy < 1 || accuracy > 100) {
        showMessage('Accuracy must be between 1 and 100!', 'error');
        return;
    }
    
    // Add score
    const newScore = addScore(name, wpm, accuracy);
    
    // Show success message
    showMessage(`🎉 Score submitted successfully! ${name}: ${wpm} WPM at ${accuracy}% accuracy`, 'success');
    
    // Clear form
    document.getElementById('scoreForm').reset();
    
    // Update display
    renderScoreboard();
    updateStatistics();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.getElementById('submitMessage');
    messageDiv.textContent = message;
    messageDiv.className = `submit-message ${type}`;
    messageDiv.style.display = 'block';
}

// Handle delete score
function handleDeleteScore(scoreId) {
    if (confirm('Are you sure you want to delete this score?')) {
        deleteScore(scoreId);
        renderScoreboard();
        updateStatistics();
    }
}

// Refresh scoreboard
function refreshScoreboard() {
    renderScoreboard();
    updateStatistics();
    
    // Visual feedback
    const btn = document.getElementById('refreshBtn');
    const originalText = btn.textContent;
    btn.textContent = '✓ Refreshed!';
    btn.style.backgroundColor = 'var(--earth-tone)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
    }, 1500);
}

// Initialize page
function initializePage() {
    // Display current date
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = formatDate(getTodayDateString());
    }
    
    // Render scoreboard and statistics
    renderScoreboard();
    updateStatistics();
    
    // Set up event listeners
    const scoreForm = document.getElementById('scoreForm');
    if (scoreForm) {
        scoreForm.addEventListener('submit', handleFormSubmit);
    }
    
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshScoreboard);
    }
    
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllScores);
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// Auto-refresh every 30 seconds to catch new submissions if page is left open
setInterval(() => {
    renderScoreboard();
    updateStatistics();
}, 30000);