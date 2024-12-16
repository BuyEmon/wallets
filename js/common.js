// Function to dynamically load scripts
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = function(error) {
        console.error("Error loading script:", src, error); // Log error if script fails to load
    };
    document.head.appendChild(script);
}

// Function to load ABI and config files dynamically based on the network
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
        return { config: configData, abi: abiData };
    } catch (error) {
        console.error(`Error loading config or ABI for ${network}:`, error);
        alert(`Failed to load configuration for ${network}.`);
    }
}

// Unified Wallet Connection Handler
function handleWalletConnection(wallet, network, expectedChainIds) {
    const scriptPaths = {
        metamask: 'js/metamask.js',
        tronlink: 'js/tronlink.js',
        trustwallet: 'js/trustwallet.js',
    };

    const walletScript = scriptPaths[wallet];

    if (walletScript) {
        loadScript(walletScript, () => {
            console.log(`${walletScript} script loaded successfully.`);

            // Load config and ABI dynamically
            loadConfigAndABI(network).then(({ config, abi }) => {
                if (config && abi) {
                    switch (wallet) {
                        case 'metamask':
                            connectMetaMask(config, abi, expectedChainIds);
                            break;
                        case 'tronlink':
                            connectTronLink(config, abi, expectedChainIds);
                            break;
                        case 'trustwallet':
                            connectTrustWallet(config, abi, expectedChainIds);
                            break;
                    }
                }
            });
        });
    } else {
        console.error(`No script found for wallet: ${wallet}`);
    }
}
