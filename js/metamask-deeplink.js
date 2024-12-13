console.log('metamask-deeplink.js loaded successfully');

// Function to handle deep linking for MetaMask mobile users
function handleMetaMaskDeepLink() {
    const isMobileDevice = isMobile();
    const metaMaskDeepLink = 'https://metamask.app.link/dapp/buyemon.github.io/wallets/index.html';

    console.log('isMobile:', isMobileDevice);

    if (isMobileDevice) {
        console.log('Redirecting to MetaMask mobile app...');
        // Redirect to MetaMask deep link
        window.location.href = metaMaskDeepLink;

        // Set a small delay to prevent page from refreshing immediately after the redirect
        setTimeout(() => {
            if (typeof window.ethereum !== 'undefined') {
                connectToMetaMask();
            }
        }, 2000);
    } else {
        console.log('Not on a mobile device. Please connect using a desktop browser.');
    }
}

// Function to check if the user is on a mobile device
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Function to handle MetaMask connection
async function connectToMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            console.log('Requesting MetaMask connection...');
            // Request connection
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('MetaMask connected', accounts);
            // Handle the connection state here (e.g., update UI, show user address)
            // Example: update UI with account info
            document.getElementById('account').innerText = accounts[0];
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    } else {
        console.error('MetaMask is not available.');
    }
}

// Add event listener to the "Connect to MetaMask" button
window.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    if (connectButton) {
        connectButton.addEventListener('click', () => {
            console.log('"Connect to MetaMask" button clicked');
            handleMetaMaskDeepLink();
        });
    } else {
        console.log('Connect button not found on the page.');
    }
});

