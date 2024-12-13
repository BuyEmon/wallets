console.log('tronlink.js loaded successfully');

// Function to check if TronLink is available
function isTronLink() {
    return window.tronLink && window.tronLink.tronWeb;
}

// Function to connect to TronLink
async function connectTronLink() {
    console.log('Attempting to connect to TronLink...');

    // Ensure TronLink is available and initialized
    if (isTronLink()) {
        const tronWeb = window.tronLink.tronWeb;

        // Check if TronLink is ready
        if (tronWeb && tronWeb.ready) {
            console.log('TronLink is connected');
            const account = tronWeb.defaultAddress.base58;
            console.log('Connected account:', account);
            // Enable claiming airdrop after connection
            document.getElementById('claimAirdropButton').disabled = false;
        } else {
            console.log('TronLink is not ready yet. Retrying...');
            setTimeout(connectTronLink, 1000);  // Retry every second
        }
    } else {
        console.log('TronLink is not installed');
        alert('Please install TronLink to connect.');
    }
}

// Event listener for the "Connect to TronLink" button
document.getElementById('connectTronLinkButton').addEventListener('click', connectTronLink);

// Ensure TronLink is available once the page is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    if (isTronLink()) {
        console.log('TronLink is detected!');
    } else {
        console.log('TronLink is not installed');
    }
});



