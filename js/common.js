// common.js (Shared variables and functions)
let web3; // Web3 instance
let accounts; // User accounts
let contractAddress; // Contract address
let tokenAddress; // Token address
let contractABI; // Contract ABI

// Function to load configuration and ABI files
async function loadConfig(configUrl, abiUrl) {
    try {
        // Fetch the configuration file
        const configResponse = await fetch(configUrl);
        if (!configResponse.ok) {
            throw new Error('Failed to fetch config.json');
        }
        const configData = await configResponse.json();
        contractAddress = configData.contractAddress;
        tokenAddress = configData.tokenAddress;

        // Fetch the ABI file
        const abiResponse = await fetch(abiUrl);
        if (!abiResponse.ok) {
            throw new Error('Failed to fetch abi.json');
        }
        const abiData = await abiResponse.json();
        contractABI = abiData;

        console.log("Configuration loaded:", configData);
        console.log("ABI loaded:", abiData);
    } catch (error) {
        console.error("Error loading config or ABI: ", error);
        alert("Error loading configuration or ABI. Please try again later.");
    }
}

// Function to check if the user is on a mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Function to redirect to the MetaMask app (for mobile users)
function redirectToMetaMask(deepLinkURL) {
    const isMobile = isMobileDevice();

    if (isMobile) {
        console.log("Mobile device detected. Redirecting to MetaMask app...");
        if (!navigator.userAgent.includes("MetaMask")) {
            // Redirect to MetaMask browser
            console.log("Redirecting to MetaMask browser:", deepLinkURL);
            window.location.href = deepLinkURL;

            // Fallback alert in case the redirect doesn't work
            setTimeout(() => {
                alert("If MetaMask did not open, please manually open MetaMask, navigate to the browser, and visit the application URL.");
            }, 3000);
        }
    } else {
        console.log("Non-mobile device detected. Prompting for MetaMask installation...");
        alert("MetaMask is required to use this application. Please install MetaMask on your desktop or mobile device.");
    }
}
