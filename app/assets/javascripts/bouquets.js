railsBouquet = {};

railsBouquet.bouquetForm = function(){

  var bouquetName = $('#bouquet_name').val();
  var bouquetDescription = $('#bouquet_description').val();
  var price = $('#price').val();
  var numberBouquets = $('#number_bouquets').val();

  // fill up the object to send to Rails
  var bouquet = {
    bouquet_name: bouquetName,
    bouquet_description: bouquetDescription,
    price: price,
    number_bouquets: numberBouquets
  }  

  $.ajax({
    url: '/bouquets',
    method: 'POST',
    data: bouquet,
    dataType: "json"
  }).success(function(data){
    console.log(data)
    railsBouquet.getBouquets();
      // bouquets.togglePages('#all_bouquets');
    });
}

railsBouquet.getBouquets = function(){
  //   //Clear the posts table to avoid  duplicates posts;
  $('#listbouquets').empty();
  $.ajax({
    url: '/bouquets',
    type: "GET",
    dataType:"json"
  }).success(function(data){
    
    $.each(data, function(index, item){
      var listBouquets = $("<ul>"+
        "<li>" + item.bouquet_name+"</li>"+
        "<li>" + item.price+"</li>"+
        "<li>" + item.bouquet_description +"</li>"+
        "<li><a href=''>" + item.website +"</a></li>"+
        "<td><button data-id='" + item.id+"' class='btn edit_post'>Edit</button> <button data-id='" + item.id+"' class='btn btn-danger delete_post'>Delete</button></td>"+
        "</tr>");

      listBouquets.appendTo("#listbouquets")
    });
  });
}    

railsBouquet.deleteBouquet = function(){

  $this = $(this);
  var bouquetId = $(this).data('id');

  $.ajax({
    url: '/bouquets/' + bouquetId,
    type: 'DELETE',
    dataType: 'json',
  }).success(function(data){
    $this.closest('ul').remove();
  });
}

railsBouquet.editBouquet = function() {
  // $this = $(this);

  var bouquetId = $(this).data('id');
  
  $.ajax({
    url: '/bouquets/' + bouquetId,
    type: 'GET',
    dataType: 'json'
  })
  .success(function(data) {
    console.log(data);
    $('#bouquet_name').val(data.bouquet_name);
    $('#bouquet_description').val(data.bouquet_description);
    $('#price').val(data.bouquet_price);
    $('#number_bouquets').val(data.number_bouquets);
  })
}


$(function(){
  $('.bouquet_submit').click(function(event){
    event.preventDefault()
    railsBouquet.bouquetForm()
    console.log('hello')
  });
  event.preventDefault()
  railsBouquet.getBouquets();
  $('#listbouquets').on('click', '.delete_post', railsBouquet.deleteBouquet);
  $('#listbouquets').on('click', '.edit_post', railsBouquet.editBouquet); 
})

