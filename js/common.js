async function loadConfig() {
    try {
        const configResponse = await fetch('https://buyemon.github.io/wallets/config.json');
        if (!configResponse.ok) {
            throw new Error('Failed to fetch config.json');
        }
        const configData = await configResponse.json();
        return configData;
    } catch (error) {
        console.error("Error loading config:", error);
    }
}

async function loadABI() {
    try {
        const abiResponse = await fetch('https://buyemon.github.io/wallets/abi.json');
        if (!abiResponse.ok) {
            throw new Error('Failed to fetch abi.json');
        }
        const abiData = await abiResponse.json();
        return abiData;
    } catch (error) {
        console.error("Error loading ABI:", error);
    }
}
