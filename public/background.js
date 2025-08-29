chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: 'welcome.html' });
  }
});

// Pomodoro background timer
let pomodoroInterval = null;

// Handle messages from content script
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'acknowledgePomodoroComplete') {
    handlePomodoroAcknowledge();
  } else if (message.action === 'togglePomodoro') {
    await handleTogglePomodoro();
  } else if (message.action === 'resetPomodoro') {
    await handleResetPomodoro();
  }
});

// Start background timer sync
chrome.storage.onChanged.addListener((changes) => {
  if (changes.pomodoroState) {
    const state = changes.pomodoroState.newValue;
    if (state?.isRunning && !pomodoroInterval) {
      startBackgroundTimer();
    } else if (!state?.isRunning && pomodoroInterval) {
      stopBackgroundTimer();
    }
  }
});

function startBackgroundTimer() {
  if (pomodoroInterval) return;
  
  pomodoroInterval = setInterval(async () => {
    const result = await chrome.storage.local.get(['pomodoroState']);
    const state = result.pomodoroState;
    
    if (state && state.isRunning && state.timeLeft > 0) {
      const newTimeLeft = state.timeLeft - 1;
      
      if (newTimeLeft <= 0) {
        // Timer complete
        // Get settings for proper timer values
        const settingsResult = await chrome.storage.local.get(['pomodoroSettings']);
        const settings = settingsResult.pomodoroSettings || { workTime: 25 * 60, breakTime: 5 * 60 };
        
        const newState = {
          ...state,
          timeLeft: state.isBreak ? settings.workTime : settings.breakTime,
          isRunning: false,
          isBreak: !state.isBreak,
          sessions: state.isBreak ? state.sessions : state.sessions + 1
        };
        
        await chrome.storage.local.set({ pomodoroState: newState });
        
        // Show notification
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'logo-white.png',
          title: state.isBreak ? 'Break Over! 💪' : 'Pomodoro Complete! 🍅',
          message: state.isBreak ? 'Time to get back to work!' : 'Time for a 5-minute break!'
        });
      } else {
        // Update time
        await chrome.storage.local.set({
          pomodoroState: { ...state, timeLeft: newTimeLeft }
        });
      }
    } else {
      stopBackgroundTimer();
    }
  }, 1000);
}

function stopBackgroundTimer() {
  if (pomodoroInterval) {
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
  }
}

function handlePomodoroAcknowledge() {
  // User acknowledged timer completion - can add logic here
  console.log('Pomodoro acknowledged');
}

async function handleTogglePomodoro() {
  const result = await chrome.storage.local.get(['pomodoroState', 'pomodoroSettings']);
  const state = result.pomodoroState || {};
  const settings = result.pomodoroSettings || { workTime: 25 * 60, breakTime: 5 * 60 };
  
  const newState = {
    ...state,
    isRunning: !state.isRunning,
    timeLeft: state.timeLeft || (state.isBreak ? settings.breakTime : settings.workTime)
  };
  
  await chrome.storage.local.set({ pomodoroState: newState });
}

async function handleResetPomodoro() {
  const result = await chrome.storage.local.get(['pomodoroState', 'pomodoroSettings']);
  const state = result.pomodoroState || {};
  const settings = result.pomodoroSettings || { workTime: 25 * 60, breakTime: 5 * 60 };
  
  const newState = {
    ...state,
    isRunning: false,
    timeLeft: state.isBreak ? settings.breakTime : settings.workTime
  };
  
  await chrome.storage.local.set({ pomodoroState: newState });
}