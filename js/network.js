// Handle network switch for wallets
const handleNetworkChange = async () => {
    const selectedNetwork = getSelectedNetwork();  // This should get network name from UI
    await switchNetwork(selectedNetwork);
};

// Function to get selected network (example: from a dropdown menu)
const getSelectedNetwork = () => {
    // Replace with actual UI logic for network selection (e.g., a dropdown menu)
    return 'eth';  // Example: Return 'eth' for Ethereum network
};

// Event listener for network change (e.g., dropdown or button)
document.getElementById('network-select').addEventListener('change', handleNetworkChange);
