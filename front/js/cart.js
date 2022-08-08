let Cart = {
  products: [],
  infoApi: [],
  
  // Fonction pour supprimer un canapé
  removeProduct: function(id, couleur) {
    let indexToDelete = -1;
    for (let index in Cart.products) {
        if (Cart.products[index].id === id && Cart.products[index].couleur === couleur) {
            indexToDelete = index;
            console.log(index);
            break;
        }
    }
    if (indexToDelete !== -1) {
      Cart.products.splice(indexToDelete, 1);
    }
  },

  // fonction lors de la modification de la quantité
  productQuantity: function(id, couleur, quantite) {
    if (quantite <= 0) {
      Cart.removeProduct(id, couleur);
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

  // fonction qui retourne le nombre total d'article dans le panier
  recupQuantiteTotal: function () {
    return Cart.products.reduce(
      (previousValue, currentValue)=> previousValue + currentValue.quantite, 
      0
    )
  },

  // fonction qui retourne le prix total des articles du panier
  recupPrixTotal : function () {
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
  // Fonction pour la lecture du localStorage
  lecture: function () {
    console.log('recuperation panier');
    Cart.products = JSON.parse(localStorage.getItem('selectProducts')) || [];
    console.log(Cart.products)
  },
  // Fonction pour l'écriture dans le localStorage
  ecriture: function () {
    localStorage.setItem('selectProducts', JSON.stringify(Cart.products));
    console.log('Panier sauvegardé');
  },
};

// Recuperation : Id, quantite, et couleur depuis le localStorage
Cart.lecture();

// Recuperation depuis API : prix, image et nom pour les canapes du panier
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
//Affichage des informations sur la page
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
  };

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
      // Mise a jour de la quantite du canapé       
      Cart.productQuantity(deleteKanap[i].getAttribute("data-id-parent"),deleteKanap[i].getAttribute("data-color-parent"),imputCanape[i].value);
      Cart.ecriture();
      //Modification de la quantite et du tarif global lors de la suppression d'un canape
      totalQuantity.textContent = Cart.recupQuantiteTotal();
      totalPrice.textContent = Cart.recupPrixTotal();
      //suppression du canape si quantite inferieur ou egal 0
      if(imputCanape[i].value <= 0){
        articleParents[i].remove();
      }
    })
  };
      
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
      Cart.removeProduct(deleteKanap[i].getAttribute("data-id-parent"),deleteKanap[i].getAttribute("data-color-parent"));
      Cart.ecriture();
    })
  }
});

//----------------------------Formulaire de contact---------------------------------------
let prenom = document.getElementById("firstName");
let nom = document.getElementById("lastName");
let adresse = document.getElementById("address");
let ville = document.getElementById("city");
let email = document.getElementById("email");

//Creation des regex
let myRegex = /^[a-zA-Z-\s]+$/;
let myRegexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//Variable pour la verification que les champs sont correctement completes
let validationVerifFirsName = false;
let validationVerifLastName = false;
let validationVerifAddress = false;
let validationVerifCity = false;
let validationVerifEmail = false;
let validationLocalStore = false;

// recuperation des ID du panier
let products = [];
let panierId = JSON.parse(localStorage.getItem('selectProducts'));
panierId.forEach(item => {
  products.push (item.id);
});
console.log(products);
console.log(products.length);
//fonction de vérification de la conformite du prenom
function verifFirsName() {
  if (prenom.value == "") {
    let erreur = document.getElementById("firstNameErrorMsg");
    erreur.textContent = "Le champ n'est pas renseigné";
    erreur.style.color = "red";
  } else if (myRegex.test(prenom.value) == false) {
    let erreur = document.getElementById("firstNameErrorMsg");
    erreur.textContent = "Le prénom doit comporter que des lettres avec eventuellement des tirets ou espaces";
    erreur.style.color = "red";
  } else {
    let erreur = document.getElementById("firstNameErrorMsg");
    erreur.textContent = "Ok";
    erreur.style.color = "green";
    validationVerifFirsName = true;
  }
};

