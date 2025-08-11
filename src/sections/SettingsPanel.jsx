import { X, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function SettingsPanel({ showSettings, setShowSettings, theme, setTheme }) {
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

          <div className="space-y-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}