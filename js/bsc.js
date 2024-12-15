let contractAddress;
let contractABI;

async function initializeBSC() {
    const network = await detectWallet();

    if (network === 'bsc') {
        if (window.ethereum) {
            // Request connection to MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            loadBSCConfig();
        }
    }
}

async function loadBSCConfig() {
    try {
        const response = await fetch('config/bsc_config.json');
        const config = await response.json();
        const abiResponse = await fetch('abi/bsc_abi.json');
        const abi = await abiResponse.json();

        contractAddress = config.contractAddress;
        contractABI = abi;

        console.log("BSC Config Loaded:", config);
        initializeBSCContract();
    } catch (error) {
        console.error("Error loading BSC config:", error);
    }
}

function initializeBSCContract() {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("BSC Contract Initialized:", contract);
}

async function claimBSCAirdrop() {
    if (web3 && contractAddress && contractABI) {
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        try {
            const receipt = await contract.methods.claimAirdrop().send();
            console.log("BSC Airdrop Claimed:", receipt);
            alert("Airdrop claimed successfully!");
        } catch (error) {
            console.error("BSC Airdrop Claim Error:", error);
        }
    } else {
        alert("BSC wallet or contract not properly loaded.");
    }
}
