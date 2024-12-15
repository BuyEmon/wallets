let contractAddress;
let contractABI;

async function initializeTron() {
    const network = await detectWallet();

    if (network === 'tron') {
        if (window.tronLink) {
            const tronWeb = window.tronLink.tronWeb;
            loadTronConfig();
        }
    }
}

async function loadTronConfig() {
    try {
        const response = await fetch('config/tron_config.json');
        const config = await response.json();
        const abiResponse = await fetch('abi/tron_abi.json');
        const abi = await abiResponse.json();

        contractAddress = config.contractAddress;
        contractABI = abi;

        console.log("Tron Config Loaded:", config);
        initializeTronContract();
    } catch (error) {
        console.error("Error loading Tron config:", error);
    }
}

function initializeTronContract() {
    const contract = tronWeb.contract(contractABI, contractAddress);
    console.log("Tron Contract Initialized:", contract);
}

async function claimTronAirdrop() {
    if (tronWeb && contractAddress && contractABI) {
        const contract = tronWeb.contract(contractABI, contractAddress);
        try {
            const receipt = await contract.claimAirdrop().send();
            console.log("Tron Airdrop Claimed:", receipt);
            alert("Airdrop claimed successfully!");
        } catch (error) {
            console.error("Tron Airdrop Claim Error:", error);
        }
    } else {
        alert("Tron wallet or contract not properly loaded.");
    }
}
