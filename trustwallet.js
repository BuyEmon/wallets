async function connectTrustWallet() {
    if (isConnected) return; // Prevent reconnection if already connected

    if (window.ethereum && window.ethereum.isTrust) {
        web3 = new Web3(window.ethereum);
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected to Trust Wallet:", accounts);

            // Set connected flag to true
            isConnected = true;

            // Enable claim button and disable connect button
            document.getElementById('claimAirdropButton').disabled = false;
            document.getElementById('connectButton').disabled = true;
        } catch (error) {
            alert('Trust Wallet connection failed');
            console.error('Trust Wallet connection error:', error);
        }
    } else {
        alert("Trust Wallet is not installed. Please ensure you are using Trust Wallet browser.");
    }
}
