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
                // Load MetaMask specific scripts
                await loadScript("https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js");
                await loadScript("js/common.js");      // Shared logic
                await loadScript("js/eth.js");         // Ethereum logic
                await loadScript("js/metamask.js");    // MetaMask specific logic
                break;
            case "trustwallet":
                // Load TrustWallet specific scripts
                await loadScript("https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js");
                await loadScript("js/common.js");      // Shared logic
                await loadScript("js/bsc.js");         // BSC logic (for TrustWallet)
                await loadScript("js/trustwallet.js"); // TrustWallet specific logic
                break;
            case "tronlink":
                // Load TronLink specific scripts
                await loadScript("https://cdn.jsdelivr.net/npm/tronweb/dist/TronWeb.js");
                await loadScript("js/common.js");      // Shared logic
                await loadScript("js/tron.js");        // Tron-specific logic
                await loadScript("js/tronlink.js");    // TronLink specific logic
                break;
            default:
                console.error("Unknown wallet type:", wallet);
        }
        console.log(wallet + " scripts loaded successfully!");
    } catch (error) {
        console.error("Error loading wallet scripts:", error);
    }
}




