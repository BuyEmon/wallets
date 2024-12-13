console.log('metamask.js loaded successfully');

// Function to connect MetaMask
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

        // Store accounts globally for later use (eth.js will access this)
        window.accounts = accounts;

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

// Attach event listener for MetaMask connection
window.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectMetaMaskButton'); // Use the correct ID from the HTML
    if (connectButton) {
        connectButton.addEventListener('click', connectMetaMask);
    } else {
        console.error('MetaMask button not found in the DOM');
    }
});

