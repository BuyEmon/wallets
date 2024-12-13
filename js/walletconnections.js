console.log('walletConnection.js loaded successfully');

// Function to check if MetaMask is available
function isMetaMask() {
    return (window.ethereum && /metamask/i.test(window.navigator.userAgent));
}

// Function to check if TrustWallet is available
function isTrustWallet() {
    return (window.ethereum && /trust/i.test(window.navigator.userAgent));
}

// Function to connect to MetaMask
async function connectMetaMask() {
    if (isMetaMask()) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('MetaMask connected:', accounts[0]);
            // Enable your claim button or do other tasks after connection
            document.getElementById('claimAirdropButton').disabled = false;
        } catch (error) {
            console.log('MetaMask connection failed:', error);
        }
    } else {
        alert('MetaMask is not installed or available.');
    }
}

// Function to connect to TrustWallet
async function connectTrustWallet() {
    if (isTrustWallet()) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('TrustWallet connected:', accounts[0]);
            // Enable your claim button or do other tasks after connection
            document.getElementById('claimAirdropButton').disabled = false;
        } catch (error) {
            console.log('TrustWallet connection failed:', error);
        }
    } else {
        alert('TrustWallet is not installed or available.');
    }
}

// Function to handle wallet connection based on detection
function connectWallet() {
    if (isMetaMask()) {
        console.log('MetaMask detected');
        connectMetaMask();
    } else if (isTrustWallet()) {
        console.log('TrustWallet detected');
        connectTrustWallet();
    } else {
        console.log('No supported wallet detected');
        alert('Please install MetaMask or TrustWallet to proceed.');
    }
}

// Attach event listeners for wallet connection buttons
document.getElementById('connectMetaMaskButton').addEventListener('click', connectWallet);
document.getElementById('connectTrustWalletButton').addEventListener('click', connectWallet);

