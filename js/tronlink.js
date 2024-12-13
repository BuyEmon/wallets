console.log('tronlink.js loaded successfully');

// Function to connect to TronLink
async function connectTronLink() {
    console.log('Attempting to connect to TronLink...');

    // Ensure TronLink is available and initialized
    const tronWeb = window.tronLink && window.tronLink.tronWeb;

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
}

// Event listener for the "Connect to TronLink" button
document.getElementById('connectTronLinkButton').addEventListener('click', connectTronLink);



