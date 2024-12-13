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



// trustwallet.js
async function connectTrustWallet() {
    console.log("Attempting to connect to Trust Wallet...");
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Trust Wallet response:", accounts);
            if (accounts.length > 0) {
                console.log("Trust Wallet connected:", accounts[0]);
                document.getElementById("status").textContent = "Trust Wallet connected!";
            } else {
                console.log("Trust Wallet connection failed: No accounts found");
                document.getElementById("status").textContent = "Trust Wallet connection failed!";
            }
        } catch (error) {
            console.error("Trust Wallet connection error:", error);
            document.getElementById("status").textContent = "Trust Wallet connection failed!";
        }
    } else {
        console.log("Trust Wallet is not installed");
        document.getElementById("status").textContent = "Trust Wallet is not installed!";
    }
}

// Make sure this function is invoked when the user clicks the Trust Wallet connect button
document.getElementById("trustwallet-connect").addEventListener("click", connectTrustWallet);





// trustwallet.js

// Function to connect to TrustWallet
async function connectTrustWallet() {
    try {
        // Check if the Ethereum provider is available (TrustWallet uses this)
        if (window.ethereum) {
            console.log("TrustWallet detected!");

            // Check if TrustWallet is connected
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const address = accounts[0];
            console.log("Connected to TrustWallet:", address);

            // Display connection status
            const statusMessage = document.getElementById("statusMessage");
            if (statusMessage) {
                statusMessage.innerText = `Connected to TrustWallet: ${address}`;
                statusMessage.style.color = "green";
            }

            // Enable claim button if needed
            const claimButton = document.getElementById("claimAirdropButton");
            if (claimButton) {
                claimButton.disabled = false;
            }
        } else {
            alert("TrustWallet is not installed. Please install TrustWallet and refresh the page.");
            console.error("TrustWallet is not installed.");
        }
    } catch (error) {
        console.error("An error occurred while connecting to TrustWallet:", error);
    }
}

// Add event listener for the TrustWallet connect button
document.addEventListener("DOMContentLoaded", () => {
    const trustWalletButton = document.getElementById("connectTrustWalletButton");
    if (trustWalletButton) {
        trustWalletButton.addEventListener("click", connectTrustWallet);
    }
});

