function getUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const urlElement = document.getElementById("url");
    const url = tabs[0].url;
    // alert(url);
    urlElement.textContent = url;
    urlElement.href = url;
    const lastPart = url;
    const website = lastPart.split("/")[2];
    if (website === "github.com") {
      // alert("You're on github");
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
  const autorName = website.split("/")[3];
  const repositoryName = website.split("/")[4];
  if (repositoryName === undefined) {
    alert("Repository not found");
  } else {
    fetchData(autorName, repositoryName);
    alert("Repository: " + repositoryName);
  }
}

async function fetchData(autorName, repositoryName) {
  const url = `https://api.github.com/repos/${autorName}/${repositoryName}`;
  let data;
  try {
    alert("gngng :" + url);
    const response = await fetch(url);
    data = await response.json();
  } catch (e) {
    alert("Error", e);
  }

  const filteredValues = {
    id: data.id,
    name: data.name,
    login: data.owner.login,
    created_at: data.created_at,
    visibility : data.private,
  };

  console.log(
    `This is the informations about the repository ${repositoryName} :`,
    filteredValues
  );
}
