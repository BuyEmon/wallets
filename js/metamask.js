// MetaMask connection logic
const connectMetaMask = async () => {
    if (!isWalletInstalled('metamask')) {
        console.error("MetaMask is not installed.");
        return;
    }

    try {
        const accounts = await requestAccounts();
        console.log("Connected to MetaMask:", accounts[0]);
        window.activeAccount = accounts[0];  // Store active account
    } catch (error) {
        console.error("Error connecting to MetaMask:", error);
    }
};

// Airdrop claim logic (MetaMask-specific)
const claimAirdrop = async () => {
    const contractConfig = await loadConfig('eth');
    const abi = await loadABI('eth');
    
    // Assuming contract interaction code here (using Web3 or Ethers.js)
    console.log("Airdrop claim initiated...");
};

// Event listener for MetaMask connection button
document.getElementById('connect-metamask').addEventListener('click', connectMetaMask);

// Event listener for airdrop claim button
document.getElementById('claim-airdrop').addEventListener('click', claimAirdrop);


