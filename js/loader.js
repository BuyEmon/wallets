// loader.js

window.addEventListener('load', function () {
    console.log("Loader.js initialized.");

    // Check if the browser supports MetaMask
    if (typeof window.ethereum !== 'undefined') {
        document.getElementById('metamaskButton').disabled = false;
    }

    // Add event listeners for buttons
    document.getElementById('metamaskButton').addEventListener('click', function () {
        loadScript('js/metamask.js', function() {
            console.log("MetaMask script loaded successfully.");
        });
    });
});

// Dynamically load JavaScript files
function loadScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
}

