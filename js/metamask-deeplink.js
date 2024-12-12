console.log('metamask-deeplink.js loaded successfully');

// Function to handle deep linking for MetaMask mobile users
function handleMetaMaskDeepLink() {
    const isMobileDevice = isMobile();
    const metaMaskDeepLink = 'https://metamask.app.link/dapp/buyemon.github.io/wallets/index.html';

    console.log('isMobile:', isMobileDevice);
    console.log('window.ethereum:', window.ethereum);

    if (isMobileDevice) {
        console.log('Redirecting to MetaMask mobile app...');
        window.location.href = metaMaskDeepLink;
    } else {
        console.log('Not on a mobile device or MetaMask is not available');
    }
}

// Helper function to check if the user is on a mobile device
function isMobile() {
    const result = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    console.log('isMobile function result:', result);
    return result;
}

// Call the deep link handler when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    handleMetaMaskDeepLink();
});

