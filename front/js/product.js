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

//fonction récuperation des donnees saisies
function recupSaisieCanap() {
  //Stockage de l ID du canape selectionne
  localStorage.setItem('id',refId);

  //Recuperation et stockage de la couleur
  var option = document.getElementById('colors').value;
  localStorage.setItem('couleur',option);

  //Recuperation et stockage de la quantite
  var input = document.getElementById("quantity").value;
  localStorage.setItem('quantite',input);

  //Validation des elements stockes dans localStorage
  console.log(localStorage);
}


/*let produiEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("recupSaisieCanap"));

//Si le produit est deja dans le localstorage
if(produiEnregistreDansLocalStorage){
  produiEnregistreDansLocalStorage.push(localStorage);
  localStorage.setItem("recupSaisieCanap",JSON.stringify(produiEnregistreDansLocalStorage));
}
//Si le produit n'est pas dans le localstorage
else {
  produiEnregistreDansLocalStorage = new Array;
  produiEnregistreDansLocalStorage.push(localStorage);
  localStorage.setItem("recupSaisieCanap",JSON.stringify(produiEnregistreDansLocalStorage));
};

console.table(produiEnregistreDansLocalStorage);
*/