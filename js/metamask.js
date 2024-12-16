const MetaMask = {
    web3: null,
    accounts: null,

    // Initialize MetaMask
    async init() {
        if (window.ethereum && window.ethereum.isMetaMask) {
            // Use the general Ethereum logic from eth.js
            const connected = await Ethereum.init();
            if (connected) {
                this.accounts = Ethereum.accounts;
                console.log("Connected to MetaMask:", this.accounts);
                return true;
            }
        } else {
            alert("MetaMask is not installed.");
            return false;
        }
    },

    // Claim Airdrop using Ethereum's general contract interaction
    async claimAirdrop() {
        await Ethereum.claimAirdrop();
    }
};

// MetaMask Connection Logic
function connectMetaMask(config, abi, expectedChainId) {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);

        // First, request user to connect to MetaMask
        window.ethereum.request({ method: 'eth_requestAccounts' }).then(async (accounts) => {
            console.log("Connected to MetaMask:", accounts);

            // Check if the wallet is on the correct network
            const validNetwork = await checkNetwork(web3, expectedChainId);
            if (validNetwork) {
                // If connected to the correct network, enable claim button
                document.getElementById('claimAirdropButton').disabled = false;
                document.getElementById('connectButton').disabled = true;
            }
        }).catch((error) => {
            console.error("MetaMask connection failed:", error);
            alert("Failed to connect to MetaMask.");
        });
    } else {
        alert("MetaMask is not installed. Please install it to continue.");
    }
}

// Check Network Function (updated to handle dynamic switching)
async function checkNetwork(web3, expectedChainId) {
    try {
        const currentChainId = await web3.eth.getChainId();
        if (currentChainId === expectedChainId) {
            return true;
        } else {
            // Prompt user to switch networks if necessary
            await switchNetwork(expectedChainId);
            return false;
        }
    } catch (error) {
        console.error("Error checking network:", error);
        return false;
    }
}

// Switch Network Function (dynamically switch based on expectedChainId)
async function switchNetwork(expectedChainId) {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${expectedChainId.toString(16)}` }],
        });
        console.log(`Switched to chainId: ${expectedChainId}`);
    } catch (switchError) {
        console.error("Error switching network:", switchError);
        // Handle if user doesn't have the network added
        if (switchError.code === 4902) {
            // If network is not added, prompt user to add it
            alert(`Network not found. Please add the required network to MetaMask.`);
        }
    }
}

// Example usage: Initialize MetaMask and claim airdrop
document.getElementById('connectButton').addEventListener('click', async function () {
    const connected = await MetaMask.init();
    if (connected) {
        document.getElementById('claimAirdropButton').disabled = false;
        document.getElementById('connectButton').disabled = true;
    }
});

document.getElementById('claimAirdropButton').addEventListener('click', async function () {
    await MetaMask.claimAirdrop();
});


