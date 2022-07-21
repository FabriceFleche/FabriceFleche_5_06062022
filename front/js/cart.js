let Cart = {

  products: [],
  infoApi: [],

  addProduct: function (id, couleur, qte) {

    let found = false;
    Cart.products.map((item) => {
      if (item.id === id && item.couleur === couleur) {
        item.quantite += parseInt(qte);
        found = true;
      }
    });
    if (found === false) {
      Cart.products.push(
        {
          id: id,
          couleur: couleur,
          quantite: qte,
        }
      );
    }
  },

  removeProduct: function (id, couleur, qte) {

    let indexToDelete = -1;
    for (let index in Cart.products) {
      if (Cart.products[index].id === id && Cart.products[index].couleur === couleur) {
        Cart.products[index].quantite -= parseInt(qte);
        if (Cart.products[index].quantite <= 0) {
          indexToDelete = index;
        }
        break;
      }
    }
    if (indexToDelete !== -1) {
      Cart.products.splice(indexToDelete, 1);
    }
  },

  removeAllProduct: function(id, couleur) {
    let indexToDelete = -1;
    for( let index in Cart.products ) {
        if( Cart.products[index].id === id && Cart.products[index].couleur === couleur ) {
            indexToDelete = index;
            break;
        }
    }
    if( indexToDelete !== -1 ) {
        Cart.products.splice(indexToDelete, 1);
    }
},

setProductQuantity : function(id, couleur, quantite) {
  if (quantite <= 0) {
    Cart.removeAllProduct(id, couleur);
  } else {
    let found = false;
    Cart.products.map((item) => {
      if (item.id === id && item.couleur === couleur) {
        item.quantite = parseInt(quantite);
        found = true;
      }
    });
    if (found === false) {
      Cart.products.push(
        {
          id: id,
          couleur: couleur,
          quantite: quantite,
        }
      );
    }
  }

},
// fonction qui retourne le nombre total d'article du panier
getTotalQuantity : function (){
  return Cart.products.reduce(
    (previousValue, currentValue)=> previousValue + currentValue.quantite, 
    0
  )

},

// fonction qui retourne le nombre total d'article du panier
getTotalPrice : function (){
  return Cart.products.reduce(
    (previousValue, currentValue)=> {
      let priceUnit = 0;
      for (item of Cart.infoApi) {
        if (item.id === currentValue.id && item.couleur === currentValue.couleur) {
          priceUnit = parseInt(item.price);
          break;
        }
      }
      return previousValue + priceUnit * currentValue.quantite;
    }, 
    0
  )

},
  // ---------------------------------------------------
  // Methodes gérant la persistance
  read: function () {
    console.log('recuperation panier');
    Cart.products = JSON.parse(localStorage.getItem('selectProducts')) || [];
    console.log(Cart.products)
  },

  write: function () {
    localStorage.setItem('selectProducts', JSON.stringify(Cart.products));
    console.log('Panier sauvegardé');
  },

  clear: function () {
    localStorage.clear();
    console.log('Panier vidé');
  }

}

// Recuperation des canapes selectionnés : Id, quantite, couleur
//let cartCanapes = JSON.parse(localStorage.getItem("selectProducts"));
Cart.read();

