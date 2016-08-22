(function() {
  let menu;
  let name;
  let price;
  let type;
  let item;
  let id;
  let shoppingCart = [];

//get the menu from API

$.get( "https://galvanize-eats-api.herokuapp.com/menu", function( data ) {
  storeData(data);
});


//store the data in a variable
function storeData (data) {
  menu = data;
  divideCatagories(menu);
  return menu;
}


//access the data using a foreach
function divideCatagories(obj) {
  item = obj.menu;
  console.log('item',item);
  item.forEach(subCat)
  }
var populate = new Promise (


)
//set variables from object
  function subCat (item){
    price = item.price;
    name = item.name;
    type = item.type;
    id = item.id;
    show(price,name,id);
    console.log('subcat price',price);
  }

//add divs to window
function show(price,name,id) {
  $('#menuWindow').append('<button class="menuItem" data-price='+price+' data-name='+name+'>' + name + " " + price + '</button>')
}

function priceCalc (name,price,quantity) {
  subTotal = price * quantity;
  shoppingCart.push([name,quantity,price,subTotal])
  console.log('subTotal',shoppingCart);
}



function addevent () {
$('.menuItem').on('click',(function () {
  var orderedItemPrice = this.dataset.price;
  var orderedItemName = this.dataset.name;
  var quantityOrdered = $('#quantity').val()
  priceCalc(orderedItemName,orderedItemPrice,quantityOrdered)

}))
}
//access the price using the unique ID and prepare to sum



}());
