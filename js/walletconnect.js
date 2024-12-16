const TrustWallet = {
    web3: null,
    accounts: null,

    // Initialize TrustWallet
    async init() {
        if (window.ethereum && window.ethereum.isTrust) {
            // Use the general Ethereum logic from eth.js
            const connected = await Ethereum.init();
            if (connected) {
                this.accounts = Ethereum.accounts;
                console.log("Connected to TrustWallet:", this.accounts);
                return true;
            }
        } else {
            alert("TrustWallet is not installed.");
            return false;
        }
    },

    // Claim Airdrop using Ethereum's general contract interaction
    async claimAirdrop() {
        await Ethereum.claimAirdrop();
    }
};

// Example usage: Initialize TrustWallet and claim airdrop
document.getElementById('connectTrustwalletButton').addEventListener('click', async function () {
    const connected = await TrustWallet.init();
    if (connected) {
        document.getElementById('claimTrustwalletAirdropButton').disabled = false;
        document.getElementById('connectTrustwalletButton').disabled = true;
    }
});

document.getElementById('claimTrustwalletAirdropButton').addEventListener('click', async function () {
    await TrustWallet.claimAirdrop();
});
