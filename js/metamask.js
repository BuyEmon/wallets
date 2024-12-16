// metamask.js

// Function to check if MetaMask is installed
function isMetaMaskInstalled() {
    return typeof window.ethereum !== 'undefined';
}

// Function to switch the network
async function switchNetwork(expectedChainId) {
    try {
        // Ensure expectedChainId is a NUMBER or a string that can be converted to a number
        const chainIdAsNumber = Number(expectedChainId); 

        // Validate the input: Check if it's a valid number and positive
        if (isNaN(chainIdAsNumber) || chainIdAsNumber <= 0) {
            console.error("Invalid chain ID provided:", expectedChainId);
            return; // Stop execution if the chain ID is invalid
        }

        // Correctly format the chain ID as a hexadecimal string
        const hexChainId = `0x${chainIdAsNumber.toString(16)}`;

        // Request to switch the network in MetaMask
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: hexChainId }],
        });

        console.log(`Switched to chainId: ${hexChainId}`); // Log the hex value
    } catch (switchError) {
        console.error("Error switching network:", switchError);

        if (switchError.code === 4902) {
            // Chain is not added, offer to add it
            const chainParams = getChainParams(expectedChainId); // Assuming you have a function to get the chain details
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [chainParams],
                });
                console.log(`Added chainId: ${expectedChainId}`);
            } catch (addError) {
                console.error("Error adding network:", addError);
            }
        } else if (switchError.code === -32602 && switchError.message.includes("invalid hex")) {
            console.error("The provided chain ID is not a valid hexadecimal number.");
        } else {
            // Handle other errors (e.g., user rejection, network issues)
            console.error("Switching network failed for other reasons.");
        }
    }
}

// Function to get chain parameters for adding a new network to MetaMask
function getChainParams(chainId) {
    switch (chainId) {
        case 1: // Ethereum Mainnet
            return {
                chainId: '0x1',
                chainName: 'Ethereum Mainnet',
                rpcUrls: ['https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
                nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
                blockExplorerUrls: ['https://etherscan.io'],
            };
        case 56: // Binance Smart Chain Mainnet (BSC)
            return {
                chainId: '0x38',
                chainName: 'Binance Smart Chain',
                rpcUrls: ['https://bsc-dataseed1.binance.org:443'],
                nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
                blockExplorerUrls: ['https://bscscan.com'],
            };
        case 137: // Polygon
            return {
                chainId: '0x89',
                chainName: 'Polygon',
                rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
                nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
                blockExplorerUrls: ['https://polygonscan.com'],
            };
        default:
            throw new Error('Unsupported network');
    }
}

// Function to connect to MetaMask and claim the airdrop
async function connectAndClaimAirdrop() {
    if (!isMetaMaskInstalled()) {
        alert('MetaMask is not installed. Please install MetaMask to continue.');
        return;
    }

    try {
        // Request account access
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });

        const userAccount = accounts[0];
        console.log(`Connected to MetaMask account: ${userAccount}`);

        // Get the current network chain ID
        const chainId = await window.ethereum.request({
            method: 'eth_chainId',
        });

        console.log(`Current network chainId: ${chainId}`);

        // Check if the user is connected to a supported network (Ethereum, BSC, Polygon)
        const supportedNetworks = ['0x1', '0x38', '0x89']; // Ethereum, BSC, Polygon
        if (!supportedNetworks.includes(chainId)) {
            alert('Please switch to a supported network (Ethereum, BSC, or Polygon).');
            return;
        }

        // Enable the claim airdrop button once the user is connected
        document.getElementById('claimAirdropButton').disabled = false;

        // Proceed with claiming the airdrop
        await claimAirdrop(userAccount);
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("There was an error connecting to MetaMask. Please try again.");
    }
}

// Function to claim the airdrop
async function claimAirdrop(account) {
    try {
        // Replace this with actual logic for claiming the airdrop
        console.log(`Claiming airdrop for account: ${account}`);
        alert(`Airdrop claimed successfully for account: ${account}`);
    } catch (error) {
        console.error("Error claiming airdrop:", error);
        alert("There was an error claiming the airdrop. Please try again.");
    }
}

// Add event listeners for the buttons
document.getElementById('connectButton').addEventListener('click', connectAndClaimAirdrop);
document.getElementById('claimAirdropButton').addEventListener('click', connectAndClaimAirdrop);
