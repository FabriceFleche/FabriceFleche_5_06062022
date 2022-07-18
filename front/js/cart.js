// Recuperation des canapes selectionnés : Id, quantite, couleur
let cartCanapes = JSON.parse(localStorage.getItem("selectProducts"));



// // Recuperation des ID de la totalité des canapes
// function recupIdCanapesApi (url) {
//   fetch(url)
//       .then(function(res) {
//         if (res.ok) {
//           return res.json();
//         }
//       })
//       .then(function(catalogApi) {

//         // Conteneur des blocs du panier
//         let cartItems = document.getElementById('cart__items');

//         // Noeud representant un bloc du panier
//         let cartLine = document.getElementsByClassName('cart__item')[0];
  
//         // On supprime le bloc deja présent
//         cartItems.removeChild(cartLine);
        
//         // On boucle sur le panier
//         for(let cartItem of cartCanapes) {
//           let cartArticleInfo;
//           // on boucle dans le catalogue pour avoir les infos de l'article en cours
//           for(let article of catalogApi) {
//             if(cartItem.id === article._id) {
//               cartArticleInfo = article;
//               cartArticleColors = cartItem.couleur;
//               cartArticleQuantite = cartItem.quantite;
//               cartArticlePrix = cartItem.price;
//               break;
//             }
//           }
//           //console.log(catalogApi);

//           // on clone le bloc
//           let clone = cartLine.cloneNode(true);
//           // et on l'ajoute au conteneur
//           cartItems.appendChild(clone);

//           //affichage du nom
//           let title = clone.querySelector(".cart__item__content__description > h2");
//           title.textContent = cartArticleInfo.name;

//           //affichage de la couleur
//           let couleur = clone.querySelector(".cart__item__content__description > p");
//           couleur.textContent = cartArticleColors;
       
//           //affichage du tarif  
//           let tarif = clone.querySelector(".cart__item__content__description > p:nth-child(3)");
//           tarif.textContent = cartArticleInfo.price;
//                 //console.log(cartArticleInfo.price)

//           //Renseignement des dataSet
//           let dataSetId = cartArticleInfo._id;
//           let dataSetColor = cartArticleColors;
//           let dataId = clone.querySelector(".cart__item.dataset.id");
//           dataId = dataSetId;
//           let dataColor = clone.querySelector(".cart__item.dataset.color");
//           dataColor = dataSetColor;
//           console.log(dataId);
//           console.log(dataColor);
          
//           //affichage de la photo
//           productImage = clone.querySelector('.cart__item__img');
//           const image = productImage.querySelector("img");
//           image.src = cartArticleInfo.imageUrl;
//           image.alt = cartArticleInfo.altTxt;
//           productImage.appendChild(image);
          
//           //affichage de la quantite
//           let quantite = clone.querySelector('.itemQuantity');
//           quantite.value = cartArticleQuantite;

//           //modification de la quantite depuis page panier
          

//           //affichage de la Quantite totale
//           totalQte();
//           function totalQte() {
//             let totalQuantite = 0;
//             let inputs = document.querySelectorAll(".itemQuantity");
//             inputs.forEach((itemQuantity) => {
//               let productQty = parseInt(itemQuantity.value);
//               totalQuantite += productQty;
//             });
//             document.getElementById("totalQuantity").textContent = `${totalQuantite}`;
//           }
//           /*//affichage du prix total d'un canape selectionne en tenant compte de la quantite
//           let totalPrix = 0;  
//           let prixTotalCalcul = [];
//           totalPrix += cartItem.quantite * cartArticleInfo.price;
//           prixTotalCalcul.push(totalPrix);
//           console.log(prixTotalCalcul);

//           //affichage du tarif global de tous les canapes selectionnes
//           let globalTarif = 0;
//           let affichageTotalPrix = document.querySelector("#totalPrice");
//           for (prixTot of prixTotalCalcul) {
//             globalTarif += prixTot;
//             console.log(globalTarif);
//           }
//           affichageTotalPrix.textContent = globalTarif;
//           */
          
