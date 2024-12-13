console.log('metamask-deeplink.js loaded successfully');

// Function to handle MetaMask deep linking for mobile users
function handleMetaMaskDeepLink() {
    const deepLinkURL = 'https://metamask.app.link/dapp/buyemon.github.io/wallets/index.html';

    console.log('Checking MetaMask installation before redirecting...');
    if (/MetaMask/.test(navigator.userAgent)) {
        console.log('MetaMask browser detected. No redirection needed.');
    } else {
        console.log('Redirecting to MetaMask mobile app...');
        window.location.href = deepLinkURL;
        setTimeout(() => {
            alert(
                "If MetaMask doesn't open, ensure it's installed and configured on your device. Alternatively, open MetaMask manually and navigate to the browser."
            );
        }, 3000);
    }
}

// Helper function to check if the user is on a mobile device
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Add event listener to the "Connect to MetaMask" button
window.addEventListener('DOMContentLoaded', () => {
    if (isMobile()) {
        console.log('Mobile device detected. Setting up MetaMask deep link.');
        const connectButton = document.getElementById('connectButton');
        if (connectButton) {
            connectButton.addEventListener('click', () => {
                console.log('"Connect to MetaMask" button clicked');
                handleMetaMaskDeepLink();
            });
        } else {
            console.log('Connect button not found on the page.');
        }
    } else {
        console.log('Not a mobile device. metamask-deeplink.js will not be invoked.');
    }
});
