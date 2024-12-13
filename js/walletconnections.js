// walletConnection.js

console.log('walletConnection.js loaded successfully');

// Function to check if MetaMask is available
function isMetaMask() {
    return (window.ethereum && /metamask/i.test(window.navigator.userAgent));
}

// Function to check if TrustWallet is available
function isTrustWallet() {
    return (window.ethereum && /trust/i.test(window.navigator.userAgent));
}

// Function to handle wallet connection based on detection
function connectWallet() {
    if (isMetaMask()) {
        console.log('MetaMask detected');
        // Call MetaMask-specific connection logic (assuming it's in metamask.js)
        connectMetaMask();
    } else if (isTrustWallet()) {
        console.log('TrustWallet detected');
        // Call TrustWallet-specific connection logic (assuming it's in trustwallet.js)
        connectTrustWallet();
    } else {
        console.log('No supported wallet detected');
        alert('Please install MetaMask or TrustWallet to proceed.');
    }
}

// Attach event listeners for wallet connection buttons
document.getElementById('connectMetaMaskButton').addEventListener('click', connectWallet);
document.getElementById('connectTrustWalletButton').addEventListener('click', connectWallet);
