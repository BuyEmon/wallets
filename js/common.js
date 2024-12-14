let web3;
let accounts;
let contractAddress;
let tokenAddress;
let contractABI;
let isConnected = false;

// Detects the network based on MetaMask or TronLink connection
async function detectNetwork() {
    if (window.ethereum) {
        try {
            const chainId = await ethereum.request({ method: 'eth_chainId' });

            // Check if it's a supported network (Ethereum or BSC)
            if (chainId === '0x1') {  // Ethereum Mainnet
                return 'eth';
            } else if (chainId === '0x38') {  // Binance Smart Chain (BSC)
                return 'bsc';
            } else {
                console.error('Unsupported Ethereum network detected.');
                return null;
            }
        } catch (error) {
            console.error('Error detecting network:', error);
            return null;
        }
    } else if (window.tronLink) {
        // Assuming TronLink is available for Tron network detection
        try {
            const chainId = await window.tronLink.tronWeb.defaultAddress.base58;  // Adjust based on TronLink API
            return 'tron';
        } catch (error) {
            console.error('Error detecting Tron network:', error);
            return null;
        }
    } else {
        console.error('No supported wallet detected');
        return null;
    }
}

// Loads the correct configuration and ABI based on the detected network
async function loadConfig() {
    const network = await detectNetwork();  // Detect network

    if (!network) {
        console.error('Unsupported or no network detected');
        return;
    }

    // Determine which config file to load based on the detected network
    let configFile = '';
    let abiFile = '';

    if (network === 'eth') {
        configFile = 'eth_config.json';
        abiFile = 'eth_abi.json';
    } else if (network === 'bsc') {
        configFile = 'bsc_config.json';
        abiFile = 'bsc_abi.json';
    } else if (network === 'tron') {
        configFile = 'tron_config.json';
        abiFile = 'tron_abi.json';
    } else {
        console.error('Network is unsupported or not recognized.');
        return;
    }

    // Load the config and ABI files from the correct folders
    try {
        const configResponse = await fetch(`/wallets/config/${configFile}`);
        const configData = await configResponse.json();

        const abiResponse = await fetch(`/wallets/abi/${abiFile}`);
        const abiData = await abiResponse.json();

        // Set the global variables
        contractAddress = configData.contractAddress;
        tokenAddress = configData.tokenAddress;
        contractABI = abiData;

        console.log('Loaded config:', configData);
        console.log('Loaded ABI:', abiData);

        // You can then use this data to interact with the smart contract
    } catch (error) {
        console.error('Error loading config or ABI:', error);
    }
}

// Connect to MetaMask
async function connectMetaMask() {
    if (window.ethereum) {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected to MetaMask');
            web3 = new Web3(window.ethereum);
            accounts = await web3.eth.getAccounts();
            isConnected = true;

            console.log('Accounts:', accounts);
            await loadConfig(); // Load the config after connecting
        } catch (error) {
            console.error('MetaMask connection failed:', error);
        }
    } else {
        alert('MetaMask is not installed!');
    }
}

// Event listeners for buttons
window.addEventListener('DOMContentLoaded', async () => {
    // Wait for DOM content to load

    // Add event listener to connect MetaMask button
    document.getElementById('connectButton').addEventListener('click', connectMetaMask);

    // You could add more event listeners here for other wallets like TronLink, etc.
});

