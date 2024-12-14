let web3;
let accounts;
let contractAddress;
let tokenAddress;
let contractABI;
let isConnected = false;

// Load configuration and ABI files
async function loadConfig() {
    try {
        const configResponse = await fetch('./config/eth_config.json');
        if (!configResponse.ok) throw new Error('Failed to fetch config');
        const configData = await configResponse.json();
        contractAddress = configData.contractAddress;
        tokenAddress = configData.tokenAddress;

        const abiResponse = await fetch('./abi/eth_abi.json');
        if (!abiResponse.ok) throw new Error('Failed to fetch ABI');
        contractABI = await abiResponse.json();

        console.log("Config and ABI loaded:", configData);
    } catch (error) {
        console.error("Error loading config/ABI:", error);
        alert("Failed to load configuration. Please try again later.");
    }
}

