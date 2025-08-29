// Pomodoro overlay for all websites
let pomodoroOverlay = null;
let pomodoroState = null;

// Create overlay element
function createPomodoroOverlay() {
  if (pomodoroOverlay) return;

  pomodoroOverlay = document.createElement('div');
  pomodoroOverlay.id = 'zhuzh-pomodoro-overlay';
  pomodoroOverlay.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    z-index: 999999;
    border-radius: 50%;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    opacity: 0.7;
    pointer-events: auto;
    user-select: none;
    cursor: move;
  `;

  // Click and drag handlers
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };
  let dragStartTime = 0;

  pomodoroOverlay.addEventListener('mousedown', (e) => {
    dragStartTime = Date.now();
    isDragging = true;
    const rect = pomodoroOverlay.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    pomodoroOverlay.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;
    
    // Keep within viewport bounds
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    
    pomodoroOverlay.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
    pomodoroOverlay.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
    pomodoroOverlay.style.right = 'auto';
  });

  document.addEventListener('mouseup', (e) => {
    if (isDragging) {
      const dragDuration = Date.now() - dragStartTime;
      isDragging = false;
      pomodoroOverlay.style.cursor = 'move';
      
      // If it was a quick click (not a drag), open modal
      if (dragDuration < 200) {
        openPomodoroModal();
      } else {
        // Save position after drag
        const rect = pomodoroOverlay.getBoundingClientRect();
        localStorage.setItem('zhuzh-pomodoro-position', JSON.stringify({
          x: rect.left,
          y: rect.top
        }));
      }
    }
  });

  // Restore saved position
  const savedPosition = localStorage.getItem('zhuzh-pomodoro-position');
  if (savedPosition) {
    const pos = JSON.parse(savedPosition);
    pomodoroOverlay.style.left = pos.x + 'px';
    pomodoroOverlay.style.top = pos.y + 'px';
    pomodoroOverlay.style.right = 'auto';
  }

  document.body.appendChild(pomodoroOverlay);
}

// Update overlay display
function updateOverlay(state) {
  if (!pomodoroOverlay || !state) return;

  const { timeLeft, isRunning, isBreak } = state;
  
  if (!isRunning) {
    // Timer not running - hide overlay
    pomodoroOverlay.style.display = 'none';
    return;
  }

  pomodoroOverlay.style.display = 'flex';

  // Format time
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeText = `${mins}:${secs.toString().padStart(2, '0')}`;

  if (timeLeft <= 0) {
    // Timer complete - make prominent
    pomodoroOverlay.style.opacity = '1';
    pomodoroOverlay.style.animation = 'pulse 1s infinite';
    pomodoroOverlay.style.background = isBreak 
      ? 'rgba(34, 197, 94, 0.8)' 
      : 'rgba(59, 130, 246, 0.8)';
    pomodoroOverlay.innerHTML = isBreak ? '💪' : '☕';
    pomodoroOverlay.title = isBreak ? 'Break over! Click to continue' : 'Time for a break! Click to start';
  } else {
    // Timer running - subtle display
    pomodoroOverlay.style.opacity = '0.7';
    pomodoroOverlay.style.animation = 'none';
    pomodoroOverlay.style.background = 'rgba(0, 0, 0, 0.1)';
    pomodoroOverlay.innerHTML = timeText;
    pomodoroOverlay.title = isBreak ? 'Break time remaining' : 'Focus time remaining';
  }
}

// Listen for state updates
chrome.storage.onChanged.addListener((changes) => {
  if (changes.pomodoroState) {
    pomodoroState = changes.pomodoroState.newValue;
    updateOverlay(pomodoroState);
    
    // Update modal if open
    const modal = document.getElementById('zhuzh-pomodoro-modal');
    if (modal) {
      const content = modal.querySelector('div');
      updateModalContent(content);
    }
  }
});

// Initialize - always create overlay if timer exists
chrome.storage.local.get(['pomodoroState']).then((result) => {
  if (result.pomodoroState) {
    pomodoroState = result.pomodoroState;
    createPomodoroOverlay();
    updateOverlay(pomodoroState);
  }
});

// Also show on Zhuzh new tab pages
if (window.location.href.includes('chrome-extension://')) {
  chrome.storage.local.get(['pomodoroState']).then((result) => {
    if (result.pomodoroState && result.pomodoroState.isRunning) {
      pomodoroState = result.pomodoroState;
      createPomodoroOverlay();
      updateOverlay(pomodoroState);
    }
  });
}

// Open pomodoro modal
function openPomodoroModal() {
  // Remove existing modal if any
  const existingModal = document.getElementById('zhuzh-pomodoro-modal');
  if (existingModal) {
    existingModal.remove();
    return;
  }

  // Create modal
  const modal = document.createElement('div');
  modal.id = 'zhuzh-pomodoro-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000000;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  // Create modal content
  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 10px 20px;
    width: 350px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    position: relative;
  `;

  // Close modal when clicking backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  // Build modal content
  updateModalContent(content);
  modal.appendChild(content);
  document.body.appendChild(modal);
}

