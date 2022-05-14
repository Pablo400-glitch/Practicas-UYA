document.querySelector('#register').addEventListener('click', getJSONData);

$(document).ready(function(){
  $("input").focus(function(){
    $(this).css("background-color", "lightblue");
  });
  $("input").blur(function(){
    $(this).css("background-color", "white");
  });
});

function getJSONData() {
  const xhttp = new XMLHttpRequest()
  xhttp.open('GET', 'catalogo.json', true)
  xhttp.send()

  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.responseText);
      let name = document.getElementsByName('nombre')[0].value;
      let password = document.getElementsByName('password')[0].value;
      let accountNumber = 1;
      let userName = [];

      for (let item of datos) {
        userName.push(item.nombre);
      }

      userName.forEach((username) => {
        if (name === username) {
          alert('Ese usuario ya existe');
        } 
      });

      if (password.length < 8) {
        alert('Esa contraseña es demasiado corta, introduzca una que tenga más de 8 caracteres');
      }

      for (let item of datos) {
        if (accountNumber === item.accountNumber) {
          accountNumber++;
        } 
      }

      let newUser = {
        nombre: name,
        password: password,
        accountNumber: accountNumber,
      }

      alert('Usuario añadido');

      datos.push(newUser);
    }
  }
}
