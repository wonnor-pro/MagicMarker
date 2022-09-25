let color = "#fbf595";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`);
  console.log("onHotkey");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {msg: "Mark"})
  })
});


// chrome.commands.onCommand.addListener((command) => {
//   console.log(`Command "${command}" triggered`);
// });