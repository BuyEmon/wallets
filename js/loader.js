// loader.js: Dynamically loads wallet-specific scripts and initializes the app

// Dynamically load a JavaScript file
function loadScript(scriptUrl) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = () => resolve();
        script.onerror = () => reject(`Failed to load script: ${scriptUrl}`);
        document.head.appendChild(script);
    });
}

// Initialize the application
async function initializeApp() {
    try {
        // Load common.js first
        await loadScript('/js/common.js');

        // Detect wallet selection (default to MetaMask for now)
        const walletSelection = document.getElementById('walletSelector').value || 'metamask';
        const networkSelection = document.getElementById('networkSelector').value || 'eth';

        // Set the selected network
        setNetwork(networkSelection);

        // Load the wallet-specific script
        let walletScript = '';
        switch (walletSelection) {
            case 'metamask':
                walletScript = '/js/metamask.js';
                break;
            case 'trustwallet':
                walletScript = '/js/trustwallet.js';
                break;
            case 'tronlink':
                walletScript = '/js/tronlink.js';
                break;
            default:
                throw new Error(`Unsupported wallet: ${walletSelection}`);
        }

        console.log(`Loading wallet script: ${walletScript}`);
        await loadScript(walletScript);

        console.log('Application initialized successfully!');
    } catch (error) {
        console.error('Error initializing application:', error);
        alert('Failed to initialize the application. Please try again.');
    }
}

// Initialize the app when the DOM content is loaded
window.addEventListener('DOMContentLoaded', initializeApp);




