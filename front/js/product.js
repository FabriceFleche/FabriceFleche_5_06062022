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
function displayDetailCanape (Product) {
  
  // Test de recuperation du nom pour le canape
  console.log(Product.name);

  document.getElementById("title").textContent = Product.name;
  document.getElementById("price").textContent = Product.price;
  document.getElementById("description").textContent = Product.description;
      
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



let cartArray = JSON.parse(localStorage.getItem('selectProducts'));


//fonction récuperation des donnees saisies
function recupSaisieCanap() {
  //Stockage de l ID du canape selectionne
  var optionColor = document.getElementById('colors').value;
  var inputQuantity = document.getElementById("quantity").value;
  let selectProduct = {
    id : refId,
    quantite : parseInt(inputQuantity),
    couleur : optionColor,
  }
  //Creation d'un tableau si c'est le 1er canape place dans le panier
if (cartArray == null) {
  let cartArray = [];
  cartArray.push(selectProduct);
  localStorage.setItem('selectProducts',JSON.stringify(cartArray));
}
  //Si rajout du meme canape dans le panier, ajout des quantites
else if (cartArray.find((item) => item.id === refId && item.couleur == optionColor)){
  cartArray.map((canap) => {
  if (canap.id == refId && canap.couleur == optionColor) {
    canap.quantite += parseInt(inputQuantity);
    localStorage.setItem('selectProducts',JSON.stringify(cartArray));
}})
} else {
  cartArray.push(selectProduct);
  localStorage.setItem('selectProducts',JSON.stringify(cartArray));
  }
}

//gestion du bouton ajouter au panier
const boutonProduct = document.getElementById("addToCart");
boutonProduct.addEventListener("click", recupSaisieCanap);

//console.log(cartArray);
console.log(JSON.parse(localStorage.getItem('selectProducts')));
