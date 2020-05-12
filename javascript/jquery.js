
// When the page is loaded

$(document).ready(function(){
  
// Variables' declarations

  // Getting DOM Elements
  var container = $('#card--collection')
  var catSelect = $('#cat-select')
  var subSelect = $('#sub-select')



  // Normal Variables

  var auxCards = []
  var categories = []
  var subcategories = []
  var duplicateControll = []
  var controll = 1

  // Calling the files on Json
  $.ajax({
    type: 'GET',
    url: 'https://rtavaresramos.github.io/aprendeai-json/courses-db.json',
    success: function(data){


      // <Inserting all courses in the Home Page >

      $.each(data, function(i, data){
        auxCards[i] = '<div id="card--'+ i +'" class="card--item"><img src="'+ data.url_img +'"alt=""><div class="card--content"><div class="card--text"><h1>'+ data.course_name +'<span>'+ data.course_author+'</span></h1></div><div class="card--price"><h3>R$ '+ data.price +'</h3><div class="button__see--more"><a href="'+ data.url_affiliate +'" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
      
        if(i < controll * 6){

              container.append( auxCards[i])
 
        }
        return auxCards 
  })

      container.append('<div id="card-controll" class="buttons"><a href="#card--6" id="see-all-cards">Ver mais</a></div>')

      // </Inserting all courses in the Home Page >


      // Here was added the controll with duplicate data for select tags

      $.each(data, function(i, data){
            
        categories[i] = data.category
        subcategories[i] = data.subcategory
        return categories, subcategories
    })



    const newCategories = [ ...new Set( categories ) ];
    const newSubCategories = [ ...new Set( subcategories ) ];


    // <Inserting Datas in the Select Element>

    $.each(newCategories.sort(), function(i){
            
      catSelect.append('<option value="'+newCategories[i]+'">'+ newCategories[i] +' </option>')

  }) 
    $.each(newSubCategories.sort(), function(i){
            
      subSelect.append('<option value="'+newSubCategories[i]+'">'+ newSubCategories[i] +' </option>')

  }) 

    $(catSelect).change( function(){
      $('#sub-select option').remove()
      duplicateControll = []
      if(catSelect.val()=='all'){
        $('#sub-select').append('<option value="all">Todas as subcategorias </option>')

        $.each(newSubCategories.sort(), function(i){
            
          $('#sub-select').append('<option value="'+newSubCategories[i]+'">'+ newSubCategories[i] +' </option>')
    
      }) 
      }else{

        $.each(categories, function(i, data){
  
          if ( data == catSelect.val() ){
              if(!duplicateControll.includes(subcategories[i])){
                duplicateControll.push(subcategories[i])
              }
              }else{
                
              }
    
      })

      $.each(duplicateControll.sort(), function(i, data){
        subSelect.append('<option id="sub-option" value="'+duplicateControll[i]+'">'+ duplicateControll[i] +' </option>')

      })
      }
    })
 

    // </ Inserting Datas in the Select Element>


    // See all Button

    $('#see-all-cards').click( function(){

      $('.card--item').remove()
      $('#not-found').remove()
      $('#see-all-cards').remove()

      $.each(data, function(i){
        
        if(i < 14){

          container.append( auxCards[i])

    }
      })

      container.append("<div id='card--collection-message' class='card--collection-message'><h2> Use o filtro para ver mais </h2></div>")
    })

    // </ See all Button>



    // Filtering acoording the requesits
    $('#search-button').click( function(){

        $('.card--item').remove()
        $('#not-found').remove()
        $('#see-all-cards').remove()
        $('#card--collection-message').remove()

    $.each(data, function(i, data){
      catSelect = $('#cat-select').val()
      subSelect = $('#sub-select').val()
      rangeValue = $('#my-range').val()
      
      id = 0

      if(catSelect == 'all' && subSelect == 'all'){
        if(rangeValue >= parseFloat(data.price)){

        container.append( auxCards[i])
        }
      }else{
          if(catSelect == 'all' && subSelect == data.subcategory){
              if(rangeValue > parseFloat(data.price)){
                  container.append( auxCards[i])
            }
          }else{
            if(catSelect == data.category && subSelect == 'all'){
              if(rangeValue >= parseFloat(data.price)){
                container.append( auxCards[i])
              }
            }else{
              if(catSelect == data.category && subSelect == data.subcategory){
                if(rangeValue >= parseFloat(data.price)){
                  container.append( auxCards[i])
                }
              }else{
                
            }

          }
        }
      }

      })

    })

  }})
})

