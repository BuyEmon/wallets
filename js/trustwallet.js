// trustwallet.js

console.log('trustwallet.js loaded successfully');

// Function to detect TrustWallet
function isTrustWallet() {
    return /TrustWallet/i.test(navigator.userAgent);
}

// Function to connect to TrustWallet
async function connectTrustWallet() {
    if (!isTrustWallet()) {
        alert('This is not TrustWallet!');
        console.log('This is not TrustWallet!');
        return;
    }

    try {
        if (typeof window.ethereum === 'undefined') {
            alert('TrustWallet is not installed!');
            return;
        }

        // Request account access for TrustWallet
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum); // Initialize Web3 with the current provider
        console.log('TrustWallet connected:', accounts);

        // Store accounts globally for later use
        window.accounts = accounts;

        // Enable the claim airdrop button after connecting
        const claimButton = document.getElementById('claimAirdropButton');
        if (claimButton) {
            claimButton.disabled = false; // Enable the button
            console.log('Claim Airdrop button enabled');
        }

        alert('TrustWallet connected successfully');
    } catch (error) {
        alert('Failed to connect to TrustWallet');
        console.error('TrustWallet connection error:', error);
    }
}

// Attach event listener to TrustWallet connection button
window.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectTrustWalletButton'); // Use the correct ID
    if (connectButton) {
        connectButton.addEventListener('click', connectTrustWallet);
    } else {
        console.error('TrustWallet button not found in the DOM');
    }
});

