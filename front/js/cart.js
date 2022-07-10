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
          
          //affichage de la photo
          productImage = clone.querySelector('.cart__item__img');
          let image = document.createElement("img");
          image.src = cartArticleInfo.imageUrl;
          image.alt = cartArticleInfo.altTxt;
          productImage.appendChild(image);
          
          //affichage de la quantite
          let quantite = clone.querySelector('.itemQuantity');
          quantite.value = cartArticleQuantite;
        }



      })
  
      .catch(function(err) {
        console.log("erreur : " + err)
        alert("erreur : " + err)
      });
  }

recupIdCanapesApi("http://localhost:3000/api/products/")