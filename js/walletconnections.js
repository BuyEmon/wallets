// Load all required scripts for MetaMask
function loadMetaMaskScripts() {
    loadScript('common.js');
    loadScript('eth.js');
    loadScript('metamask.js');
}

// Load all required scripts for Trust Wallet
function loadTrustWalletScripts() {
    loadScript('common.js');
    loadScript('bsc.js');
    loadScript('trustwallet.js');
}

// Dynamic script loading function
function loadScript(scriptSrc) {
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.type = 'text/javascript';
    document.head.appendChild(script);
}



