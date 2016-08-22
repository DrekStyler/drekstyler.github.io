(function() {
  var menu;


$.get( "https://galvanize-eats-api.herokuapp.com/menu", function( data ) {
  storeData(data);
});

function storeData (data) {
  menu = data;
  console.log(menu);
  return menu;
}





}());
