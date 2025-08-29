import { useState, useEffect } from 'react';
import { Folder, Download, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isExtensionContext } from '../lib/essentials';

const ZHUZH_FOLDER = 'Zhuzh-Wallpapers';

export default function WallpaperManager({ 
  theme = 'light', 
  wallpaperSource, 
  setWallpaperSource,
  customWallpapers,
  setCustomWallpapers 
}) {
  const [customFolderExists, setCustomFolderExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const bgColor = theme === 'dark' ? 'bg-black/20' : 'bg-white/20';
  const textColor = theme === 'dark' ? 'text-white' : 'text-white';

  useEffect(() => {
    checkCustomFolder();
  }, []);

  const checkCustomFolder = async () => {
    if (!isExtensionContext()) return;
    
    try {
      // Check if we have the folder path stored
      const storedPath = localStorage.getItem('zhuzh-folder-path');
      if (storedPath) {
        setCustomFolderExists(true);
        return;
      }
      
      // Search for any files in Zhuzh folder
      const downloads = await chrome.downloads.search({
        filenameRegex: `${ZHUZH_FOLDER}/.*`
      });
      
      if (downloads.length > 0) {
        // Store the folder path for future reference
        const folderPath = downloads[0].filename.split('/')[0];
        localStorage.setItem('zhuzh-folder-path', folderPath);
        setCustomFolderExists(true);
      }
    } catch (error) {
      console.error('Error checking custom folder:', error);
    }
  };

  const createZhuzhFolder = async () => {
    if (!isExtensionContext()) return;
    
    setLoading(true);
    try {
      const blob = new Blob(['# Zhuzh Wallpapers\nYour downloaded wallpapers are stored here.'], 
        { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      await chrome.downloads.download({
        url: url,
        filename: `${ZHUZH_FOLDER}/README.txt`,
        saveAs: false
      });
      
      URL.revokeObjectURL(url);
      
      // Store folder path
      localStorage.setItem('zhuzh-folder-path', ZHUZH_FOLDER);
      setCustomFolderExists(true);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
    setLoading(false);
  };

  const loadCustomWallpapers = async () => {
    if (!isExtensionContext()) return;
    
    setLoading(true);
    try {
      const downloads = await chrome.downloads.search({
        filenameRegex: `${ZHUZH_FOLDER}/.*\\.(jpg|jpeg|png|webp)$`
      });
      
      const wallpapers = downloads
        .filter(item => item.state === 'complete')
        .map(item => ({
          id: item.id,
          filename: item.filename.split('/').pop(),
          url: `file://${item.filename}`
        }));
      
      setCustomWallpapers(wallpapers);
    } catch (error) {
      console.error('Error loading wallpapers:', error);
    }
    setLoading(false);
  };

  return (
    <div className={`${bgColor} backdrop-blur-sm rounded-lg p-4 min-w-[300px]`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Folder className={`h-4 w-4 mr-2 ${textColor}`} />
          <h3 className={`text-sm font-medium ${textColor}`}>Wallpaper Sources</h3>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className={`text-xs ${textColor} mb-1 block`}>Source:</label>
          <Select value={wallpaperSource} onValueChange={setWallpaperSource}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="builtin">Built-in SpaceX</SelectItem>
              <SelectItem value="custom">Custom Folder</SelectItem>
              <SelectItem value="online">Online APIs</SelectItem>
              <SelectItem value="mixed">All Sources</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(wallpaperSource === 'custom' || wallpaperSource === 'mixed') && (
          <div className={`p-2 bg-white/10 rounded border border-white/20`}>
            <div className={`text-xs ${textColor} mb-2`}>
              Folder: {customFolderExists ? '✅ Ready' : '❌ Not Found'}
            </div>
            
            {!customFolderExists ? (
              <Button
                onClick={createZhuzhFolder}
                disabled={loading}
                size="sm"
                className="w-full bg-white/20 hover:bg-white/30 text-white"
              >
                {loading ? <RefreshCw className="h-3 w-3 animate-spin mr-1" /> : <Download className="h-3 w-3 mr-1" />}
                Create Folder
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={loadCustomWallpapers}
                  disabled={loading}
                  size="sm"
                  className="w-full bg-white/20 hover:bg-white/30 text-white"
                >
                  {loading ? <RefreshCw className="h-3 w-3 animate-spin mr-1" /> : <RefreshCw className="h-3 w-3 mr-1" />}
                  Refresh
                </Button>
                <div className={`text-xs ${textColor} opacity-75`}>
                  {customWallpapers?.length || 0} wallpapers found
                </div>
              </div>
            )}
          </div>
        )}

        <div className={`text-xs ${textColor} opacity-75 p-2 bg-white/5 rounded`}>
          💡 Downloads go to: Downloads/{ZHUZH_FOLDER}/
        </div>
      </div>
    </div>
  );
}