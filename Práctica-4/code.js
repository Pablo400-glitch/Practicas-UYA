function writeText() {
  var text = prompt("Introduzca algún texto", "Algo");
  if (text != null) {
    alert(text);
  }
}

function calculateMoney() {
  const clientInformation = '{"dni":"none", "birthday":"none", "accountNumber":"none", "productsNumber":0, "discount":0, "paymentMethod":"none"}'
  const object = JSON.parse(clientInformation);
  
  var totalPrice = 0;
  var price = 0;
  var i = 1;
  var priceProduct = [];
  object.dni = prompt("Introduzca su DNI", "XXXXXXXXX");
  object.birthday = prompt("Introduzca su cumpleaños", "1/1/22");
  object.accountNumber = prompt("Introduzca su número de cuenta", "XXXX-XXXX-XXXX-XXXX");
  object.productsNumber = prompt("Introduzca algún texto", 0);

  while (i <= object.productsNumber) {
    price = prompt(`Introduzca el precio del producto ${i}`);
    priceProduct.push(price);
    i++;
  }
  object.discount = prompt("Introduzca algún texto", 20);
  object.paymentMethod = prompt("Introduzca algún texto", "Paypal");
  var discount = object.discount / 100;

  if (object.discount > 0) {
    totalPrice = object.productsNumber * 10 - (object.productsNumber * 10 * discount);
  } else {
    totalPrice = object.productsNumber * 10;
  }

  document.write(`Usted tiene que pagar ${totalPrice} euros`);
}