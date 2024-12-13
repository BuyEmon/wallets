async function connectTronLink() {
    // Check if TronLink is installed
    if (typeof window.tronLink === 'undefined') {
        alert('TronLink is not installed! Please install TronLink to proceed.');
        console.error('TronLink not detected.');
        return;
    }

    try {
        // Wait for TronLink to be available
        await window.tronLink.request({ method: 'tron_requestAccounts' });

        // Access the connected account
        const account = window.tronLink.defaultAddress.base58;
        console.log("Connected to TronLink account:", account);

        alert('TronLink connected successfully to address: ' + account);

        // Enable any additional functionality for the user now that they're connected
        document.getElementById('statusMessage').textContent = 'Connected to TronLink: ' + account;

    } catch (error) {
        alert('Failed to connect to TronLink.');
        console.error('TronLink connection error:', error);
    }
}


