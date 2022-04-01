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
  var priceProduct = 0;

  object.dni = prompt("Introduzca su DNI", "XXXXXXXXX");
  object.birthday = prompt("Introduzca su cumpleaños", "1/1/22");
  object.accountNumber = prompt("Introduzca su número de cuenta", "XXXX-XXXX-XXXX-XXXX");
  object.productsNumber = prompt("Introduzca el número de productos", 0);

  while (i <= object.productsNumber) {
    price = prompt(`Introduzca el precio del producto ${i}`);
    priceProduct += parseInt(price);
    i++;
  }

  object.discount = prompt("Introduzca un valor de descuento que tenga disponible", 0);
  var discount = object.discount / 100;

  object.paymentMethod = prompt("Introduzca un metodo de pago", "Paypal");
  
  if (object.discount > 0) {
    totalPrice = priceProduct - (priceProduct * discount);
  } else {
    totalPrice = priceProduct;
  }

  return totalPrice;
}

function printPrice() {
  var totalPrice = calculateMoney();
  document.write(`Usted tiene que pagar ${totalPrice} euros`);
}