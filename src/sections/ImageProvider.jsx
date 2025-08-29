import { useState, useEffect } from 'react';
import { Image, RefreshCw, Download, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const PEXELS_API_KEY = 'sdvaz0FAzkKmxLHz5C2SBO54WTxaRgTrz7oqqBeqEYxU8oi29nEknMiE';
const UNSPLASH_ACCESS_KEY = 'NNSss1uOduS9k2xn4HZPxQ-B6nXd9nj_QQ0jVa-EhrM';

const categories = [
  { value: 'space', label: 'Space' },
  { value: 'rocket', label: 'Rockets' },
  { value: 'astronomy', label: 'Astronomy' },
  { value: 'galaxy', label: 'Galaxy' },
  { value: 'planet', label: 'Planets' },
  { value: 'nature', label: 'Nature' },
  { value: 'landscape', label: 'Landscape' },
  { value: 'abstract', label: 'Abstract' }
];

export default function ImageProvider({ theme = 'light', onImageSelect, onClose }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState('pexels');
  const [category, setCategory] = useState('space');

  const bgColor = 'bg-white';
  const textColor = 'text-gray-900';

  useEffect(() => {
    fetchImages();
  }, [provider, category]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      let response;

      if (provider === 'pexels') {
        response = await fetch(`https://api.pexels.com/v1/search?query=${category}&per_page=12&orientation=landscape`, {
          headers: {
            'Authorization': PEXELS_API_KEY
          }
        });
        const data = await response.json();
        setImages(data.photos?.map(photo => ({
          id: photo.id,
          url: photo.src.large2x,
          thumb: photo.src.medium,
          photographer: photo.photographer,
          source: 'pexels'
        })) || []);
      } else {
        response = await fetch(`https://api.unsplash.com/search/photos?query=${category}&per_page=12&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`);
        const data = await response.json();
        setImages(data.results?.map(photo => ({
          id: photo.id,
          url: photo.urls.full,
          thumb: photo.urls.small,
          photographer: photo.user.name,
          source: 'unsplash'
        })) || []);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
    setLoading(false);
  };

  const downloadImage = async (imageUrl, filename) => {
    try {
      if (chrome?.downloads) {
        // Download to Zhuzh folder
        await chrome.downloads.download({
          url: imageUrl,
          filename: `Zhuzh-Wallpapers/${filename || 'wallpaper.jpg'}`,
          saveAs: false
        });
      } else {
        // Fallback for dev mode
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'wallpaper.jpg';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onClose?.()} />
      <div className={`${bgColor} rounded-lg shadow-xl p-6 w-[700px] max-h-[600px] relative`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Image className={`h-4 w-4 mr-2 ${textColor}`} />
          <h3 className={`text-sm font-medium ${textColor}`}>More Wallpapers</h3>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchImages}
            disabled={loading}
            className="h-6 w-6 p-0 hover:bg-white/20"
          >
            <RefreshCw className={`h-3 w-3 ${textColor} ${loading ? 'animate-spin' : ''}`} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onClose?.()}
            className="h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className={`h-3 w-3 ${textColor}`} />
          </Button>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        <Select value={provider} onValueChange={setProvider}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pexels">Pexels</SelectItem>
            <SelectItem value="unsplash">Unsplash</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className={`text-sm ${textColor} text-center py-8`}>
          Loading images...
        </div>
      ) : (
        <ScrollArea className="h-80">
          <div className="grid grid-cols-4 gap-3 pr-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.thumb}
                  alt={`${image.source} wallpaper`}
                  className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => onImageSelect?.(image.url)}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(image.url, `${image.source}-${image.id}.jpg`);
                    }}
                    className="h-6 w-6 p-0 hover:bg-white/20"
                  >
                    <Download className="h-3 w-3 text-white" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

        {images.length > 0 && (
          <div className={`text-xs ${textColor} opacity-50 mt-2 text-center`}>
            Images from {provider === 'pexels' ? 'Pexels' : 'Unsplash'}
          </div>
        )}
      </div>
    </div>
  );
}