# Zhuzh (0.3.5)
Zhuzh is a lightweight browser extension that displays beautiful SpaceX wallpapers as your background and provides a search bar for quick searches. It also showcases your top visited websites for easy access.

## Features
- **Dynamic Wallpapers**: Enjoy a collection of stunning SpaceX wallpapers that change automatically or can be cycled through manually
- **Favorites System**: Save and cycle through your favorite wallpapers with the heart button
- **Smart Search**: Uses Chrome's Search API to respect your default search engine settings
- **Custom Quick Links**: Add, edit, or remove quick links with site logos and top visited sites integration
- **Currency Converter**: Real-time exchange rates with customizable base currency and multiple target currencies
- **Clock & Date Widget**: Customizable time and date display with multiple styles
- **Settings Panel**: Comprehensive customization with theme, layout, and time format options
- **Tooltips**: Helpful hints for all controls

## Built With
- **React** - Frontend framework
- **Shadcn UI Components** - UI component library
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Chrome Extensions API** - Browser integration
- **SpaceX Twitter Images** - Wallpaper source (Unofficial)

## SpaceX Wallpaper Source:
The beautiful wallpapers displayed in Zhuzh are sourced from the official SpaceX Twitter page (https://twitter.com/SpaceX/media).

## Installation (Unpacked Extension)
**Important Note: This extension is currently not available on the Chrome Web Store. You can install it by loading the unpacked extension folder in Chrome.**

1. Download the source code: Clone or download the source code for this project.
2. Extract the folder: Extract the downloaded ZIP file to a convenient location on your computer.
3. Load the unpacked extension in Chrome:
    - Open Chrome and navigate to chrome://extensions/.
    - Enable Developer mode by toggling the switch in the top right corner.
    - Click on "Load unpacked" and select the extracted folder containing the extension's code (the folder where app.js resides).

## Using Zhuzh
- **Wallpapers**: Zhuzh sets a random wallpaper on load. Use arrow buttons to navigate through wallpapers
- **Favorites**: Click the heart button to save wallpapers as favorites. Toggle "Favs" to view only favorites
- **Search**: Type your query and press Enter - uses your browser's default search engine
- **Clock & Date**: Customizable widgets in top-left corner with multiple display styles
- **Settings**: Click the gear icon (top-right) to access theme, layout, time format, and timezone options
- **Quick Links**: Up to 10 customizable quick access sites with logos, combining top visited sites and custom additions
- **Currency Converter**: Real-time exchange rates displayed in bottom-left corner with refresh functionality

## Contributing
I appreciate any contributions to improve Zhuzh. Feel free to fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.