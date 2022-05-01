$(document).ready(function(){
  $("#MainCategories").hide();
  $("#MyAccount").hide();

  // Main Categories and My Account nav

  $("#MainCategoriesTitle").mouseenter(function(){
    $("#MainCategories").show();
  });

  // Accesibility Option
  $("#MainCategoriesTitle").keyup(function(){
    $("#MainCategories").show();
  });

  $("#MyAccountTitle").mouseenter(function(){
    $("#MyAccount").show();
  });

  // Accesibility Option
  $("#MyAccountTitle").keyup(function(){
    $("#MyAccount").show();
  });


  $("#SecondMenu").mouseleave(function(){
    $("#MainCategories").hide();
    $("#MyAccount").hide();
  });
});