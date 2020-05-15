  // DOM Variables:
  var container = document
  .getElementById('card--collection')
  
  var catSelect = document
  .getElementById('cat-select')
  
  var subSelect = document
  .getElementById('sub-select')
  
  // Usable variables:
  
  let result;
  var paramsQty = 9
  var auxCards = []
  var auxCategories = []
  var auxSubCategories = []
  var selectCategories = '<option value="all">Todas as categorias </option>'
  var selectSubCategories = '<option value="all">Todas as subcategorias </option>'
  
  
  // Objects :
  function coursesDb(
    carimbo,email, course_name, 
    course_author ,price, category, 
    subcategory, url_img, url_affiliate)
    {
    this.carimbo = carimbo,
    this.email = email,
    this.course_name = course_name,
    this.course_author = course_author,
    this.price = price,
    this.category = category,
    this.subcategory = subcategory,
    this.url_img = url_img,
    this.url_affiliate = url_affiliate
  }
  
  
  
  


// Functions called when the page is loaded:

function loadDb(){

// Calling the api response:
fetch(
  "https://spreadsheets.google.com/feeds/cells/1GGrQ8FumS7wmYozTBCFAFL8I8Mk4hGpvTqNEVg5hFq4/1/public/full?alt=json"
)
  .then(function(res){ 
    return res.json()})
  .then(function(jsonRes){
    result = jsonRes.feed.entry.map((row)=> row.content["$t"])  


// Variables which depends from the response:
var courses = []
var objSize = Object
.keys(result)
.length


objSize = objSize/paramsQty


// Including the api response into the object:
for(i=0 ; i < objSize ; i++){
    count = i*9
   courses[i] = new coursesDb(
      result[count],
      result[count+1],
      result[count+2],
      result[count+3],
      result[count+4],
      result[count+5],
      result[count+6], 
      result[count+7], 
      result[count+8]
   )}

// Function which print cards' courses on the screen:
   function printCards(qty){
    while (   
      document
      .getElementById('card--collection')
      .firstChild) {
      document
      .getElementById('card--collection').
      removeChild(
      document
      .getElementById('card--collection')
      .firstChild);
    }
    for(i=0 ; i < qty ; i++){

      if(i == 0){

      }else{
        if(courses[i].course_author === "no_name"){
          auxCards = auxCards +'<div id="card--'+ i +
          '" class="card--item"><img src="'+ 
          courses[i].url_img +
          '"alt=""><div class="card--content"><div class="card--text"><h1>'
          + courses[i].course_name +'<span></span></h1></div><div class="card--price"><h3> '+ 
          parseFloat(courses[i].price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
           +'</h3><div class="button__see--more"><a href="'
          + courses[i].url_affiliate +
          '" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
        }else{
    
        
        auxCards = auxCards + '<div id="card--'+ i +
        '" class="card--item"><img src="'+ 
        courses[i].url_img +
        '"alt=""><div class="card--content"><div class="card--text"><h1>'
        + courses[i].course_name +'<span>'+ courses[i].course_author+
        '</span></h1></div><div class="card--price"><h3> '+ 
        parseFloat(courses[i].price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        +'</h3><div class="button__see--more"><a href="'
        + courses[i].url_affiliate +
        '" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
        }
      }
    }
  }

  // Including the button "see-more":
  auxCards = auxCards + '<div id="card-controll" class="buttons"><a href="#card--collection" id="see-all-cards">Ver mais</a></div>'

// Function which print select's with the categories and
//  subcategories on the screen:


    auxCategories = courses
    .map(data => data.category)
    .slice(1,)

    auxSubCategories = courses
    .map(data => data.subcategory)
    .slice(1,)


    const newCategories = [ 
      ...new Set( auxCategories )
     ].sort()

    const newSubCategories = [ 
      ...new Set( auxSubCategories )
     ].sort()


     newCategories.forEach((data)=> {
      selectCategories =  selectCategories + 
      '<option value="'
      +data+'">'+ 
      data +' </option>'

    })

     newSubCategories.forEach((data)=> {
      selectSubCategories =  selectSubCategories + 
      '<option value="'
      +data+'">'+ 
      data +' </option>'

    })





  // Starting the Website:

  printCards(7)

  container.innerHTML =  auxCards
  catSelect.innerHTML =  selectCategories
  subSelect.innerHTML =  selectSubCategories
})}



  // Adding the right behavior from select


    document
    .getElementById('cat-select')
    .addEventListener('change', ()=>{
      var e = document
      .getElementById('cat-select')
      selectSubCategories = ""
      var duplicateControll = []
      subSelect = document
      .getElementById('sub-select')

      e = e.options[e.selectedIndex].value
      while (   
        document
        .getElementById('sub-select')
        .firstChild) {
        document
        .getElementById('sub-select').
        removeChild(
        document
        .getElementById('sub-select')
        .firstChild);
      }      

      if(e == 'all'){
        selectSubCategories = '<option value="all">Todas as subcategorias </option>'
        subSelect.innerHTML =  selectSubCategories

        newSubCategories.map(data=> {

          selectSubCategories =  selectSubCategories + 
          '<option value="'
          +data+'">'+ 
          data +' </option>'
          
        })
        subSelect.innerHTML =  selectSubCategories
      }else{
        auxCategories
        .map((cat, i)=>{

          if(cat == e){

                if(!duplicateControll
                  .includes(auxSubCategories[i])){
                    duplicateControll
                    .push(auxSubCategories[i])
                  }

            }
        })
        
        
      }
      if(e == 'all'){
        selectSubCategories = '<option value="all">Todas as subcategorias </option>'
        subSelect.innerHTML =  selectSubCategories

        newSubCategories.map(data=> {

          selectSubCategories =  selectSubCategories + 
          '<option value="'
          +data+'">'+ 
          data +' </option>'
          
        })
        subSelect.innerHTML =  selectSubCategories
      }else{
        selectSubCategories = '<option value="all">Todas as subcategorias </option>'
        duplicateControll
        .sort()
        .map((data)=>{
          selectSubCategories =  selectSubCategories + 
          '<option value="'
          +data+'">'+ 
          data +' </option>'
        })
        subSelect.innerHTML =  selectSubCategories
      }


    })


  // Adding the "See-more" button behavior
    document
    .getElementById('see-all-cards')
    .addEventListener('click', ()=>{
      while (   
        document
        .getElementById('card--collection')
        .firstChild) {
        document
        .getElementById('card--collection').
        removeChild(
        document
        .getElementById('card--collection')
        .firstChild);
      } 
      auxCards = ""
      printCards(16)
      auxCards = auxCards + "<div id='card--collection-message' class='card--collection-message'><h2> Use o filtro para ver mais </h2></div>"

      container.innerHTML =  auxCards

    })


  // Adding the filter behavior

  document
  .getElementById('search-button')
  .addEventListener('click', ()=>{
    while (   
      document
      .getElementById('card--collection')
      .firstChild) {
      document
      .getElementById('card--collection').
      removeChild(
      document
      .getElementById('card--collection')
      .firstChild);
    } 
      auxCards = ""


    courses.map((data,i)=>{
      catSelect = document
      .getElementById('cat-select').value
      subSelect = document
      .getElementById('sub-select').value
      rangeValue = document
      .getElementById('my-range').value

      if(catSelect == 'all' && subSelect == 'all'){
        if(rangeValue >= parseFloat(data.price)){


            if(data.course_author === "no_name"){
              auxCards = auxCards +'<div id="card--'+ i +
              '" class="card--item"><img src="'+ 
              data.url_img +
              '"alt=""><div class="card--content"><div class="card--text"><h1>'
              + data.course_name +'<span></span></h1></div><div class="card--price"><h3> '+
                parseFloat(data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
               +'</h3><div class="button__see--more"><a href="'
              + data.url_affiliate +
              '" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
            }else{
        
            
            auxCards = auxCards + '<div id="card--'+ i +
            '" class="card--item"><img src="'+ 
            data.url_img +
            '"alt=""><div class="card--content"><div class="card--text"><h1>'
            + data.course_name +'<span>'+ data.course_author+
            '</span></h1></div><div class="card--price"><h3> '+ 
            parseFloat(data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            +'</h3><div class="button__see--more"><a href="'
            + data.url_affiliate +
            '" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
            }
            container.innerHTML =  auxCards
          }
      }else{
          if(catSelect == 'all' && subSelect == data.subcategory){
              if(rangeValue > parseFloat(data.price)){
                            if(i == 0){

          }else{
            if(data.course_author === "no_name"){
              auxCards = auxCards +'<div id="card--'+ i +
              '" class="card--item"><img src="'+ 
              data.url_img +
              '"alt=""><div class="card--content"><div class="card--text"><h1>'
              + data.course_name +'<span></span></h1></div><div class="card--price"><h3> '+ 
              parseFloat(data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
              +'</h3><div class="button__see--more"><a href="'
              + data.url_affiliate +
              '" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
            }else{
        
            
            auxCards = auxCards + '<div id="card--'+ i +
            '" class="card--item"><img src="'+ 
            data.url_img +
            '"alt=""><div class="card--content"><div class="card--text"><h1>'
            + data.course_name +'<span>'+ data.course_author+
            '</span></h1></div><div class="card--price"><h3> '+ 
            parseFloat(data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
            +'</h3><div class="button__see--more"><a href="'
            + data.url_affiliate +
            '" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
            }
          }
          container.innerHTML =  auxCards

            }else{
            if(catSelect == data.category && subSelect == 'all'){
              if(rangeValue >= parseFloat(data.price)){
                          if(i == 0){

          }else{
            if(data.course_author === "no_name"){
              auxCards = auxCards +'<div id="card--'+ i +
              '" class="card--item"><img src="'+ 
              data.url_img +
              '"alt=""><div class="card--content"><div class="card--text"><h1>'
              + data.course_name +'<span></span></h1></div><div class="card--price"><h3> '+ 
              parseFloat(data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
              +'</h3><div class="button__see--more"><a href="'
              + data.url_affiliate +
              '" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
            }else{
        
            
            auxCards = auxCards + '<div id="card--'+ i +
            '" class="card--item"><img src="'+ 
            data.url_img +
            '"alt=""><div class="card--content"><div class="card--text"><h1>'
            + data.course_name +'<span>'+ data.course_author+
            '</span></h1></div><div class="card--price"><h3> '+ 
            parseFloat(data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
            +'</h3><div class="button__see--more"><a href="'
            + data.url_affiliate +
            '" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
            }
          }
          container.innerHTML =  auxCards

              }else{
                auxCards = ""
                auxCards = auxCards + 
                "<div id='card--collection-message' class='card--collection-message'><h2> Curso não encontrado </h2></div>"
                  container.innerHTML =  auxCards
              }
            }else{
              if(catSelect == data.category && subSelect == data.subcategory){
                if(rangeValue >= parseFloat(data.price)){
                            if(i == 0){

          }else{
            if(data.course_author === "no_name"){
              auxCards = auxCards +'<div id="card--'+ i +
              '" class="card--item"><img src="'+ 
              data.url_img +
              '"alt=""><div class="card--content"><div class="card--text"><h1>'
              + data.course_name +'<span></span></h1></div><div class="card--price"><h3> '+ 
              parseFloat(data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
              +'</h3><div class="button__see--more"><a href="'
              + data.url_affiliate +
              '" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
            }else{
        
            
            auxCards = auxCards + '<div id="card--'+ i +
            '" class="card--item"><img src="'+ 
            data.url_img +
            '"alt=""><div class="card--content"><div class="card--text"><h1>'
            + data.course_name +'<span>'+ data.course_author+
            '</span></h1></div><div class="card--price"><h3> '+ 
            parseFloat(data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
            +'</h3><div class="button__see--more"><a href="'
            + data.url_affiliate +
            '" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
            }
          }
          container.innerHTML =  auxCards

                }else{
                  auxCards = ""
                  auxCards = auxCards + 
                  "<div id='card--collection-message' class='card--collection-message'><h2> Curso não encontrado </h2></div>"
                    container.innerHTML =  auxCards
                }
              }else{

              }

          }
        }
      }
    })
  })

 

  