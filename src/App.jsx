import { useState, useEffect } from 'react'
import { CircleArrowRight, CircleArrowLeft, Search } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallpaper, setWallpaper] = useState('');

  // list of wallpapers
  const wallpapers = [
    'backgrounds/bg1.jpg',
    'backgrounds/bg2.jpeg',
    'backgrounds/bg3.jpeg',
    'backgrounds/bg4.jpeg',
    'backgrounds/bg5.jpeg',
    'backgrounds/bg6.jpeg',
    'backgrounds/bg7.jpeg',
    'backgrounds/bg9.jpg',
  ]

  // get and display a random wallpaper as the initial background
  const setInitialWallpaper = () => {
    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    setWallpaper(`url(${wallpapers[randomIndex]})`);
    setCurrentIndex(randomIndex);
  }

  // get and display the previous/next wallpaper
  const changeWallpaper = (direction) => {
    if (direction === 'previous') {
      if (currentIndex === 0) {
        setCurrentIndex(wallpapers.length - 1);
        setWallpaper(`url(${wallpapers[wallpapers.length - 1]})`);
      } else {
        setCurrentIndex(currentIndex - 1);
        setWallpaper(`url(${wallpapers[currentIndex - 1]})`);
      }
    } else {
      if (currentIndex === wallpapers.length - 1) {
        setCurrentIndex(0);
        setWallpaper(`url(${wallpapers[0]})`);
      } else {
        setCurrentIndex(currentIndex + 1);
        setWallpaper(`url(${wallpapers[currentIndex + 1]})`);
      }
    }
  }

  // perform google search
  const performGoogleSearch = (event) => {
    event.preventDefault();
    const query = event.target[0].value;
    window.open(`https://www.google.com/search?q=${query}`, '_self');
  }

  // set the initial wallpaper
  useEffect(() => {
    setInitialWallpaper();
  }, []);

  return (
    <>
      <div
        className="foundation"
        style={{
          backgroundImage: wallpaper,
        }}
      >
        <div className="content">
          <div className="title">
            <h2 className="text-4xl font-bold tracking-tight text-white">WallyWally</h2>
            <Badge variant="secondary">0.1.2</Badge>

            <div className="shadow-sm w-auto mt-5 rounded-md focus:border border-input bg-white ring-offset-background focus-within:ring-1 focus-within:ring-ring">
              <form className="w-full flex h-11 items-center pl-2 text-sm " action="" onSubmit={performGoogleSearch}>
                <Search className="mr-3 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="What do you want to know?..."
                  className="search-input text-slate-600 lg:w-[600px] md:w-[400px] text-sm font-normal border-0 bg-transparent p-0 outline-none placeholder:text-muted-foreground focus:ring-0"
                />
              </form>
            </div>
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
  )
}

export default App
