let web3 = null;
let accounts = [];
let contractAddress = '';
let contractABI = null;
let network = '';

async function loadConfig() {
  const selectedNetwork = 'eth'; // Change this dynamically based on user selection (e.g., BSC, Tron)
  const configUrl = `/config/${selectedNetwork}_config.json`;  // Load correct config for selected network

  try {
    const response = await fetch(configUrl);
    const config = await response.json();
    contractAddress = config.contractAddress; // Get contract address from config
    contractABI = config.contractABI; // Get contract ABI from config
    network = config.network; // Set the network type
    console.log('Config loaded for network:', network);
  } catch (error) {
    console.error("Failed to load config:", error);
  }
}

async function connectMetaMask() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      accounts = await web3.eth.getAccounts();
      network = await web3.eth.net.getNetworkType();
      alert("Connected to MetaMask: " + accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  } else {
    alert("Please install MetaMask.");
  }
}

async function claimAirdrop() {
  if (accounts.length > 0 && contractABI && contractAddress) {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
      await contract.methods.claimAirdrop().send({ from: accounts[0] });
      alert("Airdrop claimed successfully!");
    } catch (error) {
      console.error("Error claiming airdrop:", error);
    }
  } else {
    alert("Please connect MetaMask first.");
  }
}

window.onload = async function() {
  await loadConfig(); // Ensure config is loaded first
  document.getElementById("connect-metamask").onclick = connectMetaMask;
  document.getElementById("claim-airdrop").onclick = claimAirdrop;
};



