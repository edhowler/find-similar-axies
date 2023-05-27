function createLink() {
    if (/^https:\/\/app\.axieinfinity\.com\/marketplace\/axies\/\d+\/$/.test(window.location.href)) {
        let link = document.createElement("a");
        link.id = "find-similar-extension";
        link.innerHTML = "Find similar axies";
        link.style.position = "fixed";
        link.style.top = "164px";
        link.style.right = "30px";
        link.style.paddingLeft = "16px";
        link.style.paddingRight = "16px";
        link.style.paddingTop = "10px";
        link.style.height = "40px";
        link.style.justifyContent = "center";
        link.style.alignItems = "center";
        link.style.borderRadius = "8px";
        link.style.color = "white";
        link.style.backgroundColor = "rgb(40, 44, 52)";
        link.style.zIndex = "10000"; // This ensures the button stays on top of other elements

        let calculated = false;

        link.onmouseover = function () {
            if (calculated) {
                return;
            }
            calculated = true;
            let divs = Array.from(document.querySelectorAll('div'));
            let part_names = [];
            let part_types = [];

            divs.forEach(div => {
                let classes = Array.from(div.classList);
                for (let cls of classes) {
                    if (cls.startsWith("OriginCard_CardName")) {
                        part_names.push(div.textContent.toLowerCase().replace(/\?/, '').replace(/[^\w]/gi, '-').replace(/__+/g, '-'));
                        break;
                    }
                }
            });

            let images = Array.from(document.querySelectorAll('img'));
            images.forEach(image => {
                let classes = Array.from(image.classList);
                for (let cls of classes) {
                    if (cls.startsWith("OriginCard_Image")) {
                        part_types.push(image.src.split('/').pop().split('-')[1]);
                        break;
                    }
                }
            });

            let redirect_location = "https://app.axieinfinity.com/marketplace/axies/?auctionTypes=Sale"
            "parts=horn-anemone&parts=horn-antenna&parts=ears-early-bird&parts=horn-p4r451t3&parts=eyes-kotaro"
            for (let i = 0; i < part_names.length; i++) {
                redirect_location += "&parts=" + part_types[i] + "-" + part_names[i];
            }
            link.href = redirect_location;
        };

        observer.disconnect();  // Disconnect the observer before modifying the DOM
        document.body.appendChild(link);
        observer.observe(document.body, {childList: true});  // Reconnect the observer after modifying the DOM
    }
}

// Set up a MutationObserver to monitor changes to the body of the page
let observer = new MutationObserver(function (mutations) {
    // If our custom link already exists, remove it
    let existingLink = document.getElementById("find-similar-extension");
    if (existingLink) {
        existingLink.parentNode.removeChild(existingLink);
    }
    // Create the link
    createLink();
});

if (/^https:\/\/app\.axieinfinity\.com/.test(window.location.href)) {
    // Tell the observer to monitor the body of the page for childList changes
    observer.observe(document.body, { childList: true });
}
