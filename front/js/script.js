let listeCanap = document.getElementById("items");

fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(canapes) {
    console.log(canapes);
    for (let canape of canapes) {
        let elementA = document.createElement("a");
        elementA.setAttribute("href","./product.html?id="+canape._id);
        listeCanap.appendChild(elementA);
        let article = document.createElement("article");
        listeCanap.appendChild(article);
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
    }
  })
  .catch(function(err) {
    console.log("erreur : " + err)
    // Une erreur est survenue
  });

  
  