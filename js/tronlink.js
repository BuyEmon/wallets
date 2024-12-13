console.log('tronlink.js loaded successfully');

// Function to check if TronLink is available
function isTronLink() {
    return window.tronLink && window.tronLink.tronWeb;
}

// Connect to TronLink
async function connectTronLink() {
    console.log('Attempting to connect to TronLink...');

    // Check if TronLink is installed
    if (isTronLink()) {
        const tronWeb = window.tronLink.tronWeb;

        // Check if TronLink is ready
        if (tronWeb.ready) {
            console.log('TronLink is connected');
            const account = await tronWeb.defaultAddress.base58;
            console.log('Connected account:', account);
            // Example: Set up the button to claim airdrop (assuming it is present in the HTML)
            document.getElementById('claimAirdropButton').disabled = false;
        } else {
            console.log('TronLink is not ready yet. Retrying...');
            setTimeout(connectTronLink, 1000);  // Retry every second until it is ready
        }
    } else {
        console.log('TronLink is not installed');
        alert('Please install TronLink to connect.');
    }
}

// Add event listener for the TronLink connect button (assuming it's in the HTML)
document.getElementById('connectTronLinkButton').addEventListener('click', connectTronLink);

// Listen for page load to ensure everything is set up
window.addEventListener('DOMContentLoaded', () => {
    // Check if TronLink is available once the page is fully loaded
    if (isTronLink()) {
        console.log('TronLink is detected!');
    } else {
        console.log('TronLink is not installed');
    }
});


