const Ethereum = {
    web3: null,
    accounts: null,
    contractAddress: null,
    tokenAddress: null,
    contractABI: null,
    contract: null,

    async initialize() {
        try {
            if (!window.ethereum) throw new Error("Ethereum wallet is not installed.");
            
            // Check if the user is connected to MetaMask and get accounts
            this.accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (this.accounts.length === 0) {
                throw new Error("No Ethereum accounts found. Please connect your wallet.");
            }

            // Initialize web3
            this.web3 = new Web3(window.ethereum);

            // Load contract configuration and ABI
            const configResponse = await fetch('config/eth_config.json');
            const abiResponse = await fetch('abi/eth_abi.json');

            const config = await configResponse.json();
            const abi = await abiResponse.json();

            this.contractAddress = config.contractAddress;
            this.tokenAddress = config.tokenAddress;
            this.contractABI = abi;

            console.log("Ethereum Config Loaded:", config);
            this.initializeContract();
        } catch (error) {
            console.error("Initialization Error:", error);
            alert(error.message);
        }
    },

    // Initialize the Ethereum contract
    initializeContract() {
        if (!this.web3 || !this.contractABI || !this.contractAddress) {
            alert("Missing contract data or Ethereum wallet.");
            return;
        }
        this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
        console.log("Ethereum Contract Initialized:", this.contract);
    },

    // Claim the airdrop
    async claimAirdrop() {
        if (!this.contract || !this.accounts) {
            alert("Ethereum wallet or contract is not properly initialized.");
            return;
        }
        try {
            const receipt = await this.contract.methods.claimAirdrop().send({ from: this.accounts[0] });
            console.log("Airdrop claimed:", receipt);
            alert("Airdrop claimed successfully!");
        } catch (error) {
            console.error("Claim Error:", error);
            alert("Failed to claim the airdrop.");
        }
    }
};

// Initialize Ethereum when the page is loaded
window.addEventListener('load', () => {
    Ethereum.initialize();
});
