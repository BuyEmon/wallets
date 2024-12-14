// Load the common script and initialize the wallet logic based on the user's choice
window.addEventListener('load', function() {
    // Load common.js and initialize
    const script = document.createElement('script');
    script.src = 'js/common.js';
    document.head.appendChild(script);

    // Load the MetaMask script
    script.onload = () => {
        const metamaskScript = document.createElement('script');
        metamaskScript.src = 'js/metamask.js';
        document.head.appendChild(metamaskScript);
    };
});




