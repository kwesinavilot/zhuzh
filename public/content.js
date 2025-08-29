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

  // Click handler
  // Make draggable
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };

  pomodoroOverlay.addEventListener('mousedown', (e) => {
    if (pomodoroState?.timeLeft <= 0) {
      // Acknowledge timer completion
      chrome.runtime.sendMessage({ action: 'acknowledgePomodoroComplete' });
      return;
    }
    
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

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      pomodoroOverlay.style.cursor = 'move';
      
      // Save position
      const rect = pomodoroOverlay.getBoundingClientRect();
      localStorage.setItem('zhuzh-pomodoro-position', JSON.stringify({
        x: rect.left,
        y: rect.top
      }));
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

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;
document.head.appendChild(style);