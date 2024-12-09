// trustwallet.js
// No need to declare web3, contractAddress, or contractABI here - just use the global variables from common.js

async function connectTrustWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert('TrustWallet is not installed!');
        return;
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        accounts = accounts;
        alert('TrustWallet connected successfully');
    } catch (error) {
        alert('Failed to connect to TrustWallet');
        console.error('TrustWallet connection error:', error);
    }
}

// Add event listener to connect button
window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('connectButton').addEventListener('click', connectTrustWallet);
});

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('connectTrustWalletButton').addEventListener('click', connectTrustWallet);
  loadConfig();
});
