// Recuperation des canapes selectionnés : Id, quantite, couleur
let cartCanapes = JSON.parse(localStorage.getItem("selectProducts"));
console.log(cartCanapes);



// Recuperation des ID de la totalité des canapes
function recupIdCanapesApi (url) {
  fetch(url)
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(catalogApi) {

        // Conteneur des blocs du panier
        let cartItems = document.getElementById('cart__items');

        // Noeud representant un bloc du panier
        let cartLine = document.getElementsByClassName('cart__item')[0];
  
        // On supprime le bloc deja présent
        cartItems.removeChild(cartLine);
        
        // On boucle sur le panier
        for(let cartItem of cartCanapes) {
          let cartArticleInfo;
          // on boucle dans le catalogue pour avoir les infos de l'article en cours
          for(let article of catalogApi) {
            if(cartItem.id === article._id) {
              cartArticleInfo = article;
              cartArticleColors = cartItem.couleur;
              cartArticleQuantite = cartItem.quantite;
              break;
            }
          }
          console.log(cartArticleInfo);

          // on clone le bloc
          let clone = cartLine.cloneNode(true);
          // et on l'ajoute au conteneur
          cartItems.appendChild(clone);

          //affichage du nom
          let title = clone.querySelector(".cart__item__content__description > h2");
          title.textContent = cartArticleInfo.name;

          //affichage de la couleur
          let couleur = clone.querySelector(".cart__item__content__description > p");
          couleur.textContent = cartArticleColors;
       
          //affichage du tarif  
          let tarif = clone.querySelector(".cart__item__content__description > p:nth-child(3)");
          tarif.textContent = cartArticleInfo.price;
          console.log(cartArticleInfo.price)

          //Renseignement des dataSet
          let dataSetId = cartArticleInfo._id;
          let dataSetColor = cartArticleColors;
          let dataId = clone.querySelector(".cart__item.dataset.id");
          dataId = dataSetId;
          let dataColor = clone.querySelector(".cart__item.dataset.color");
          dataColor = dataSetColor;
          console.log(dataId);
          console.log(dataColor);
          
          //affichage de la photo
          productImage = clone.querySelector('.cart__item__img');
          const image = productImage.querySelector("img");
          image.src = cartArticleInfo.imageUrl;
          image.alt = cartArticleInfo.altTxt;
          productImage.appendChild(image);
          
          //affichage de la quantite
          let quantite = clone.querySelector('.itemQuantity');
          quantite.value = cartArticleQuantite;

          //affichage de la Quantite totale
         
          totalQtePrix();

          function totalQtePrix() {
            let totalprix = 0;
            let totalQuantite = 0;
            let inputs = document.querySelectorAll(".itemQuantity");
            inputs.forEach((itemQuantity, price) => {
                let productQty = parseInt(itemQuantity.value);
                let productPrice = parseInt(price);
                totalQuantite += productQty;
                let productTotalPrice = productPrice * productQty;
                totalprix += productTotalPrice;
                console.log(productPrice);
            });
            document.getElementById("totalQuantity").textContent = `${totalQuantite}`;
            document.getElementById("totalPrice").textContent = `${totalprix}`;
            
          }
       
      // Gestion de la suppresion d'un produit

          function supprimeCanap () {
            
          }


      const boutonCart = document.getElementsByClassName("deleteItem");
      //boutonCart.addEventListener("click", supprimeCanap);


       }
    })
      
      .catch(function(err) {
        console.log("erreur : " + err)
        alert("erreur : " + err)
      });
  }

recupIdCanapesApi("http://localhost:3000/api/products/")