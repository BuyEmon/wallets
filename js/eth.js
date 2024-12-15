const Ethereum = {
    web3: null,
    accounts: null,
    contractAddress: null,
    tokenAddress: null,
    contractABI: null,

    async initialize() {
        try {
            if (!window.ethereum) throw new Error("MetaMask is not installed.");

            this.accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.web3 = new Web3(window.ethereum);

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

    initializeContract() {
        this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
        console.log("Ethereum Contract Initialized:", this.contract);
    },

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
