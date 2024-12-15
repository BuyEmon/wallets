// Function to dynamically load scripts
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

// Function to load ABI and config files dynamically
async function loadConfigAndABI(network) {
    const configMap = {
        eth: { config: 'config/eth_config.json', abi: 'abi/eth_abi.json' },
        bsc: { config: 'config/bsc_config.json', abi: 'abi/bsc_abi.json' },
        tron: { config: 'config/tron_config.json', abi: 'abi/tron_abi.json' },
    };

    const { config, abi } = configMap[network];
    try {
        const configData = await fetch(config).then((res) => res.json());
        const abiData = await fetch(abi).then((res) => res.json());

        console.log(`Loaded config for ${network}:`, configData);
        console.log(`Loaded ABI for ${network}:`, abiData);

        return { config: configData, abi: abiData };
    } catch (error) {
        console.error(`Error loading config or ABI for ${network}:`, error);
        alert(`Failed to load configuration for ${network}.`);
    }
}

// Common function to handle wallet connections
function handleWalletConnection(network, scriptPath, connectionCallback) {
    loadScript(scriptPath, async function () {
        console.log(`${network} script loaded`);
        const { config, abi } = await loadConfigAndABI(network);
        if (config && abi) {
            connectionCallback();
        }
    });
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // MetaMask Button
    document.getElementById('connectButton').addEventListener('click', function () {
        handleWalletConnection('eth', 'js/eth.js', connectMetaMask);
    });

    // TronLink Button
    document.getElementById('connectTronlinkButton').addEventListener('click', function () {
        handleWalletConnection('tron', 'js/tron.js', connectTronLink);
    });

    // TrustWallet Button
    document.getElementById('connectTrustwalletButton').addEventListener('click', function () {
        handleWalletConnection('bsc', 'js/bsc.js', connectTrustWallet);
    });
});

// MetaMask Connection Logic
async function connectMetaMask() {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected to MetaMask:", accounts);

            document.getElementById('claimAirdropButton').disabled = false;
            document.getElementById('connectButton').disabled = true;
        } catch (error) {
            console.error("MetaMask connection failed:", error);
            alert("Failed to connect to MetaMask.");
        }
    } else {
        alert("MetaMask is not installed. Please install it to continue.");
    }
}

