async function connectMetaMask() {
    if (isConnected) return; // Prevent reconnection if already connected

    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected to MetaMask:", accounts);

            // Set connected flag to true
            isConnected = true;

            // Enable claim button and disable connect button
            document.getElementById('claimAirdropButton').disabled = false;
            document.getElementById('connectButton').disabled = true;
        } catch (error) {
            alert('MetaMask connection failed');
            console.error('MetaMask connection error:', error);
        }
    } else {
        alert("MetaMask is not installed. Please ensure you are using the MetaMask browser.");
    }
}

function redirectToMetaMask() {
    if (isRedirected || isConnected) return; // Prevent multiple redirections if already connected
    isRedirected = true;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        console.log("Mobile device detected. Checking if in MetaMask browser...");

        // Check if the user is already in the MetaMask browser
        if (navigator.userAgent.includes("MetaMask")) {
            console.log("Already in MetaMask browser. No redirection needed.");
            return;
        }

        // Redirect to MetaMask browser
        const deepLinkURL = "https://metamask.app.link/dapp/buyemon.github.io/metamask/index10.html";
        console.log("Redirecting to MetaMask browser:", deepLinkURL);
        window.location.href = deepLinkURL;

        // Fallback alert in case the redirect doesn't work
        setTimeout(() => {
            alert("If MetaMask did not open, please manually open MetaMask, navigate to the browser, and visit https://buyemon.github.io/metamask/index10.html");
        }, 3000);
    } else {
        console.log("Non-mobile device detected. Prompting for MetaMask installation...");
        alert("MetaMask is required to use this application. Please install MetaMask on your desktop or mobile device.");
    }
}

document.getElementById('connectButton').addEventListener('click', connectMetaMask);
redirectToMetaMask();
