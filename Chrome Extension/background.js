// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ counter: 1 });
  console.log('Counter has been set', `counter: ${counter}`);
});