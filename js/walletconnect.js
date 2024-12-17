// Function to initialize connection and check network for WalletConnect
async function connectWalletConnect() {
    if (window.WalletConnectProvider) {
        try {
            // Request wallet connection
            const provider = new WalletConnectProvider({ rpc: { 1: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY' } });
            await provider.enable();
            
            const accounts = await provider.request({ method: 'eth_accounts' });

            if (accounts.length === 0) {
                console.error('No accounts found. Please ensure WalletConnect is unlocked.');
                return;
            }

            const account = accounts[0];
            console.log("Connected to WalletConnect account:", account);

            // Update UI with connected account
            document.getElementById('claimAirdropButton').disabled = false;

            // Check the current network
            const currentChainId = await provider.request({ method: 'eth_chainId' });
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
            document.getElementById('claimAirdropButton').innerText = `Claim Airdrop (${defaultNetwork.toUpperCase()})`;

            return account;
        } catch (error) {
            console.error("Error connecting to WalletConnect:", error);
        }
    } else {
        alert("WalletConnect is not installed. Please install WalletConnect to continue.");
    }
}

// Add this block to ensure DOM is ready before adding event listeners for WalletConnect
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the claim airdrop button
    const claimButton = document.getElementById('claimAirdropButton');
    if (claimButton) {
        claimButton.addEventListener('click', async () => {
            const account = await connectWalletConnect();
            if (account) {
                console.log("WalletConnect connected, account:", account);
            }
        });
    }
});

