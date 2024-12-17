console.debug('tronlink.js loaded');

if (typeof window.tronLink !== 'undefined') {
    console.debug('TronLink is available');
} else {
    console.debug('TronLink is NOT available');
}


document.addEventListener('DOMContentLoaded', function () {
    const connectTronLinkButton = document.getElementById('connectTronlinkButton');
    const claimTronAirdropButton = document.getElementById('claimTronAirdropButton');

    // Listen for TronLink button click
    connectTronLinkButton.addEventListener('click', async function () {
        if (window.tronLink) {
            try {
                console.debug("TronLink is detected!");
                
                // Request accounts from TronLink
                const accounts = await window.tronLink.request({ method: 'tron_requestAccounts' });
                console.debug("Connected to TronLink account:", accounts[0]);
                
                // Get current network
                const network = await window.tronLink.request({ method: 'tron_getNetworkType' });
                console.debug("Current TronLink network:", network);

                // You can add any network validation if required, e.g., mainnet or testnet
                if (network === 'mainnet') {
                    claimTronAirdropButton.disabled = false; // Enable button if on the right network
                } else {
                    alert("Please switch to the mainnet network.");
                    claimTronAirdropButton.disabled = true;
                }
            } catch (error) {
                console.error("Error connecting to TronLink:", error);
                alert("Failed to connect to TronLink.");
            }
        } else {
            alert("TronLink wallet is not installed.");
        }
    });
});
