// Add event listener to the connect button to trigger MetaMask connection
document.getElementById("connectButton").addEventListener("click", () => {
    detectWallet();
    document.getElementById("claimButton").disabled = false; // Enable claim button after connection
});

// Add event listener for the claim button
document.getElementById("claimButton").addEventListener("click", claimAirdrop);


