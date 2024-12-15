// This file loads the common.js and checks the wallet/network

// Load common.js for wallet and network detection
(async function loadCommonJS() {
    try {
        await detectWallet(); // Detect wallet (MetaMask, TrustWallet, etc.)
        await detectNetwork(); // Detect and handle network
    } catch (error) {
        console.error("Error in loader.js: ", error);
    }
})();

// You can also add specific checks here to dynamically load MetaMask or TrustWallet scripts based on user choice