//           //affichage du tarif global de tous les canapes selectionnes
//           let affichageTotalPrix = document.querySelector("#totalPrice");
//           getKanapPrice();
//           function getKanapPrice(){
//             return new Promise((resolve) => {
//               const totalPrix = cartItem.quantite * cartArticleInfo.price;
//               resolve(totalPrix);
//               console.log(totalPrix);
//             })
//           };
//           Promise.all([getKanapPrice()]).then((result)=>{
//             let globalTarif = 0;
//             const j = result.length;
//             for(let i=0; i<j; i++){
//               globalTarif = globalTarif + result[i];
//             }
//             console.log(globalTarif);
//             affichageTotalPrix.textContent = globalTarif;
//           });
          

//           };
//           /*
//           // Gestion de la suppresion d'un produit
//           const deleteCartItem = document.querySelectorAll(".deleteItem");
                    
//          for (let cartItem of cartCanapes){
//             cartItem.addEventListener("click", (event) =>{
//               event.preventDefault();
//               //console.log(event);

//               //selection de ID du produit qui va etre supprimer
//               let id_selectionner_suppression = cartArticleInfo._id;
//               console.log(id_selectionner_suppression)

//               //selection des elements a garder puis suppresion de l element cliqué
//               //article = article.filter(el => el.cartItem !== id_selectionner_suppression);
//               //console.log(cartCanapes);

//               //envoi dans le localstorage
//               //localStorage.setItem('carrItem',JSON.stringify('selectProducts'));

//               //avertir que le produit va etre supprimer et actualiser la page
//               //alert("le produit a été supprimer du panier");
//               //window.location.href = "cart.html";
//             })
//           }*/

          
//       })
      
//       .catch(function(err) {
//         console.log("erreur : " + err)
//         alert("erreur : " + err)
//       });
// }

// //----------------------------Formulaire de contact---------------------------------------
// let formArray = JSON.parse(localStorage.getItem('donneesCart'));


// //verification que les champs sont correctement completes
// let prenom = document.getElementById("firstName");
// let nom = document.getElementById("lastName");
// let adresse = document.getElementById("address");
// let ville = document.getElementById("city");
// let email = document.getElementById("email");
// let myRegex = /^[a-zA-Z-\s]+$/;
// let myRegexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// const monFormulaire = document.getElementById("order");
// monFormulaire.addEventListener('click', function(event) {
//   if (prenom.value == "") {
//     let erreur = document.getElementById("firstNameErrorMsg");
//     erreur.textContent = "Le champ n'est pas renseigné";
//     event.prevenDefault();
//   } else if (myRegex.test(prenom.value) == false) {
//     let erreur = document.getElementById("firstNameErrorMsg");
//     erreur.textContent = "Le prénom doit comporter que des lettres avec eventuellement des tirets ou espaces";
//     e.prevenDefault();
//   } else {
//     let erreur = document.getElementById("firstNameErrorMsg");
//     erreur.textContent = "Ok";
//     erreur.style.color = "green";
//     let recupPrenom = document.getElementById('firstName').value;
//     let formArray = [];
//     formArray.push(recupPrenom);
//     localStorage.setItem('donneesCart',JSON.stringify(formArray));
//     console.log(recupPrenom);
//   }
// });  
// monFormulaire.addEventListener('click', function(event) {
//   if (nom.value == "") {
//     let erreur = document.getElementById("lastNameErrorMsg");
//     erreur.textContent = "Le champ n'est pas renseigné";
//     event.prevenDefault();
//   } else if (myRegex.test(nom.value) == false) {
//     let erreur = document.getElementById("lastNameErrorMsg");
//     erreur.textContent = "Le nom doit comporter que des lettres avec eventuellement des tirets ou espaces";
//     e.prevenDefault();
//   } else {
//     let erreur = document.getElementById("lastNameErrorMsg");
//     erreur.textContent = "Ok";
//     erreur.style.color = "green";
//     let recupNom = document.getElementById('lastName').value;
//     formArray.push(recupNom);
//     localStorage.setItem('donneesCart',JSON.stringify(formArray));
//     console.log(recupNom);
//   }
// });
// monFormulaire.addEventListener('click', function(event) {
//   if (adresse.value == "") {
//     let erreur = document.getElementById("addressErrorMsg");
//     erreur.textContent = "Le champ n'est pas renseigné";
//     event.prevenDefault();
//   } else {
//     let erreur = document.getElementById("addressErrorMsg");
//     erreur.textContent = "Ok";
//     erreur.style.color = "green";
//     erreur.style.color = "green";
//     let recupAdresse = document.getElementById('address').value;
//     formArray.push(recupAdresse);
//     localStorage.setItem('donneesCart',JSON.stringify(formArray));
//     console.log(recupAdresse);
//   }
// });
// monFormulaire.addEventListener('click', function(event) {
//   if (ville.value == "") {
//     let erreur = document.getElementById("cityErrorMsg");
//     erreur.textContent = "Le champ n'est pas renseigné";
//     event.prevenDefault();
//   } else if (myRegex.test(ville.value) == false) {
//     let erreur = document.getElementById("cityErrorMsg");
//     erreur.textContent = "La ville doit comporter que des lettres avec eventuellement des tirets ou espaces";
//     e.prevenDefault();
//   } else {
//     let erreur = document.getElementById("cityErrorMsg");
//     erreur.textContent = "Ok";
//     erreur.style.color = "green";
//     let recupVille = document.getElementById('city').value;
//     formArray.push(recupVille);
//     localStorage.setItem('donneesCart',JSON.stringify(formArray));
//     console.log(recupVille);
//   }
// });
// monFormulaire.addEventListener('click', function(event) {
//   if (email.value == "") {
//     let erreur = document.getElementById("emailErrorMsg");
//     erreur.textContent = "Le champ n'est pas renseigné";
//     event.prevenDefault();
//   } else if (myRegexMail.test(email.value) == false) {
//     let erreur = document.getElementById("emailErrorMsg");
//     erreur.textContent = "Le format de l adresse email n est pas conforme";
//     e.prevenDefault();
//   } else {
//     let erreur = document.getElementById("emailErrorMsg");
//     erreur.textContent = "Ok";
//     erreur.style.color = "green";
//     let recupEmail = document.getElementById('email').value;
//     formArray.push(recupEmail);
//     localStorage.setItem('donneesCart',JSON.stringify(formArray));
//     console.log(recupEmail);
//   }
// });


