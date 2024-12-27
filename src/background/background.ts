/// <reference types="firefox-webext-browser" />

browser.runtime.onInstalled.addListener(
  (details: browser.runtime._OnInstalledDetails) => {
    if (details.reason === 'install') {
      browser.tabs.create({url: 'welcome/welcome.html'})
    }
  }
)
