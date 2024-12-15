const Tron = {
    tronWeb: null,
    contract: null,
    contractAddress: null,
    contractABI: null,

    async initialize() {
        try {
            const network = await detectWallet();

            if (network !== 'tron') {
                alert("TronLink wallet not detected. Please install or unlock TronLink.");
                return;
            }

            if (window.tronLink) {
                await window.tronLink.request({ method: 'tron_requestAccounts' }); // Request wallet access
                this.tronWeb = window.tronLink.tronWeb;

                console.log("TronLink Connected:", this.tronWeb.defaultAddress.base58);
                await this.loadConfig();
            } else {
                throw new Error("TronLink is not available.");
            }
        } catch (error) {
            console.error("Initialization Error:", error);
            alert(error.message);
        }
    },

    async loadConfig() {
        try {
            const response = await fetch('config/tron_config.json');
            const config = await response.json();

            const abiResponse = await fetch('abi/tron_abi.json');
            const abi = await abiResponse.json();

            this.contractAddress = config.contractAddress;
            this.contractABI = abi;

            this.contract = await this.tronWeb.contract(abi, config.contractAddress);
            console.log("Tron Config Loaded:", config);
            console.log("Tron Contract Initialized:", this.contract);
        } catch (error) {
            console.error("Error loading Tron config:", error);
            alert("Failed to load Tron contract configuration.");
        }
    },

    async claimAirdrop() {
        if (!this.tronWeb || !this.contract) {
            alert("Tron wallet or contract not properly initialized.");
            return;
        }

        try {
            const receipt = await this.contract.claimAirdrop().send({
                from: this.tronWeb.defaultAddress.base58
            });
            console.log("Tron Airdrop Claimed:", receipt);
            alert("Airdrop claimed successfully!");
        } catch (error) {
            console.error("Tron Airdrop Claim Error:", error);
            alert("Failed to claim airdrop. Check the console for details.");
        }
    }
};
