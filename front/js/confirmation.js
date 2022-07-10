/*// Recuperation des canapes selectionnés : Id, quantite, couleur
let cartCanapes = JSON.parse(localStorage.getItem("selectProducts"));
console.log(cartCanapes);

// Recuperation de l url des produits selectiones
cartUrlProduct = "http://localhost:3000/api/products/";
console.log(cartUrlProduct);

let idRecup = function recupId (id) {
  return cartUrlProduct(id);
}
console.log(idRecup);


//fonction de recuperation des canapes selectionnes
function cartProductUrl (url) {
    fetch(url)
        .then(function(res) {
          if (res.ok) {
            return res.json();
            }
        })
        .then(function(cartDetailCanape) {
          console.log(cartDetailCanape);
          displayCartDetailCanape(cartDetailCanape);
        })
    
        .catch(function(err) {
          console.log("erreur : " + err)
          alert("erreur : " + err)
        });
    }

// fonction affichage des infos du canape selectionne
function displayCartDetailCanape (cartCanapes) {
  for (let cartCanape of cartCanapes) {
    let article = document.createElement("article");
    cartCanap.appendChild(article);

    let titre = document.createElement("h2");
    titre.textContent = cartCanape.name;
    article.appendChild(titre);

    let couleurcanapselec = document.createElement("p");
    couleurcanapselec.textContent = cartCanape.couleur;
    article.appendChild(couleurcanapselec);
    
    let prix = document.createElement("p");
    prix.textContent = `${cartCanape.price} €`;
    article.appendChild(prix);    
                
    cartImg = document.getElementsByClassName("cart__item__img")[0];
    let image = document.createElement("img");
    image.src = cartCanape.imageUrl;
    image.alt = cartCanape.altTxt;
    cartImg.appendChild(image);
}
}
cartProductUrl(cartUrlProduct);
let cartCanap = document.querySelector(".cart__item__content__description");

*/