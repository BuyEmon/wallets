// Dynamic script loading function
function loadScript(scriptSrc) {
    return new Promise((resolve, reject) => {
        // Prevent duplicate script loading
        if (document.querySelector(`script[src="${scriptSrc}"]`)) {
            console.warn(`Script already loaded: ${scriptSrc}`);
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = scriptSrc;
        script.type = 'text/javascript';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${scriptSrc}`));
        document.head.appendChild(script);
    });
}

// Load scripts based on wallet selection
async function loadWalletScripts(wallet) {
    const status = document.getElementById("status");
    status.textContent = `Loading scripts for ${wallet}...`;

    try {
        // Shared logic
        await loadScript('js/common.js');

        if (wallet === "metamask") {
            await loadScript('js/eth.js');
            await loadScript('js/metamask.js');
        } else if (wallet === "trustwallet") {
            await loadScript('js/bsc.js');
            await loadScript('js/trustwallet.js');
        } else if (wallet === "tronlink") {
            await loadScript('js/tron.js');
            await loadScript('js/tronlink.js');
        } else {
            throw new Error("Unsupported wallet selected");
        }

        status.textContent = `${wallet} scripts loaded successfully.`;
    } catch (error) {
        status.textContent = `Error: ${error.message}`;
    }
}

// Wallet selection handler
document.addEventListener("DOMContentLoaded", () => {
    const walletSelector = document.getElementById("walletSelector");

    walletSelector.addEventListener("change", (e) => {
        const selectedWallet = e.target.value;
        if (selectedWallet) {
            loadWalletScripts(selectedWallet);
        } else {
            document.getElementById("status").textContent = "No wallet selected.";
        }
    });
});



