window.onload = async function() {
  // Load MetaMask
  const provider = await detectEthereumProvider();

  if (provider) {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    document.getElementById("connect-metamask").onclick = () => connectMetaMask(web3);
    document.getElementById("claim-airdrop").onclick = () => claimAirdrop(web3);
  } else {
    alert("Please install MetaMask to interact with this application.");
  }

  // Setup Tron (TronWeb) - Updated initialization
  const tronWeb = window.TronWeb || {}; // Assuming TronWeb is injected
  if (tronWeb && tronWeb.defaultAddress.base58) {
    // If TronWeb is available, we can interact with the Tron blockchain
    console.log("TronWeb is connected:", tronWeb.defaultAddress.base58);
  } else {
    console.log("TronWeb not found.");
  }
};




