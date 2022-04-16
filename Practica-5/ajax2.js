//console.log('correcto');
document.querySelector('#boton').addEventListener('click', traerDatos);

function traerDatos(){
  // console.log('Dentro de la función');
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
        </tr>`
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