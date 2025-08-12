import { useState, useEffect, useRef } from 'react';
import { CircleArrowRight, CircleArrowLeft, Search, Heart, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Recents from "@/sections/Recents";
import SettingsPanel from "@/sections/SettingsPanel";
import TimeWidget from "@/sections/TimeWidget";
import CustomShortcuts from "@/sections/CustomShortcuts";
import CurrencyConverter from "@/sections/CurrencyConverter";
import { isExtensionContext } from './lib/essentials';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function App() {
  const devWP = [
    'backgrounds/bg1.jpg',
    'backgrounds/bg2.jpeg',
    'backgrounds/bg3.jpeg',
    'backgrounds/bg4.jpeg',
    'backgrounds/bg5.jpeg',
    'backgrounds/bg6.jpeg',
    'backgrounds/bg7.jpeg',
    'backgrounds/bg9.jpg',
    'backgrounds/bg-vid-1.mp4',
    'backgrounds/bg-vid-2.mp4',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallpaper, setWallpaper] = useState('');
  const [wallpapers, setWallpapers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState('light');
  const [clockVariant, setClockVariant] = useState('digital');
  const [dateVariant, setDateVariant] = useState('full');
  const [layout, setLayout] = useState('vertical');
  const [showClock, setShowClock] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [format24h, setFormat24h] = useState(true);
  const [timezone, setTimezone] = useState('local');
  const [showCurrency, setShowCurrency] = useState(true);
  const videoRef = useRef(null);

  const readWallpapersFromDirectory = (rootDir, folderName) => {
    console.log("Root directory: " + rootDir.name + ", Folder: " + folderName);
    rootDir.getDirectory(folderName, {}, (dirEntry) => {
      const dirReader = dirEntry.createReader();

      dirReader.readEntries((entries) => {
        const wallpaperFiles = entries
          .filter((entry) => entry.isFile)
          .map((entry) => `${folderName}/${entry.name}`);
        console.log("Wallpaper files: " + wallpaperFiles);

        setWallpapers(wallpaperFiles);
      });
    });
  };

  const setInitialWallpaper = () => {
    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    setCurrentIndex(randomIndex);
    updateWallpaper(randomIndex);
  };

  useEffect(() => {
    if (isExtensionContext()) {
      chrome.runtime.getPackageDirectoryEntry((rootDir) => {
        readWallpapersFromDirectory(rootDir, 'backgrounds');
      });
    } else {
      setWallpapers(devWP);
    }
  }, []);

  useEffect(() => {
    if (wallpapers.length > 0) {
      setInitialWallpaper();
    }
  }, [wallpapers]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('zhuzh-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const savedTheme = localStorage.getItem('zhuzh-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    const savedClockVariant = localStorage.getItem('zhuzh-clock-variant');
    if (savedClockVariant) {
      setClockVariant(savedClockVariant);
    }
    
    const savedDateVariant = localStorage.getItem('zhuzh-date-variant');
    if (savedDateVariant) {
      setDateVariant(savedDateVariant);
    }
    
    const savedLayout = localStorage.getItem('zhuzh-layout');
    if (savedLayout) {
      setLayout(savedLayout);
    }
    
    const savedShowClock = localStorage.getItem('zhuzh-show-clock');
    if (savedShowClock !== null) {
      setShowClock(savedShowClock === 'true');
    }
    
    const savedShowDate = localStorage.getItem('zhuzh-show-date');
    if (savedShowDate !== null) {
      setShowDate(savedShowDate === 'true');
    }
    
    const savedFormat24h = localStorage.getItem('zhuzh-format-24h');
    if (savedFormat24h !== null) {
      setFormat24h(savedFormat24h === 'true');
    }
    
    const savedTimezone = localStorage.getItem('zhuzh-timezone');
    if (savedTimezone) {
      setTimezone(savedTimezone === 'local' ? 'local' : parseInt(savedTimezone));
    }
    
    const savedShowCurrency = localStorage.getItem('zhuzh-show-currency');
    if (savedShowCurrency !== null) {
      setShowCurrency(savedShowCurrency === 'true');
    }
  }, []);

  const updateWallpaper = (index) => {
    const file = wallpapers[index];
    if (file.endsWith('.mp4')) {
      setWallpaper('');

      if (videoRef.current) {
        videoRef.current.src = file;
        videoRef.current.style.display = 'block';
        videoRef.current.play();
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.style.display = 'none';
      }
      setWallpaper(`url(${file})`);
    }
  };

  const getActiveWallpapers = () => {
    return showFavoritesOnly ? wallpapers.filter(wp => favorites.includes(wp)) : wallpapers;
  };

  const changeWallpaper = (direction) => {
    const activeWallpapers = getActiveWallpapers();
    if (activeWallpapers.length === 0) return;

    const currentWallpaper = wallpapers[currentIndex];
    const currentActiveIndex = activeWallpapers.indexOf(currentWallpaper);

    let newActiveIndex;
    if (direction === 'previous') {
      newActiveIndex = currentActiveIndex === 0 ? activeWallpapers.length - 1 : currentActiveIndex - 1;
    } else {
      newActiveIndex = currentActiveIndex === activeWallpapers.length - 1 ? 0 : currentActiveIndex + 1;
    }

    const newWallpaper = activeWallpapers[newActiveIndex];
    const newIndex = wallpapers.indexOf(newWallpaper);
    setCurrentIndex(newIndex);
    updateWallpaper(newIndex);
  };

  const toggleFavorite = () => {
    const currentWallpaper = wallpapers[currentIndex];
    const newFavorites = favorites.includes(currentWallpaper)
      ? favorites.filter(fav => fav !== currentWallpaper)
      : [...favorites, currentWallpaper];

    setFavorites(newFavorites);
    localStorage.setItem('zhuzh-favorites', JSON.stringify(newFavorites));
  };

  const performSearch = (event) => {
    event.preventDefault();
    const query = event.target[0].value.trim();
    if (query) {
      chrome.search.query({ text: query });
    }
  };

  return (
    <>
      <div
        className="foundation"
        style={{
          backgroundImage: wallpaper,
        }}
      >
        <video
          ref={videoRef}
          className="video-background"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, display: 'none' }}
          loop
          muted
        ></video>

        <div className="top-layer" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 10 }}>
          {/* Settings Button */}
          <div className="absolute top-4 right-4">
            <Button variant="outline" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Currency Converter */}
          {showCurrency && (
            <div className="absolute bottom-4 left-4">
              <CurrencyConverter theme={theme} />
            </div>
          )}
          
          <div className="content">
            <div className="space-y-4">
              {/* Time Widget */}
              <div className="absolute top-4 left-4">
                <TimeWidget 
                  layout={layout}
                  showClock={showClock}
                  showDate={showDate}
                  clockVariant={clockVariant}
                  dateVariant={dateVariant}
                  theme={theme}
                  format24h={format24h}
                  timezone={timezone}
                />
              </div>
              
              <section data-purpose="title">
                <h2 className="text-5xl text-white logotext">zhuzh</h2>
              </section>

              <section data-purpose="search" className="shadow-sm lg:w-[700px] md:w-[550px] mx-auto rounded-md focus:border border-input bg-white ring-offset-background focus-within:ring-1 focus-within:ring-ring">
                <form className="w-full flex h-11 items-center pl-2 text-sm " action="" onSubmit={performSearch}>
                  <Search className="mr-3 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="What do you want to know?..."
                    className="search-input text-slate-600 w-full text-sm font-normal border-0 bg-transparent p-0 outline-none placeholder:text-muted-foreground focus:ring-0"
                  />
                </form>
              </section>

              <CustomShortcuts />
            </div>
          </div>

          <div className="controllers space-x-5 justify-center align-center align-middle w-full items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => changeWallpaper('previous')}>
                  <CircleArrowLeft className="" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p>Go to the previous wallpaper</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={favorites.includes(wallpapers[currentIndex]) ? "default" : "outline"}
                  size="icon"
                  onClick={toggleFavorite}
                >
                  <Heart className={favorites.includes(wallpapers[currentIndex]) ? "fill-current" : ""} />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p>{favorites.includes(wallpapers[currentIndex]) ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={showFavoritesOnly ? "default" : "outline"}
                  size="icon"
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                >
                  {showFavoritesOnly ? 'All' : 'Favs'}
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p>{showFavoritesOnly ? "Show all wallpapers" : "Show only favorites"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => changeWallpaper('next')}>
                  <CircleArrowRight className="" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p>Go to the next wallpaper</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <SettingsPanel
          showSettings={showSettings} 
          setShowSettings={setShowSettings} 
          theme={theme} 
          setTheme={setTheme}
          clockVariant={clockVariant}
          setClockVariant={setClockVariant}
          dateVariant={dateVariant}
          setDateVariant={setDateVariant}
          layout={layout}
          setLayout={setLayout}
          showClock={showClock}
          setShowClock={setShowClock}
          showDate={showDate}
          setShowDate={setShowDate}
          format24h={format24h}
          setFormat24h={setFormat24h}
          timezone={timezone}
          setTimezone={setTimezone}
          showCurrency={showCurrency}
          setShowCurrency={setShowCurrency}
        />
      </div>
    </>
  );
}

export default App;