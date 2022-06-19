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
    productColors.innerText = couleur;
    colors.appendChild(productColors);
  }
}

productUrl(urlProduct)
    
    

    




