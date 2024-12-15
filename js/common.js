// Function to dynamically load the scripts
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

// Function to load the appropriate ABI and config files
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

// Event listener for button clicks in common.js
document.addEventListener('DOMContentLoaded', function () {
    // Event listener for MetaMask connection
    document.getElementById('connectButton').addEventListener('click', function() {
        loadScript('js/eth.js', function() {
            console.log('Ethereum Script Loaded');
            loadConfigAndABI('eth');  // Load config and ABI for Ethereum
            connectMetaMask();        // Then call MetaMask connection logic
        });
    });

    // Event listener for TronLink connection
    document.getElementById('connectTronlinkButton').addEventListener('click', function() {
        loadScript('js/tron.js', function() {
            console.log('TronLink Script Loaded');
            loadConfigAndABI('tron');  // Load config and ABI for Tron
            connectTronLink();         // Then call TronLink connection logic
        });
    });

    // Event listener for TrustWallet connection
    document.getElementById('connectTrustwalletButton').addEventListener('click', function() {
        loadScript('js/bsc.js', function() {
            console.log('TrustWallet Script Loaded');
            loadConfigAndABI('bsc');  // Load config and ABI for BSC
            connectTrustWallet();     // Then call TrustWallet connection logic
        });
    });
});
