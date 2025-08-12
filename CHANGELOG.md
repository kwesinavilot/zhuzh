# Changelog

## [0.3.0] - 2025-08-11

### Added
- **Clock & Date Widget**: Customizable time and date display in top-left corner
- **Multiple Clock Styles**: Digital, analog, and minimal variants
- **Multiple Date Styles**: Full, compact, minimal, and card variants
- **Layout Options**: Vertical, horizontal (clock first), horizontal (date first)
- **Visibility Controls**: Toggle clock and date on/off independently
- **Time Format Options**: 12-hour and 24-hour format support
- **Timezone Support**: Local time plus UTC, EST, PST, GMT, CET, JST
- **Enhanced Settings**: Organized sections with toggle switches and dropdown selectors

### Improved
- Settings panel now scrollable to accommodate new options
- Better component architecture with TimeWidget wrapper
- All preferences persist in localStorage

---

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