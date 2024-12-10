// common.js (Shared variables)
let web3;
let accounts;
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

// Function to claim the airdrop
async function claimAirdrop() {
    if (!web3) {
        alert('Please connect to a wallet first.');
        return;
    }

    if (!contractAddress || !contractABI) {
        alert('Smart contract details are not loaded. Please refresh the page.');
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts(); // Fetch current account
        const contract = new web3.eth.Contract(contractABI, contractAddress); // Load the contract

        // Call the claim function from the smart contract
        const receipt = await contract.methods.claimAirdrop().send({
            from: accounts[0], // Use the first account connected
        });

        console.log('Airdrop claimed successfully:', receipt);
        alert('Airdrop claimed successfully!');
    } catch (error) {
        console.error('Error while claiming airdrop:', error);
        alert('Failed to claim airdrop. Check the console for more details.');
    }
}

// Attach the event listener for the claim button
window.addEventListener('DOMContentLoaded', () => {
    const claimButton = document.getElementById('claimAirdropButton');
    if (claimButton) {
        claimButton.disabled = false; // Enable the button when DOM is loaded
        claimButton.addEventListener('click', claimAirdrop);
    } else {
        console.error("Claim button with ID 'claimAirdropButton' not found.");
    }
});
