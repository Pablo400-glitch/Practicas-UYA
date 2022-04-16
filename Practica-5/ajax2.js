document.querySelector('#showdata').addEventListener('click', getData);
document.querySelector('#login').addEventListener('click', checkData);

$(document).ready(function(){
  $("#showdata").hide();
  $("#showdata").click(function() {
    $("#showdata").hide()
  });
  $("input").focus(function(){
    $(this).css("background-color", "lightblue");
  });
  $("input").blur(function(){
    $(this).css("background-color", "white");
  });
});

function getData() {
  const xhttp = new XMLHttpRequest()
  xhttp.open('GET', 'catalogo.json', true)
  xhttp.send()

  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.responseText);

      let tableHead = document.querySelector('#head')
      let res = document.querySelector('#res')
      tableHead.innerHTML = `
        <tr>
          <th>Nombre</th>
          <th>Número de cuenta</th>
          <th>Fecha de cumpleaños</th>
          <th>Número de productos</th>
          <th>Descuento</th>
          <th>Método de pago</th>
          <th>DNI</th>
        </tr>
      `
      for (let item of datos) { 
        res.innerHTML += `
          <tr>
            <td>${item.nombre}</td>
            <td>${item.accountNumber}</td>
            <td>${item.birthday}</td>
            <td>${item.productsNumber}</td>
            <td>${item.discount}</td>
            <td>${item.paymentMethod}</td>
            <td>${item.dni}</td>
          </tr>
        `
      }
    }
  }
} 

function checkData() {
  const xhttp = new XMLHttpRequest()
  xhttp.open('GET', 'catalogo.json', true)
  xhttp.send()

  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.responseText);
      let accountNumber = document.getElementsByName('accountnumber')[0].value;
    	let nombre = document.getElementsByName('nombre')[0].value;
      let isUser = false;
      let empty = false;

      if (accountNumber === '' || nombre === '') {
        empty = true;
      } else {
        for (let item of datos) { 
          if(nombre == item.nombre && accountNumber == item.accountNumber) {
            isUser = true;
          } 
        }
      }

      if (isUser === true) {
        alert('Esa cuenta existe');
        $(document).ready(function(){
          $("#showdata").show();
        });
      } else {
        if (empty === true) {
          alert('No ha introducido ningún dato');
        } else {
          alert('Esa cuenta no existe');
        }
      }
    }
  }
} 
