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
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

  
  