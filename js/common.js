let web3 = null;
let accounts = [];
let contractAddress = 'YOUR_CONTRACT_ADDRESS';
let contractABI = null; // Contract ABI will be dynamically loaded
let network = ''; // Network should be detected dynamically

async function connectMetaMask(web3) {
  if (window.ethereum) {
    try {
      await window.ethereum.enable(); // Request access to MetaMask accounts
      accounts = await web3.eth.getAccounts();
      network = await web3.eth.net.getNetworkType();
      alert("Connected to MetaMask: " + accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask: ", error);
      alert("Failed to connect MetaMask");
    }
  }
}

async function claimAirdrop(web3) {
  if (accounts.length > 0 && contractABI) {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
      await contract.methods.claimAirdrop().send({ from: accounts[0] });
      alert("Airdrop claimed successfully!");
    } catch (error) {
      console.error("Error claiming airdrop: ", error);
      alert("Failed to claim airdrop");
    }
  } else {
    alert("No account connected or contract ABI missing.");
  }
}


