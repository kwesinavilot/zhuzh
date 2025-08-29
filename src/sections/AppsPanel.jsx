import { X, Calculator, Image, Grid3X3 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const apps = [
  {
    id: 'currency-calculator',
    name: 'Currency Calculator',
    description: 'Convert any amount between currencies',
    icon: Calculator,
    emoji: '💱'
  },
  {
    id: 'wallpaper-browser',
    name: 'Wallpaper Browser',
    description: 'Browse and download wallpapers',
    icon: Image,
    emoji: '🖼️'
  }
];

export default function AppsPanel({ 
  showApps, 
  setShowApps, 
  onAppSelect,
  theme = 'light' 
}) {
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  if (!showApps) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={() => setShowApps(false)} />
      <div className={`${bgColor} rounded-lg shadow-xl p-6 w-96 relative`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Grid3X3 className={`h-5 w-5 mr-2 ${textColor}`} />
            <h2 className={`text-lg font-semibold ${textColor}`}>Apps</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowApps(false)}>
            <X className={`h-4 w-4 ${textColor}`} />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {apps.map((app) => (
            <Button
              key={app.id}
              variant="outline"
              className={`h-24 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 ${textColor}`}
              onClick={() => {
                onAppSelect(app.id);
                setShowApps(false);
              }}
            >
              <span className="text-2xl">{app.emoji}</span>
              <div className="text-center">
                <div className="text-sm font-medium">{app.name}</div>
                <div className="text-xs opacity-75">{app.description}</div>
              </div>
            </Button>
          ))}
        </div>

        <div className={`text-xs ${textColor} opacity-50 mt-4 text-center`}>
          Click an app to launch it
        </div>
      </div>
    </div>
  );
}