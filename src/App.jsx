import { useState, useEffect } from 'react';
import { CircleArrowRight, CircleArrowLeft, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Recents from "@/sections/Recents";
import { isExtensionContext } from './lib/essentials';

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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallpaper, setWallpaper] = useState('');
  const [wallpapers, setWallpapers] = useState([]);

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
    setWallpaper(`url(${wallpapers[randomIndex]})`);
    setCurrentIndex(randomIndex);
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

  const changeWallpaper = (direction) => {
    let newIndex;
    if (direction === 'previous') {
      newIndex = currentIndex === 0 ? wallpapers.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === wallpapers.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setWallpaper(`url(${wallpapers[newIndex]})`);
  };

  const performGoogleSearch = (event) => {
    event.preventDefault();
    const query = event.target[0].value;
    window.open(`https://www.google.com/search?q=${query}`, '_self');
  };

  return (
    <>
      <div
        className="foundation"
        style={{
          backgroundImage: wallpaper,
        }}
      >
        <div className="content">
          <div className="space-y-4">
            <section data-purpose="title">
              <h2 className="text-4xl font-bold tracking-tight text-white">WallyWally</h2>
              <Badge variant="secondary">0.1.3</Badge>
            </section>

            <section data-purpose="search" className="shadow-sm lg:w-[700px] md:w-[550px] mx-auto rounded-md focus:border border-input bg-white ring-offset-background focus-within:ring-1 focus-within:ring-ring">
              <form className="w-full flex h-11 items-center pl-2 text-sm " action="" onSubmit={performGoogleSearch}>
                <Search className="mr-3 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="What do you want to know?..."
                  className="search-input text-slate-600 w-full text-sm font-normal border-0 bg-transparent p-0 outline-none placeholder:text-muted-foreground focus:ring-0"
                />
              </form>
            </section>

            <Recents />
          </div>
        </div>

        <div className="controllers space-x-5">
          <Button variant="outline" size="icon" onClick={() => changeWallpaper('previous')}>
            <CircleArrowLeft className="" />
          </Button>

          <Button variant="outline" size="icon" onClick={() => changeWallpaper('next')}>
            <CircleArrowRight className="" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
