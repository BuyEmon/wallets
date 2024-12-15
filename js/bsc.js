let web3;
let accounts;
let contractAddress;
let tokenAddress;
let contractABI;

async function initializeBSC() {
    const network = await detectWallet();

    if (network === 'bsc') {
        if (window.ethereum) {
            // Connect to BSC via Trust Wallet or similar
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
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
        tokenAddress = config.tokenAddress;
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

async function claimBSC_Airdrop() {
    if (web3 && accounts && contractAddress && contractABI) {
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        try {
            const receipt = await contract.methods.claimAirdrop().send({ from: accounts[0] });
            console.log("BSC Airdrop Claimed:", receipt);
            alert("Airdrop claimed successfully!");
        } catch (error) {
            console.error("BSC Airdrop Claim Error:", error);
        }
    } else {
        alert("BSC wallet or contract not properly loaded.");
    }
}
