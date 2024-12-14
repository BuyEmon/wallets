// loader.js: Dynamically loads the appropriate configuration and ABI files based on the selected wallet
// Include console.debug for debugging purposes

console.debug('Loading loader.js...');

// Load configuration and ABI files based on the selected wallet
function loadWalletConfig(walletType) {
  let configFile, abiFile;

  // Define configuration and ABI files based on wallet type
  switch (walletType) {
    case 'metamask':
      configFile = 'config/eth_config.json';
      abiFile = 'abi/eth_abi.json';
      break;
    case 'tron':
      configFile = 'config/tron_config.json';
      abiFile = 'abi/tron_abi.json';
      break;
    case 'trustwallet':
      configFile = 'config/eth_config.json'; // Assuming TrustWallet interacts with Ethereum contracts
      abiFile = 'abi/eth_abi.json'; // Assuming TrustWallet uses Ethereum ABI
      break;
    default:
      console.error('Unknown wallet type');
      return;
  }

  // Load configuration and ABI files dynamically
  loadFile(configFile, 'config');
  loadFile(abiFile, 'abi');
}

// Function to load JSON files
function loadFile(filePath, type) {
  console.debug(`Loading ${type} file: ${filePath}`);
  
  fetch(filePath)
    .then(response => response.json())
    .then(data => {
      console.debug(`${type} file loaded successfully`, data);
      // Store the loaded data in a global variable or call the necessary functions
      window[type] = data;  // Example: storing data in a global variable
    })
    .catch(error => console.error(`Failed to load ${type} file from ${filePath}:`, error));
}

// Export function if needed for integration in other files
export { loadWalletConfig };




