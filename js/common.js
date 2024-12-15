function loadConfigAndABI(network) {
    let config, abi;

    if (network === 'eth') {
        config = 'config/eth_config.json';
        abi = 'abi/eth_abi.json';
    } else if (network === 'bsc') {
        config = 'config/bsc_config.json';
        abi = 'abi/bsc_abi.json';
    } else if (network === 'tron') {
        config = 'config/tron_config.json';
        abi = 'abi/tron_abi.json';
    }

    // Fetch or load the ABI and config here
    fetch(config)
        .then(response => response.json())
        .then(data => {
            console.log('Loaded config:', data);
            // Store it for later use or initialize based on this config
        });

    fetch(abi)
        .then(response => response.json())
        .then(data => {
            console.log('Loaded ABI:', data);
            // Initialize contract or other logic based on ABI
        });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('connectButton').addEventListener('click', function() {
        loadConfigAndABI('eth');  // Load config and ABI for Ethereum
        connectMetaMask();        // Then call MetaMask connection logic
    });

    document.getElementById('connectTronlinkButton').addEventListener('click', function() {
        loadConfigAndABI('tron');  // Load config and ABI for Tron
        connectTronLink();         // Then call TronLink connection logic
    });

    document.getElementById('connectTrustwalletButton').addEventListener('click', function() {
        loadConfigAndABI('bsc');  // Load config and ABI for BSC
        connectTrustWallet();     // Then call TrustWallet connection logic
    });
});
