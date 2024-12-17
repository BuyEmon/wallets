console.debug('trustwallet.js loaded');

if (typeof window.ethereum !== 'undefined' && window.ethereum.isTrustWallet) {
    console.debug('TrustWallet is available');
} else {
    console.debug('TrustWallet is NOT available');
}


// Function to initialize connection and check network for TrustWallet
async function connectTrustWallet() {
    if (window.ethereum) {
        try {
            // Request wallet connection
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            if (accounts.length === 0) {
                console.error('No accounts found. Please ensure TrustWallet is unlocked.');
                return;
            }

            const account = accounts[0];
            console.log("Connected to TrustWallet account:", account);

            // Update UI with connected account
            document.getElementById('claimTrustwalletAirdropButton').disabled = false;

            // Check the current network
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
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
            document.getElementById('claimTrustwalletAirdropButton').innerText = `Claim Airdrop (${defaultNetwork.toUpperCase()})`;

            return account;
        } catch (error) {
            console.error("Error connecting to TrustWallet:", error);
        }
    } else {
        alert("TrustWallet is not installed. Please install TrustWallet to continue.");
    }
}

// Add this block to ensure DOM is ready before adding event listeners for TrustWallet
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the claim airdrop button
    const claimButton = document.getElementById('claimTrustwalletAirdropButton');
    if (claimButton) {
        claimButton.addEventListener('click', async () => {
            const account = await connectTrustWallet();
            if (account) {
                console.log("TrustWallet connected, account:", account);
            }
        });
    }
});

