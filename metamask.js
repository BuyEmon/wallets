let web3;
let accounts;
let contractAddress;
let tokenAddress;
let contractABI;

async function loadConfig() {
  try {
    const configResponse = await fetch('https://buyemon.github.io/wallets/config.json');
    if (!configResponse.ok) {
      throw new Error('Failed to fetch config.json');
    }
    const configData = await configResponse.json();
    contractAddress = configData.contractAddress;
    tokenAddress = configData.tokenAddress;

    const abiResponse = await fetch('https://buyemon.github.io/wallets/abi.json');
    if (!abiResponse.ok) {
      throw new Error('Failed to fetch abi.json');
    }
    const abiData = await abiResponse.json();
    contractABI = abiData;

    console.log("Configuration loaded:", configData);
    console.log("ABI loaded:", abiData);
  } catch (error) {
    console.error("Error loading config or ABI: ", error);
    alert("Error loading configuration or ABI. Please try again later.");
  }
}

async function connectMetaMask() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Connected accounts:", accounts);

      document.getElementById('claimAirdropButton').disabled = false;
      document.getElementById('connectMetaMaskButton').disabled = true;
    } catch (error) {
      alert('MetaMask connection failed');
      console.error('MetaMask connection error:', error);
    }
  } else {
    alert('MetaMask is not installed. Please install MetaMask to use this application.');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('connectMetaMaskButton').addEventListener('click', connectMetaMask);
  loadConfig();
});
