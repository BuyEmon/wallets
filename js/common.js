const walletScripts = {
    metamask: './js/metamask.js',
    tronlink: './js/tronlink.js',
    trustwallet: './js/trustwallet.js',
};

function loadScript(name, callback) {
    const existingScript = document.querySelector(`script[src="${walletScripts[name]}"]`);
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = walletScripts[name];
        script.onload = () => {
            console.log(`${name} script loaded`);
            callback();
        };
        script.onerror = () => console.error(`Error loading ${name} script`);
        document.head.appendChild(script);
    } else {
        console.log(`${name} script already loaded`);
        callback();
    }
}

function handleWalletConnection(wallet) {
    loadScript(wallet, () => {
        if (wallet === 'metamask') MetaMask.init();
        if (wallet === 'tronlink') TronLink.init();
        if (wallet === 'trustwallet') TrustWallet.init();
    });
}

