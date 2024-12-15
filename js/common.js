let web3;
let accounts;
let contractAddress;
let tokenAddress;
let contractABI;
let isConnected = false;

// Detect MetaMask or other wallet
async function detectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        accounts = await web3.eth.getAccounts();
        isConnected = accounts.length > 0;
        console.log("Connected to MetaMask: ", accounts);
    } else {
        alert("No wallet detected. Please install MetaMask or TrustWallet.");
    }
}

// Detect Network (Ethereum, BSC, etc.)
async function detectNetwork() {
    const networkId = await web3.eth.net.getId();
    console.log("MetaMask chainId: " + networkId);

    // Check if the network is Ethereum or BSC (or another chain you plan to support)
    switch (networkId) {
        case 1:  // Ethereum Mainnet
            loadConfig("eth");
            break;
        case 3:  // Ropsten (Ethereum Testnet)
            loadConfig("eth");
            break;
        case 56: // Binance Smart Chain (BSC)
            loadConfig("bsc");
            break;
        case 97: // Binance Smart Chain Testnet
            loadConfig("bsc");
            break;
        case 11155111: // Sepolia Testnet
            loadConfig("eth");
            break;
        default:
            alert("Unsupported network detected. Please switch to Ethereum or BSC.");
            break;
    }
}

// Load the correct configuration and ABI based on the selected network
async function loadConfig(network) {
    const configFilePath = `config/${network}_config.json`;
    const abiFilePath = `abi/${network}_abi.json`;

    try {
        const configResponse = await fetch(configFilePath);
        const config = await configResponse.json();
        const abiResponse = await fetch(abiFilePath);
        const abi = await abiResponse.json();
        
        contractAddress = config.contractAddress;
        tokenAddress = config.tokenAddress;
        contractABI = abi;

        console.log("Loaded Config and ABI: ", config, abi);
        initializeContract();
    } catch (error) {
        console.error("Error loading config/ABI: ", error);
        alert("Failed to load configuration and ABI. Please try again.");
    }
}

// Initialize the contract
function initializeContract() {
    if (contractAddress && contractABI) {
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Contract Initialized: ", contract);
        // Add further contract interaction logic here
    }
}
