// metamask.js

window.addEventListener('load', function () {
    if (typeof ethereum !== 'undefined') {
        const metamaskButton = document.getElementById('metamaskButton');
        const claimAirdropButton = document.getElementById('claimAirdropButton');

        metamaskButton.addEventListener('click', async function () {
            try {
                await ethereum.request({ method: 'eth_requestAccounts' });
                console.log("MetaMask connected.");
                claimAirdropButton.disabled = false;

                // Use common.js to check network
                const networkName = 'eth';  // Set network name dynamically (could also be passed as a param)
                const isCorrect = await isCorrectNetwork(networkName);

                if (!isCorrect) {
                    // Switch to correct network if needed
                    await switchNetwork(networkName);
                }
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        });

        // Handle airdrop claiming
        claimAirdropButton.addEventListener('click', async function () {
            try {
                // Load the ABI dynamically from network.js
                const ethABI = await loadNetworkABI('eth');
                const ethConfig = await loadNetworkConfig('eth');  // Dynamically load network config for ETH

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

