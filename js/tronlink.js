// tronlink.js

// Function to connect to TronLink
async function connectTronLink() {
    try {
        // Ensure TronLink and TronWeb are available
        if (window.tronLink && window.tronWeb && window.tronWeb.defaultAddress.base58) {
            const address = window.tronWeb.defaultAddress.base58;
            console.log("Connected to TronLink:", address);

            // Display connection status
            const statusMessage = document.getElementById("statusMessage");
            if (statusMessage) {
                statusMessage.innerText = `Connected to TronLink: ${address}`;
                statusMessage.style.color = "green";
            }

            // Enable claim button if needed
            const claimButton = document.getElementById("claimAirdropButton");
            if (claimButton) {
                claimButton.disabled = false;
            }
        } else if (window.tronLink) {
            // TronLink detected but not ready
            alert("TronLink is installed but not ready. Please wait and try again.");
            console.error("TronLink is installed but tronWeb is not ready.");
        } else {
            alert("TronLink is not installed. Please install TronLink and refresh the page.");
            console.error("TronLink is not installed.");
        }
    } catch (error) {
        console.error("An error occurred while connecting to TronLink:", error);
    }
}

// Add event listener for the TronLink connect button
document.addEventListener("DOMContentLoaded", () => {
    const tronLinkButton = document.getElementById("connectTronLinkButton");
    if (tronLinkButton) {
        tronLinkButton.addEventListener("click", connectTronLink);
    }
});


