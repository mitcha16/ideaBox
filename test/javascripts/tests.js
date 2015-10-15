$(document).ready(function(){

  test("the page will start with all ides showing", function() {
    equal($('.idea').is(':visible'), false, "ideas are not show" );
  });

  test("delete will remove the nearest idea", function() {

    console.log(idea)
    debugger;
    $("#delete-idea:first").click();
    equal(idea.is(':visible'), false, "idea did not go away" );
  });

});
