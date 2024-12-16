// This module handles network loading, configurations, etc.
console.log('network.js: Loaded');

function loadNetworkConfig(networkName) {
    console.log(`network.js: Loading configuration for ${networkName}`);
    
    // Dynamically load config based on the network
    const configFile = `config/${networkName}_config.json`;

    fetch(configFile)
        .then(response => response.json())
        .then(config => {
            console.log(`${networkName} Config Loaded:`, config);
            // Handle contract interaction logic here based on config
        })
        .catch(error => console.error(`Error loading ${networkName} config:`, error));
}

// Example usage: loadNetworkConfig('eth');
