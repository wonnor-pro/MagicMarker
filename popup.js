// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log("onClick");
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: highlight,
    });
});

function makeEditableAndHighlight(colour) {
    let range, sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    // Use HiliteColor since some browsers apply BackColor to the whole block
    if (!document.execCommand("HiliteColor", false, colour)) {
        document.execCommand("BackColor", false, colour);
    }
    document.designMode = "off";
}

function highlight() {
    chrome.storage.sync.get("color", ({ color }) => {
        let range, sel = window.getSelection();
        
        // Get the text
        console.log(window.getSelection().toString());

        if (sel.rangeCount && sel.getRangeAt) {
            range = sel.getRangeAt(0);
        }
        document.designMode = "on";
        if (range) {
            sel.removeAllRanges();
            sel.addRange(range);
        }


        document.execCommand("HiliteColor", false, color);
        sel.removeAllRanges();
        document.designMode = "off";
    });

}

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    console.log("setColour");
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}