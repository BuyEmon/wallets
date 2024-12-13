// trustwallet.js

// Function to connect to TrustWallet
async function connectTrustWallet() {
    try {
        // Detect TrustWallet user agent or window.ethereum object
        const userAgent = navigator.userAgent.toLowerCase();
        
        // Check for TrustWallet user agent on mobile devices (not desktop)
        if (userAgent.includes("trustwallet") || (window.ethereum && window.ethereum.isTrust) || (window.ethereum && window.ethereum.isTrustWallet)) {
            console.log("TrustWallet detected");

            // Enable claim button after successful connection
            const claimButton = document.getElementById("claimAirdropButton");
            if (claimButton) {
                claimButton.disabled = false;
            }

            // Display connection status
            const statusMessage = document.getElementById("statusMessage");
            if (statusMessage) {
                statusMessage.innerText = "Connected to TrustWallet";
                statusMessage.style.color = "green";
            }
        } else {
            alert("This is not TrustWallet!");
            console.error("TrustWallet not detected.");
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


