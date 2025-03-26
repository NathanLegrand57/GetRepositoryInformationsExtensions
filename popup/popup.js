function getUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    const lastPart = url;
    if (!url.includes("github.com")) {
      alert("You're not on github website");
      return;
    } else {
      getRepository(url);
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
    return;
  } else {
    fetchData(autorName, repositoryName);
    console.log("Repository: " + repositoryName);
  }
}

async function fetchData(autorName, repositoryName) {
  const url = `https://api.github.com/repos/${autorName}/${repositoryName}`;
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (e) {
    console.log("Error", e);
    setTimeout(() => window.close(), 100);
  }

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const createdDate = new Date(data.created_at);
  const updatedDate = new Date(data.updated_at);

  const formattedCreatedDate = dateFormatter.format(createdDate);
  const formattedUpdatedDate = dateFormatter.format(updatedDate);

  alert(
    "Name : " +
      data.name +
      "\nCreated date : " +
      formattedCreatedDate +
      "\nLast time edited : " +
      formattedUpdatedDate
  );
}
