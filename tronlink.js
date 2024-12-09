let tronWeb;
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

async function connectTronLink() {
  if (window.tronLink) {
    tronWeb = window.tronLink.tronWeb;
    try {
      accounts = await tronWeb.request({ method: 'tron_requestAccounts' });
      console.log("Connected accounts:", accounts);

      document.getElementById('claimAirdropButton').disabled = false;
      document.getElementById('connectTronLinkButton').disabled = true;
    } catch (error) {
      alert('TronLink connection failed');
      console.error('TronLink connection error:', error);
    }
  } else {
    alert('TronLink is not installed. Please install TronLink to use this application.');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('connectTronLinkButton').addEventListener('click', connectTronLink);
  loadConfig();
});
