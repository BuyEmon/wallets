const walletScripts = {
    metamask: 'js/metamask.js',
    tronlink: 'js/tronlink.js',
    trustwallet: 'js/trustwallet.js',
};

function loadScript(name, callback) {
    console.log(`Requested wallet: ${name}`); // Debugging: Log the wallet name
    console.log(`Script path: ${walletScripts[name]}`); // Debugging: Log the resolved script path

    if (!walletScripts[name]) {
        console.error(`No script defined for wallet: ${name}`);
        return; // Stop execution if wallet name is invalid
    }

    const existingScript = document.querySelector(`script[src="${walletScripts[name]}"]`);
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = walletScripts[name];
        script.onload = () => {
            console.log(`${name} script loaded`);
            callback();
        };
        script.onerror = () => console.error(`Error loading ${walletScripts[name]} script`);
        document.head.appendChild(script);
    } else {
        console.log(`${name} script already loaded`);
        callback();
    }
}

function handleWalletConnection(wallet) {
    loadScript(wallet, () => {
        if (wallet === 'metamask') {
            console.log('Initializing MetaMask...');
            MetaMask.init();
        }
        if (wallet === 'tronlink') {
            console.log('Initializing TronLink...');
            TronLink.init();
        }
        if (wallet === 'trustwallet') {
            console.log('Initializing TrustWallet...');
            TrustWallet.init();
        }
    });
}


