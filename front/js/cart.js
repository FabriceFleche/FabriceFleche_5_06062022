// Recuperation de la quantite selectionné
let cartQuantite = localStorage.getItem("quantite");
console.log(cartQuantite);

document.getElementsByName("itemQuantity").innerHTML = cartQuantite;

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
function displayCartDetailCanape (cartUrlProduct) {
    // Test de recuperation du nom pour le canape
    console.log(cartUrlProduct.name);
    let article = document.createElement("article");
    h2.appendChild(article);
    let titre = document.createElement("h2");
    titre.textContent = cartUrlProduct.name;
    article.appendChild(titre);
    //document.getElementById("title").innerHTML = cartUrlProduct.name;
    //document.getElementById("price").innerHTML = cartUrlProduct.price;
            
    //productImage = document.getElementsByClassName("item__img")[0];
    //let image = document.createElement("img");
    //image.src = cartUrlProduct.imageUrl;
    //image.alt = cartUrlProduct.altTxt;
    //productImage.appendChild(image);
}

cartProductUrl(cartUrlProduct);

//let qte = document.getElementsByName("itemQuantity");
//console.log(qte);

//'${localStorage.getItem("quantite")}';
//itemQuantity.textContent = '${localStorage.getItem("quantite")}';