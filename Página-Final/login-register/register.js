import {getUser, saveUser} from './firebase.js';

document.querySelector('#login-register').addEventListener('click', registerUser);

$(document).ready(function(){
  $("input").focus(function(){
    $(this).css("background-color", "lightblue");
  });
  $("input").blur(function(){
    $(this).css("background-color", "white");
  });
});

async function registerUser() {
  const data = await getUser();

  let name = document.getElementsByName('nombre')[0].value;
  let password = document.getElementsByName('password')[0].value;
  let empty = false;
  let passwordLenght = false;
  let existingUser = false;

  if (password.length === 0 || name.length === 0) {
    empty = true;
  } else {
    if (password.length < 8 && password.length > 0) {
      passwordLenght = true;
    } else {
      data.forEach(doc => {
        if (name === doc.data().nombre) {
          existingUser = true;
        } 
      })
    }
  }
    
  if (empty) {
    alert('No ha introducido ningún dato o le falta alguno');
  } else {
    if (passwordLenght) {
      alert('Esa contraseña es demasiado corta, introduzca una que tenga más de 8 caracteres');
    } else {
      if (existingUser) {
        alert('Ese usuario ya existe');
      } else {
        saveUser(name, password);
        alert('Se ha registrado de forma satisfactoria');
        $(document).ready(function(){
          $("#showdata").show();
          $("#register").hide();
          $("#nombretext").hide();
          $("#passwordtext").hide();
          $("#nombre").hide();
          $("#password").hide();
          $("#login-register").hide();
        });
      } 
    }
  }
}

