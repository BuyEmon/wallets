// common.js: Shared functionality across wallets and blockchains

let currentNetwork = null;

// Dynamically load ABI and contract details
async function getContractDetails() {
    if (!currentNetwork) {
        console.error("Network not set. Cannot load contract details.");
        return { abi: null, address: null };
    }

    try {
        const abiResponse = await fetch(`/abi/${currentNetwork}_abi.json`);
        const configResponse = await fetch(`/config/${currentNetwork}_config.json`);

        if (!abiResponse.ok || !configResponse.ok) {
            throw new Error("Failed to load ABI or config files.");
        }

        const abi = await abiResponse.json();
        const config = await configResponse.json();

        console.log(`Loaded contract details for ${currentNetwork}:`, { abi, config });
        return { abi, address: config.contractAddress };
    } catch (error) {
        console.error("Error loading contract details:", error);
        alert("Failed to load contract details. Please try again later.");
        return { abi: null, address: null };
    }
}

// Set the active network (e.g., 'eth', 'bsc', 'tron')
function setNetwork(network) {
    currentNetwork = network;
    console.log("Current network set to:", currentNetwork);
}

// Notify wallet modules when a wallet connects
function onWalletConnected(accounts) {
    console.log("Wallet connected with accounts:", accounts);

    // Custom behavior for wallet connection (if needed)
    // Can be expanded for network-specific logic
}

// Utility to check if the browser is mobile
function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iPad|iPhone|iPod/i.test(userAgent);
}

export { getContractDetails, setNetwork, onWalletConnected, isMobile };

