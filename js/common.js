// common.js (Shared variables)
let web3;
let accounts; // Declare accounts here once globally
let contractAddress;
let contractABI;
let tokenAddress;

// Function to load the appropriate config and ABI based on the selected network
async function loadConfigAndABI(network) {
    let configFile, abiFile;

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
    const configResponse = await fetch(configFile);
    if (!configResponse.ok) throw new Error('Failed to load config file');
    const config = await configResponse.json();
    contractAddress = config.contractAddress;
    tokenAddress = config.tokenAddress;

    // Load the ABI file
    const abiResponse = await fetch(abiFile);
    if (!abiResponse.ok) throw new Error('Failed to load ABI file');
    const abi = await abiResponse.json();
    contractABI = abi;

    console.log("Configuration loaded:", config);
    console.log("ABI loaded:", abi);
}

// Fetch accounts and set them globally
async function fetchAccounts() {
    if (web3 && window.ethereum) {
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); // Set accounts globally
            console.log('Accounts:', accounts);
            document.getElementById('claimAirdropButton').disabled = false; // Enable the button
        } catch (error) {
            console.error('Failed to get accounts:', error);
        }
    }
}

// Call fetchAccounts on page load
window.addEventListener('DOMContentLoaded', fetchAccounts);
