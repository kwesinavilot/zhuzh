# Zhuzh (0.6.2)
Zhuzh is a comprehensive browser extension that transforms your new tab into a beautiful, productive workspace featuring SpaceX wallpapers, productivity tools, and customizable widgets.

## ✨ Core Features

### 🖼️ **Wallpaper System**
- **Dynamic SpaceX Collection**: Curated high-quality SpaceX wallpapers and videos
- **Favorites System**: Save and cycle through your favorite wallpapers with heart button
- **Custom Wallpaper Sources**: Built-in SpaceX, Custom folder, Online APIs (Pexels/Unsplash), or Mixed
- **Auto-Download Organization**: Downloaded wallpapers saved to `Downloads/Zhuzh-Wallpapers/`
- **Wallpaper Navigation**: Arrow buttons to browse through collections

### 🔍 **Smart Search**
- **Chrome Search API Integration**: Respects your browser's default search engine
- **Clean Interface**: Centered search bar with intuitive design
- **Instant Results**: Press Enter to search with your preferred engine

### 🔗 **Quick Links System**
- **Hybrid Approach**: Combines Chrome's top visited sites with custom shortcuts
- **Customizable Count**: Choose 5-10 quick links from settings
- **Site Logos**: Automatic favicon detection with fallback to first letter
- **Easy Management**: Add, edit, or remove links with modal interface

### 💰 **Currency Tools**
- **Real-Time Converter**: Live exchange rates for 12+ currencies in bottom-left
- **Advanced Calculator**: Custom amount converter (e.g., 1M Naira → Cedis) via Apps panel
- **Customizable Base**: Choose from USD, EUR, GBP, JPY, GHS, NGN, and more
- **Multiple Targets**: Select up to 4 target currencies for quick conversion

### 🕐 **Time & Date Widgets**
- **Multiple Clock Styles**: Digital, analog, and minimal variants
- **Date Display Options**: Full, compact, minimal, and card styles
- **Layout Control**: Vertical or horizontal arrangements
- **Timezone Support**: Local time plus UTC, EST, PST, GMT, CET, JST
- **Format Options**: 12-hour or 24-hour time display

### 📱 **Apps System**
- **Micro-Apps Panel**: Centralized launcher for advanced tools
- **Currency Calculator**: Professional converter with custom amounts
- **Wallpaper Browser**: Browse thousands of Pexels/Unsplash images
- **Pomodoro Timer**: Persistent focus timer that follows you across ALL browser tabs
- **Modal Interface**: Clean, centered modals with white backgrounds

### 🍅 **Persistent Pomodoro**
- **Cross-Tab Tracking**: Timer follows you to Gmail, YouTube, any website
- **Draggable Widget**: Move timer anywhere on screen with position memory
- **Smart Notifications**: Browser alerts for work/break transitions
- **Session Counter**: Track completed pomodoros with visual progress
- **Background Persistence**: Runs independently using Chrome service worker
- **Real-Time Sync**: All tabs show same timer state instantly

### ⚙️ **Comprehensive Settings**
- **Theme Control**: Light/Dark mode switching
- **Widget Customization**: Toggle and style all components
- **Wallpaper Management**: Source selection and folder organization
- **Currency Preferences**: Base currency and target selection
- **Layout Options**: Customize time widget arrangements
- **Persistent Storage**: All settings saved locally

### 🎯 **User Experience**
- **Welcome Page**: Guided onboarding for new users
- **Tooltips**: Helpful hints for all controls
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Polished transitions and interactions
- **Keyboard Shortcuts**: Efficient navigation options

## 🛠️ Technical Stack

### **Frontend**
- **React 18** - Modern frontend framework with hooks
- **Vite** - Fast build tool and development server
- **JavaScript/JSX** - Component-based architecture

### **UI & Styling**
- **Shadcn UI** - High-quality component library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Custom CSS** - Specialized animations and layouts

### **Browser Integration**
- **Chrome Extensions API** - Core browser functionality
- **Chrome Search API** - Default search engine integration
- **Chrome TopSites API** - Most visited sites access
- **Chrome Downloads API** - File management and organization
- **Chrome Favicon API** - Site icon retrieval

### **External APIs**
- **Open Exchange Rates** - Real-time currency data
- **Pexels API** - High-quality stock photography
- **Unsplash API** - Curated wallpaper collection
- **SpaceX Media** - Official SpaceX imagery (unofficial source)

### **Data & Storage**
- **localStorage** - Settings and preferences persistence
- **Chrome Storage API** - Extension-specific data
- **File System Integration** - Custom wallpaper management

## 🚀 Wallpaper Sources

### **Built-in Collection**
Curated SpaceX wallpapers and videos sourced from official SpaceX media channels, including high-resolution images from launches, spacecraft, and space exploration missions.

### **Online APIs**
- **Pexels**: Professional stock photography with space, rocket, and astronomy categories
- **Unsplash**: Curated high-quality images from talented photographers worldwide
- **Categories**: Space, Rockets, Astronomy, Galaxy, Planets, Nature, Landscape, Abstract

### **Custom Folder**
Personal wallpaper collection automatically organized in `Downloads/Zhuzh-Wallpapers/` with support for JPG, JPEG, PNG, and WebP formats.

## 📦 Installation

### **Development Installation (Unpacked)**

