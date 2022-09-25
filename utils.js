export function highlight() {
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