function getKanapInfos(kanap){
  return new Promise((resolve)=>{
    fetch(`http://localhost:3000/api/products/${kanap.id}`)
      .then((response)=>{
        console.log("api");
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

Promise.all(Cart.products.map(getKanapInfos)).then((result)=>{
  let sumPrice = 0;
  Cart.infoApi = result;
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
                  <p class="deleteItem" data-color-parent="${result[i].couleur}" data-id-parent="${result[i].id}">Supprimer</p>
                </div>
              </div>
            </div>
          </article>
          
          `;
    // Affichage du prix et de la quantite global
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

// Gestion de la modification de la quantite depuis la page panier
    const imputCanape = document.querySelectorAll(".itemQuantity");
    for (let i = 0; i < imputCanape.length; i++) {
      
      imputCanape[i].addEventListener("change", () => {
        // Mise a jour de quantite dans l objet panier        
        Cart.setProductQuantity(deleteKanap[i].getAttribute("data-id-parent"),deleteKanap[i].getAttribute("data-color-parent"),imputCanape[i].value);
        Cart.write();
        //Modification de la quantite et du tarif global lors de la suppression d'un canape
        totalQuantity.textContent = Cart.getTotalQuantity();
        totalPrice.textContent = Cart.getTotalPrice();
        //suppression du canape si quantite inferieur ou egal 0
        if(imputCanape[i].value <= 0){
          articleParents[i].remove();
        }
        
       
      })
    }
      
// Gestion de la suppression d un canape
  for (let i = 0; i < k; i++) {
    deleteKanap[i].addEventListener("click", () => {
      const articleQuantity = articleParents[i].querySelector(".itemQuantity").value;
      const articleTotalPrice = result[i].price * Number(articleQuantity);
      //Modification de la quantite et du tarif global lors de la suppression d'un canape
      totalQuantity.textContent = Number(totalQuantity.textContent) - Number(articleQuantity);
      totalPrice.textContent = Number(totalPrice.textContent) - Number(articleTotalPrice);
      // suppression du canape du DOM
      articleParents[i].remove();
      // suppresion du canape du localstorage        
      Cart.removeAllProduct(deleteKanap[i].getAttribute("data-id-parent"),deleteKanap[i].getAttribute("data-color-parent"));
      Cart.write();
     
    })
  }
});

 //----------------------------Formulaire de contact---------------------------------------
let formArray = JSON.parse(localStorage.getItem('donneesCart'));

//verification que les champs sont correctement completes
let prenom = document.getElementById("firstName");
let nom = document.getElementById("lastName");
let adresse = document.getElementById("address");
let ville = document.getElementById("city");
let email = document.getElementById("email");
let myRegex = /^[a-zA-Z-\s]+$/;
let myRegexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const monFormulaire = document.getElementById("order");
monFormulaire.addEventListener('click', function(event) {
  if (prenom.value == "") {
    let erreur = document.getElementById("firstNameErrorMsg");
    erreur.textContent = "Le champ n'est pas renseigné";
    event.prevenDefault();
  } else if (myRegex.test(prenom.value) == false) {
    let erreur = document.getElementById("firstNameErrorMsg");
    erreur.textContent = "Le prénom doit comporter que des lettres avec eventuellement des tirets ou espaces";
    e.prevenDefault();
  } else {
    let erreur = document.getElementById("firstNameErrorMsg");
    erreur.textContent = "Ok";
    erreur.style.color = "green";
    let recupPrenom = document.getElementById('firstName').value;
    let formArray = [];
    formArray.push(recupPrenom);
    localStorage.setItem('donneesCart',JSON.stringify(formArray));
    console.log(recupPrenom);
  }
});  
monFormulaire.addEventListener('click', function(event) {
  if (nom.value == "") {
    let erreur = document.getElementById("lastNameErrorMsg");
    erreur.textContent = "Le champ n'est pas renseigné";
    event.prevenDefault();
  } else if (myRegex.test(nom.value) == false) {
    let erreur = document.getElementById("lastNameErrorMsg");
    erreur.textContent = "Le nom doit comporter que des lettres avec eventuellement des tirets ou espaces";
    e.prevenDefault();
  } else {
    let erreur = document.getElementById("lastNameErrorMsg");
    erreur.textContent = "Ok";
    erreur.style.color = "green";
    let recupNom = document.getElementById('lastName').value;
    formArray.push(recupNom);
    localStorage.setItem('donneesCart',JSON.stringify(formArray));
    console.log(recupNom);
  }
});
monFormulaire.addEventListener('click', function(event) {
  if (adresse.value == "") {
    let erreur = document.getElementById("addressErrorMsg");
    erreur.textContent = "Le champ n'est pas renseigné";
    event.prevenDefault();
  } else {
    let erreur = document.getElementById("addressErrorMsg");
    erreur.textContent = "Ok";
    erreur.style.color = "green";
    erreur.style.color = "green";
    let recupAdresse = document.getElementById('address').value;
    formArray.push(recupAdresse);
    localStorage.setItem('donneesCart',JSON.stringify(formArray));
    console.log(recupAdresse);
  }
});
monFormulaire.addEventListener('click', function(event) {
  if (ville.value == "") {
    let erreur = document.getElementById("cityErrorMsg");
    erreur.textContent = "Le champ n'est pas renseigné";
    event.prevenDefault();
  } else if (myRegex.test(ville.value) == false) {
    let erreur = document.getElementById("cityErrorMsg");
    erreur.textContent = "La ville doit comporter que des lettres avec eventuellement des tirets ou espaces";
    e.prevenDefault();
  } else {
    let erreur = document.getElementById("cityErrorMsg");
    erreur.textContent = "Ok";
    erreur.style.color = "green";
    let recupVille = document.getElementById('city').value;
    formArray.push(recupVille);
    localStorage.setItem('donneesCart',JSON.stringify(formArray));
    console.log(recupVille);
  }
});
monFormulaire.addEventListener('click', function(event) {
  if (email.value == "") {
    let erreur = document.getElementById("emailErrorMsg");
    erreur.textContent = "Le champ n'est pas renseigné";
    event.prevenDefault();
  } else if (myRegexMail.test(email.value) == false) {
    let erreur = document.getElementById("emailErrorMsg");
    erreur.textContent = "Le format de l adresse email n est pas conforme";
    e.prevenDefault();
  } else {
    let erreur = document.getElementById("emailErrorMsg");
    erreur.textContent = "Ok";
    erreur.style.color = "green";
    let recupEmail = document.getElementById('email').value;
    formArray.push(recupEmail);
    localStorage.setItem('donneesCart',JSON.stringify(formArray));
    console.log(recupEmail);
  }
});
