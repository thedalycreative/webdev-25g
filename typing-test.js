// Typing Test Scoreboard - Firebase Firestore Implementation
// Using Cloud Firestore for persistent, shared data

// ============================================================================
// CONFIGURATION & STATE
// ============================================================================
const config = {
  dbReady: false,
  db: null,
  todayDate: new Date().toISOString().split('T')[0],
  cachedScores: null
};

// Cache DOM elements
const dom = {};

// ============================================================================
// FIREBASE FIRESTORE INITIALIZATION
// ============================================================================
async function initFirestore() {
  try {
    if (!window.FIREBASE_CONFIG) {
      console.log('⚠️ No Firebase config - using localStorage');
      return false;
    }

    console.log('🔄 Initializing Firebase Firestore...');

    const [appModule, firestoreModule] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js')
    ]);

    const app = appModule.initializeApp(window.FIREBASE_CONFIG);
    config.db = firestoreModule.getFirestore(app);
    config.dbReady = true;

    console.log('✅ Firestore initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Firestore initialization failed:', error);
    return false;
  }
}

// ============================================================================
// REALTIME LISTENER
// ============================================================================


// ============================================================================
// DATA OPERATIONS
// ============================================================================
async function loadScores() {
  if (!config.dbReady) {
    config.cachedScores = storage.get().scores.sort((a, b) => b.wpm - a.wpm);
    render();
    return;
  }

  try {
    const { collection, query, where, orderBy, onSnapshot } = await import('https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js');

    const scoresRef = collection(config.db, 'typingScores');
    const q = query(
      scoresRef,
      where('date', '==', config.todayDate),
      orderBy('wpm', 'desc')
    );

    // Real-time listener
    onSnapshot(q, (snapshot) => {
      const scores = [];
      snapshot.forEach((doc) => {
        scores.push({ id: doc.id, ...doc.data() });
      });
      config.cachedScores = scores;
      render();
    }, (error) => {
      console.error('❌ Error loading scores:', error);

      const container = dom.scoreboardContent;
      if (container) {
        container.innerHTML = `
          <div class="empty-state error-state">
            <div class="empty-state-icon">⚠️</div>
            <p>Unable to load scores.</p>
            <p class="error-detail">Please check the console for details.</p>
          </div>
        `;
      }
    });
  } catch (error) {
    console.error('❌ Error setting up listener:', error);
  }
}

async function addScore(name, wpm, accuracy) {
  const time = new Date().toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit'
  });

  if (config.dbReady) {
    try {
      const { collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js');

      await addDoc(collection(config.db, 'typingScores'), {
        name: name.trim(),
        wpm: parseInt(wpm),
        accuracy: parseInt(accuracy),
        date: config.todayDate,
        time: time,
        createdAt: serverTimestamp()
      });

      // Real-time listener will auto-update
    } catch (error) {
      console.error('❌ Error adding score:', error);
      throw error;
    }
  } else {
    // localStorage fallback
    const data = storage.get();
    const newScore = {
      id: Date.now(),
      name: name.trim(),
      wpm: parseInt(wpm),
      accuracy: parseInt(accuracy),
      time: time,
      date: config.todayDate,
      createdAt: Date.now()
    };
    data.scores.push(newScore);
    storage.set(data.scores);
    config.cachedScores = data.scores.sort((a, b) => b.wpm - a.wpm);
    render();
  }
}

async function deleteScore(scoreId) {
  if (config.dbReady) {
    try {
      const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js');

      await deleteDoc(doc(config.db, 'typingScores', scoreId));

      // Real-time listener will auto-update
    } catch (error) {
      console.error('❌ Error deleting score:', error);
      throw error;
    }
  } else {
    const data = storage.get();
    data.scores = data.scores.filter(s => s.id !== scoreId);
    storage.set(data.scores);
    config.cachedScores = data.scores.sort((a, b) => b.wpm - a.wpm);
    render();
  }
}

async function clearAllScores() {
  if (!confirm('Clear all today\'s scores? This cannot be undone.')) return;

  if (config.dbReady) {
    try {
      const { collection, query, where, getDocs, deleteDoc } = await import('https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js');

      const scoresRef = collection(config.db, 'typingScores');
      const q = query(scoresRef, where('date', '==', config.todayDate));
      const snapshot = await getDocs(q);

      await Promise.all(snapshot.docs.map(doc => deleteDoc(doc.ref)));

      showMessage('✅ All scores cleared successfully!', 'success');
      // Real-time listener will auto-update
    } catch (error) {
      console.error('❌ Error clearing scores:', error);
      showMessage('❌ Error clearing scores. Please try again.', 'error');
    }
  } else {
    storage.set([]);
    config.cachedScores = [];
    render();
    showMessage('✅ All scores cleared!', 'success');
  }
}

// ============================================================================
// LOCALSTORAGE FALLBACK
// ============================================================================
const storage = {
  get() {
    const stored = localStorage.getItem('typingScores');
    if (!stored) return { date: config.todayDate, scores: [] };

    const data = JSON.parse(stored);
    return data.date === config.todayDate ? data : { date: config.todayDate, scores: [] };
  },

  set(scores) {
    localStorage.setItem('typingScores', JSON.stringify({
      date: config.todayDate,
      scores
    }));
  }
};

