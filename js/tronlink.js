// Initialize SunWeb (alternative to tronWeb.sidechain)
let sunWeb;

if (window.sunWeb) {
    sunWeb = window.sunWeb; // Use SunWeb if available
} else {
    console.error("SunWeb SDK is not available. Please install it.");
}

function connectTronLink() {
    if (sunWeb && sunWeb.ready) {
        sunWeb.request({ method: 'sun_requestAccounts' })
            .then(accounts => {
                if (accounts && Array.isArray(accounts) && accounts.length > 0) {
                    const base58 = accounts[0];
                    console.log("Connected to TronLink with account:", base58);
                    // Update UI or handle connected state
                    document.getElementById('tronlink-status').innerText = "Connected: " + base58;
                } else {
                    console.error("No accounts found.");
                    document.getElementById('tronlink-status').innerText = "No accounts found.";
                }
            })
            .catch(error => {
                console.error("TronLink connection error:", error);
                document.getElementById('tronlink-status').innerText = "Connection failed.";
            });
    } else {
        console.error("TronLink is not installed or ready.");
        document.getElementById('tronlink-status').innerText = "TronLink is not installed.";
    }
}

