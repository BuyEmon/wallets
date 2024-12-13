// Script loader function
function loadScript(scriptSrc) {
    return new Promise((resolve, reject) => {
        // Debug: Check if script is already loaded
        console.log(`Checking if script ${scriptSrc} is already loaded`);
        if (document.querySelector(`script[src="${scriptSrc}"]`)) {
            console.log(`${scriptSrc} is already loaded`);
            resolve(scriptSrc + " already loaded"); // Prevent duplicate loading
            return;
        }

        // Debug: Log the script loading attempt
        console.log(`Loading script: ${scriptSrc}`);
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.type = "text/javascript";
        
        // Debug: Log when script is loaded
        script.onload = () => {
            console.log(`${scriptSrc} loaded successfully!`);
            resolve(scriptSrc + " loaded successfully");
        };

        // Debug: Log if script fails to load
        script.onerror = () => {
            console.error("Failed to load: " + scriptSrc);
            reject(new Error("Failed to load: " + scriptSrc));
        };
        
        document.head.appendChild(script);
    });
}

// Load wallet-specific scripts
async function loadWalletScripts(wallet) {
    try {
        console.log(`Attempting to load wallet scripts for ${wallet}`);
        
        switch (wallet) {
            case "metamask":
                // Debug: Log MetaMask script loading process
                console.log("Loading MetaMask-specific scripts");
                await loadScript("https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js");
                await loadScript("js/common.js");      // Shared logic
                await loadScript("js/eth.js");         // Ethereum logic
                await loadScript("js/metamask.js");    // MetaMask-specific logic
                break;
            case "trustwallet":
                // Debug: Log TrustWallet script loading process
                console.log("Loading TrustWallet-specific scripts");
                await loadScript("https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js");
                await loadScript("js/common.js");      // Shared logic
                await loadScript("js/bsc.js");         // BSC logic (for TrustWallet)
                await loadScript("js/trustwallet.js"); // TrustWallet-specific logic
                break;
            case "tronlink":
                // Debug: Log TronLink script loading process
                console.log("Loading TronLink-specific scripts");
                await loadScript("https://cdn.jsdelivr.net/npm/tronweb/dist/TronWeb.js");
                await loadScript("js/common.js");      // Shared logic
                await loadScript("js/tron.js");        // Tron-specific logic
                await loadScript("js/tronlink.js");    // TronLink-specific logic
                break;
            default:
                console.error("Unknown wallet type:", wallet);
        }
        
        console.log(`${wallet} scripts loaded successfully!`);
        
    } catch (error) {
        // Debug: Catch and log any errors during script loading
        console.error("Error loading wallet scripts:", error);
    }
}




