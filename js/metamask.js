// metamask.js: MetaMask-specific logic for interacting with the Ethereum blockchain
// Include console.debug for debugging purposes

console.debug('Loading metamask.js...');

// Function to claim the airdrop (Ethereum-specific)
async function claimAirdrop() {
  if (window.ethereum) {
    try {
      // Get the current account from MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const userAccount = accounts[0];

      if (!userAccount) {
        console.error('No MetaMask account found');
        return;
      }

      console.debug('Claiming airdrop for account:', userAccount);

      // Assuming the contract ABI and address are dynamically loaded via loader.js
      const contractAddress = window.ethereum.config.contractAddress;  // Loaded from config
      const contractABI = window.ethereum.config.contractABI;  // Loaded from ABI
      const web3 = new Web3(window.ethereum);  // Initialize Web3 with MetaMask provider
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      // Call the airdrop function (assume claimAirdrop() is the contract function)
      await contract.methods.claimAirdrop().send({ from: userAccount });
      console.debug('Airdrop claimed successfully');
    } catch (error) {
      console.error('Error claiming airdrop:', error);
    }
  } else {
    console.error('MetaMask is not available');
  }
}

// Expose the claimAirdrop function to be used elsewhere in the dApp
export { claimAirdrop };



