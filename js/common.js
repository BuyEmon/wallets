// airdrop.js

// Function to claim the airdrop
async function claimAirdrop() {
    if (!web3) {
        alert('Please connect to a wallet first.');
        return;
    }

    if (!contractAddress || !contractABI) {
        alert('Smart contract details are not loaded. Please refresh the page.');
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts(); // Fetch current account
        const contract = new web3.eth.Contract(contractABI, contractAddress); // Load the contract

        // Call the claim function from the smart contract
        const receipt = await contract.methods.claimAirdrop().send({
            from: accounts[0], // Use the first account connected
        });

        console.log('Airdrop claimed successfully:', receipt);
        alert('Airdrop claimed successfully!');
    } catch (error) {
        console.error('Error while claiming airdrop:', error);
        alert('Failed to claim airdrop. Check the console for more details.');
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


