// tronlink.js
(function() {
    console.log('Starting TronLink connection process...');

    // Check if TronLink is installed
    if (window.tronLink) {
        console.log('TronLink is installed');
        
        // Check if TronLink has injected TronWeb
        if (window.tronLink.tronWeb) {
            console.log('TronLink has injected tronWeb');
            const tronWeb = window.tronLink.tronWeb;

            // Check if tronWeb is fully available and has default address
            if (tronWeb && tronWeb.defaultAddress) {
                console.log('TronWeb is ready');
                
                // Fetch the user's default Tron address
                const address = tronWeb.defaultAddress.base58;
                console.log('Connected Tron address:', address);

                // Attempt to check the network and display information
                const network = tronWeb.fullNode.host;
                console.log('Connected to Tron network:', network);
                
                // Display TronLink version for debugging
                console.log('TronLink version:', window.tronLink.version);
                
                // Your logic to enable claim or other actions after successful connection
                // Assuming that TronLink is connected, enable claim button
                enableClaimButton(true);

            } else {
                console.log('tronWeb or defaultAddress is not available');
                alert('TronLink is not fully initialized. Please refresh the page.');
            }
        } else {
            console.log('TronLink does not have tronWeb injected');
            alert('TronLink wallet is not available. Please install or unlock TronLink.');
        }
    } else {
        console.log('TronLink is not installed');
        alert('Please install TronLink extension to interact with this application.');
    }

    // Handle connecting the wallet manually if needed
    async function connectTronLinkManually() {
        try {
            console.log('Attempting to connect to TronLink...');
            if (window.tronLink && window.tronLink.tronWeb) {
                const tronWeb = window.tronLink.tronWeb;
                const address = await tronWeb.defaultAddress.base58;
                console.log('Manually connected address:', address);
                enableClaimButton(true);
            } else {
                console.log('TronLink not available or wallet not initialized.');
            }
        } catch (error) {
            console.error('Error during manual connection:', error);
        }
    }

    // Enable or disable the "Claim Airdrop" button based on the connection status
    function enableClaimButton(enable) {
        const claimButton = document.getElementById('claimAirdropButton');
        if (claimButton) {
            claimButton.disabled = !enable;
            console.log(`Claim Airdrop button ${enable ? 'enabled' : 'disabled'}`);
        } else {
            console.error('Claim Airdrop button not found in the DOM');
        }
    }

    // Call the manual connection function if TronLink is not automatically connected
    connectTronLinkManually();

    console.log('TronLink connection process complete');
})();




