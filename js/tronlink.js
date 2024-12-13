// tronlink.js

// Check if TronLink is installed and ready
function isTronLinkReady() {
    if (window.tronLink && window.tronLink.ready) {
        return true;
    } else {
        return false;
    }
}

// Connect to TronLink and request user accounts
async function connectTronLink() {
    try {
        if (isTronLinkReady()) {
            const tronWeb = window.tronLink.tronWeb;
            console.log("TronLink is ready. Accessing TronWeb...");

            // Request user accounts using TronLink
            const accounts = await tronWeb.request({ method: 'tron_requestAccounts' });
            console.log("TronLink accounts:", accounts);
            // Perform your logic with the accounts here
            updateStatusMessage(`Connected to TronLink account: ${accounts[0]}`);
        } else {
            console.log("TronLink is not installed or not ready.");
            updateStatusMessage("TronLink is not installed or not ready.");
        }
    } catch (error) {
        console.error("Error connecting to TronLink:", error);
        updateStatusMessage("Failed to connect to TronLink.");
    }
}

// Check if user is connected to TronLink and display their address
async function checkTronLinkConnection() {
    if (isTronLinkReady()) {
        const tronWeb = window.tronLink.tronWeb;
        const accounts = await tronWeb.defaultAddress.base58; // Default account
        if (accounts) {
            console.log("TronLink connected:", accounts);
            updateStatusMessage(`Connected to TronLink account: ${accounts}`);
        } else {
            console.log("No TronLink account detected.");
            updateStatusMessage("No TronLink account detected.");
        }
    } else {
        console.log("TronLink is not installed or not ready.");
        updateStatusMessage("TronLink is not installed or not ready.");
    }
}

// Handle TronLink disconnection
function handleDisconnection() {
    console.log("Disconnected from TronLink.");
    updateStatusMessage("Disconnected from TronLink.");
}

// Update the status message UI element
function updateStatusMessage(message) {
    const statusMessageElement = document.getElementById("statusMessage");
    if (statusMessageElement) {
        statusMessageElement.innerText = message;
    }
}

// Event listener to trigger connection on button click
document.getElementById("connectTronLinkButton").addEventListener("click", connectTronLink);

// Event listener to check connection on page load
window.addEventListener("load", checkTronLinkConnection);

// Optional: Event listener to handle disconnection (if applicable)
document.getElementById("disconnectTronLinkButton").addEventListener("click", handleDisconnection);


