console.log('tronlink.js loaded successfully');

// Function to claim the airdrop (TronLink)
async function claimTronAirdrop() {
    console.log('Attempting to claim airdrop on TronLink...');

    // Ensure TronLink is available
    if (!window.tronLink) {
        console.error('TronLink is not installed');
        alert('Please install TronLink!');
        return;
    }

    try {
        // Request accounts from TronLink
        const accounts = await window.tronLink.request({ method: "tron_requestAccounts" });
        if (accounts.length === 0) {
            console.error('No Tron accounts connected');
            alert('Please connect to TronLink first!');
            return;
        }

        // Assuming your contract interaction goes here
        // Example: TronWeb contract interaction (when ABI and contract address are available)
        // const contract = await window.tronLink.contract().at(contractAddress);
        // await contract.someMethod().send();
        
        alert('Airdrop claimed successfully on TronLink!');
    } catch (error) {
        console.error('Error claiming Tron airdrop:', error);
        alert('Error claiming airdrop on TronLink');
    }
}

// Connect to TronLink
async function connectTronLink() {
    if (window.tronLink) {
        try {
            // Request TronLink accounts
            const accounts = await window.tronLink.request({ method: "tron_requestAccounts" });
            if (accounts.length > 0) {
                document.getElementById("walletStatus").innerText = "Connected to TronLink: " + accounts[0];
            } else {
                document.getElementById("walletStatus").innerText = "No accounts available in TronLink.";
            }
        } catch (error) {
            console.error('TronLink connection error:', error);
            document.getElementById("walletStatus").innerText = "Error connecting to TronLink.";
        }
    } else {
        alert('Please install TronLink!');
        document.getElementById("walletStatus").innerText = "TronLink is not installed.";
    }
}

// Add event listeners for the buttons
document.getElementById('connectTronLinkButton').addEventListener('click', connectTronLink);
document.getElementById('claimAirdropButton').addEventListener('click', claimTronAirdrop);


