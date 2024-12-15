// Shared logic to detect which wallet is being used
let currentWallet = null;

async function detectWallet() {
    // Detect MetaMask for Ethereum
    if (window.ethereum && window.ethereum.isMetaMask) {
        currentWallet = 'MetaMask';
        console.log("MetaMask detected");
        return 'ethereum';
    }
    // Detect Trust Wallet for BSC
    else if (window.tronLink) {
        currentWallet = 'TronLink';
        console.log("TronLink detected");
        return 'tron';
    }
    // Add more wallets detection as needed
    else {
        alert("No supported wallet detected. Please install MetaMask or TronLink.");
        return null;
    }
}

// Function to handle deep link routing (optional based on mobile logic)
function handleDeepLink(walletType) {
    // Implement deep link logic for mobile
    if (walletType === 'ethereum') {
        window.location.href = 'metamask://';
    } else if (walletType === 'tron') {
        window.location.href = 'tronlink://';
    }
}
