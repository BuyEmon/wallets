console.log('metamask-deeplink.js loaded successfully');

// Function to handle deep linking for MetaMask mobile users
function handleMetaMaskDeepLink() {
    const metaMaskDeepLink = 'https://metamask.app.link/dapp/buyemon.github.io/wallets/index.html';

    console.log('Redirecting to MetaMask mobile app...');
    try {
        window.location.href = metaMaskDeepLink;
    } catch (error) {
        console.error('Error while redirecting to MetaMask:', error);
        alert('Could not open MetaMask. Please ensure MetaMask is installed and try again.');
    }
}

// Helper function to check if the user is on a mobile device
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Add event listener to the "Connect to MetaMask" button
window.addEventListener('DOMContentLoaded', () => {
    if (isMobile()) {
        const connectButton = document.getElementById('connectButton');
        if (connectButton) {
            connectButton.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent page reload
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


