console.log('loader.js is loaded');


document.addEventListener('DOMContentLoaded', function () {
    // Event listeners for wallet connection buttons
    document.getElementById('connectButton').addEventListener('click', function() {
        loadConfigAndABI('eth');  // Load config and ABI for Ethereum
        connectMetaMask();        // Then call MetaMask connection logic
    });

    document.getElementById('connectTronlinkButton').addEventListener('click', function() {
        loadConfigAndABI('tron');  // Load config and ABI for Tron
        connectTronLink();         // Then call TronLink connection logic
    });

    document.getElementById('connectTrustwalletButton').addEventListener('click', function() {
        loadConfigAndABI('bsc');  // Load config and ABI for BSC
        connectTrustWallet();     // Then call TrustWallet connection logic
    });
});
