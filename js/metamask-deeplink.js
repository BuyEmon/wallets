console.log('metamask-deeplink.js loaded successfully');

let isRedirected = false; // Prevent multiple redirects
let isConnected = false; // Track connection state

// Function to handle MetaMask deep linking for mobile users
function handleMetaMaskDeepLink() {
    if (isRedirected || isConnected) return; // Prevent duplicate actions
    const isMobileDevice = isMobile();
    const metaMaskDeepLink = 'https://metamask.app.link/dapp/buyemon.github.io/wallets/index.html';

    console.log('isMobile:', isMobileDevice);

    if (isMobileDevice) {
        console.log('Mobile device detected. Checking if in MetaMask browser...');
        
        // Check if already in MetaMask browser
        if (navigator.userAgent.includes("MetaMask")) {
            console.log("Already in MetaMask browser. No redirection needed.");
            return;
        }

        // Redirect to MetaMask browser
        console.log('Redirecting to MetaMask mobile app...');
        isRedirected = true;
        window.location.href = metaMaskDeepLink;

        // Fallback alert in case the redirect fails
        setTimeout(() => {
            alert("If MetaMask did not open, please manually open MetaMask, navigate to the browser, and visit the page again.");
        }, 3000);
    } else {
        console.log('Non-mobile device detected. Please connect using a desktop browser.');
    }
}

// Helper function to check if the user is on a mobile device
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

// Function to connect to MetaMask (for desktop and mobile users)
async function connectMetaMask() {
    if (isConnected) return; // Prevent reconnection if already connected

    if (window.ethereum) {
        try {
            console.log('Requesting MetaMask connection...');
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected accounts:', accounts);
            isConnected = true;
            alert('Connected to MetaMask successfully!');
        } catch (error) {
            console.error('MetaMask connection error:', error);
            alert('MetaMask connection failed. Please try again.');
        }
    } else {
        alert('MetaMask is not installed. Please ensure you are using the MetaMask browser.');
    }
}

// Add event listener to the "Connect to MetaMask" button
window.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    if (connectButton) {
        connectButton.addEventListener('click', () => {
            console.log('"Connect to MetaMask" button clicked');
            handleMetaMaskDeepLink();
            connectMetaMask(); // Attempt connection after redirection
        });
    } else {
        console.log('Connect button not found on the page.');
    }
});


