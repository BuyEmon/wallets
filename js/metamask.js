// metamask.js

window.addEventListener('load', function () {
    console.log("MetaMask.js loaded.");

    // Initialize MetaMask connection
    if (typeof ethereum !== 'undefined') {
        const metamaskButton = document.getElementById('metamaskButton');
        const claimAirdropButton = document.getElementById('claimAirdropButton');

        metamaskButton.addEventListener('click', async function () {
            try {
                await ethereum.request({ method: 'eth_requestAccounts' });
                console.log("MetaMask connected.");
                claimAirdropButton.disabled = false;

                // Check if the user is on the correct network (Ethereum in this case)
                const ethConfig = await fetch('config/eth_config.json').then(res => res.json());
                const ethNetwork = await fetch('networks/eth_network.json').then(res => res.json());

                if (!isCorrectNetwork(ethNetwork)) {
                    await switchNetwork(ethNetwork);
                }
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        });

        // Handle airdrop claiming
        claimAirdropButton.addEventListener('click', async function () {
            try {
                const ethConfig = await fetch('config/eth_config.json').then(res => res.json());
                const ethABI = await fetch('abi/eth_abi.json').then(res => res.json());

                const web3 = new Web3(window.ethereum);
                const contract = new web3.eth.Contract(ethABI, ethConfig.contractAddress);

                const accounts = await web3.eth.getAccounts();
                await contract.methods.claimAirdrop().send({ from: accounts[0] });
                console.log("Airdrop claimed!");
            } catch (error) {
                console.error("Error claiming airdrop:", error);
            }
        });
    } else {
        console.log("MetaMask is not installed.");
    }
});


