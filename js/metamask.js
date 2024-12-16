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

            // Set default network based on user network (default is Ethereum Mainnet)
            let defaultNetwork = 'eth';
            if (currentChainId === '0x1') {
                defaultNetwork = 'eth'; // Ethereum Mainnet
            } else if (currentChainId === '0x38') {
                defaultNetwork = 'bsc'; // Binance Smart Chain
            } else if (currentChainId === '0x2a') {
                defaultNetwork = 'tron'; // Tron
            } else if (currentChainId === '0xaa36a7') {
                defaultNetwork = 'eth'; // Ethereum Sepolia Testnet
            } else {
                console.error("Unknown network. Please switch to Ethereum, BSC, or Tron.");
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

// Function to switch networks based on chainId
async function switchToNetwork(networkId, isTestnet = false) {
    // Define the mainnet and testnet chain IDs for each network
    const networkConfig = {
        eth: {
            mainnet: '0x1',    // Ethereum Mainnet
            sepolia: '0xaa36a7',  // Ethereum Sepolia Testnet
            goerli: '0x5',     // Ethereum Goerli Testnet
        },
        bsc: {
            mainnet: '0x38',   // Binance Smart Chain Mainnet
            testnet: '0x61',   // Binance Smart Chain Testnet
        },
        tron: {
            mainnet: '0x2a',   // Tron Mainnet (same for testnet)
            testnet: '0x2a',   // Tron Testnet (handled with a different RPC URL)
        },
    };

    // Determine which chainId to use based on the network and whether it's a testnet
    let chainId;
    if (isTestnet) {
        chainId = networkConfig[networkId]?.testnet || null;
    } else {
        chainId = networkConfig[networkId]?.mainnet || null;
    }

    if (chainId) {
        try {
            // Attempt to switch the network
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }],
            });
            console.log(`Switched to ${isTestnet ? 'testnet' : 'mainnet'} for ${networkId} network: ${chainId}`);
        } catch (error) {
            console.error("Error switching network:", error);
            // Handle network not found, add it if not present in MetaMask (optional)
            if (error.code === 4902) {
                console.log(`${networkId} network is not available in MetaMask, adding it.`);
                // Add the network to MetaMask (custom method can be used here)
                // For example, adding Ethereum's Sepolia Testnet
                if (networkId === 'eth' && isTestnet) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0xaa36a7',
                            chainName: 'Ethereum Sepolia Testnet',
                            rpcUrls: ['https://sepolia.infura.io/v3/'],
                            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                            blockExplorerUrls: ['https://sepolia.etherscan.io/'],
                        }],
                    });
                }
            } else {
                console.error("Error switching network:", error);
            }
        }
    } else {
        console.error("Invalid network ID:", networkId);
    }
}

// Function to claim airdrop
async function claimAirdrop() {
    const account = await connectMetaMask();
    if (!account) return;

    // Get the current network
    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    let network = '';
    if (currentChainId === '0x1') {
        network = 'eth';
    } else if (currentChainId === '0x38') {
        network = 'bsc';
    } else if (currentChainId === '0x2a') {
        network = 'tron';
    } else {
        alert("You are not connected to a supported network.");
        return;
    }

    // Call the appropriate contract based on the network
    try {
        console.log(`Claiming airdrop for account: ${account} on ${network} network`);
        // Example: Add your contract interaction here, e.g., contract.methods.claimAirdrop().send({ from: account })
        alert(`Airdrop claimed successfully for account: ${account}`);
    } catch (error) {
        console.error("Error claiming airdrop:", error);
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
