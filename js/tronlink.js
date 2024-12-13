// tronlink.js
(function() {
    console.log('Starting TronLink connection process...');

    // Function to retry checking for TronLink
    function checkTronLinkConnection(retries = 5, delay = 1000) {
        return new Promise((resolve, reject) => {
            let attempt = 0;

            const checkInterval = setInterval(() => {
                attempt++;
                console.log(`Checking TronLink (attempt ${attempt})`);

                if (window.tronLink && window.tronLink.tronWeb) {
                    console.log('TronLink is installed and tronWeb is injected');
                    clearInterval(checkInterval);
                    resolve(window.tronLink.tronWeb);
                } else if (attempt >= retries) {
                    console.log('TronLink not available or tronWeb not injected after retries');
                    clearInterval(checkInterval);
                    reject('TronLink connection failed');
                }
            }, delay);
        });
    }

    // Try to connect with TronLink
    checkTronLinkConnection()
        .then((tronWeb) => {
            console.log('Successfully connected to TronLink:', tronWeb);
            const address = tronWeb.defaultAddress.base58;
            console.log('Connected Tron address:', address);

            // Proceed with your logic after successful connection
            enableClaimButton(true);
        })
        .catch((error) => {
            console.log('Error during TronLink connection:', error);
            alert('Please unlock your TronLink wallet and try again.');
        });

    // Enable or disable the "Claim Airdrop" button based on connection status
    function enableClaimButton(enable) {
        const claimButton = document.getElementById('claimAirdropButton');
        if (claimButton) {
            claimButton.disabled = !enable;
            console.log(`Claim Airdrop button ${enable ? 'enabled' : 'disabled'}`);
        } else {
            console.error('Claim Airdrop button not found in the DOM');
        }
    }

    console.log('TronLink connection process complete');
})();




