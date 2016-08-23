(function() {
  let menu;
  let name;
  let price;
  let type;
  let item;
  let id;
  let shoppingCart = [];
  let total = 0;
  let custInfo = [];

  $.get( "https://galvanize-eats-api.herokuapp.com/menu", function( data ) {
    storeData(data);
  });

  function storeData (data) {
    menu = data;
    divideCatagories(menu);
    return menu;
  }

  function divideCatagories(obj) {
    item = obj.menu;
    console.log('item',item);
    item.forEach(subCat)
    addevent()
    }

    function subCat (item){
      price = item.price;
      name = item.name;
      type = item.type;
      id = item.id;
      show(price,name,id);
      console.log('subcat price',price);
    }

    function show(price,name,id) {
      $('#menuWindow').append('<button class="menuItem" data-price='+price+' data-name='+name+'>' + name + " " + price + '</button><div></div>').css("margin-bottom" ,"10px")
    }

function priceCalc (name,price,quantity) {
  subTotal = price * quantity;
  shoppingCart.push([name,quantity,price,subTotal])
  return subTotal;
}

function addevent () {
$('.menuItem').on('click',(function () {

  var orderedItemPrice = this.dataset.price;
  var orderedItemName = this.dataset.name;
  var quantityOrdered = $('#quantity').val()
  priceCalc(orderedItemName,orderedItemPrice,quantityOrdered)
  totalCalc(orderedItemName,orderedItemPrice,quantityOrdered)

}))
}
//sum the prices of the orders in the shopping cart
function totalCalc () {
  total = 0;
  shoppingCart.forEach(function (item) {
    total += item[3];
    console.log('total',total);
    return total;
  })
}


$('#addItem').on('click',(function () {
  event.preventDefault();
  $('#orderDisp').empty()
  shoppingCart.forEach((item) => {
    $('#orderDisp').append('<div class="orderDispItem">' + item[0] + " x" + item[1] + "  $" + item[3] + '</div>')
    console.log(item);
  })
    $('#orderDisp').append('<div class="totals">' + "Total: $ " + total + '</div>')
}))


$('#deliver').on('click', () => {
  event.preventDefault();
  checkout()
})

function checkout () {
  custInfo.push($('#name').val())
  custInfo.push($('#phoneNum').val())
  custInfo.push($('#address').val())

  custInfo.push(shoppingCart)
  $.post('https://galvanize-eats-api.herokuapp.com/orders', function (custInfo,status) {
    console.log(status);
    console.log(custInfo);
    custInfo.length = 0 ? alert('There is nothing in your Cart!') :
    alert('Thank You For Your Order!')
  })
  console.log('shoppingCart',custInfo);
}
//access the price using the unique ID and prepare to sum



}());
