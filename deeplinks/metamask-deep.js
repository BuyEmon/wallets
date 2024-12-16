// metamask-deeplink.js

function openMetaMaskMobile() {
    const url = 'https://metamask.app.link/dapp/<your-dapp-url>';
    window.location.href = url;
}

// Call this function on mobile to open MetaMask
openMetaMaskMobile();
