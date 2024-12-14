// Debugging: Uncomment for development
console.debug("Initializing Ethereum-specific logic");

// Import necessary libraries (e.g., Web3.js or Ethers.js)
// Ensure Web3 or Ethers is already loaded in the page or via a CDN

// Define global variables
let web3;
let contract;
let accounts;
let contractAddress;
let tokenAddress;
let contractABI;

// Initialize the connection to Ethereum
function initEthereumConnection(config, abi) {
  console.debug("Initializing Ethereum connection...");

  if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    console.debug("MetaMask detected");

    // Request account access if needed
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        console.debug("Ethereum accounts:", accounts);
        // Set global account
        accounts = accounts[0];
        // Set contract address and ABI
        contractAddress = config.address;
        tokenAddress = config.tokenAddress;
        contractABI = abi;

        // Initialize contract
        contract = new web3.eth.Contract(contractABI, contractAddress);

        // Enable the claim button after connection
        enableClaimButton();
      })
      .catch((error) => {
        console.error("Error accessing Ethereum accounts:", error);
      });
  } else {
    console.error("MetaMask not detected!");
  }
}

// Enable the claim button once MetaMask is connected
function enableClaimButton() {
  console.debug("Enabling claim airdrop button...");
  const claimButton = document.getElementById("claimAirdropButton");
  if (claimButton) {
    claimButton.disabled = false;
  }
}

// Claim airdrop function
function claimAirdrop() {
  console.debug("Claiming airdrop...");

  if (!contract || !accounts) {
    console.error("Contract or account not initialized.");
    return;
  }

  // Call the smart contract method (adjust as necessary)
  contract.methods.claimAirdrop().send({ from: accounts })
    .then((receipt) => {
      console.debug("Airdrop claimed successfully:", receipt);
      alert("Airdrop claimed successfully!");
    })
    .catch((error) => {
      console.error("Error claiming airdrop:", error);
      alert("Error claiming airdrop. Please try again.");
    });
}

// Export functions to be used in other files
export { initEthereumConnection, claimAirdrop };

