window.addEventListener('DOMContentLoaded', async () => {
    let network = await detectNetwork(); // Detect network on load
    await loadConfig(network); // Load config based on the detected network

    // Add button event listeners
    document.getElementById('connectButton').addEventListener('click', connectMetaMask);
    document.getElementById('claimAirdropButton').addEventListener('click', claimAirdrop);
    redirectToMetaMask(); // Handle deep linking for mobile
});

async function detectNetwork() {
    if (window.ethereum) {
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log("MetaMask chainId:", chainId);

        // Network Detection based on chainId
        if (chainId === '0x1') { // Ethereum Mainnet
            return 'eth';
        } else if (chainId === '0x38') { // Binance Smart Chain
            return 'bsc';
        } else if (chainId === '0x41') { // Tron Test Network or other Tron chain
            return 'tron';
        } else {
            console.error("Unsupported network detected");
            alert("Unsupported network detected");
            return undefined;
        }
    } else {
        console.error("No Ethereum wallet detected");
        alert("Please install MetaMask");
        return undefined;
    }
}

