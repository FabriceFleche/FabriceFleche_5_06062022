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
              cartArticlePrix = cartItem.price;
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

          //modification de la quantite depuis page panier
          

          //affichage de la Quantite totale
          totalQte();
          function totalQte() {
            let totalQuantite = 0;
            let inputs = document.querySelectorAll(".itemQuantity");
            inputs.forEach((itemQuantity) => {
              let productQty = parseInt(itemQuantity.value);
              totalQuantite += productQty;
            });
            document.getElementById("totalQuantity").textContent = `${totalQuantite}`;
          }
          //affichage du prix total
          /*totalPrice ();
          function totalPrice () {
            let totalPrix = 0;
            let inputs = document.querySelectorAll(".cart__item__content__description > p:nth-child(3)");
            inputs.forEach((cartItem) => {
              let productPrice = parseInt(cartItem.price);
              
              totalPrix += cartItem.quantite * productPrice;
            });
            document.getElementById("totalPrice").textContent = `${totalPrix}`;
          }*/
            let totalPrix = 0;  
            let affichageTotalPrix = document.querySelector("#totalPrice");
              for (let cartItem of cartCanapes) {
                totalPrix += cartItem.quantite * cartArticleInfo.price;
              }
            affichageTotalPrix.textContent = totalPrix;
          };

          // Gestion de la suppresion d'un produit
          const deleteCartItem = document.querySelectorAll(".deleteItem");
                    
          /*for (let cartItem of cartCanapes){
            cartItem.addEventListener("click", (event) =>{
              event.preventDefault();
              //console.log(event);

              //selection de ID du produit qui va etre supprimer
              let id_selectionner_suppression = cartArticleInfo._id;
              console.log(id_selectionner_suppression)

              //selection des elements a garder puis suppresion de l element cliqué
              //article = article.filter(el => el.cartItem !== id_selectionner_suppression);
              //console.log(cartCanapes);

              //envoi dans le localstorage
              //localStorage.setItem('carrItem',JSON.stringify('selectProducts'));

              //avertir que le produit va etre supprimer et actualiser la page
              //alert("le produit a été supprimer du panier");
              //window.location.href = "cart.html";
            })
          }*/

          
      })
      
      .catch(function(err) {
        console.log("erreur : " + err)
        alert("erreur : " + err)
      });
}



//lien vers API
recupIdCanapesApi("http://localhost:3000/api/products/")