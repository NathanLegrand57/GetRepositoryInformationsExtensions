function getUrl() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const urlElement = document.getElementById("url");
        const url = tabs[0].url;
        alert(url);
        urlElement.textContent = url;
        urlElement.href = url;
        let lastPart = url;
        let website = lastPart.split('/')[2];
        if (website = "github.com") {
            console.log("You're on github");
            getRepository(url);
        } else {
            alert("You're not on github website");
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    getUrl();
});

function getRepository(website) {
    let repository = website.split('/')[3];
    alert("Site : " + repository);
}