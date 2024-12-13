console.log('tronlink.js loaded successfully');

// Function to connect TronLink
async function connectTronLink() {
    // Check if TronLink is installed
    if (typeof window.tronLink === 'undefined') {
        alert('TronLink is not installed!');
        return;
    }

    try {
        // Request account access if needed
        const tronWeb = window.tronLink.tronWeb;
        if (tronWeb && tronWeb.defaultAddress.base58) {
            const address = tronWeb.defaultAddress.base58;
            console.log('TronLink connected:', address);

            // Store the Tron address globally for later use (tron.js will access this)
            window.tronAddress = address;

            // Enable the claim airdrop button after connecting
            const claimButton = document.getElementById('claimAirdropButton');
            if (claimButton) {
                claimButton.disabled = false; // Enable the button
                console.log('Claim Airdrop button enabled');
            }

            alert('TronLink connected successfully');
        } else {
            alert('Failed to get TronLink account');
        }
    } catch (error) {
        alert('Failed to connect to TronLink');
        console.error('TronLink connection error:', error);
    }
}

// Attach event listener for the TronLink button click
window.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectTronLinkButton'); // Use the correct ID from the HTML
    if (connectButton) {
        connectButton.addEventListener('click', connectTronLink);
    } else {
        console.error('TronLink button not found in the DOM');
    }
});



