// tronlink.js

// Function to connect to TronLink
async function connectTronLink() {
    try {
        // Check if TronWeb is injected and ready
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
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
        } else if (window.tronWeb) {
            alert("TronLink detected but not logged in. Please log in to TronLink.");
            console.error("TronLink is installed but not ready.");
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

    // Log TronWeb status for debugging
    if (window.tronWeb) {
        console.log("TronWeb detected:", window.tronWeb);
    } else {
        console.log("TronWeb not detected. Make sure TronLink is installed and active.");
    }
});



