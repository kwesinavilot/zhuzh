import { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const WORK_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export default function PomodoroApp({ theme = 'light', onClose }) {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  const bgColor = 'bg-white';
  const textColor = 'text-gray-900';

  useEffect(() => {
    // Load state from storage
    loadPomodoroState();
  }, []);

  useEffect(() => {
    // Save state to storage whenever it changes
    savePomodoroState();
  }, [timeLeft, isRunning, isBreak, sessions]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Timer finished
            handleTimerComplete();
            return isBreak ? WORK_TIME : BREAK_TIME;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const loadPomodoroState = async () => {
    if (chrome?.storage) {
      const result = await chrome.storage.local.get(['pomodoroState']);
      if (result.pomodoroState) {
        const state = result.pomodoroState;
        setTimeLeft(state.timeLeft || WORK_TIME);
        setIsRunning(state.isRunning || false);
        setIsBreak(state.isBreak || false);
        setSessions(state.sessions || 0);
      }
    }
  };

  const savePomodoroState = async () => {
    if (chrome?.storage) {
      await chrome.storage.local.set({
        pomodoroState: {
          timeLeft,
          isRunning,
          isBreak,
          sessions,
          lastUpdate: Date.now()
        }
      });
    }
  };

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (!isBreak) {
      setSessions(prev => prev + 1);
      setIsBreak(true);
      // Show notification
      if (Notification.permission === 'granted') {
        new Notification('Pomodoro Complete! 🍅', {
          body: 'Time for a 5-minute break!',
          icon: '/logo-white.png'
        });
      }
    } else {
      setIsBreak(false);
      if (Notification.permission === 'granted') {
        new Notification('Break Over! 💪', {
          body: 'Time to get back to work!',
          icon: '/logo-white.png'
        });
      }
    }
  };

  const toggleTimer = () => {
    if (!isRunning && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((isBreak ? BREAK_TIME : WORK_TIME) - timeLeft) / (isBreak ? BREAK_TIME : WORK_TIME) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onClose?.()} />
      <div className={`${bgColor} rounded-lg shadow-xl p-6 w-[350px] relative`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Timer className={`h-4 w-4 mr-2 ${textColor}`} />
            <h3 className={`text-sm font-medium ${textColor}`}>Pomodoro Timer</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onClose?.()}
            className="h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className={`h-3 w-3 ${textColor}`} />
          </Button>
        </div>

        <div className="text-center mb-6">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                className={isBreak ? "text-green-500" : "text-blue-500"}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-2xl font-mono ${textColor}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          
          <div className={`text-lg font-medium ${textColor} mb-2`}>
            {isBreak ? '☕ Break Time' : '🍅 Focus Time'}
          </div>
          
          <div className={`text-sm ${textColor} opacity-75`}>
            Sessions completed: {sessions}
          </div>
        </div>

        <div className="flex justify-center space-x-3">
          <Button
            onClick={toggleTimer}
            className={`${isBreak ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          
          <Button
            onClick={resetTimer}
            variant="outline"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className={`text-xs ${textColor} opacity-50 mt-4 text-center`}>
          Timer persists across all browser tabs
        </div>
      </div>
    </div>
  );
}