// Update modal content
function updateModalContent(content) {
  if (!pomodoroState) return;

  const { timeLeft, isRunning, isBreak, sessions } = pomodoroState;
  const workTime = 25 * 60; // Default, will be updated from storage
  const breakTime = 5 * 60;
  
  const progress = ((isBreak ? breakTime : workTime) - timeLeft) / (isBreak ? breakTime : workTime) * 100;
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  content.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
      <div style="display: flex; align-items: center;">
        <span style="margin-right: 8px;">⏱️</span>
        <h3 style="margin: 0; font-size: 14px; font-weight: 500; color: #111;">Pomodoro Timer</h3>
      </div>
      <button id="close-modal" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #666;">×</button>
    </div>

    <div style="text-align: center; margin-bottom: 24px;">
      <div style="position: relative; width: 128px; height: 128px; margin: 0 auto 16px;">
        <svg width="128" height="128" style="transform: rotate(-90deg);">
          <circle cx="64" cy="64" r="56" stroke="#e5e7eb" stroke-width="8" fill="none" />
          <circle cx="64" cy="64" r="56" stroke="${isBreak ? '#10b981' : '#3b82f6'}" stroke-width="8" fill="none" 
                  stroke-dasharray="${2 * Math.PI * 56}" 
                  stroke-dashoffset="${2 * Math.PI * 56 * (1 - progress / 100)}"
                  stroke-linecap="round" />
        </svg>
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
          <div style="font-size: 24px; font-family: monospace; color: #111;">
            ${formatTime(timeLeft)}
          </div>
        </div>
      </div>
      
      <div style="font-size: 18px; font-weight: 500; color: #111; margin-bottom: 8px;">
        ${isBreak ? '☕ Break Time' : '🍅 Focus Time'}
      </div>
      
      <div style="font-size: 14px; color: #666;">
        Sessions completed: ${sessions}
      </div>
    </div>

    <div style="display: flex; justify-content: center; gap: 12px;">
      <button id="toggle-timer" style="
        background: ${isBreak ? '#10b981' : '#3b82f6'};
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
      ">
        ${isRunning ? '⏸️ Pause' : '▶️ Start'}
      </button>
      
      <button id="reset-timer" style="
        background: white;
        color: #374151;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        padding: 8px 16px;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
      ">
        🔄 Reset
      </button>
    </div>

    <div style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 16px;">
      Timer persists across all browser tabs
    </div>
  `;

  // Add event listeners
  content.querySelector('#close-modal').addEventListener('click', () => {
    document.getElementById('zhuzh-pomodoro-modal').remove();
  });

  content.querySelector('#toggle-timer').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'togglePomodoro' });
  });

  content.querySelector('#reset-timer').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'resetPomodoro' });
  });
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;
document.head.appendChild(style);