console.log('metamask.js: Script Loaded');

// This file will handle MetaMask-specific logic
function connectMetaMask() {
    if (window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                console.log('MetaMask connected:', accounts);
                // Handle contract interaction here
            })
            .catch(error => console.error('Error connecting MetaMask:', error));
}

document.getElementById('connectMetaMask').addEventListener('click', connectMetaMask);


