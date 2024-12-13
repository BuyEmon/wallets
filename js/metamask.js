async function claimAirdrop() {
    try {
        console.log('Checking wallet connection...');
        
        // Check if wallet is connected and the correct one is selected
        if (window.ethereum) {
            console.log('Connected wallet:', window.ethereum.selectedAddress);
        } else {
            console.log('No wallet connected');
            return;
        }
        
        console.log('Sending transaction to claim airdrop...');
        
        // Call the smart contract function to claim the airdrop
        const contract = new web3.eth.Contract(abi, contractAddress);
        const response = await contract.methods.claimAirdrop().send({ from: window.ethereum.selectedAddress });
        
        console.log('Airdrop claimed successfully:', response);
    } catch (error) {
        console.error('Airdrop claim failed:', error);
    }
}



// metamask.js
async function connectMetaMask() {
    console.log("Attempting to connect to MetaMask...");
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("MetaMask response:", accounts);
            if (accounts.length > 0) {
                console.log("MetaMask connected:", accounts[0]);
                document.getElementById("status").textContent = "MetaMask connected!";
            } else {
                console.log("MetaMask connection failed: No accounts found");
                document.getElementById("status").textContent = "MetaMask connection failed!";
            }
        } catch (error) {
            console.error("MetaMask connection error:", error);
            document.getElementById("status").textContent = "MetaMask connection failed!";
        }
    } else {
        console.log("MetaMask is not installed");
        document.getElementById("status").textContent = "MetaMask is not installed!";
    }
}

// Make sure this function is invoked when the user clicks the MetaMask connect button
document.getElementById("metamask-connect").addEventListener("click", connectMetaMask);




console.log('metamask.js loaded successfully');

// Function to connect MetaMask
async function connectMetaMask() {
    if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed!');
        return;
    }

    try {
        // Request account access if needed
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum); // Initialize Web3 with the current provider
        console.log('MetaMask connected:', accounts);

        // Store accounts globally for later use (eth.js will access this)
        window.accounts = accounts;

        // Enable the claim airdrop button after connecting
        const claimButton = document.getElementById('claimAirdropButton');
        if (claimButton) {
            claimButton.disabled = false; // Enable the button
            console.log('Claim Airdrop button enabled');
        }

        alert('MetaMask connected successfully');
    } catch (error) {
        alert('Failed to connect to MetaMask');
        console.error('MetaMask connection error:', error);
    }
}

// Attach event listener for MetaMask connection
window.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectMetaMaskButton'); // Use the correct ID from the HTML
    if (connectButton) {
        connectButton.addEventListener('click', connectMetaMask);
    } else {
        console.error('MetaMask button not found in the DOM');
    }
});

