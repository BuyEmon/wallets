// trustwallet.js

// Function to connect to TrustWallet
async function connectTrustWallet() {
    try {
        // Check if the Ethereum provider is available (TrustWallet uses this)
        if (window.ethereum) {
            console.log("TrustWallet detected!");

            // Check if TrustWallet is connected
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const address = accounts[0];
            console.log("Connected to TrustWallet:", address);

            // Display connection status
            const statusMessage = document.getElementById("statusMessage");
            if (statusMessage) {
                statusMessage.innerText = `Connected to TrustWallet: ${address}`;
                statusMessage.style.color = "green";
            }

            // Enable claim button if needed
            const claimButton = document.getElementById("claimAirdropButton");
            if (claimButton) {
                claimButton.disabled = false;
            }
        } else {
            alert("TrustWallet is not installed. Please install TrustWallet and refresh the page.");
            console.error("TrustWallet is not installed.");
        }
    } catch (error) {
        console.error("An error occurred while connecting to TrustWallet:", error);
    }
}

// Add event listener for the TrustWallet connect button
document.addEventListener("DOMContentLoaded", () => {
    const trustWalletButton = document.getElementById("connectTrustWalletButton");
    if (trustWalletButton) {
        trustWalletButton.addEventListener("click", connectTrustWallet);
    }
});

