// Recuperation des canapes selectionnés : Id, quantite, couleur
let cartCanapes = JSON.parse(localStorage.getItem("selectProducts"));

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
