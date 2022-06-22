import {getUser} from './firebase.js';

document.querySelector('#login-register').addEventListener('click', checkData);

$(document).ready(function(){
  $("input").focus(function(){
    $(this).css("background-color", "lightblue");
  });
  $("input").blur(function(){
    $(this).css("background-color", "white");
  });
});

async function checkData() {
  const data = await getUser();

  let password = document.getElementsByName('password')[0].value;
  let nombre = document.getElementsByName('nombre')[0].value;
  let isUser = false;
  let empty = false;

  if (password.length === 0 || nombre.length === 0) {
    empty = true;
  } else {
    data.forEach(doc => {
      const user = doc.data();
      if(nombre === user.nombre && password === user.password) {    
        isUser = true;
      } 
    });
  }

  if (isUser === true) {
    alert('Se ha iniciado sesión de forma satisfactoria');
    $(document).ready(function(){
      $("#showdata").show();
      $("#login").hide();
      $("#nombretext").hide();
      $("#passwordtext").hide();
      $("#nombre").hide();
      $("#password").hide();
      $("#login-register").hide();
    });
  } else {
    if (empty === true) {
      alert('No ha introducido ningún dato o le falta alguno');
    } else {
      alert('Esa cuenta no existe');
    }
  }
}

// function checkData() {
//   const xhttp = new XMLHttpRequest()
//   xhttp.open('GET', 'catalogo.json', true)
//   xhttp.send()

//   xhttp.onreadystatechange = function() {
//     if(this.readyState == 4 && this.status == 200) {
//       let datos = JSON.parse(this.responseText);
//       let password = document.getElementsByName('password')[0].value;
//     	let nombre = document.getElementsByName('nombre')[0].value;
//       let isUser = false;
//       let empty = false;

//       if (password === ' ' && nombre === ' ') {
//         empty = true;
//       } else {
//         for (let item of datos) { 
//           console.log(password);
//           if(nombre === item.nombre && password === item.password) {    
//             isUser = true;
//           } 
//         }
//       }

//       if (isUser === true) {
//         alert('Se ha iniciado sesión de forma satisfactoria');
//         $(document).ready(function(){
//           $("#showdata").show();
//           $("#login").hide();
//           $("#nombretext").hide();
//           $("#passwordtext").hide();
//           $("#nombre").hide();
//           $("#password").hide();
//         });
//       } else {
//         if (empty === true) {
//           alert('No ha introducido ningún dato');
//         } else {
//           alert('Esa cuenta no existe');
//         }
//       }
//     }
//   }
// } 



