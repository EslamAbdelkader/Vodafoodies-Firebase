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
var venueID = guid()
json[venueID] = {}
json[venueID].venue_name = $(".restaurant-cover__top-info h2").text().trim();
json[venueID].venue_image = $(".restaurant-cover__image img").attr("src");
json[venueID].venue_phones = []
$(".restaurant-cover__text-details a.call").each(function(item) {
  json[venueID].venue_phones.push($(this).text().trim().replace(",", ""));
})

json[venueID].menu = {}

$(".menu.ng-scope").children().each(
  function(index) {
    if (index > 1) {
      var category_name = $(this).find("[once-text|='category.name']").html()
      json[venueID].menu[category_name] = {}
      json[venueID].menu[category_name].name = $(this).find("[once-text|='category.name']").html()
      json[venueID].menu[category_name].sizes=[]
      $(this).find(".category-sizes .size-itme").each(function(item) {
        json[venueID].menu[category_name].sizes.unshift($(this).text().trim())
      }) 
      json[venueID].menu[category_name].items ={}
      $(this).find(".info").each(function(item) {
        var item = {}
        item.name = $(this).find(".dish-name").text().trim()
        item.category = category_name
        var prices = {}
        $(this).find(".prices").each(function(item) {
          $(this).find(".size-price").each(function(index) {
            prices[json[venueID].menu[category_name].sizes[index]] = eval($(this).text().trim().replace("EGP" , ""));
          }) 
        }) 
        item.prices = prices
        json[venueID].menu[category_name].items[guid()] = item
      }) 
    }
  })
  //pretty printing JSON
var str = JSON.stringify(json, null, 2);
var x = window.open();
    x.document.open();
    x.document.write('<html><body><pre>' + str + '</pre></body></html>');
    x.document.close();