//fonction de vérification de la conformite du nom
function verifLastName() {
  if (nom.value == "") {
    let erreur = document.getElementById("lastNameErrorMsg");
    erreur.textContent = "Le champ n'est pas renseigné";
    erreur.style.color = "red";
  } else if (myRegex.test(nom.value) == false) {
    let erreur = document.getElementById("lastNameErrorMsg");
    erreur.textContent = "Le nom doit comporter que des lettres avec eventuellement des tirets ou espaces";
    erreur.style.color = "red";
  } else {
    let erreur = document.getElementById("lastNameErrorMsg");
    erreur.textContent = "Ok";
    erreur.style.color = "green";
    validationVerifLastName = true;
  }
};

//fonction de vérification de la conformite de l adresse
function verifAddress() {
  if (adresse.value == "") {
    let erreur = document.getElementById("addressErrorMsg");
    erreur.textContent = "Le champ n'est pas renseigné";
    erreur.style.color = "red";
  } else {
    let erreur = document.getElementById("addressErrorMsg");
    erreur.textContent = "Ok";
    erreur.style.color = "green";
    validationVerifAddress = true;
  }
};

//fonction de vérification de la conformite de la ville
function verifCity() {
  if (ville.value == "") {
    let erreur = document.getElementById("cityErrorMsg");
    erreur.textContent = "Le champ n'est pas renseigné";
    erreur.style.color = "red";
  } else if (myRegex.test(ville.value) == false) {
    let erreur = document.getElementById("cityErrorMsg");
    erreur.textContent = "La ville doit comporter que des lettres avec eventuellement des tirets ou espaces";
    erreur.style.color = "red";
  } else {
    let erreur = document.getElementById("cityErrorMsg");
    erreur.textContent = "Ok";
    erreur.style.color = "green";
    validationVerifCity = true;
  }
};

//fonction de vérification de la conformite de l'email
function verifEmail() {
  if (email.value == "") {
    let erreur = document.getElementById("emailErrorMsg");
    erreur.textContent = "Le champ n'est pas renseigné";
    erreur.style.color = "red";
  } else if (myRegexMail.test(email.value) == false) {
    let erreur = document.getElementById("emailErrorMsg");
    erreur.textContent = "Le format de l adresse email n est pas conforme";
    erreur.style.color = "red";
  } else {
    let erreur = document.getElementById("emailErrorMsg");
    erreur.textContent = "Ok";
    erreur.style.color = "green";
    validationVerifEmail = true;
  }
};

//fonction de vérification si le panier est vide
function verifLocalStore () {
  if (products.length != 0) {
    validationLocalStore = true;
  } else {
    validationLocalStore = false;
  }
}

// Enregistrement des données du formulaire dans un objet et envoi dans le localStorage
function validationFormulaire() {
  verifFirsName();
  verifLastName();
  verifAddress();
  verifCity();
  verifEmail();
  verifLocalStore();

  if (validationVerifFirsName != true || validationVerifLastName != true || validationVerifAddress != true || validationVerifCity != true || validationVerifEmail != true || validationLocalStore != true) {
    alert("La commande ne peut pas être validée")
  } else {
    let data = {
      contact: {
        firstName: prenom.value,
        lastName: nom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value,
      },
      products,
    };

    localStorage.setItem('contact', JSON.stringify(data));
      
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((serveur) => {
      orderId = serveur,
      console.log(orderId)
      location.href = "confirmation.html?id=" + orderId.orderId;
    })
    .catch((error) => {
      console.log(error)
      alert("Erreur technique")
    });
  }
};
  
//gestion du bouton commander
const monFormulaire = document.getElementById("order");
monFormulaire.addEventListener("click", (event) => {
  event.preventDefault();
  validationFormulaire();
});
