document.addEventListener('DOMContentLoaded', () => {
    console.log('loader.js: DOM Content Loaded');
    
    const metaMaskButton = document.getElementById('connectMetaMask');
    const bscButton = document.getElementById('connectBSC');
    const tronButton = document.getElementById('connectTronLink');
    const sepoliaButton = document.getElementById('connectSepolia');
    
    metaMaskButton.addEventListener('click', () => {
        console.log('loader.js: Connect MetaMask clicked');
        loadMetaMask();
    });

    bscButton.addEventListener('click', () => {
        console.log('loader.js: Connect BSC clicked');
        loadBSCNetwork();
    });

    tronButton.addEventListener('click', () => {
        console.log('loader.js: Connect TronLink clicked');
        loadTronLink();
    });

    sepoliaButton.addEventListener('click', () => {
        console.log('loader.js: Connect Sepolia clicked');
        loadSepoliaNetwork();
    });

    function loadMetaMask() {
        console.log('loader.js: Loading MetaMask...');
        // Dynamically load MetaMask-related script
        const script = document.createElement('script');
        script.src = 'js/metamask.js';
        document.body.appendChild(script);
        script.onload = () => console.log('MetaMask script loaded');
    }

    function loadBSCNetwork() {
        console.log('loader.js: Loading BSC Network...');
        // You can add logic to load BSC-specific code here
    }

    function loadTronLink() {
        console.log('loader.js: Loading TronLink...');
        // You can add logic to load TronLink-specific code here
    }

    function loadSepoliaNetwork() {
        console.log('loader.js: Loading Sepolia Network...');
        // You can add logic to load Sepolia-specific code here
    }
});
