console.log('walletConnection.js loaded successfully');

// Function to check if MetaMask is available
function isMetaMask() {
    return window.ethereum && /metamask/i.test(window.navigator.userAgent);
}

// Function to check if TrustWallet is available
function isTrustWallet() {
    return window.ethereum && /trust/i.test(window.navigator.userAgent);
}

// Function to handle wallet connection based on detection
async function connectMetaMask() {
    console.log('Attempting to connect to MetaMask...');
    if (isMetaMask()) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected to MetaMask:', accounts[0]);
            // Now that MetaMask is connected, enable the claim button
            document.getElementById('claimAirdropButton').disabled = false;
        } catch (error) {
            console.log('MetaMask connection error:', error);
            alert('Please connect to MetaMask');
        }
    } else {
        alert('MetaMask not installed');
    }
}

async function connectTrustWallet() {
    console.log('Attempting to connect to TrustWallet...');
    if (isTrustWallet()) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected to TrustWallet:', accounts[0]);
            // Now that TrustWallet is connected, enable the claim button
            document.getElementById('claimAirdropButton').disabled = false;
        } catch (error) {
            console.log('TrustWallet connection error:', error);
            alert('Please connect to TrustWallet');
        }
    } else {
        alert('TrustWallet not installed');
    }
}

// Event listener for wallet connection buttons
document.getElementById('connectMetaMaskButton').addEventListener('click', connectMetaMask);
document.getElementById('connectTrustWalletButton').addEventListener('click', connectTrustWallet);

