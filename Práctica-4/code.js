function writeText() {
  var text = prompt("Introduzca algún texto", "Algo");
  if (text != null) {
    alert(text);
  }
}

function calculateMoney() {
  // Se nos exige utilizar un json para definir los datos necesarios sobre un cliente para poder trabajar con ellos y guardar estos datos en la variable 
  // clientInformation donde se guardan dichos datos del cliente 
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
  var date = new Date;
  var result = 0;
  var totalPrice = calculateMoney();
  var plazos = 0;

  document.write(`Usted tiene que pagar ${totalPrice} euros.`);
  var payment = prompt('¿Desea pagarlo a plazos?');
  if (payment === 'Si') {
    do {
      plazos = prompt(`¿En cuantos plazos?`);
    } while (plazos > 12);
    if (plazos > 0 && plazos <= 12) {
      result = totalPrice / plazos;
      document.write(`Tiene que pagar ${result} euros en ${plazos} meses. `);
      if (date.getMonth() + parseInt(plazos) < 12) {
        document.write(`Lo terminará de pagar el día ${date.getDate()}/${date.getMonth() + parseInt(plazos)}/${date.getFullYear()}`);
        plazos = 0;
      } else {
        document.write(`Lo terminará de pagar el día ${date.getDate()}/${(date.getMonth() + parseInt(plazos)) - 12}/${date.getFullYear() + 1}`);
        plazos = 0;
      }
    } 
  } else {
    document.write(`Lo ha comprado hoy ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
  }
}

function countItems(listID){
  var ul = document.getElementById(listID);
  var i=0, itemCount =0;
  while(ul.getElementsByTagName('li') [i++]) itemCount++;
  document.write(itemCount);
}
