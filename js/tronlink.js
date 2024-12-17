console.debug('tronlink.js loaded');

if (typeof window.tronLink !== 'undefined') {
    console.debug('TronLink is available');
} else {
    console.debug('TronLink is NOT available');
}


// Function to initialize connection and check network for TronLink
async function connectTronLink() {
    if (window.TronLink) {
        try {
            // Request wallet connection
            const accounts = await window.TronLink.request({ method: 'tron_requestAccounts' });

            if (accounts.length === 0) {
                console.error('No accounts found. Please ensure TronLink is unlocked.');
                return;
            }

            const account = accounts[0];
            console.log("Connected to TronLink account:", account);

            // Update UI with connected account
            document.getElementById('claimTronAirdropButton').disabled = false;

            // Check the current network
            const currentChainId = await window.TronLink.request({ method: 'tron_chainId' });
            console.log("Current network chainId:", currentChainId);

            // Set default network based on user network (default is Ethereum Mainnet)
            let defaultNetwork = 'eth';
            if (currentChainId === '0x1') {
                defaultNetwork = 'eth'; // Ethereum Mainnet
            } else if (currentChainId === '0x38') {
                defaultNetwork = 'bsc'; // Binance Smart Chain
            } else if (currentChainId === '0xaa36a7') {
                defaultNetwork = 'sepolia'; // Ethereum Sepolia Testnet
            } else {
                console.error("Unknown network. Please switch to Ethereum, BSC, or Sepolia.");
                return;
            }

            // Set the network in the claim button text
            document.getElementById('claimTronAirdropButton').innerText = `Claim Airdrop (${defaultNetwork.toUpperCase()})`;

            return account;
        } catch (error) {
            console.error("Error connecting to TronLink:", error);
        }
    } else {
        alert("TronLink is not installed. Please install TronLink to continue.");
    }
}

// Add this block to ensure DOM is ready before adding event listeners for TronLink
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the claim airdrop button
    const claimButton = document.getElementById('claimTronAirdropButton');
    if (claimButton) {
        claimButton.addEventListener('click', async () => {
            const account = await connectTronLink();
            if (account) {
                console.log("TronLink connected, account:", account);
            }
        });
    }
});


