// network.js

async function loadNetworkConfig(networkName) {
    try {
        const networkConfig = await fetch(`networks/${networkName}_network.json`).then(res => res.json());
        return networkConfig;
    } catch (error) {
        console.error(`Failed to load ${networkName} network config:`, error);
        return null;
    }
}
