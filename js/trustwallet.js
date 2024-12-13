// trustwallet.js

console.log('trustwallet.js loaded successfully');

// Function to check if TrustWallet is being used
function checkTrustWallet() {
    const userAgent = navigator.userAgent.toLowerCase();
    console.log("User agent:", userAgent);

    // Check if TrustWallet is being used by detecting user agent
    if (/trustwallet/i.test(userAgent)) {
        console.log("TrustWallet detected.");
        return true;
    } else {
        console.log("This is not TrustWallet!");
        alert("This is not TrustWallet! Please use TrustWallet to connect.");
        return false;
    }
}

// Function to connect to TrustWallet
async function connectTrustWallet() {
    if (checkTrustWallet()) {
        try {
            // Ensure that TrustWallet Web3 is available
            if (typeof window.ethereum !== 'undefined') {
                console.log("TrustWallet Web3 detected");

                // Request the user to connect their wallet
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                if (accounts.length > 0) {
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
                    console.log("No accounts found in TrustWallet");
                    alert("No accounts found in TrustWallet. Please ensure TrustWallet is unlocked.");
                }
            } else {
                console.log("TrustWallet Web3 is not detected. Ensure TrustWallet is installed.");
                alert("TrustWallet Web3 is not detected. Please ensure TrustWallet is installed and enabled.");
            }
        } catch (error) {
            console.error("An error occurred while connecting to TrustWallet:", error);
            alert("An error occurred while connecting to TrustWallet. Please try again.");
        }
    }
}

// Add event listener to the "Connect to TrustWallet" button
document.addEventListener("DOMContentLoaded", () => {
    const trustWalletButton = document.getElementById("connectTrustWalletButton");
    if (trustWalletButton) {
        trustWalletButton.addEventListener("click", connectTrustWallet);
    }

    // Log TrustWallet status for debugging
    if (window.ethereum) {
        console.log("Ethereum provider detected:", window.ethereum);
    } else {
        console.log("Ethereum provider not detected. Make sure TrustWallet is installed and active.");
    }
});

