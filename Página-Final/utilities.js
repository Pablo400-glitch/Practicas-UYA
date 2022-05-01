$(document).ready(function(){
  $("#MainCategories").hide();
  $("#MyAccount").hide();

  $("#MainCategoriesTitle").mouseenter(function(){
    $("#MainCategories").show();
  });

  $("#MyAccountTitle").mouseenter(function(){
    $("#MyAccount").show();
  });

  $("#SecondMenu").mouseleave(function(){
    $("#MainCategories").hide();
    $("#MyAccount").hide();
  });
});