// common.js: Handles wallet detection, connection, and deep linking for MetaMask, TronLink, and TrustWallet
// Include console.debug for debugging purposes

console.debug('Loading common.js...');

// Wallet detection and connection
function detectWallet() {
  console.debug('Detecting wallet...');

  // Check if MetaMask is available
  if (window.ethereum) {
    console.debug('MetaMask detected');
    return 'metamask';
  }
  
  // Check if TronLink is available
  if (window.tronLink) {
    console.debug('TronLink detected');
    return 'tron';
  }
  
  // Check if TrustWallet is available (TrustWallet also uses MetaMask provider)
  if (window.ethereum && window.ethereum.isTrust) {
    console.debug('TrustWallet detected');
    return 'trustwallet';
  }

  console.error('No compatible wallet detected');
  return null;
}

// Connect to the selected wallet
function connectWallet(walletType) {
  console.debug(`Connecting to ${walletType}...`);

  switch (walletType) {
    case 'metamask':
      if (window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(accounts => {
            console.debug('MetaMask connected', accounts);
            // Further actions after connection, such as loading the Ethereum network
          })
          .catch(error => console.error('MetaMask connection error:', error));
      }
      break;
      
    case 'tron':
      if (window.tronLink) {
        window.tronLink.request({ method: 'tron_requestAccounts' })
          .then(accounts => {
            console.debug('TronLink connected', accounts);
            // Further actions after connection, such as loading the Tron network
          })
          .catch(error => console.error('TronLink connection error:', error));
      }
      break;

    case 'trustwallet':
      if (window.ethereum && window.ethereum.isTrust) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(accounts => {
            console.debug('TrustWallet connected', accounts);
            // Further actions after connection, such as loading the Ethereum network
          })
          .catch(error => console.error('TrustWallet connection error:', error));
      }
      break;

    default:
      console.error('Unknown wallet type');
  }
}

// Handle deep linking for mobile wallets
function handleDeepLink(walletType) {
  console.debug(`Handling deep link for ${walletType}...`);

  switch (walletType) {
    case 'metamask':
      window.location.href = 'metamask://';
      break;
      
    case 'tron':
      window.location.href = 'tronlink://';
      break;

    case 'trustwallet':
      window.location.href = 'trust://';
      break;

    default:
      console.error('Unknown wallet type for deep linking');
  }
}

// Expose functions for use in other parts of the dApp
export { detectWallet, connectWallet, handleDeepLink };

