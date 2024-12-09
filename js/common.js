let web3;
let contractABI;
let contractAddress;
let tokenAddress;

// Load the appropriate config and ABI based on the selected network
async function loadConfigAndABI(network) {
    let configFile, abiFile;

    if (network === 'eth') {
        configFile = '/wallets/config/eth_config.json';
        abiFile = '/wallets/abi/eth_abi.json';
    } else if (network === 'bsc') {
        configFile = '/wallets/config/bsc_config.json';
        abiFile = '/wallets/abi/bsc_abi.json';
    } else if (network === 'tron') {
        configFile = '/wallets/config/tron_config.json';
        abiFile = '/wallets/abi/tron_abi.json';
    } else {
        throw new Error('Unsupported network');
    }

    // Load the configuration (contract address, token address)
    const configResponse = await fetch(configFile);
    if (!configResponse.ok) throw new Error('Failed to load config file');
    const config = await configResponse.json();
    contractAddress = config.contractAddress;
    tokenAddress = config.tokenAddress;

    // Load the ABI file
    const abiResponse = await fetch(abiFile);
    if (!abiResponse.ok) throw new Error('Failed to load ABI file');
    const abi = await abiResponse.json();
    contractABI = abi;

    console.log("Configuration loaded:", config);
    console.log("ABI loaded:", abi);
}
