window.addEventListener('DOMContentLoaded', async () => {
    await loadConfig(); // Load shared config

    // Add button event listeners
    document.getElementById('connectButton').addEventListener('click', connectMetaMask);
    document.getElementById('claimAirdropButton').addEventListener('click', claimAirdrop);
    redirectToMetaMask(); // Handle deep linking for mobile
});




