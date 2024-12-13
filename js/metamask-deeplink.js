console.log('metamask-deeplink.js loaded successfully');

// Function to handle deep linking for MetaMask mobile users
function handleMetaMaskDeepLink() {
    const isMobileDevice = isMobile();
    const metaMaskDeepLink = 'https://metamask.app.link/dapp/buyemon.github.io/wallets/index.html';

    console.log('isMobile:', isMobileDevice);

    if (isMobileDevice) {
        console.log('Redirecting to MetaMask mobile app...');
        window.location.href = metaMaskDeepLink;
    } else {
        console.log('Not on a mobile device. Please connect using a desktop browser.');
    }
}

// Helper function to check if the user is on a mobile device
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Add event listener to the "Connect to MetaMask" button
window.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton'); // Updated to match the button ID in index.html
    if (connectButton) {
        connectButton.addEventListener('click', () => {
            console.log('"Connect to MetaMask" button clicked');
            handleMetaMaskDeepLink();
        });
    } else {
        console.log('Connect button not found on the page.');
    }
});

