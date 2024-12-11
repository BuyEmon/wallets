console.log('metamask-deeplink.js loaded successfully');

// Function to handle deep linking for MetaMask mobile users
function handleMetaMaskDeepLink() {
    if (isMobile() && typeof window.ethereum !== 'undefined') {
        // Deep link to MetaMask mobile app if available
        window.location.href = 'https://metamask.app.link/dapp/buyemon.github.io/wallets/index.html';
        console.log('Redirecting to MetaMask mobile app...');
    } else {
        console.log('Not on a mobile device or MetaMask is not available');
    }
}

// Helper function to check if the user is on a mobile device
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Call the deep link handler when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    handleMetaMaskDeepLink();
});
