console.log('common.js: File loaded successfully');

// Declare shared variables
let web3 = null; // Initialize web3 as null to ensure it is not undefined
let accounts = []; // Declare accounts here once globally
let contractAddress = '';
let contractABI = null;
let tokenAddress = '';
const network = 'eth'; // Default network (change as needed)

console.log(`common.js: Default network set to "${network}"`);

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
        configFile = '/wallets/config/eth_config.json';
        abiFile = '/wallets/abi/eth_abi.json';
    } else if (network === 'bsc') {
        configFile = '/wallets/config/bsc_config.json';
        abiFile = '/wallets/abi/bsc_abi.json';
    } else if (network === 'tron') {
        configFile = '/wallets/config/tron_config.json';
        abiFile = '/wallets/abi/tron_abi.json';
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
    } else {
        console.error('common.js: Ethereum provider not available. Please install MetaMask.');
    }
}

// Initialize configuration and ABI on page load
async function init() {
    try {
        console.log('common.js: Initializing configuration and ABI...');
        await loadConfigAndABI(network);
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
    } else {
        console.error('common.js: No Ethereum provider found. Please install MetaMask.');
    }
    init(); // Initialize configuration and ABI
});

