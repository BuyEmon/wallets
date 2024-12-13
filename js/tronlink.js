// tronlink.js

// Function to check if TronLink is installed and initialize the connection
function connectTronLink() {
    // Check if TronLink is available in the window object and is ready
    if (window.tronLink && window.tronLink.ready) {
        try {
            // Request accounts from TronLink
            tronLink.request({ method: 'tron_requestAccounts' })
                .then(accounts => {
                    // Check if there are accounts returned
                    if (accounts && accounts.length > 0) {
                        const base58 = accounts[0]; // Get the first account address
                        console.log("Connected to TronLink with account:", base58);
                        // Update the UI or handle the connected state here
                        document.getElementById('tronlink-status').innerText = "Connected: " + base58;
                    } else {
                        console.error("No accounts found.");
                        // Optionally notify the user there are no accounts
                        document.getElementById('tronlink-status').innerText = "No accounts found.";
                    }
                })
                .catch(error => {
                    console.error("TronLink connection error:", error);
                    // Optionally handle the error, e.g., show an error message to the user
                    document.getElementById('tronlink-status').innerText = "Connection failed.";
                });
        } catch (error) {
            console.error("Error initializing TronLink:", error);
            // Handle errors during TronLink initialization
            document.getElementById('tronlink-status').innerText = "Initialization error.";
        }
    } else {
        console.error("TronLink is not installed or ready.");
        // Optionally notify the user that TronLink is not installed
        document.getElementById('tronlink-status').innerText = "TronLink is not installed.";
    }
}

// Wait for DOM content to be loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Select the connect button and attach event listener to it
    const connectButton = document.getElementById('connect-tronlink');
    if (connectButton) {
        connectButton.addEventListener('click', connectTronLink);
    }
});
