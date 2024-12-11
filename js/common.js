console.log("Loading config and ABI for", network);
console.log("Config and ABI loaded");

console.log("Contract Address: ", contractAddress);
console.log("Contract ABI: ", contractABI);



// common.js (Shared variables)
console.log('common.js loaded successfully');

let web3;
let accounts = []; // Declare accounts here once globally, initialized as an empty array
let contractAddress;
let contractABI;
let tokenAddress;

// Function to load the configuration and ABI files for a given network
async function loadConfigAndABI(network) {
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
        throw new Error('Unsupported network');
    }

    // Load the configuration (contract address, token address)
    try {
        const configResponse = await fetch(configFile);
        if (!configResponse.ok) throw new Error('Failed to load config file');
        const config = await configResponse.json();
        contractAddress = config.contractAddress;
        tokenAddress = config.tokenAddress;
        console.log("Configuration loaded:", config);
    } catch (error) {
        console.error("Error loading config file:", error);
        alert("Failed to load contract details. Please try again later.");
        return;
    }

    // Load the ABI file
    try {
        const abiResponse = await fetch(abiFile);
        if (!abiResponse.ok) throw new Error('Failed to load ABI file');
        const abi = await abiResponse.json();
        contractABI = abi;
        console.log("ABI loaded:", abi);
    } catch (error) {
        console.error("Error loading ABI file:", error);
        alert("Failed to load ABI. Please try again later.");
        return;
    }
}

// Fetch accounts and set them globally
async function fetchAccounts() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum); // Initialize web3 with MetaMask's provider
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); // Set accounts globally
            console.log('Accounts:', accounts);
            const claimAirdropButton = document.getElementById('claimAirdropButton');
            if (claimAirdropButton) {
                claimAirdropButton.disabled = false; // Enable the button if it exists
            }
        } catch (error) {
            console.error('Failed to get accounts:', error);
        }
    } else {
        console.error('Ethereum provider not found. Install MetaMask.');
        alert('Ethereum provider not found. Please install MetaMask to proceed.');
    }
}

// Initialize configuration and ABI on page load
async function init() {
    try {
        await loadConfigAndABI('eth');
        console.log('Configuration and ABI loaded successfully');
    } catch (error) {
        console.error('Initialization failed:', error);
    }
}

// Ensure the page initializes properly
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    fetchAccounts();
    init();
});
