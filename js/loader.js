// Script loader function
function loadScript(scriptSrc) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${scriptSrc}"]`)) {
            resolve(scriptSrc + " already loaded"); // Prevent duplicate loading
            return;
        }

        const script = document.createElement("script");
        script.src = scriptSrc;
        script.type = "text/javascript";
        script.onload = () => resolve(scriptSrc + " loaded successfully");
        script.onerror = () => reject(new Error("Failed to load: " + scriptSrc));
        document.head.appendChild(script);
    });
}

// Load wallet-specific scripts
async function loadWalletScripts(wallet) {
    try {
        switch (wallet) {
            case "metamask":
                await loadScript("https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js");
                await loadScript("js/common.js");
                await loadScript("js/eth.js");
                await loadScript("js/metamask.js");
                break;
            case "trustwallet":
                await loadScript("https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js");
                await loadScript("js/common.js");
                await loadScript("js/bsc.js");
                await loadScript("js/trustwallet.js");
                break;
            case "tronlink":
                await loadScript("https://cdn.jsdelivr.net/npm/tronweb/dist/TronWeb.js");
                await loadScript("js/common.js");
                await loadScript("js/tronlink.js");
                break;
            default:
                console.error("Unknown wallet type:", wallet);
        }
        console.log(wallet + " scripts loaded successfully!");
    } catch (error) {
        console.error("Error loading wallet scripts:", error);
    }
}




