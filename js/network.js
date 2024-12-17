// network.js

// Function to load network configuration dynamically (network-specific data)
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

// Function to load ABI configuration dynamically for any network
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

