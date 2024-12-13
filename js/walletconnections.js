// Load all required scripts for MetaMask
function loadMetaMaskScripts() {
    loadScript('js/common.js');
    loadScript('js/eth.js');
    loadScript('js/metamask.js');
}

// Load all required scripts for Trust Wallet
function loadTrustWalletScripts() {
    loadScript('js/common.js');
    loadScript('js/bsc.js');
    loadScript('js/trustwallet.js');
}

// Dynamic script loading function
function loadScript(scriptSrc) {
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.type = 'text/javascript';
    document.head.appendChild(script);
}



