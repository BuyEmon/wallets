// Common shared functionality can go here
console.log('common.js: Script Loaded');

// Check if a wallet extension (like MetaMask) is available in the browser
const isWalletInstalled = (walletName) => {
    if (walletName === 'metamask') {
        return typeof window.ethereum !== 'undefined';
    }
    // Add other wallet checks if needed (e.g., TronLink, TrustWallet)
    return false;
};

// Request the user's accounts
const requestAccounts = async () => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts;
    } catch (error) {
        console.error("Error requesting accounts:", error);
        return [];
    }
};

// Switch networks dynamically for Ethereum-based wallets
const switchNetwork = async (networkConfig) => {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: networkConfig.chainId }],
        });
        console.log(`Switched to ${networkConfig.name}`);
    } catch (error) {
        console.error("Error switching network:", error);
    }
};

// Load configuration for a given network (e.g., BSC, Ethereum)
const loadConfig = async (network) => {
    const configFile = `../config/${network}_config.json`;
    const response = await fetch(configFile);
    const config = await response.json();
    return config;
};

// Load ABI for a given network (Ethereum, BSC, etc.)
const loadABI = async (network) => {
    const abiFile = `../abi/${network}_abi.json`;
    const response = await fetch(abiFile);
    const abi = await response.json();
    return abi;
};

// Dynamically load network configuration for a given network
const loadNetworkConfig = async (network) => {
    const networkFile = `../networks/${network}_network.json`;
    const response = await fetch(networkFile);
    const config = await response.json();
    return config;
};


