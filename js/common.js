// common.js (Shared variables)
let web3;
let accounts = []; // Declare accounts here once globally, initialized as an empty array
let contractAddress;
let contractABI;
let tokenAddress;

// Function to load config and ABI based on network type
async function loadConfigAndABI(network) {
    let configFile, abiFile;

    // Adjusted paths for the new folder structure
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
    if (web3 && window.ethereum) {
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); // Set accounts globally
            console.log('Accounts:', accounts);

            // Enable the "Claim Airdrop" button if it exists
            const claimButton = document.getElementById('claimAirdropButton');
            if (claimButton) claimButton.disabled = false;

        } catch (error) {
            console.error('Failed to get accounts:', error);
        }
    }
}

// Call fetchAccounts on page load
window.addEventListener('DOMContentLoaded', fetchAccounts);


