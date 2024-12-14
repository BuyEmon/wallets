let web3 = null;
let accounts = [];
let contractAddress = '';
let contractABI = null;
let network = '';

async function loadConfigAndABI() {
  const selectedNetwork = 'eth'; // Change this dynamically based on user selection (e.g., BSC, Tron)
  
  // Load the correct config and ABI files based on the selected network
  const configUrl = `/config/${selectedNetwork}_config.json`; // Network-specific config file
  const abiUrl = `/abi/${selectedNetwork}_abi.json`; // Network-specific ABI file

  try {
    // Load config file
    const configResponse = await fetch(configUrl);
    const config = await configResponse.json();
    contractAddress = config.contractAddress; // Get contract address from config
    network = config.network; // Set the network type

    // Load ABI file
    const abiResponse = await fetch(abiUrl);
    contractABI = await abiResponse.json(); // Get contract ABI from file

    console.log('Config and ABI loaded for network:', network);
  } catch (error) {
    console.error("Failed to load config or ABI:", error);
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
  await loadConfigAndABI(); // Load config and ABI dynamically on page load
  document.getElementById("connect-metamask").onclick = connectMetaMask;
  document.getElementById("claim-airdrop").onclick = claimAirdrop;
};

