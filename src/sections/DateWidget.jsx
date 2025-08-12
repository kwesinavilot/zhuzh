import { useState, useEffect } from 'react';

export default function DateWidget({ variant = 'full', theme = 'light' }) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const textColor = theme === 'dark' ? 'text-white' : 'text-white';
  const bgColor = theme === 'dark' ? 'bg-black/20' : 'bg-white/20';

  if (variant === 'compact') {
    return (
      <div className={`${textColor} text-lg font-medium`}>
        {date.toLocaleDateString([], { month: 'short', day: 'numeric' })}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`${textColor} text-sm font-light opacity-90`}>
        {date.toLocaleDateString([], { weekday: 'long' })}
      </div>
    );
  }

  if (variant === 'card') {
    const day = date.getDate();
    const month = date.toLocaleDateString([], { month: 'short' });
    const weekday = date.toLocaleDateString([], { weekday: 'short' });

    return (
      <div className={`${bgColor} backdrop-blur-sm rounded-lg p-3 text-center min-w-[80px]`}>
        <div className={`${textColor} text-xs font-medium opacity-80`}>{weekday}</div>
        <div className={`${textColor} text-2xl font-bold`}>{day}</div>
        <div className={`${textColor} text-sm font-medium opacity-90`}>{month}</div>
      </div>
    );
  }

  // Default full variant
  return (
    <div className={`${bgColor} backdrop-blur-sm rounded-lg px-4 py-2`}>
      <div className={`${textColor} text-lg font-medium`}>
        {date.toLocaleDateString([], { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </div>
  );
}