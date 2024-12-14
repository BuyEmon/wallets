let web3;
let accounts;
let contractAddress;
let tokenAddress;
let contractABI;
let isConnected = false;

// Function to detect network type
async function detectNetwork() {
    if (window.ethereum) {
        try {
            const chainId = await ethereum.request({ method: 'eth_chainId' });

            // Ethereum Mainnet
            if (chainId === '0x1') {
                console.log('Ethereum Mainnet detected');
                return 'eth';
            }
            // Sepolia Testnet
            else if (chainId === '0xaa36a7') {
                console.log('Sepolia Testnet detected');
                return 'eth-sepolia';
            }
            // Binance Smart Chain (BSC)
            else if (chainId === '0x38') {
                console.log('Binance Smart Chain detected');
                return 'bsc';
            } else {
                console.error('Unsupported Ethereum network detected:', chainId);
                return null;
            }
        } catch (error) {
            console.error('Error detecting Ethereum network:', error);
            return null;
        }
    } else if (window.tronLink) {
        // If TronLink is detected, check Tron network
        try {
            const tronNetwork = await tronLink.request({ method: 'tron_getNetwork' });
            if (tronNetwork === 'mainnet') {
                console.log('Tron Mainnet detected');
                return 'tron';
            } else if (tronNetwork === 'shasta') {
                console.log('Tron Shasta Testnet detected');
                return 'tron-shasta';
            } else {
                console.error('Unsupported Tron network detected:', tronNetwork);
                return null;
            }
        } catch (error) {
            console.error('Error detecting Tron network:', error);
            return null;
        }
    } else {
        console.error('No supported wallet detected');
        return null;
    }
}

// Function to load configuration and ABI for the detected network
async function loadConfig() {
    const network = await detectNetwork();

    if (!network) {
        console.error('Network detection failed or unsupported network');
        return;
    }

    // Determine the config and ABI file based on the network
    const configFile = `config/${network}_config.json`;
    const abiFile = `abi/${network}_abi.json`;

    try {
        const [configResponse, abiResponse] = await Promise.all([
            fetch(configFile),
            fetch(abiFile)
        ]);

        if (!configResponse.ok || !abiResponse.ok) {
            throw new Error('Failed to fetch config/ABI');
        }

        const config = await configResponse.json();
        const abi = await abiResponse.json();

        contractAddress = config.contractAddress;
        tokenAddress = config.tokenAddress;
        contractABI = abi;

        console.log('Configuration and ABI loaded successfully');
    } catch (error) {
        console.error('Error loading config/ABI:', error);
    }
}

// Function to check if MetaMask is connected
async function checkMetaMaskConnection() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                isConnected = true;
                console.log('MetaMask connected:', accounts);
                return accounts[0];
            } else {
                console.log('No accounts found');
                return null;
            }
        } catch (error) {
            console.error('Error checking MetaMask connection:', error);
            return null;
        }
    } else {
        console.error('No Ethereum provider detected');
        return null;
    }
}

// Function to check if TronLink is connected
async function checkTronLinkConnection() {
    if (window.tronLink) {
        try {
            const tronAccounts = await tronLink.request({ method: 'tron_requestAccounts' });
            if (tronAccounts.length > 0) {
                isConnected = true;
                console.log('TronLink connected:', tronAccounts);
                return tronAccounts[0];
            } else {
                console.log('No Tron accounts found');
                return null;
            }
        } catch (error) {
            console.error('Error checking TronLink connection:', error);
            return null;
        }
    } else {
        console.error('No TronLink provider detected');
        return null;
    }
}

// Function to connect MetaMask
async function connectMetaMask() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            isConnected = true;
            console.log('MetaMask connected:', accounts);
            return accounts[0];
        } catch (error) {
            console.error('Error connecting MetaMask:', error);
            return null;
        }
    } else {
        console.error('MetaMask is not installed');
        return null;
    }
}

// Function to connect TronLink
async function connectTronLink() {
    if (window.tronLink) {
        try {
            const tronAccounts = await tronLink.request({ method: 'tron_requestAccounts' });
            isConnected = true;
            console.log('TronLink connected:', tronAccounts);
            return tronAccounts[0];
        } catch (error) {
            console.error('Error connecting TronLink:', error);
            return null;
        }
    } else {
        console.error('TronLink is not installed');
        return null;
    }
}
