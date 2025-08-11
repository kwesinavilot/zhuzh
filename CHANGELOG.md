# Changelog

## [0.2.0] - 2025-08-11

### Added
- **Favorites System**: Heart button to save/remove favorite wallpapers
- **Favorites Filter**: Toggle between all wallpapers and favorites-only view
- **Settings Panel**: Slide-in modal from right side with gear icon trigger
- **Theme Switching**: Light/Dark mode toggle with persistent storage
- **Tooltips**: Helpful hints for all control buttons
- **Component Architecture**: Separated Settings into reusable component

### Changed
- **COMPLIANCE FIX**: Integrated Chrome Search API to respect user's default search engine
- Search now uses `chrome.search.query()` instead of direct Google redirects
- Added `search` permission to manifest
- Enhanced navigation to work within active wallpaper set (all vs favorites)
- Improved UI organization and code structure

### Fixed
- Resolved Chrome Web Store policy violation for "single purpose" requirement
- Extension now compliant for resubmission to Chrome Web Store

---

## [0.1.7] - Previous Release
- SpaceX wallpaper new tab page
- Top visited sites display
- Search functionality (non-compliant version)