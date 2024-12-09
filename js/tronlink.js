// tronlink.js
// No need to declare contractAddress or contractABI here - just use the global variables from common.js

async function connectTronLink() {
    if (typeof window.tronLink === 'undefined') {
        alert('TronLink is not installed!');
        return;
    }

    try {
        const accounts = await window.tronLink.request({ method: 'tron_requestAccounts' });
        web3 = new Web3(window.tronLink);
        accounts = accounts;
        alert('TronLink connected successfully');
    } catch (error) {
        alert('Failed to connect to TronLink');
        console.error('TronLink connection error:', error);
    }
}

// Add event listener to connect button
window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('connectButton').addEventListener('click', connectTronLink);
});

