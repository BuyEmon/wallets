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
            // Remove the alert and handle any additional logic for unsupported Ethereum wallets
        }
    } else {
        console.log('No supported wallet detected');
        // No alert here either, just log the message if needed
    }
}

// Attach event listeners for wallet connection buttons
document.getElementById('connectMetaMaskButton').addEventListener('click', connectWallet);
document.getElementById('connectTrustWalletButton').addEventListener('click', connectWallet);



