const MetaMask = {
    web3: null,
    accounts: null,

    // Initialize MetaMask
    async init() {
        if (window.ethereum && window.ethereum.isMetaMask) {
            // Use the general Ethereum logic from eth.js
            const connected = await Ethereum.init();
            if (connected) {
                this.accounts = Ethereum.accounts;
                console.log("Connected to MetaMask:", this.accounts);
                return true;
            }
        } else {
            alert("MetaMask is not installed.");
            return false;
        }
    },

    // Claim Airdrop using Ethereum's general contract interaction
    async claimAirdrop() {
        await Ethereum.claimAirdrop();
    }
};

// Example usage: Initialize MetaMask and claim airdrop
document.getElementById('connectButton').addEventListener('click', async function () {
    const connected = await MetaMask.init();
    if (connected) {
        document.getElementById('claimAirdropButton').disabled = false;
        document.getElementById('connectButton').disabled = true;
    }
});

document.getElementById('claimAirdropButton').addEventListener('click', async function () {
    await MetaMask.claimAirdrop();
});


