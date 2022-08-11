/**
 * 
 * 
 * @Author: JOSE LOPEZ RISSO
 * Email: jal.risso@gmail.com
 * Date: 11-08-2022
 * License: 
 * Version: 
 * 
 */




/* ===============================ACA EMPIEZA EL MAIN () =============================== */

const booksArray = [];
loadMyBooks(booksArray); //Cargamos libros
const discount = checkMyLuck(); //El usuario chequea su suerte para ver si obtiene un descuento.

if (discount) {
  alert(`Felicitaciones!: Obtuviste un descuento de: ${discount}%`);
  applyADiscount(booksArray, discount);
} else alert(`Esta vez NO obtuviste descuento, seguí participando.`);
renderElements(booksArray);


/* =============================== ACA FINALIZA EL MAIN () =============================== */








/*
 * 
 * MIS FUNCIONES 
 * 
 * 
 */



function loadMyBooks(booksArray) {
  booksArray.push(new Book(0, 'The Aleph', 'Jorge Luis Borges', 250));
  booksArray.push(new Book(1, 'Yo Robot', 'Isaac Asimov', 400));
  booksArray.push(new Book(2, 'Sobre Héroes y Tumbas', 'Ernesto Sábato', 120));
  booksArray.push(new Book(3, 'Foundation', 'Isaac Asimov', 300));
  booksArray.push(new Book(4, 'Crimen y Castigo', 'Fiodor Dostoyevski', 90));
}


function checkMyLuck() { //POSIBILIDAD DE QUE EL USUARIO OBTENGA UN DESCUENTO (QUE PUEDE SER 5%, 10%, 15%, y 20%)
  alert('Hace click y participá por un DESCUENTO de hasta un 20%!');
  const discountArray = [0, 5, 10, 15, 20];
  return discountArray[Math.floor(Math.random() * discountArray.length)];
}



function renderElements(booksArray) {
  const mySection = document.querySelector('.intro');
  const template = document.querySelector('template');
  const myCard = template.content.querySelector('.card');



  booksArray.forEach((element) => {
    const cardCopy = myCard.cloneNode(true);
    const subCardCopy = cardCopy.querySelector('.product-card');
    subCardCopy.children[0].innerText = element.title;
    subCardCopy.children[1].innerText = element.author;
    subCardCopy.children[2].innerText = '$' + element.price;
    subCardCopy.children[3].dataset.btnId = element.id;
    mySection.append(cardCopy);
  });

  checkMyInputs(booksArray);
  checkMyRemoveButtons(booksArray);

}




//FUNCION APLICAR DESCUENTOS: La funcion recibe los siguientes parámetros: 
//1 -> Array de Objetos
//2 -> Porcentaje de descuento que quiero aplicar sobre los OBJETOS.
function applyADiscount(objectArray, discountPercentage, idList = []) {

  //MAP IMPLEMENTATION  (Entra acá x Default!)
  if (idList.length === 0) return objectArray.map(x => {
    x.price -= (x.price * discountPercentage / 100);
    return x;
  });

  //FILTER IMPLEMENTATION  (Cuando el usuario pasa una lista de Ids sobre los productos específicos a los cuales quiere alicar descuento)
  return objectArray.filter((x, index) => {
    if (idList.includes(index)) {
      x.price -= (x.price * discountPercentage / 100);
      return x;
    }
  });
};


function checkMyInputs(booksArray) {
  [...document.querySelectorAll('.form-control')].forEach(element => {
    element.addEventListener('change', (event) => {
      const input = Number(element.value); 
      if (isNaN(input) || input <= 0) element.value = 1; //Chequeo el valor del INPUT
      updatePrice(booksArray);
    });

  });
}



function checkMyRemoveButtons(booksArray) {
  document.querySelector('.intro').addEventListener('click', (event) => {
    if (!event.target.matches('[data-button-remove]')) return;
    event.target.previousElementSibling.value = ''; //Reset de mi INPUT
    updatePrice(booksArray);

  });
}



function updatePrice(array, total = 0, quantity =0) {

  [...document.querySelectorAll('.form-control')].forEach(element => {
    const inputNumber = Number(element.value);
    if(!inputNumber) return; //SKIP THE CURRENT ITERATION
    const myBook = array.find(book => book.id.toString() === element.dataset.btnId);
    total += (inputNumber * myBook.price);
    quantity += inputNumber;
  });

  if(!total) {
    if(document.querySelector('.total').classList.contains('hidden')) return;
    document.querySelector('.total').classList.add('hidden'); 
    return;
  }
  if(document.querySelector('.total').classList.contains('hidden')) document.querySelector('.total').classList.remove('hidden');

  document.querySelector('#items').children[1].innerText = quantity;
  document.querySelector('#total-price').children[1].innerText = '$'+total;
 
}