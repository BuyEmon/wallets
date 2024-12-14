function redirectToMetaMask() {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isMetaMask = navigator.userAgent.includes("MetaMask");

    if (isMobile && !isMetaMask) {
        const deepLinkURL = "https://metamask.app.link/dapp/yourdomain.com/asset/index.html";
        console.log("Redirecting to MetaMask:", deepLinkURL);
        window.location.href = deepLinkURL;

        setTimeout(() => {
            alert("If MetaMask did not open, open it manually and visit the site.");
        }, 3000);
    }
}

