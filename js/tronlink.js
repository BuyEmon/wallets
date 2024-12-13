// tronlink.js: Script to handle TronLink wallet integration with debugging logs

let tronLink;

function checkTronLink() {
    console.log("Checking if TronLink is available...");
    if (typeof window.tronLink !== "undefined") {
        tronLink = window.tronLink;
        console.log("TronLink found!");
        return true;
    } else {
        console.error("TronLink not found! Please install the TronLink extension.");
        return false;
    }
}

async function connectTronLink() {
    try {
        console.log("Attempting to connect to TronLink...");
        if (checkTronLink()) {
            console.log("TronLink is available, requesting access...");
            const accounts = await tronLink.request({ method: "tron_requestAccounts" });
            console.log("TronLink connected! Accounts:", accounts);

            if (accounts && accounts.length > 0) {
                const account = accounts[0];
                console.log("Connected to TronLink account:", account);
                return account;
            } else {
                console.error("No accounts found in TronLink.");
                return null;
            }
        } else {
            console.error("TronLink not available or not connected.");
            return null;
        }
    } catch (error) {
        console.error("Error connecting to TronLink:", error);
        return null;
    }
}

function getTronLinkNetwork() {
    if (tronLink && tronLink.tronWeb) {
        console.log("Fetching TronLink network details...");
        const network = tronLink.tronWeb.defaultAddress.base58;
        console.log("TronLink network address:", network);
        return network;
    } else {
        console.error("TronLink is not properly initialized or TronWeb is missing.");
        return null;
    }
}

// Function to handle TronLink connection and network setup
async function handleTronLinkConnection() {
    console.log("Handling TronLink connection...");
    const account = await connectTronLink();

    if (account) {
        console.log("TronLink account connected:", account);
        const network = getTronLinkNetwork();
        console.log("TronLink connected to network:", network);
        // Do something with the network and account (e.g., interact with the blockchain)
    } else {
        console.error("Failed to connect to TronLink.");
    }
}

// Initialize the connection when the page loads
window.addEventListener("load", () => {
    console.log("Window loaded. Checking TronLink...");
    if (checkTronLink()) {
        handleTronLinkConnection();
    }
});