// ============================================================================
// RENDERING
// ============================================================================
function render() {
  renderScoreboard();
  renderStatistics();
}

function renderScoreboard() {
  const scores = config.cachedScores || [];
  const container = dom.scoreboardContent;
  if (!container) return;

  if (scores.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🦘</div>
        <p>No scores yet today! Be the first Quokka to submit your typing speed!</p>
      </div>
    `;
    return;
  }

  const rows = scores.map((score, i) => {
    const medal = ['🥇', '🥈', '🥉'][i] || (i + 1);
    return `
      <tr>
        <td class="rank-cell"><span class="rank-medal">${medal}</span></td>
        <td class="name-cell">${score.name}</td>
        <td class="wpm-cell">${score.wpm} WPM</td>
        <td class="accuracy-cell">${score.accuracy}%</td>
        <td class="time-cell">${score.time || ''}</td>
        <td class="delete-cell">
          <button class="btn-delete" data-score-id="${score.id}" title="Delete score">🗑️</button>
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
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
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderStatistics() {
  const scores = config.cachedScores || [];

  if (scores.length === 0) {
    dom.topWPM.textContent = '-';
    dom.topAccuracy.textContent = '-';
    dom.avgWPM.textContent = '-';
    dom.totalScores.textContent = '0';
    return;
  }

  let maxWPM = 0, maxAcc = 0, sumWPM = 0;

  for (const score of scores) {
    if (score.wpm > maxWPM) maxWPM = score.wpm;
    if (score.accuracy > maxAcc) maxAcc = score.accuracy;
    sumWPM += score.wpm;
  }

  dom.topWPM.textContent = `${maxWPM} WPM`;
  dom.topAccuracy.textContent = `${maxAcc}%`;
  dom.avgWPM.textContent = `${Math.round(sumWPM / scores.length)} WPM`;
  dom.totalScores.textContent = scores.length.toString();
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================
async function handleSubmit(e) {
  e.preventDefault();

  const name = dom.studentName.value.trim();
  const wpm = parseInt(dom.wpm.value);
  const accuracy = parseInt(dom.accuracy.value);

  if (!name || !wpm || !accuracy) {
    return showMessage('Please fill in all fields!', 'error');
  }
  if (wpm < 1 || wpm > 200) {
    return showMessage('WPM must be between 1 and 200!', 'error');
  }
  if (accuracy < 1 || accuracy > 100) {
    return showMessage('Accuracy must be between 1 and 100!', 'error');
  }

  try {
    await addScore(name, wpm, accuracy);
    showMessage(`🎉 Score submitted! ${name}: ${wpm} WPM at ${accuracy}%`, 'success');
    dom.scoreForm.reset();
    setTimeout(() => dom.submitMessage.style.display = 'none', 5000);
  } catch (error) {
    console.error('Submit error:', error);
    showMessage('❌ Error submitting score. Please try again.', 'error');
  }
}

async function handleRefresh() {
  await loadScores();

  const btn = dom.refreshBtn;
  const original = btn.textContent;
  btn.textContent = '✓ Refreshed!';
  btn.style.backgroundColor = 'var(--earth-tone)';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.backgroundColor = '';
  }, 1500);
}

function handleDelete(e) {
  const btn = e.target.closest('.btn-delete');
  if (!btn) return;

  const scoreId = btn.dataset.scoreId;
  if (confirm('Delete this score?')) {
    deleteScore(scoreId);
  }
}

function showMessage(message, type) {
  dom.submitMessage.textContent = message;
  dom.submitMessage.className = `submit-message ${type}`;
  dom.submitMessage.style.display = 'block';
}

// ============================================================================
// INITIALIZATION
// ============================================================================
async function init() {
  // Cache DOM elements
  Object.assign(dom, {
    currentDate: document.getElementById('currentDate'),
    scoreForm: document.getElementById('scoreForm'),
    studentName: document.getElementById('studentName'),
    wpm: document.getElementById('wpm'),
    accuracy: document.getElementById('accuracy'),
    submitMessage: document.getElementById('submitMessage'),
    scoreboardContent: document.getElementById('scoreboardContent'),
    refreshBtn: document.getElementById('refreshBtn'),
    clearBtn: document.getElementById('clearBtn'),
    topWPM: document.getElementById('topWPM'),
    topAccuracy: document.getElementById('topAccuracy'),
    avgWPM: document.getElementById('avgWPM'),
    totalScores: document.getElementById('totalScores')
  });

  // Set current date
  if (dom.currentDate) {
    const date = new Date(config.todayDate + 'T00:00:00');
    dom.currentDate.textContent = date.toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Initialize Firestore
  const fsReady = await initFirestore();

  // Load scores (or localStorage fallback)
  if (fsReady) {
    await loadScores();
  } else {
    console.log('📱 Using localStorage - scores are local only');
    config.cachedScores = storage.get().scores.sort((a, b) => b.wpm - a.wpm);
    render();
  }

  // Event listeners
  dom.scoreForm?.addEventListener('submit', handleSubmit);
  dom.refreshBtn?.addEventListener('click', handleRefresh);
  dom.clearBtn?.addEventListener('click', clearAllScores);
  dom.scoreboardContent?.addEventListener('click', handleDelete);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
