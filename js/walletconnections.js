console.log('walletConnection.js loaded successfully');

// Function to handle wallet connection based on detection
async function connectWallet() {
    // Check if window.ethereum is present (Ethereum-compatible wallets like MetaMask and TrustWallet)
    if (window.ethereum) {
        // Check for MetaMask specifically
        if (/metamask/i.test(window.navigator.userAgent)) {
            console.log('MetaMask detected');
            connectMetaMask(); // Call MetaMask connection function
        } 
        // Check for TrustWallet specifically
        else if (/trust/i.test(window.navigator.userAgent)) {
            console.log('TrustWallet detected');
            connectTrustWallet(); // Call TrustWallet connection function
        } 
        else {
            console.log('Ethereum-compatible wallet detected');
            alert('Please install MetaMask or TrustWallet to proceed.');
        }
    } else {
        console.log('No supported wallet detected');
        alert('Please install MetaMask or TrustWallet to proceed.');
    }
}

// Attach event listeners for wallet connection buttons
document.getElementById('connectMetaMaskButton').addEventListener('click', connectWallet);
document.getElementById('connectTrustWalletButton').addEventListener('click', connectWallet);


