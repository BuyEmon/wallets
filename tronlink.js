async function connectTronLink() {
    if (isConnected) return; // Prevent reconnection if already connected

    if (window.tronLink) {
        const tronWeb = window.tronLink.tronWeb;
        try {
            accounts = [tronWeb.defaultAddress.base58];  // TronLink returns the address this way
            console.log("Connected to TronLink:", accounts);

            // Set connected flag to true
            isConnected = true;

            // Enable claim button and disable connect button
            document.getElementById('claimAirdropButton').disabled = false;
            document.getElementById('connectButton').disabled = true;
        } catch (error) {
            alert('TronLink connection failed');
            console.error('TronLink connection error:', error);
        }
    } else {
        alert("TronLink is not installed. Please ensure you are using TronLink browser.");
    }
}
