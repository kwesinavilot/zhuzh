# Changelog

## [0.4.6] - 2025-08-17

### Added
- **Welcome Page**: Automatic welcome page opens on first installation
- **Installation Guide**: Comprehensive feature overview for new users
- **Background Service Worker**: Handles installation events and user onboarding
- **UTF-8 Encoding**: Proper emoji display in welcome page

### Improved
- **User Onboarding**: New users get guided introduction to all features
- **First-Time Experience**: Professional welcome screen with feature highlights
- **Extension Lifecycle**: Better handling of installation and setup events

---

## [0.4.5] - 2025-08-12

### Added
- **ScrollArea Component**: Integrated shadcn ScrollArea for better scrolling experience
- **Nested Scrolling**: Currency selection area has its own scroll region
- **Styled Scrollbars**: Consistent design system scrollbars throughout settings

### Improved
- **Settings Panel UX**: Smoother scrolling with proper styled scrollbars
- **Layout Management**: Better height distribution with flex layout
- **Accessibility**: Built-in accessibility features from shadcn ScrollArea
- **Visual Consistency**: Scrollbars match the overall design system

### Technical
- **Component Integration**: Added ScrollArea import and implementation
- **Responsive Design**: Adapts to content height properly
- **Performance**: Optimized scrolling performance

---

## [0.4.4] - 2025-08-12

### Added
- **Currency Settings**: Full customization of base currency and target currencies
- **Base Currency Selector**: Choose from 12+ currencies including GHS, USD, EUR, GBP, JPY
- **Target Currency Selection**: Pick up to 4 currencies for conversion with visual feedback
- **Enhanced Currency Display**: Real exchange rates with proper conversion calculations

### Fixed
- **Currency Converter**: Fixed exchange rate calculations and API response handling
- **Animated Refresh Button**: Refresh button now properly animates during loading
- **Favicon Fallbacks**: Site icons now fallback to logo-white.png when unavailable
- **Exchange Rate Display**: Shows actual rates instead of "--" placeholders

### Improved
- **Settings Organization**: Added comprehensive currency configuration section
- **Persistent Storage**: All currency preferences save to localStorage
- **Visual Feedback**: Shows selected currency count (X/4) in settings
- **Error Handling**: Better fallback mechanisms for failed favicon loads

---

## [0.4.3] - 2025-08-12

### Added
- **Customizable Quick Links Count**: Users can now select 5-10 quick links from settings
- **Quick Links Settings**: New dedicated settings section with dropdown selector
- **Dynamic Link Limits**: Add button and display adapt to selected count
- **Persistent Preference**: Quick links count setting saves to localStorage

### Improved
- **Settings Organization**: Added Quick Links section with Link icon
- **User Control**: Full customization of quick access sites quantity
- **Default Experience**: Maintains 5 links as default for new users
- **Immediate Updates**: Changes apply instantly without page refresh

---

## [0.4.2] - 2025-08-12

### Added
- **Site Logos**: Quick links now display favicons with fallback to first letter of site name
- **Flexible Layout**: Quick links use flex wrap layout for better responsive design
- **Maximum 10 Sites**: Increased capacity from 5 to 10 quick access sites
- **Smart Add Button**: Add button only appears when under 10 sites limit

### Improved
- **Single Line Display**: Sites prioritize single line layout with wrapping when needed
- **Consistent Sizing**: All quick link cards have uniform 80px width
- **Better Fallbacks**: Graceful handling when site favicons fail to load
- **Compact Design**: Optimized spacing for showing more sites efficiently

---

## [0.4.1] - 2025-08-11

### Fixed
- **Settings Panel**: Resolved blank page issue by adding missing DollarSign icon import
- **Currency Display**: Fixed loading states and rate display formatting
- **Modal Positioning**: Improved modal z-index and backdrop behavior

### Improved
- **Error Handling**: Better fallback for failed API requests
- **Loading States**: Added spinning refresh icon and loading messages
- **Rate Formatting**: Shows "--" when exchange rates are unavailable

---

## [0.4.0] - 2025-08-11

### Added
- **Currency Converter**: Real-time exchange rates with Open Exchange Rates API
- **Base Currency Selection**: Choose from 10+ currencies including GHS, USD, EUR, GBP
- **Bottom-Left Positioning**: Currency widget positioned in bottom-left corner
- **Settings Integration**: Toggle currency converter visibility from settings panel

### Features
- **Live Refresh**: Manual refresh button with loading animation
- **Persistent Settings**: Saves currency preferences to localStorage
- **Compact Display**: Shows up to 4 target currencies against base currency
- **Last Updated**: Timestamp showing when rates were last fetched

---

## [0.3.2] - 2025-08-11

### Added
- **Modal Interface**: Clean popup form for adding/editing quick links
- **Top Sites Integration**: Uses Chrome's topSites API for real browser history
- **Custom Shortcuts**: Users can add their own quick access links
- **Smart Deletion**: Remove top sites or delete custom shortcuts independently

### Improved
- **Hybrid Display**: Combines top visited sites with user custom additions
- **Inline Add Button**: Plus icon integrated as 6th item in site grid
- **No Layout Disruption**: Modal prevents content shifting during editing
- **Persistent Storage**: Remembers custom shortcuts and site removals

---

## [0.3.1] - 2025-08-11

### Fixed
- **Horizontal Layout Sizing**: Clock and date widgets now maintain consistent sizes in horizontal layouts
- **Component Alignment**: Added flex-shrink-0 and consistent backgrounds for better visual alignment

### Improved
- **Settings Organization**: Grouped clock and date settings into dedicated sections
- **Visual Hierarchy**: Added left borders and indentation for better settings navigation
- **User Experience**: Clock settings (style, format, timezone) now grouped together
- **User Experience**: Date settings (style, visibility) now grouped together

---

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