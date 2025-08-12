import Clock from './Clock';
import DateWidget from './DateWidget';

export default function TimeWidget({ 
  layout = 'vertical', 
  showClock = true, 
  showDate = true, 
  clockVariant = 'digital',
  dateVariant = 'full',
  theme = 'light',
  format24h = true,
  timezone = 'local'
}) {
  if (!showClock && !showDate) return null;

  const clockComponent = showClock ? (
    <Clock 
      variant={clockVariant} 
      theme={theme} 
      format24h={format24h}
      timezone={timezone}
    />
  ) : null;

  const dateComponent = showDate ? (
    <DateWidget variant={dateVariant} theme={theme} />
  ) : null;

  if (layout === 'horizontal-clock-first') {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">{clockComponent}</div>
        <div className="flex-shrink-0">{dateComponent}</div>
      </div>
    );
  }

  if (layout === 'horizontal-date-first') {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">{dateComponent}</div>
        <div className="flex-shrink-0">{clockComponent}</div>
      </div>
    );
  }

  // Default vertical layout
  return (
    <div className="space-y-2">
      {clockComponent}
      {dateComponent}
    </div>
  );
}