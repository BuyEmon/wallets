// Declare shared variables
let web3 = null;
let accounts = [];
let contractAddress = '';
let contractABI = null;
let tokenAddress = '';
let network = '';

// Initialize Web3
function initializeWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                window.accounts = accounts;
                console.log('Connected Accounts:', accounts);
            })
            .catch(err => {
                console.error('Error connecting to MetaMask:', err);
            });
    } else {
        alert("MetaMask is not installed. Please install it to use this DApp.");
    }
}

