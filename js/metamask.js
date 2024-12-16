// Function to initialize connection and check network
async function connectMetaMask(config, abi, expectedChainIds) {
    if (window.ethereum) {
        try {
            // Request wallet connection
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            if (accounts.length === 0) {
                console.error('No accounts found. Please ensure MetaMask is unlocked.');
                return;
            }

            const account = accounts[0];
            console.log("Connected to MetaMask account:", account);

            // Update UI with connected account
            document.getElementById('claimAirdropButton').disabled = false;

            // Check the current network
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
            console.log("Current network chainId:", currentChainId);

            // Enable airdrop based on network
            await checkNetworkAndEnableClaimButton(currentChainId, expectedChainIds);
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    } else {
        alert("MetaMask is not installed. Please install MetaMask to continue.");
    }
}

// Add other wallet logic as needed for TronLink, TrustWallet, etc.

