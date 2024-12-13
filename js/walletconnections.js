// Load all required scripts for MetaMask
function loadMetaMaskScripts() {
    loadScript('wallets/js/common.js');
    loadScript('wallets/js/eth.js');
    loadScript('wallets/js/metamask.js');
}

// Load all required scripts for Trust Wallet
function loadTrustWalletScripts() {
    loadScript('wallets/js/common.js');
    loadScript('wallets/js/bsc.js');
    loadScript('wallets/js/trustwallet.js');
}

// Dynamic script loading function
function loadScript(scriptSrc) {
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.type = 'text/javascript';
    document.head.appendChild(script);
}



