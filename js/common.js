console.log('common.js: File loaded successfully');

// Declare shared variables
let web3 = null; // Initialize web3 as null to ensure it is not undefined
let accounts = []; // Declare accounts here once globally
let contractAddress = '';
let contractABI = null;
let tokenAddress = '';
let network = ''; // Network should be determined dynamically

console.log('common.js: Initializing network...');

// Function to load the configuration and ABI files for a given network
async function loadConfigAndABI(network) {
    if (!network) {
        console.error("common.js: Network is not defined. Please pass a valid network.");
        return;
    }

    console.log(`common.js: Loading config and ABI for network "${network}"`);
    let configFile, abiFile;

    // Set paths for configuration and ABI files based on the selected network
    if (network === 'eth') {
        configFile = '/config/eth_config.json';
        abiFile = '/abi/eth_abi.json';
    } else if (network === 'bsc') {
        configFile = '/config/bsc_config.json';
        abiFile = '/abi/bsc_abi.json';
    } else if (network === 'tron') {
        configFile = '/config/tron_config.json';
        abiFile = '/abi/tron_abi.json';
    } else {
        console.error(`common.js: Unsupported network "${network}"`);
        throw new Error('Unsupported network');
    }

    // Load the configuration (contract address, token address)
    try {
        const configResponse = await fetch(configFile);
        if (!configResponse.ok) throw new Error(`Failed to load config file for "${network}"`);
        const config = await configResponse.json();
        contractAddress = config.contractAddress;
        tokenAddress = config.tokenAddress;
        console.log(`common.js: Configuration loaded for "${network}"`, config);
    } catch (error) {
        console.error("common.js: Error loading config file:", error.message || error);
        alert("Failed to load contract details. Please try again later.");
        return;
    }

    // Load the ABI file
    try {
        const abiResponse = await fetch(abiFile);
        if (!abiResponse.ok) throw new Error(`Failed to load ABI file for "${network}"`);
        const abi = await abiResponse.json();
        contractABI = abi;
        console.log(`common.js: ABI loaded for "${network}"`, abi);
    } catch (error) {
        console.error("common.js: Error loading ABI file:", error.message || error);
        alert("Failed to load ABI. Please try again later.");
        return;
    }
}

// Fetch accounts and set them globally
async function fetchAccounts() {
    if (web3 && window.ethereum) {
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); // Set accounts globally
            console.log('common.js: Accounts fetched successfully', accounts);
            const claimAirdropButton = document.getElementById('claimAirdropButton');
            if (claimAirdropButton) {
                claimAirdropButton.disabled = false; // Enable the button if it exists
            }
        } catch (error) {
            console.error('common.js: Failed to get accounts:', error.message || error);
        }
    } else if (window.tronWeb) {
        // Tron support
        try {
            accounts = window.tronWeb.defaultAddress.base58;
            console.log('common.js: Tron accounts fetched successfully', accounts);
            const claimAirdropButton = document.getElementById('claimAirdropButton');
            if (claimAirdropButton) {
                claimAirdropButton.disabled = false; // Enable the button if it exists
            }
        } catch (error) {
            console.error('common.js: Failed to get Tron accounts:', error.message || error);
        }
    } else {
        console.error('common.js: No Ethereum or Tron provider found. Please install MetaMask or TronLink.');
    }
}

// Initialize configuration and ABI on page load
async function init() {
    try {
        console.log('common.js: Initializing configuration and ABI...');
        if (window.ethereum) {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (chainId === '0x1') {
                network = 'eth'; // Ethereum network
            } else if (chainId === '0x38') {
                network = 'bsc'; // BSC network
            }
        } else if (window.tronWeb) {
            network = 'tron'; // Tron network
        } else {
            console.error('common.js: No recognized wallet found.');
            alert('Please install MetaMask or TronLink to use the application.');
            return;
        }

        await loadConfigAndABI(network); // Load ABI and config based on detected network
        console.log('common.js: Configuration and ABI loaded successfully');
    } catch (error) {
        console.error('common.js: Initialization failed:', error.message || error);
    }
}

// Ensure the page initializes properly
window.addEventListener('DOMContentLoaded', () => {
    console.log('common.js: DOM fully loaded and parsed');
    if (window.ethereum) {
        web3 = new Web3(window.ethereum); // Initialize web3 with MetaMask's provider
        console.log('common.js: Web3 initialized with MetaMask');
    } else if (window.tronWeb) {
        // Tron support initialization
        web3 = window.tronWeb;
        console.log('common.js: TronWeb initialized with TronLink');
    } else {
        console.error('common.js: No Ethereum or Tron provider found. Please install MetaMask or TronLink.');
    }

    init(); // Initialize configuration and ABI
});