1. **Clone Repository**
   ```bash
   git clone https://github.com/kwesinavilot/zhuzh.git
   cd zhuzh
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build Extension**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked" and select the `dist` folder
   - Welcome page opens automatically with feature guide

### **Development Mode**
```bash
npm run dev
```
Runs development server for live coding and testing.

### **Production Build**
```bash
npm run build
```
Creates optimized build in `dist/` folder ready for Chrome Web Store submission.

## 🎮 Usage Guide

### **First Launch**
- Welcome page opens automatically with feature overview
- Random SpaceX wallpaper loads as background
- All widgets and tools are ready to use immediately

### **Navigation Controls**
- **⬅️ ➡️ Arrow Buttons**: Navigate through wallpaper collection
- **❤️ Heart Button**: Save current wallpaper to favorites
- **"Favs" Toggle**: Switch between all wallpapers and favorites only
- **⚙️ Settings (Top-Right)**: Access all customization options
- **📱 Apps (Bottom-Right)**: Launch micro-apps panel

### **Search Functionality**
- Type query in center search bar
- Press Enter to search with your default search engine
- Respects Chrome's search engine preferences

### **Wallpaper Management**
1. **Settings → Wallpaper Sources**: Choose source type
2. **Built-in**: Use curated SpaceX collection
3. **Custom**: Use personal wallpapers from Zhuzh folder
4. **Online**: Browse Pexels/Unsplash via Apps panel
5. **Mixed**: Combine all sources

### **Currency Tools**
- **Bottom-Left Converter**: Quick 1:1 exchange rates
- **Apps → Currency Calculator**: Custom amount conversions
- **Settings**: Customize base currency and targets

### **Time Widgets**
- **Top-Left Corner**: Clock and date display
- **Settings**: Choose styles, formats, timezones, layouts
- **Toggle Visibility**: Show/hide individual widgets

### **Quick Links**
- **Auto-Population**: Top visited sites appear automatically
- **Custom Addition**: Click "+" to add personal shortcuts
- **Management**: Edit or remove links via modal interface
- **Settings**: Adjust count (5-10 links)

### **Apps Panel**
- **Currency Calculator**: Professional converter with swap function
- **Wallpaper Browser**: Browse thousands of online wallpapers
- **Pomodoro Timer**: 25/5 focus timer that persists across all browser tabs
- **Download Integration**: Images save to Zhuzh folder automatically

## 🔧 Development

### **Project Structure**
```
zhuzh/
├── public/
│   ├── backgrounds/          # Built-in wallpaper collection
│   ├── icons/               # Extension icons and assets
│   ├── manifest.json        # Chrome extension manifest
│   ├── background.js        # Service worker for installation
│   └── welcome.html         # Onboarding page
├── src/
│   ├── components/ui/       # Shadcn UI components
│   ├── sections/           # Feature components
│   │   ├── AppsPanel.jsx
│   │   ├── CurrencyConverter.jsx
│   │   ├── CurrencyCalculator.jsx
│   │   ├── CustomShortcuts.jsx
│   │   ├── ImageProvider.jsx
│   │   ├── SettingsPanel.jsx
│   │   ├── TimeWidget.jsx
│   │   └── WallpaperManager.jsx
│   ├── lib/                # Utilities and helpers
│   ├── styles/             # CSS and styling
│   ├── App.jsx             # Main application component
│   └── main.jsx            # React entry point
├── dist/                   # Built extension (generated)
└── package.json           # Dependencies and scripts
```

### **Key Components**
- **App.jsx**: Main state management and layout
- **SettingsPanel.jsx**: Comprehensive settings interface
- **AppsPanel.jsx**: Micro-apps launcher system
- **CurrencyConverter.jsx**: Real-time exchange rates widget
- **ImageProvider.jsx**: Online wallpaper browser
- **TimeWidget.jsx**: Clock and date display system

### **API Integration**
- Currency data from Open Exchange Rates API
- Images from Pexels and Unsplash APIs
- Chrome extension APIs for browser integration
- localStorage for settings persistence

### **Build Process**
1. Vite processes React/JSX components
2. Tailwind CSS compiles utility classes
3. Assets copied to dist folder
4. Manifest and service worker included
5. Ready for Chrome extension loading

## ☕ Support Zhuzh

Enjoy using Zhuzh? Support its development and keep it free!

<a href="https://buymeacoffee.com/kwesinavilot" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

Your support helps:
- 🚀 **Continuous Development** - New features and improvements
- 🐛 **Bug Fixes** - Quick resolution of issues
- 🎨 **UI/UX Enhancements** - Better user experience
- 📱 **Cross-Platform Support** - Firefox and other browsers
- 🌟 **Feature Requests** - Community-driven development

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Fork the repository
- Create feature branches
- Submit pull requests
- Report issues and bugs
- Suggest new features

### **Development Setup**
1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Make changes and test
5. Build for production: `npm run build`
6. Test extension in Chrome
7. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SpaceX** for inspiring imagery and space exploration
- **Pexels & Unsplash** for high-quality wallpaper APIs
- **Shadcn UI** for beautiful component library
- **Open Exchange Rates** for reliable currency data
- **Chrome Extensions Team** for powerful browser APIs

---

**Made with ❤️ for productivity and space enthusiasts**