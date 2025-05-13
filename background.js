
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("📩 Message received in background:", message);
  sendResponse({ status: "✔️ Background got your message!" });
});

console.log("✅ Background service worker loaded");

chrome.runtime.onInstalled.addListener(() => {
  console.log("📦 Extension installed");
});

