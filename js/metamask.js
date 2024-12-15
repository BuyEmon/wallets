const MetaMask = {
    web3: null,
    accounts: null,
    contractAddress: null,
    contractABI: null,
    isConnected: false,

    async connect() {
        if (this.isConnected) return;

        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            try {
                // Request MetaMask account access
                this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("Connected to MetaMask:", this.accounts);
                this.isConnected = true;

                // Enable claim airdrop button after connecting
                document.getElementById('claimAirdropButton').disabled = false;
                document.getElementById('connectButton').disabled = true;
            } catch (error) {
                console.error("MetaMask connection failed:", error);
                alert("Failed to connect to MetaMask. Please ensure it's installed and try again.");
            }
        } else {
            alert("MetaMask is not installed. Please install it to continue.");
        }
    },

    async loadConfig() {
        try {
            const response = await fetch('config/eth_config.json');
            const config = await response.json();
            const abiResponse = await fetch('abi/eth_abi.json');
            const abi = await abiResponse.json();

            this.contractAddress = config.contractAddress;
            this.contractABI = abi;

            console.log("Ethereum Config Loaded:", config);
            this.initializeContract();
        } catch (error) {
            console.error("Error loading Ethereum config:", error);
        }
    },

    initializeContract() {
        const contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
        console.log("Ethereum Contract Initialized:", contract);
    },

    async claimAirdrop() {
        if (!this.accounts || !this.contractABI || !this.contractAddress) {
            alert("Configuration is missing. Connect MetaMask first.");
            return;
        }

        const contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
        try {
            const receipt = await contract.methods.claimAirdrop().send({ from: this.accounts[0] });
            console.log("Airdrop claimed:", receipt);
            alert("Airdrop claimed successfully!");
        } catch (error) {
            console.error("Error claiming airdrop:", error);
            alert("Failed to claim the airdrop.");
        }
    }
};


