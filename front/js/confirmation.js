/*//Recuperation de l id du produit
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
function displayDetailCanape (Product) {
  // Test de recuperation du nom pour le canape
  console.log(Product.name);
  document.getElementById("title").innerHTML = Product.name;
  document.getElementById("price").innerHTML = Product.price;
  document.getElementById("description").innerHTML = Product.description;
      
  productImage = document.getElementsByClassName("item__img")[0];
  let image = document.createElement("img");
  image.src = Product.imageUrl;
  image.alt = Product.altTxt;
  productImage.appendChild(image);

  for (let couleur of Product.colors) {
    let productColors = document.createElement("option");
    productColors.value = couleur;
    productColors.text = couleur;
    colors.appendChild(productColors);
  }
}

productUrl(urlProduct)

//gestion du bouton ajouter au panier
const boutonProduct = document.getElementById("addToCart");
boutonProduct.addEventListener("click", recupSaisieCanap);

let cartArray = JSON.parse(localStorage.getItem('selectProducts'));


//fonction récuperation des donnees saisies
function recupSaisieCanap() {
  //Stockage de l ID du canape selectionne
  var optionColor = document.getElementById('colors').value;
  var inputQuantity = document.getElementById("quantity").value;
  let selectProduct = {
    id : refId,
    quantite : inputQuantity ,
    couleur : optionColor,
  }
if (cartArray == null) {
  let cartArray = [];
  cartArray.push(selectProduct);
  localStorage.setItem('selectProducts',JSON.stringify(cartArray));
}
else {
  cartArray.push(selectProduct);
  localStorage.setItem('selectProducts',JSON.stringify(cartArray));
  console.log(cartArray);
}
}
*/
//------------------Fin du code ---------------------

/*// Recuperation des données du localstorage
let produiEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("recupSaisieCanap"));

//Si un produit est deja stocké dans localstorage
if(produiEnregistreDansLocalStorage){
  produiEnregistreDansLocalStorage.push(localStorage);
  localStorage.setItem("recupSaisieCanap",JSON.stringify(produiEnregistreDansLocalStorage));
}
//Si premier produit stocké dans localstorage
else {
  produiEnregistreDansLocalStorage = [];
  produiEnregistreDansLocalStorage.push(localStorage);
  localStorage.setItem("recupSaisieCanap",JSON.stringify(produiEnregistreDansLocalStorage));
};

console.table(produiEnregistreDansLocalStorage);
/*
//Comparaison de la quantite
var quantiteStockee = localStorage.getItem('quantite');
console.log(quantiteStockee);
let foundQuantite = recupSaisieCanap.find(refId === input && colorProduct === option);
if (foundQuantite != undefined){
    foundQuantite.quantite++;
} else {
    foundQuantite
};  
console.log(foundQuantite);
*/


/* ----------Code au 01 juillet ------------------

//fonction récuperation des donnees saisies
function recupSaisieCanap() {
  //Stockage de l ID du canape selectionne
  var optionColor = document.getElementById('colors').value;
  var inputQuantity = document.getElementById("quantity").value;
  let selectProduct = {
    id : refId,
    quantite : inputQuantity,
    couleur : optionColor,
  }
if (cartArray == null) {
  let cartArray = [];
  cartArray.push(selectProduct);
  localStorage.setItem('selectProducts',JSON.stringify(cartArray));
}
else {
  if (selectProduct.id === cartArray.id && selectProduct.couleur === cartArray.couleur) {
    let quantiteAjoute = parseInt(selectProduct.quantite) + parseInt(inputQuantity);
    selectProduct.quantite=quantiteAjoute;
    cartArray.push(selectProduct);
    localStorage.setItem('selectProducts',JSON.stringify(cartArray));
  }
  else {
    cartArray.push(selectProduct);
    localStorage.setItem('selectProducts',JSON.stringify(cartArray));
    
  }
}
}
console.log(cartArray);

*/