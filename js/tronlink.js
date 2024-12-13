console.log('tronlink.js loaded successfully');

// Function to check if TronLink is available
function isTronLinkAvailable() {
    return window.tronLink && window.tronLink.tronWeb;
}

// Function to connect to TronLink
async function connectToTronLink() {
    console.log('Attempting to connect to TronLink...');

    // Check if TronLink is available and initialized
    if (isTronLinkAvailable()) {
        const tronWeb = window.tronLink.tronWeb;

        // Check if TronLink is fully initialized
        if (tronWeb && tronWeb.ready) {
            console.log('TronLink is connected');
            const account = tronWeb.defaultAddress.base58; // Get the connected account
            console.log('Connected account:', account);

            // Enable the "Claim Airdrop" button and other actions
            document.getElementById('claimAirdropButton').disabled = false;

            // Optionally, store the account for further use
            window.tronAccount = account;
        } else {
            console.log('TronLink is not ready. Retrying...');
            setTimeout(connectToTronLink, 1000); // Retry connection after 1 second
        }
    } else {
        console.log('TronLink is not installed');
        alert('Please install TronLink to connect.');
    }
}

// Event listener for the "Connect to TronLink" button
document.getElementById('connectTronLinkButton').addEventListener('click', connectToTronLink);

// Check for TronLink availability when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    if (isTronLinkAvailable()) {
        console.log('TronLink is available');
    } else {
        console.log('TronLink is not installed');
    }
});



