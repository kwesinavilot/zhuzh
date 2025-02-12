chrome.runtime.onMessage.addListener((message, sender) => {
    console.log("Received message:", message);

    if (message.action === 'openSidePanel') {
        (async () => {
            const tabId = message.tabId || sender.tab?.id;

            if (!tabId) {
                console.error('No tab found for side panel request');
                return;
            }

            try {
                const tab = await chrome.tabs.get(tabId);
                if (tab.url && tab.url.startsWith("chrome://")) {
                    console.error("Cannot open side panel on a chrome:// URL:", tab.url);
                    return;
                }

                await chrome.sidePanel.open({ tabId: tabId });
                await chrome.sidePanel.setOptions({
                    tabId: tabId,
                    path: 'sidepanel.html',
                    enabled: true
                });

                chrome.runtime.sendMessage({
                    action: 'setPanel',
                    panel: message.feature
                });
            } catch (error) {
                console.error('Error setting up side panel:', error);
            }
        })();
        return true;
    }

    if (message.action === 'closePanel') {
        (async () => {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            const tab = tabs[0];

            if (!tab?.id) {
                console.error('No active tab found');
                return;
            }

            try {
                await chrome.sidePanel.setOptions({
                    tabId: tab.id,
                    enabled: false
                });

                chrome.runtime.sendMessage({
                    action: 'setPanel',
                    panel: null
                });
            } catch (error) {
                console.error('Error closing side panel:', error);
            }
        })();
        return true;
    }
});

// Context menu setup
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'summarize',
        title: 'Summarize with Delight',
        contexts: ['page'],
        enabled: true
    });
});

chrome.contextMenus.onClicked.addListener((_info, tab) => {
    if (!tab?.id || !tab?.windowId) {
        console.error('No tab found for context menu action');
        return;
    }

    (async () => {
        try {
            if (tab.url && tab.url.startsWith("chrome://")) {
                console.error("Cannot open side panel on a chrome:// URL");
                return;
            }

            await chrome.sidePanel.open({ tabId: tab.id, windowId: tab.windowId });
            await chrome.sidePanel.setOptions({
                tabId: tab.id,
                path: 'sidepanel.html',
                enabled: true
            });

            chrome.runtime.sendMessage({
                action: 'setPanel',
                panel: 'summary'
            });
        } catch (error) {
            console.error('Error setting up side panel:', error);
        }
    })();
    return true;
});

chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

// Update context menu based on the active tab
chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
    if (!tab.url) return;

    if (changeInfo.status === 'complete' && tab.active) {
        const isUtilityPage = tab.url && tab.url.startsWith('chrome://');
        chrome.contextMenus.update('summarize', { enabled: !isUtilityPage });
    }
});

// Add connection listener
chrome.runtime.onConnect.addListener((port) => {
    console.log('Connected to port:', port.name);

    port.onMessage.addListener((msg) => {
        console.log('Received port message:', msg);
    });
});
