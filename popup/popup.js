chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    let url = activeTab.url;
    console.log("URL de l'onglet actif :", url);
});

document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        document.getElementById("url").textContent = tabs[0].url;
        alert(tabs[0].url);
    });
});