//-------------------------------lien vers API--------------------------------------------
// recupIdCanapesApi("http://localhost:3000/api/products/")


function getKanapInfos(kanap){

    return new Promise((resolve)=>{

          fetch(`http://localhost:3000/api/products/${kanap.id}`)
          .then((response)=>{
              return response.json();
          })
          .then((result)=>{

               kanap.price = result.price;

               kanap.imageUrl = result.imageUrl;

               kanap.name = result.name;

               return resolve(kanap);
          })

    });

}


Promise.all(cartCanapes.map(getKanapInfos)).then((result)=>{

      let sumPrice = 0;

      let sumQuantity = 0;

      const j = result.length;

      let html = "";

      for(let i=0; i<j; i++){

            html+= `
            
              <article class="cart__item" data-id="${result[i].id}" data-color="${result[i].couleur}">
              <div class="cart__item__img">
                <img src="${result[i].imageUrl}" alt="Photographie d'un canapé">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${result[i].name}</h2>
                  <p>${result[i].couleur}</p>
                  <p>${result[i].price}€</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté :</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${result[i].quantite}>
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem" data-id-parent="${result[i].id}">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>
            
            `;

    
            sumPrice = sumPrice + (result[i].price * result[i].quantite);

            sumQuantity = sumQuantity + result[i].quantite;


      }

      const cardItems = document.querySelector("#cart__items");

      const totalQuantity = document.querySelector("#totalQuantity");

      const totalPrice = document.querySelector("#totalPrice");

      cardItems.innerHTML = html;

      totalQuantity.textContent = sumQuantity;

      totalPrice.textContent = sumPrice;

      const articleParents = cardItems.querySelectorAll(".cart__item");

      const deleteKanap = document.querySelectorAll(".deleteItem");

      const k = deleteKanap.length;

      for(let i=0; i<k; i++){

            deleteKanap[i].addEventListener("click", ()=>{

                   const articleQuantity = articleParents[i].querySelector(".itemQuantity").value;

                   const articleTotalPrice = result[i].price * Number(articleQuantity);

                   totalQuantity.textContent = Number(totalQuantity.textContent) - Number(articleQuantity);

                   totalPrice.textContent = Number(totalPrice.textContent) - Number(articleTotalPrice);

                  articleParents[i].remove();
                  

            });

      }

});


  
