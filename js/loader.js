window.onload = async function() {
  const provider = await detectEthereumProvider();

  if (provider) {
    // If MetaMask is available, load MetaMask functionality
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    document.getElementById("connect-metamask").onclick = () => connectMetaMask(web3);
    document.getElementById("claim-airdrop").onclick = () => claimAirdrop(web3);
  } else {
    alert("Please install MetaMask to interact with this application.");
  }

  // Setup Tron (TronWeb)
  const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { 'TRON-PRO-API-KEY': 'YOUR_API_KEY' }, // Replace with your API key
    privateKey: 'YOUR_PRIVATE_KEY' // Use a safe way to handle private keys
  });
  
  // Tron wallet and smart contract interaction can be implemented here
};




