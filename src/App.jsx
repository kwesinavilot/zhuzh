import { useState, useEffect, useRef } from 'react';
import { CircleArrowRight, CircleArrowLeft, Search, Heart, Settings, Grid3X3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SettingsPanel from "@/sections/SettingsPanel";
import TimeWidget from "@/sections/TimeWidget";
import CustomShortcuts from "@/sections/CustomShortcuts";
import CurrencyConverter from "@/sections/CurrencyConverter";
import CurrencyCalculator from "@/sections/CurrencyCalculator";
import ImageProvider from "@/sections/ImageProvider";
import AppsPanel from "@/sections/AppsPanel";
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
  const [maxQuickLinks, setMaxQuickLinks] = useState(5);
  const [baseCurrency, setBaseCurrency] = useState('GHS');
  const [targetCurrencies, setTargetCurrencies] = useState(['USD', 'EUR', 'GBP', 'JPY']);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showImageProvider, setShowImageProvider] = useState(false);
  const [showApps, setShowApps] = useState(false);

  const [wallpaperSource, setWallpaperSource] = useState('builtin');
  const [customWallpapers, setCustomWallpapers] = useState([]);
  const videoRef = useRef(null);

  const readWallpapersFromDirectory = (rootDir, folderName) => {
    // console.log("Root directory: " + rootDir.name + ", Folder: " + folderName);
    rootDir.getDirectory(folderName, {}, (dirEntry) => {
      const dirReader = dirEntry.createReader();

      dirReader.readEntries((entries) => {
        const wallpaperFiles = entries
          .filter((entry) => entry.isFile)
          .map((entry) => `${folderName}/${entry.name}`);

        // console.log("Wallpaper files: " + wallpaperFiles);

        setWallpapers(wallpaperFiles);
      });
    });
  };

  const setInitialWallpaper = () => {
    const activeWallpapers = getWallpapersBySource();
    if (activeWallpapers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * activeWallpapers.length);
    const wallpaperFile = activeWallpapers[randomIndex];
    const originalIndex = wallpapers.indexOf(wallpaperFile);

    setCurrentIndex(originalIndex >= 0 ? originalIndex : 0);
    updateWallpaper(originalIndex >= 0 ? originalIndex : 0);
  };

  const getWallpapersBySource = () => {
    switch (wallpaperSource) {
      case 'builtin':
        return wallpapers;
      case 'custom':
        return customWallpapers.length > 0 ? customWallpapers.map(w => w.url) : wallpapers;
      case 'online':
        return []; // Online wallpapers are handled differently
      case 'mixed':
        return [...wallpapers, ...customWallpapers.map(w => w.url)];
      default:
        return wallpapers;
    }
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
    // Load custom wallpapers when source changes to custom or mixed
    if (wallpaperSource === 'custom' || wallpaperSource === 'mixed') {
      loadCustomWallpapers();
    }
  }, [wallpaperSource]);

  const loadCustomWallpapers = async () => {
    if (!chrome?.downloads) return;

    try {
      const downloads = await chrome.downloads.search({
        filenameRegex: 'Zhuzh-Wallpapers/.*\\.(jpg|jpeg|png|webp)$'
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
      console.error('Error loading custom wallpapers:', error);
    }
  };

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

    const savedMaxQuickLinks = localStorage.getItem('zhuzh-max-quick-links');
    if (savedMaxQuickLinks) {
      setMaxQuickLinks(parseInt(savedMaxQuickLinks));
    }

    const savedBaseCurrency = localStorage.getItem('zhuzh-base-currency');
    if (savedBaseCurrency) {
      setBaseCurrency(savedBaseCurrency);
    }

    const savedTargetCurrencies = localStorage.getItem('zhuzh-target-currencies');
    if (savedTargetCurrencies) {
      setTargetCurrencies(JSON.parse(savedTargetCurrencies));
    }

    const savedWallpaperSource = localStorage.getItem('zhuzh-wallpaper-source');
    if (savedWallpaperSource) {
      setWallpaperSource(savedWallpaperSource);
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
    const sourceWallpapers = getWallpapersBySource();
    return showFavoritesOnly ? sourceWallpapers.filter(wp => favorites.includes(wp)) : sourceWallpapers;
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
          <div className="absolute top-4 right-4 space-x-2 flex">
            {/* Apps Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowApps(true)}
              className="backdrop-blur-sm bg-white/20 border-0 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring font-medium h-10 hover: hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center ring-offset-background rounded-md text-black text-sm text-white transition-colors"
            >
              <Grid3X3 className="h-5 w-5" />
            </Button>

            {/* Settings Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSettings(true)}
              className="backdrop-blur-sm bg-white/20 border-0 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring font-medium h-10 hover: hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center ring-offset-background rounded-md text-black text-sm text-white transition-colors"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Currency Converter */}
          {showCurrency && (
            <div className="absolute bottom-4 left-4">
              <CurrencyConverter
                theme={theme}
                baseCurrency={baseCurrency}
                targetCurrencies={targetCurrencies}
              />
            </div>
          )}

          {/* Currency Calculator */}
          {showCalculator && (
            <CurrencyCalculator 
              theme={theme} 
              onClose={() => setShowCalculator(false)}
            />
          )}

          {/* Image Provider */}
          {showImageProvider && (
            <ImageProvider
              theme={theme}
              onImageSelect={(imageUrl) => {
                setWallpaper(`url(${imageUrl})`);
                if (videoRef.current) {
                  videoRef.current.pause();
                  videoRef.current.style.display = 'none';
                }
                setShowImageProvider(false);
              }}
              onClose={() => setShowImageProvider(false)}
            />
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

              <CustomShortcuts maxLinks={maxQuickLinks} />
            </div>
          </div>

          <div className="controllers space-x-5 justify-center align-center align-middle w-full items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="backdrop-blur-sm bg-white/20 border-0 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring font-medium h-10 hover: hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center ring-offset-background rounded-md text-black text-sm text-white transition-colors w-10 whitespace-nowrap" variant="outline" size="icon" onClick={() => changeWallpaper('previous')}>
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
                  className="backdrop-blur-sm bg-white/20 border-0 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring font-medium h-10 hover: hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center ring-offset-background rounded-md text-black text-sm text-white transition-colors w-10 whitespace-nowrap"
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
                  className="backdrop-blur-sm bg-white/20 border-0 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring font-medium h-10 hover: hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center ring-offset-background rounded-md text-black text-sm text-white transition-colors w-10 whitespace-nowrap"
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
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => changeWallpaper('next')}
                  className="backdrop-blur-sm bg-white/20 border-0 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring font-medium h-10 hover: hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center ring-offset-background rounded-md text-black text-sm text-white transition-colors w-10 whitespace-nowrap"
                >
                  <CircleArrowRight className="" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p>Go to the next wallpaper</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <AppsPanel
          showApps={showApps}
          setShowApps={setShowApps}
          onAppSelect={(appId) => {
            if (appId === 'currency-calculator') {
              setShowCalculator(true);
            } else if (appId === 'wallpaper-browser') {
              setShowImageProvider(true);
            }
          }}
          theme={theme}
        />

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
          maxQuickLinks={maxQuickLinks}
          setMaxQuickLinks={setMaxQuickLinks}
          baseCurrency={baseCurrency}
          setBaseCurrency={setBaseCurrency}
          targetCurrencies={targetCurrencies}
          setTargetCurrencies={setTargetCurrencies}
          wallpaperSource={wallpaperSource}
          setWallpaperSource={setWallpaperSource}
          customWallpapers={customWallpapers}
          setCustomWallpapers={setCustomWallpapers}
        />
      </div>
    </>
  );
}

export default App;