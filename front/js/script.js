let listeCanap = document.getElementById("items");

// fonction de recuperation des canapes
function getCanapes(url) {
  fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (canapes) {
      displayCanapes(canapes);
    })
    .catch(function (err) {
      console.log("erreur : " + err)
      alert("erreur : " + err)
    });
}

// fonction d'affichage
function displayCanapes(products) {
  for (let canape of products) {
    let elementA = document.createElement("a");
    elementA.setAttribute("href", "./product.html?id=" + canape._id);

    let article = document.createElement("article");
    elementA.appendChild(article);

    let image = document.createElement("img");
    image.src = canape.imageUrl;
    image.alt = canape.altTxt;
    article.appendChild(image);

    let titre = document.createElement("h3");
    titre.textContent = canape.name;
    article.appendChild(titre);

    let description = document.createElement("p");
    description.textContent = canape.description;
    article.appendChild(description);

    listeCanap.appendChild(elementA);
  }
}

getCanapes("http://localhost:3000/api/products");