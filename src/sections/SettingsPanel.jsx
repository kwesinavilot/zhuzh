import { X, Sun, Moon, Clock, Calendar, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const timezones = [
  { label: 'Local Time', value: 'local' },
  { label: 'UTC', value: 0 },
  { label: 'EST (UTC-5)', value: -5 },
  { label: 'PST (UTC-8)', value: -8 },
  { label: 'GMT (UTC+0)', value: 0 },
  { label: 'CET (UTC+1)', value: 1 },
  { label: 'JST (UTC+9)', value: 9 }
];

export default function SettingsPanel({ 
  showSettings, setShowSettings, theme, setTheme, 
  clockVariant, setClockVariant, dateVariant, setDateVariant,
  layout, setLayout, showClock, setShowClock, showDate, setShowDate,
  format24h, setFormat24h, timezone, setTimezone
}) {
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('zhuzh-theme', newTheme);
  };

  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={() => setShowSettings(false)} />
      <div className="w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Settings</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6 max-h-96 overflow-y-auto">
            <div>
              <h3 className="text-sm font-medium mb-2">Theme</h3>
              <div className="flex space-x-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleThemeChange('light')}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleThemeChange('dark')}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Clock Style
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {['digital', 'analog', 'minimal'].map((variant) => (
                  <Button
                    key={variant}
                    variant={clockVariant === variant ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setClockVariant(variant);
                      localStorage.setItem('zhuzh-clock-variant', variant);
                    }}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Date Style
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {['full', 'compact', 'minimal', 'card'].map((variant) => (
                  <Button
                    key={variant}
                    variant={dateVariant === variant ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setDateVariant(variant);
                      localStorage.setItem('zhuzh-date-variant', variant);
                    }}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Layout & Visibility</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show Clock</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowClock(!showClock);
                      localStorage.setItem('zhuzh-show-clock', !showClock);
                    }}
                  >
                    {showClock ? <ToggleRight className="h-5 w-5 text-blue-500" /> : <ToggleLeft className="h-5 w-5" />}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show Date</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowDate(!showDate);
                      localStorage.setItem('zhuzh-show-date', !showDate);
                    }}
                  >
                    {showDate ? <ToggleRight className="h-5 w-5 text-blue-500" /> : <ToggleLeft className="h-5 w-5" />}
                  </Button>
                </div>
                <div>
                  <span className="text-sm font-medium mb-2 block">Layout</span>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { value: 'vertical', label: 'Vertical' },
                      { value: 'horizontal-clock-first', label: 'Clock → Date' },
                      { value: 'horizontal-date-first', label: 'Date → Clock' }
                    ].map((option) => (
                      <Button
                        key={option.value}
                        variant={layout === option.value ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          setLayout(option.value);
                          localStorage.setItem('zhuzh-layout', option.value);
                        }}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Time Format</h3>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Button
                    variant={format24h ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setFormat24h(true);
                      localStorage.setItem('zhuzh-format-24h', true);
                    }}
                  >
                    24 Hour
                  </Button>
                  <Button
                    variant={!format24h ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setFormat24h(false);
                      localStorage.setItem('zhuzh-format-24h', false);
                    }}
                  >
                    12 Hour
                  </Button>
                </div>
                <div>
                  <span className="text-sm font-medium mb-2 block">Timezone</span>
                  <select 
                    className="w-full p-2 border rounded text-sm"
                    value={timezone}
                    onChange={(e) => {
                      const value = e.target.value === 'local' ? 'local' : parseInt(e.target.value);
                      setTimezone(value);
                      localStorage.setItem('zhuzh-timezone', value);
                    }}
                  >
                    {timezones.map((tz) => (
                      <option key={tz.value} value={tz.value}>
                        {tz.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}