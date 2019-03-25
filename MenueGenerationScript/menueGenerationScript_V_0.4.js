// Functions generating randon unique IDs
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + s4();
}
//The Json Root object
var json ={}
json.venue_name = $(".restaurant-cover__top-info h2").text().trim();
json.venue_image = $(".restaurant-cover__image img").attr("src");
json.venue_phones = []
$(".restaurant-cover__text-details a.call").each(function(item) {
  json.venue_phones.push($(this).text().trim().replace(",", ""));
})

json.menu = {}

$(".menu.ng-scope").children().each(
  function(index) {
    if (index > 1) {
      var category_name = $(this).find("[once-text|='category.name']").html()
      json.menu[category_name] = {}
      json.menu[category_name].name = $(this).find("[once-text|='category.name']").html()
      json.menu[category_name].sizes=[]
      $(this).find(".category-sizes .size-itme").each(function(item) {
        json.menu[category_name].sizes.unshift($(this).text().trim())
      })
      json.menu[category_name].items ={}
      $(this).find(".info").each(function(item) {
        var item = {}
        item.name = $(this).find(".dish-name").text().trim()
        item.category = category_name
        var prices = {}
        $(this).find(".prices").each(function(item) {
          $(this).find(".size-price").each(function(index) {
            prices[json.menu[category_name].sizes[index]] = eval($(this).text().trim().replace("EGP" , ""));
          })
        })
        item.prices = prices
        json.menu[category_name].items[guid()] = item
      })
    }
  })
  //pretty printing JSON
// var str = JSON.stringify(json, null, 2);
// var x = window.open();
//     x.document.open();
//     x.document.write('<html><body>' + str + '</body></html>');
//     x.document.close();

jQuery.post( "https://us-central1-vodafoodies-e3f2f.cloudfunctions.net/addVenue" , json , function(data){console.log(data)}, 'json' )
