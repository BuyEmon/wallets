const Ethereum = {
    web3: null,
    accounts: null,
    contractAddress: null,
    tokenAddress: null,
    contractABI: null,

    // Initialize Web3 and connect to the Ethereum network
    async init() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.accounts = await this.web3.eth.getAccounts();
                console.log("Connected to Ethereum:", this.accounts);
                return true;
            } catch (error) {
                console.error("Ethereum connection failed:", error);
                alert("Failed to connect to Ethereum.");
                return false;
            }
        } else {
            alert("No Ethereum provider found. Please install MetaMask or TrustWallet.");
            return false;
        }
    },

    // Set contract information (address and ABI)
    setContractInfo(contractAddress, tokenAddress, contractABI) {
        this.contractAddress = contractAddress;
        this.tokenAddress = tokenAddress;
        this.contractABI = contractABI;
    },

    // Connect to contract using web3
    async connectToContract() {
        if (!this.contractAddress || !this.contractABI) {
            console.error("Contract information is missing.");
            return;
        }

        const contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
        return contract;
    },

    // Call contract method (example: claim airdrop)
    async claimAirdrop() {
        if (!this.accounts) {
            alert("Please connect to Ethereum first.");
            return;
        }

        const contract = await this.connectToContract();
        if (!contract) return;

        try {
            const response = await contract.methods.claimAirdrop().send({ from: this.accounts[0] });
            console.log("Airdrop claimed:", response);
        } catch (error) {
            console.error("Error claiming airdrop:", error);
            alert("Failed to claim airdrop.");
        }
    }
};
