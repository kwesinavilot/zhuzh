import { useState, useEffect } from 'react'
import fs from 'fs'

function App() {
  const [wallpaper, setWallpaper] = useState([])

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


  return (
    <>
      <div
        className="foundation"
        style={{
          backgroundImage: `url(${wallpapers[Math.floor(Math.random() * 9)]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100vw',
        }}
      >
        <h3>WallyWally</h3>
        <p>0.1.2</p>
        <p>
          This browser extension allows you to set your own wallpaper.
        </p>
      </div>
    </>
  )
}

export default App
