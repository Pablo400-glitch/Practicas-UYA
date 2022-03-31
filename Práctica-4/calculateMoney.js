function calculateMoney() {
  const clientInformation = '{"dni":"none", "birthday":"none", "accountNumber":"none", "productsNumber":0, "discount":0, "paymentMethod":"none"}'
  const object = JSON.parse(clientInformation);
  
  var price = 0;
  object.dni = prompt("Introduzca su DNI", "XXXXXXXXX");
  object.birthday = prompt("Introduzca su cumpleaños", "1/1/22");
  object.accountNumber = prompt("Introduzca su número de cuenta", "XXXX-XXXX-XXXX-XXXX");
  object.productsNumber = prompt("Introduzca algún texto", 2);
  object.discount = prompt("Introduzca algún texto", 20);
  object.paymentMethod = prompt("Introduzca algún texto", "Paypal");
  var discount = object.discount / 100;

  if (object.discount > 0) {
    price = object.productsNumber * 10 - (object.productsNumber * 10 * discount);
  } else {
    price = object.productsNumber * 10;
  }

  document.write(`Usted tiene que pagar ${price} euros`);
}