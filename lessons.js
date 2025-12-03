// Lessons Page JavaScript - Toggle lesson content

// Toggle a specific lesson
function toggleLesson(lessonId) {
    const lessonContent = document.getElementById(lessonId);
    const lessonCard = lessonContent.closest('.lesson-card');
    
    // Toggle the open class on the content
    lessonContent.classList.toggle('open');
    
    // Toggle the open class on the card (for icon rotation)
    lessonCard.classList.toggle('open');
}

// Close all lessons
function closeAllLessons() {
    const allContents = document.querySelectorAll('.lesson-content');
    const allCards = document.querySelectorAll('.lesson-card');
    
    allContents.forEach(content => {
        content.classList.remove('open');
    });
    
    allCards.forEach(card => {
        card.classList.remove('open');
    });
}

// Open all lessons
function openAllLessons() {
    const allContents = document.querySelectorAll('.lesson-content');
    const allCards = document.querySelectorAll('.lesson-card:not(.upcoming)');
    
    allContents.forEach(content => {
        content.classList.add('open');
    });
    
    allCards.forEach(card => {
        card.classList.add('open');
    });
}

// Save lesson state to localStorage
function saveLessonState() {
    const openLessons = [];
    document.querySelectorAll('.lesson-content.open').forEach(content => {
        openLessons.push(content.id);
    });
    localStorage.setItem('openLessons', JSON.stringify(openLessons));
}

// Load lesson state from localStorage
function loadLessonState() {
    const saved = localStorage.getItem('openLessons');
    if (saved) {
        const openLessons = JSON.parse(saved);
        openLessons.forEach(lessonId => {
            const lessonContent = document.getElementById(lessonId);
            if (lessonContent) {
                lessonContent.classList.add('open');
                lessonContent.closest('.lesson-card').classList.add('open');
            }
        });
    }
}

// Initialize page
function initializePage() {
    // Load saved state
    loadLessonState();
    
    // Save state when lessons are toggled
    document.querySelectorAll('.lesson-header').forEach(header => {
        header.addEventListener('click', () => {
            // Small delay to ensure state is updated
            setTimeout(saveLessonState, 100);
        });
    });
    
    // Keyboard accessibility
    document.querySelectorAll('.lesson-header').forEach(header => {
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
                
                // Update aria-expanded
                const isOpen = header.closest('.lesson-card').classList.contains('open');
                header.setAttribute('aria-expanded', isOpen);
            }
        });
    });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}