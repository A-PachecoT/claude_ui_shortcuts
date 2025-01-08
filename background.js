chrome.action.onClicked.addListener(async () => {
  try {
    // Using activeTab permission to send message to the current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url.startsWith('https://claude.ai')) {
      await chrome.tabs.sendMessage(tab.id, { action: "toggleShortcuts" });
    } else {
      // Open Claude in a new tab if we're not on a Claude page
      chrome.tabs.create({ url: 'https://claude.ai' });
    }
  } catch (error) {
    console.log('Could not send message to content script:', error);
  }
});
