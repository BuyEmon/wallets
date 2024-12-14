window.addEventListener('DOMContentLoaded', async () => {
    const network = await detectNetwork(); // Detect network based on available wallet
    console.log('Detected Network:', network); // Add log to see detected network
    if (network !== 'undefined') {
        await loadConfig(network); // Load the config for the detected network
    } else {
        alert("No supported wallet detected. Please install MetaMask, TronLink, or TrustWallet.");
    }

    // Add button event listeners
    document.getElementById('connectButton').addEventListener('click', () => connectMetaMask(network));
    document.getElementById('claimAirdropButton').addEventListener('click', claimAirdrop);
    redirectToMetaMask(); // Handle deep linking for mobile
});

// Detect available wallet and network
async function detectNetwork() {
    // Check for MetaMask (Ethereum) first
    if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log("MetaMask chainId:", chainId); // Log the chainId to verify
        if (chainId === '0x1') return 'eth'; // Ethereum Mainnet
        if (chainId === '0x38') return 'bsc'; // Binance Smart Chain
    }
    // Check for TronLink (Tron)
    if (window.tronLink) {
        return 'tron'; // Tron
    }
    return 'undefined'; // Return undefined if no recognized wallet is found
}
