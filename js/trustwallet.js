// trustwallet.js
// No need to declare web3, contractAddress, or contractABI here - just use the global variables from common.js

async function connectTrustWallet() {
    // Use window.ethereum to detect wallets
    if (typeof window.ethereum === 'undefined') {
        alert('Ethereum wallet (like MetaMask or TrustWallet) is not installed!');
        return;
    }

    // Check if it's TrustWallet by looking for a unique identifier
    if (window.ethereum.isTrust) {
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum); // Using window.ethereum for Web3 instance
            alert('TrustWallet connected successfully');
            
            // Load the configuration and ABI for the connected network
            await loadConfigAndABI('eth');
        } catch (error) {
            alert('Failed to connect to TrustWallet');
            console.error('TrustWallet connection error:', error);
        }
    } else {
        alert('This is not TrustWallet!');
    }
}

// Add event listener to connect button
window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('connectTrustWalletButton').addEventListener('click', connectTrustWallet);
});

