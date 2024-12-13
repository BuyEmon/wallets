console.log("tronlink.js loaded successfully");

async function connectTronLink() {
    // Check if TronLink is installed
    if (typeof window.tronLink === 'undefined') {
        alert('TronLink is not installed! Please install TronLink to proceed.');
        console.error('TronLink not detected.');
        return;
    }

    try {
        // Request the accounts and wait for the response
        await window.tronLink.request({ method: 'tron_requestAccounts' });

        // Access the connected account
        const account = window.tronLink.defaultAddress.base58;
        
        if (account) {
            console.log("Connected to TronLink account:", account);
            alert('TronLink connected successfully to address: ' + account);
            document.getElementById('statusMessage').textContent = 'Connected to TronLink: ' + account;
        } else {
            alert('TronLink connection failed. No account found.');
            console.error('TronLink account not found.');
        }

    } catch (error) {
        alert('Failed to connect to TronLink.');
        console.error('TronLink connection error:', error);
    }
}

// Add event listener to connect button
window.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectTronLinkButton');
    if (connectButton) {
        connectButton.addEventListener('click', connectTronLink);
        console.log('"Connect to TronLink" button is ready.');
    } else {
        console.error('Connect button not found on the page.');
    }
});


