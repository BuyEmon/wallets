let web3;
let accounts;
let contractAddress;
let tokenAddress;
let contractABI;

async function initializeEthereum() {
    const network = await detectWallet();

    if (network === 'ethereum') {
        if (window.ethereum) {
            // Request connection to MetaMask
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            loadEthereumConfig();
        }
    }
}

async function loadEthereumConfig() {
    try {
        const response = await fetch('config/eth_config.json');
        const config = await response.json();
        const abiResponse = await fetch('abi/eth_abi.json');
        const abi = await abiResponse.json();

        contractAddress = config.contractAddress;
        tokenAddress = config.tokenAddress;
        contractABI = abi;

        console.log("Ethereum Config Loaded:", config);
        initializeEthereumContract();
    } catch (error) {
        console.error("Error loading Ethereum config:", error);
    }
}

function initializeEthereumContract() {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log("Ethereum Contract Initialized:", contract);
}

async function claimEthereumAirdrop() {
    if (web3 && accounts && contractAddress && contractABI) {
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        try {
            const receipt = await contract.methods.claimAirdrop().send({ from: accounts[0] });
            console.log("Ethereum Airdrop Claimed:", receipt);
            alert("Airdrop claimed successfully!");
        } catch (error) {
            console.error("Ethereum Airdrop Claim Error:", error);
        }
    } else {
        alert("Ethereum wallet or contract not properly loaded.");
    }
}
