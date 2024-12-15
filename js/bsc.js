const BSC = {
    web3: null,
    contract: null,
    contractAddress: null,
    contractABI: null,

    async initialize() {
        try {
            const network = await detectWallet();

            if (network !== 'bsc' && network !== 'bsc-testnet') {
                alert("Please connect to the Binance Smart Chain network.");
                return;
            }

            if (window.ethereum) {
                // Request connection to MetaMask
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                this.web3 = new Web3(window.ethereum);
                console.log("BSC Wallet Connected:", accounts[0]);
                await this.loadConfig();
            } else {
                throw new Error("MetaMask or compatible wallet not detected.");
            }
        } catch (error) {
            console.error("BSC Initialization Error:", error);
            alert(error.message);
        }
    },

    async loadConfig() {
        try {
            const response = await fetch('config/bsc_config.json');
            const config = await response.json();

            const abiResponse = await fetch('abi/bsc_abi.json');
            const abi = await abiResponse.json();

            this.contractAddress = config.contractAddress;
            this.contractABI = abi;

            this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
            console.log("BSC Config Loaded:", config);
            console.log("BSC Contract Initialized:", this.contract);
        } catch (error) {
            console.error("Error loading BSC config:", error);
            alert("Failed to load BSC contract configuration.");
        }
    },

    async claimAirdrop() {
        if (!this.web3 || !this.contract) {
            alert("BSC wallet or contract not properly initialized.");
            return;
        }

        try {
            const accounts = await this.web3.eth.getAccounts();
            const receipt = await this.contract.methods.claimAirdrop().send({ from: accounts[0] });

            console.log("BSC Airdrop Claimed:", receipt);
            alert("Airdrop claimed successfully!");
        } catch (error) {
            console.error("BSC Airdrop Claim Error:", error);
            alert("Failed to claim airdrop. Check the console for details.");
        }
    }
};

