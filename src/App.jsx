import { useState, useEffect } from 'react'
import { CircleArrowRight, CircleArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
            <h2 className="text-4xl font-bold tracking-tight">WallyWally</h2>
            <Badge variant="secondary">0.1.2</Badge>
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
