import { useState, useEffect } from 'react';

export default function Clock({ variant = 'digital', theme = 'light', format24h = true, timezone = 'local' }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (timezone !== 'local') {
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const targetTime = new Date(utc + (timezone * 3600000));
        setTime(targetTime);
      } else {
        setTime(now);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timezone]);

  const textColor = theme === 'dark' ? 'text-white' : 'text-white';
  const bgColor = theme === 'dark' ? 'bg-black/20' : 'bg-white/20';

  if (variant === 'analog') {
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    
    const hourAngle = (hours * 30) + (minutes * 0.5);
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    return (
      <div className={`${bgColor} backdrop-blur-sm rounded-lg p-4 flex items-center justify-center`}>
        <div className="relative w-24 h-24">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke={theme === 'dark' ? 'white' : 'white'} strokeWidth="2" opacity="0.3"/>
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="8"
                x2="50"
                y2="15"
                stroke={theme === 'dark' ? 'white' : 'white'}
                strokeWidth="2"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="25"
              stroke={theme === 'dark' ? 'white' : 'white'}
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${hourAngle} 50 50)`}
            />
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="15"
              stroke={theme === 'dark' ? 'white' : 'white'}
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${minuteAngle} 50 50)`}
            />
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="12"
              stroke="#ef4444"
              strokeWidth="1"
              strokeLinecap="round"
              transform={`rotate(${secondAngle} 50 50)`}
            />
            <circle cx="50" cy="50" r="3" fill={theme === 'dark' ? 'white' : 'white'}/>
          </svg>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`${bgColor} backdrop-blur-sm rounded-lg px-3 py-2`}>
        <div className={`${textColor} text-xl font-light tracking-wider`}>
          {time.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: !format24h
          })}
        </div>
      </div>
    );
  }

  // Default digital variant
  return (
    <div className={`${bgColor} backdrop-blur-sm rounded-lg px-4 py-2`}>
      <div className={`${textColor} text-3xl font-mono font-bold tracking-wider`}>
        {time.toLocaleTimeString([], { hour12: !format24h })}
      </div>
    </div>
  );
}