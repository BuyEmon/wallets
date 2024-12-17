// network.js

// Load network configuration for a given network name (ETH, BSC, Tron, etc.)
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

// Function to get the network's ABI and contract configuration
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
