// loader.js

(async function() {
    try {
        const wallet = detectWallet();
        const loader = await import(`./${wallet}.js`);
        loader.default();
    } catch (error) {
        console.error("Error loading wallet-specific script:", error);
        alert("Failed to load the wallet-specific functionality. Please try again.");
    }

    // Detects the selected wallet
    function detectWallet() {
        // Logic for detecting which wallet to use
        // Placeholder, update according to app-specific logic
        return "metamask"; // Default to MetaMask for now
    }
})();




