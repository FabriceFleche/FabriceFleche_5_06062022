const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
let orderId = getProductId();

//Affichage de l'orderId dans le DOM
val = document.getElementById('orderId');
val.textContent = orderId;

//Effacer le localStorage
localStorage.clear();
