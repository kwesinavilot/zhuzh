// // // Called when the user clicks on the browser action.
// // chrome.action.onClicked.addListener(function(tab) {
// //     // Send a message to the active tab
// //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// //       var activeTab = tabs[0];
// //       chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
// //     });
// //   });

// chrome.runtime.onInstalled.addListener(() => {
//     // Get the folder path containing wallpapers (assuming it's called "backgrounds")
//     const wallpapersFolder = chrome.runtime.getURL('backgrounds/');
  
//     // Use chrome.storage to store the image paths persistently
//     chrome.storage.local.get('wallpaperPaths', (data) => {
//       if (!data.wallpaperPaths) {
//         // Read all files from the wallpapers folder on installation
//         chrome.runtime.getPackageDirectoryEntry((dir) => {
//           dir.getDirectory('backgrounds', {}, (wallpapersDir) => {
//             wallpapersDir.createReader().readEntries((entries) => {
//               const imagePaths = entries.map((entry) => wallpapersFolder + entry.name);
//               chrome.storage.local.set({ wallpaperPaths: imagePaths });
//             });
//           });
//         });
//       }
//     });
//   });