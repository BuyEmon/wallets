// trustwallet.js
// No need to declare web3, contractAddress, or contractABI here - just use the global variables from common.js

async function connectTrustWallet() {
    if (typeof window.trustwallet === 'undefined') {
        alert('TrustWallet is not installed!');
        return;
    }

    try {
        // Request account access if needed
        const accounts = await window.trustwallet.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.trustwallet);
        accounts = accounts;
        alert('TrustWallet connected successfully');
        
        // Load the configuration and ABI for the connected network
        await loadConfigAndABI('eth'); // Pass 'eth' or appropriate network identifier here
    } catch (error) {
        alert('Failed to connect to TrustWallet');
        console.error('TrustWallet connection error:', error);
    }
}

// Add event listener to connect button
window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('connectTrustWalletButton').addEventListener('click', connectTrustWallet);
});
