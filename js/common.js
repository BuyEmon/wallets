// common.js

// Utility to check if the wallet is connected to the right network
async function isCorrectNetwork(networkName) {
    const networkConfig = await loadNetworkConfig(networkName); // Fetch network config for the specific network
    if (!networkConfig) {
        console.error("Network config not found.");
        return false;
    }

    const currentChainId = await getChainId();
    return currentChainId === networkConfig.chainId; // Check if the current chainId matches the expected network
}

// Function to switch networks if necessary
async function switchNetwork(networkName) {
    const networkConfig = await loadNetworkConfig(networkName); // Fetch network config for the specific network
    if (!networkConfig) {
        console.error("Network config not found.");
        return;
    }

    try {
        if (typeof ethereum !== 'undefined' && ethereum.request) {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: networkConfig.chainId }],
            });
            console.log("Network switched successfully.");
        } else {
            console.error("Wallet does not support network switching.");
        }
    } catch (error) {
        console.error("Network switch failed:", error);
    }
}

// Function to get the current chainId from the wallet (MetaMask, TrustWallet, etc.)
async function getChainId() {
    if (typeof ethereum !== 'undefined') {
        const web3 = new Web3(ethereum);
        const chainId = await web3.eth.getChainId(); // Universal method to get chainId
        return chainId;
    }
    console.error("Ethereum provider not found.");
    return null;
}

// Utility function to check if the wallet is connected (MetaMask, TrustWallet, etc.)
function isWalletConnected() {
    return typeof ethereum !== 'undefined';
}

// Utility function to load network configuration dynamically for any network
async function loadNetworkConfig(networkName) {
    try {
        const response = await fetch(`networks/${networkName}_network.json`);
        
        if (!response.ok) {
            throw new Error(`Network config for ${networkName} not found.`);
        }

        const networkConfig = await response.json();
        return networkConfig;
    } catch (error) {
        console.error(`Failed to load ${networkName} network config:`, error);
        return null;
    }
}

// Utility function to load ABI configuration dynamically for any network
async function loadNetworkABI(networkName) {
    try {
        const response = await fetch(`abi/${networkName}_abi.json`);
        
        if (!response.ok) {
            throw new Error(`ABI for ${networkName} not found.`);
        }

        const abiData = await response.json();
        return abiData;
    } catch (error) {
        console.error(`Failed to load ${networkName} ABI:`, error);
        return null;
    }
}
