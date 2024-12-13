// tronlink.js

// Check if TronLink is installed and ready
function isTronLinkReady() {
    return window.tronLink && window.tronLink.ready;
}

// Connect to TronLink and request user accounts
async function connectTronLink() {
    try {
        if (isTronLinkReady()) {
            const tronWeb = window.tronLink.tronWeb;
            console.log("TronLink is ready. Accessing TronWeb...");

            // Request user accounts
            const accounts = await tronWeb.request({ method: 'tron_requestAccounts' });
            console.log("TronLink accounts:", accounts);
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

// Update the status message UI element
function updateStatusMessage(message) {
    const statusMessageElement = document.getElementById("statusMessage");
    if (statusMessageElement) {
        statusMessageElement.innerText = message;
    }
}

// Wait for DOMContentLoaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    const connectButton = document.getElementById("connectTronLinkButton");

    if (connectButton) {
        connectButton.addEventListener("click", connectTronLink);
    } else {
        console.warn('Connect button not found in the DOM.');
    }
});


