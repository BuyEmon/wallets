// metamask.js (MetaMask-specific connection handling)

let isRedirected = false; // Prevent multiple redirections
let isConnected = false; // Prevent reconnection if already connected

// Function to handle MetaMask redirection or connection
async function handleMetaMaskConnection(deepLinkURL) {
    if (isRedirected || isConnected) return;

    if (isMobileDevice()) {
        console.log("Mobile device detected. Redirecting to MetaMask if not already in MetaMask browser...");

        // Check if already in MetaMask browser
        if (!navigator.userAgent.includes("MetaMask")) {
            redirectToMetaMask(deepLinkURL);
            return;
        }

        console.log("Already in MetaMask browser. Proceeding without redirection.");
    } else {
        console.log("Non-mobile device detected. Attempting connection...");
        await connectEthereum();
    }
}

// Function to initialize MetaMask on page load
function initializeMetaMask(configUrl, abiUrl, deepLinkURL) {
    window.addEventListener('DOMContentLoaded', async () => {
        console.log("Initializing MetaMask...");

        // Load configuration and ABI files
        await loadConfig(configUrl, abiUrl);

        // Handle MetaMask connection or redirection
        handleMetaMaskConnection(deepLinkURL);

        // Attach event listeners to buttons
        const connectButton = document.getElementById('connectButton');
        const claimAirdropButton = document.getElementById('claimAirdropButton');

        if (connectButton) {
            connectButton.addEventListener('click', connectEthereum);
        }

        if (claimAirdropButton) {
            claimAirdropButton.addEventListener('click', claimEthereumAirdrop);
        }
    });
}
