/**
 * Check if the code is running in an extension context or regular React mode.
 * @returns {boolean} True if running in an extension context, false otherwise.
 */
export function isExtensionContext() {
    // Check if the `chrome` object is defined and has the necessary properties
    const isChromeObjectAvailable = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;
  
    // Check if the code is running in a React development environment
    // const isReactDevelopmentMode = process.env.NODE_ENV === 'development';
  
    // Return true if the `chrome` object is available and the code is not running in React development mode
    return isChromeObjectAvailable // && !isReactDevelopmentMode;
  }