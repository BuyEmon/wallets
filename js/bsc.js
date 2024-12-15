// Ensure 'web3' is not declared multiple times
if (typeof web3 === 'undefined') {
    var web3 = new Web3(provider);  // Initialize web3 if it's not defined
}

// Your BSC-specific logic goes here
function connectBSC() {
    // Logic to connect to BSC network using web3
}
