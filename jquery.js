$(document).ready(function(){

  var container = $('#card--collection')
  var auxCards = []
  var value = 1
  $.ajax({
    type: 'GET',
    url: 'https://rtavaresramos.github.io/aprendeai-courses-db/courses-db.json',
    success: function(data){
      console.log(data)
      $.each(data, function(i, data){
        
        auxCards[i] = '<div class="card--item"><img src="'+ data.url_img +'"alt=""><div class="card--content"><div class="card--text"><h1>'+ data.course_name +'<span>'+ data.course_author+'</span></h1></div><div class="card--price"><h3>R$ '+ data.price +'</h3><div class="button__see--more"><a href="'+ data.url_affiliate +'">Ver curso</a></div></div></div></div></div>'
        container.append( auxCards[i])
        var i 
      return auxCards 
  })

    }})
})

