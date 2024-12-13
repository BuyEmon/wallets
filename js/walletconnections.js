console.log('walletConnection.js loaded successfully');

// Function to check if MetaMask is available
function isMetaMask() {
    return window.ethereum && /metamask/i.test(window.navigator.userAgent);
}

// Function to check if TrustWallet is available
function isTrustWallet() {
    return window.ethereum && /trust/i.test(window.navigator.userAgent);
}

// Function to handle MetaMask connection
function connectMetaMask() {
    console.log('MetaMask detected');
    if (isMetaMask()) {
        // MetaMask connection logic from metamask.js
        connectMetaMask();  // Assuming this function is defined in metamask.js
    } else {
        alert('MetaMask is not installed.');
    }
}

// Function to handle TrustWallet connection
function connectTrustWallet() {
    console.log('TrustWallet detected');
    if (isTrustWallet()) {
        // TrustWallet connection logic from trustwallet.js
        connectTrustWallet();  // Assuming this function is defined in trustwallet.js
    } else {
        alert('TrustWallet is not installed.');
    }
}

// Attach event listeners for wallet connection buttons
document.getElementById('connectMetaMaskButton').addEventListener('click', connectMetaMask);
document.getElementById('connectTrustWalletButton').addEventListener('click', connectTrustWallet);

