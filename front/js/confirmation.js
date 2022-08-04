const getProductId = () => {
    return new URL(location.href).searchParams.get("id");
  };
  let orderId = getProductId();
  console.log(orderId)
  val = document.getElementById('orderId');
  val.textContent = orderId;
  //const cart = JSON.parse(localStorage.getItem("cart"));
  
  //let idConfirmation = document.getElementById(orderId);
  //idConfirmation = orderId;
  //console.log(orderId,idConfirmation);
  //const btnRetourHtml = `<button id="retourAccueil"><a href="./index.html">Retour à l'accueil</a></button>`;
  
  //Affichage de l'orderId dans le DOM
  
    
  
    //idConfirmation.insertAdjacentHTML("beforeend", btnRetourHtml);
  
    //localStorage.clear();
  

  