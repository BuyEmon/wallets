// common.js

// Utility to check if the wallet is connected to the right network
function isCorrectNetwork(config) {
    return ethereum.networkVersion === config.networkId;
}

// Function to switch networks if necessary
async function switchNetwork(config) {
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: config.chainId }],
        });
        console.log("Network switched successfully.");
    } catch (error) {
        console.error("Network switch failed:", error);
    }
}
