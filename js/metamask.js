console.log("metamask.js loaded");



// metamask.js
// No need to declare web3, contractAddress, or contractABI here - just use the global variables from common.js

async function connectMetaMask() {
    if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed!');
        return;
    }

    try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum); // Initialize Web3 with the current provider
        console.log('MetaMask connected:', accounts);

        // Enable the claim airdrop button after connecting
        const claimButton = document.getElementById('claimAirdropButton');
        if (claimButton) {
            claimButton.disabled = false; // Enable the button
            console.log('Claim Airdrop button enabled');
        }

        alert('MetaMask connected successfully');
    } catch (error) {
        alert('Failed to connect to MetaMask');
        console.error('MetaMask connection error:', error);
    }
}

// Add event listener to connect button
window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('connectButton').addEventListener('click', connectMetaMask);
});
