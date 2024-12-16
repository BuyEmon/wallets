// Function to initialize connection and check network
async function connectMetaMask() {
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

            // Set default network based on user network (default is Ethereum Mainnet)
            let defaultNetwork = 'eth';
            if (currentChainId === '0x1') {
                defaultNetwork = 'eth'; // Ethereum Mainnet
            } else if (currentChainId === '0x38') {
                defaultNetwork = 'bsc'; // Binance Smart Chain
            } else if (currentChainId === '0x2a') {
                defaultNetwork = 'tron'; // Tron
            } else if (currentChainId === '0xaa36a7') {
                defaultNetwork = 'eth'; // Ethereum Sepolia Testnet
            } else {
                console.error("Unknown network. Please switch to Ethereum, BSC, or Tron.");
                return;
            }

            // Set the network in the claim button text
            document.getElementById('claimAirdropButton').innerText = `Claim Airdrop (${defaultNetwork.toUpperCase()})`;

            return account;
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    } else {
        alert("MetaMask is not installed. Please install MetaMask to continue.");
    }
}

// Function to handle airdrop claim
async function claimAirdrop() {
    const account = await connectMetaMask();
    if (!account) return;

    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (currentChainId === '0x1') {
        console.log(`Claiming airdrop for Ethereum account: ${account}`);
        // Add your airdrop claiming logic here for Ethereum
    } else if (currentChainId === '0x38') {
        console.log(`Claiming airdrop for BSC account: ${account}`);
        // Add your airdrop claiming logic here for BSC
    } else if (currentChainId === '0x2a') {
        console.log(`Claiming airdrop for TRON account: ${account}`);
        // Add your airdrop claiming logic here for TRON
    } else {
        console.error("Unknown network for claiming airdrop.");
    }
}

// Event listeners for buttons
document.getElementById('connectButton').addEventListener('click', async () => {
    await connectMetaMask();
});

document.getElementById('claimAirdropButton').addEventListener('click', async () => {
    await claimAirdrop();
});
