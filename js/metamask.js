const MetaMask = {
    web3: null,
    accounts: null,
    contractAddress: null,
    tokenAddress: null,
    contractABI: null,

    async connect() {
        if (window.ethereum) {
            try {
                // Request connection to MetaMask
                this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.web3 = new Web3(window.ethereum);
                console.log("Connected to MetaMask:", this.accounts);
            } catch (error) {
                console.error("MetaMask connection failed:", error);
                alert("Failed to connect to MetaMask.");
            }
        } else {
            alert("MetaMask is not installed.");
        }
    },

    async claimAirdrop() {
        if (!this.web3 || !this.accounts) {
            alert("MetaMask is not connected.");
            return;
        }

        const contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
        try {
            const receipt = await contract.methods.claimAirdrop().send({ from: this.accounts[0] });
            console.log("MetaMask Airdrop Claimed:", receipt);
            alert("Airdrop claimed successfully!");
        } catch (error) {
            console.error("Error claiming airdrop:", error);
            alert("Failed to claim the airdrop.");
        }
    }
};


