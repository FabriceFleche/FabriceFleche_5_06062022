//Recuperation de l id du produit
let idCanap = window.location.href;
let url = new URL (idCanap);
let refId = url.searchParams.get("id");

// Recuperation de l url du produit selectione
urlProduct = "http://localhost:3000/api/products/"+refId

//fonction de recuperation du canape selectionne
function productUrl (url) {
fetch(url)
    .then(function(res) {
      if (res.ok) {
        return res.json();
        }
    })
    .then(function(detailCanape) {
      console.log(detailCanape);
      displayDetailCanape(detailCanape);
    })

    .catch(function(err) {
      console.log("erreur : " + err)
      alert("erreur : " + err)
    });
}

// fonction affichage des infos du canape selectionne
function displayDetailCanape (urlProduct) {
  // Test de recuperation du nom pour le canape
  console.log(urlProduct.name);
  document.getElementById("title").innerHTML = urlProduct.name;
  document.getElementById("price").innerHTML = urlProduct.price;
  document.getElementById("description").innerHTML = urlProduct.description;
      
  productImage = document.getElementsByClassName("item__img")[0];
  let image = document.createElement("img");
  image.src = urlProduct.imageUrl;
  image.alt = urlProduct.altTxt;
  productImage.appendChild(image);

  for (let couleur of urlProduct.colors) {
    let productColors = document.createElement("option");
    productColors.value = couleur;
    productColors.text = couleur;
    colors.appendChild(productColors);
  }
}

productUrl(urlProduct)


const bouton = document.getElementById("addToCart");
bouton.addEventListener("click", recupSaisieCanap);

function recupSaisieCanap() {
  
//Stockage de l ID du canape selectionne
localStorage.setItem('id',refId);

//Recuperation et stockage de la couleur
var option = document.getElementById('colors').value;
localStorage.setItem('couleur',option);

// Recuperation et stockage de la quantite
var input = document.getElementById("quantity").value;
localStorage.setItem('quantite',input);

//Validation des elements stockes dans localStorage
console.log(localStorage);
    
}



