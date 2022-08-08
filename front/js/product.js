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
      displayDetailCanape(detailCanape);
    })
    .catch(function(err) {
      console.log("erreur : " + err)
      alert("erreur : " + err)
    });
}

// fonction affichage des infos du canape selectionné
function displayDetailCanape (Product) {
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

// Recuperation des données du localStorage
let cartArray = JSON.parse(localStorage.getItem('selectProducts'));

//fonction récuperation des donnees saisies dans la page product
function recupSaisieCanap() {
  var optionColor = document.getElementById('colors').value;
  var inputQuantity = document.getElementById("quantity").value;
  //Stockage de l ID, de la quantité et de la couleur du canape selectionné
  let selectProduct = {
    id : refId,
    quantite : parseInt(inputQuantity),
    couleur : optionColor,
  }
  //Creation d'un tableau si c'est le 1er canape place dans le panier
if (cartArray == null) {
  if (inputQuantity != 0 && optionColor != "") {
  let cartArray = [];
  cartArray.push(selectProduct);
  localStorage.setItem('selectProducts',JSON.stringify(cartArray));
  alert("Canapé ajouté au panier");
  } else {
    alert("Vous devez sélectionner une couleur et une quantité");
  }
}
  //Si rajout du meme canape dans le panier, ajout des quantites
else if (cartArray.find((item) => item.id === refId && item.couleur == optionColor)){
  cartArray.map((canap) => {
  if (canap.id == refId && canap.couleur == optionColor) {
    canap.quantite += parseInt(inputQuantity);
    localStorage.setItem('selectProducts',JSON.stringify(cartArray));
    alert("Mise à jour du panier effectuée");
}})
} else {
    if (inputQuantity >= 1 && optionColor != "") {
    cartArray.push(selectProduct);
    localStorage.setItem('selectProducts',JSON.stringify(cartArray));
    alert("Canapé ajouté au panier");
    } else {
    alert("Vous devez sélectionner une couleur et une quantité");
    }
  }
};

//gestion du bouton ajouter au panier
const boutonProduct = document.getElementById("addToCart");
boutonProduct.addEventListener("click", () => {
  recupSaisieCanap ();
  location.assign(location.href);
});

//console.log(JSON.parse(localStorage.getItem('selectProducts')));
