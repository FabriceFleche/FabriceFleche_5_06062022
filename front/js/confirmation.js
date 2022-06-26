/*// Recuperation de la quantite selectionné
let cartQuantite = localStorage.getItem("quantite");
console.log(cartQuantite);

//Recuperation de la couleur selectionnée
let cartCouleur = localStorage.getItem("couleur");
console.log(cartCouleur);


//Recupération de l ID du canape selectionné
let cartId = localStorage.getItem("id");
console.log(cartId);

// Recuperation de l url du produit selectione
cartUrlProduct = "http://localhost:3000/api/products/"+cartId;

//fonction de recuperation du canape selectionne
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
function displayCartDetailCanape (cartProduct) {
    // Test de recuperation du nom pour le canape
    console.log(cartProduct.name);
    let article = document.createElement("article");
    cartCanap.appendChild(article);

    let titre = document.createElement("h2");
    titre.textContent = cartProduct.name;
    article.appendChild(titre);

    let couleurcanapselec = document.createElement("p");
    couleurcanapselec.textContent = cartCouleur;
    article.appendChild(couleurcanapselec);
    
    let prix = document.createElement("p");
    prix.textContent = `${cartProduct.price} €`;
    article.appendChild(prix);    
                
    cartImg = document.getElementsByClassName("cart__item__img")[0];
    let image = document.createElement("img");
    image.src = cartProduct.imageUrl;
    image.alt = cartProduct.altTxt;
    cartImg.appendChild(image);
}

cartProductUrl(cartUrlProduct);
let cartCanap = document.querySelector(".cart__item__content__description");

*/
