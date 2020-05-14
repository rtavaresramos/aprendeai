function loadDb(){
let result;

var paramsQty = 9

var container = document.getElementById('card--collection')

function jsonDb(
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

  this.mostraNome = function(){
    console.log(this.course_name)
  }
}
fetch(
  "https://spreadsheets.google.com/feeds/cells/1GGrQ8FumS7wmYozTBCFAFL8I8Mk4hGpvTqNEVg5hFq4/1/public/full?alt=json"
)
  .then(function(res){ 
    return res.json()})
  .then(function(jsonRes){
    result = jsonRes.feed.entry.map((row)=> row.content["$t"])  

var courses = new jsonDb()
var objSize = Object.keys(result).length


objSize = objSize/paramsQty



for(i=0 ; i < objSize ; i++){
    count = i*9
   courses[i] = { 
    carimbo : result[count],
    email : result[count+1],
    course_name : result[count+2],
    course_author : result[count+3],
    price : result[count+4],
    category : result[count+5],
    subcategory : result[count+6],
    url_img : result[count+7],
    url_affiliate : result[count+8]

   }}

   var auxCards = []
   for(i=0 ; i < objSize ; i++){

      if(i == 0){

      }else{
        if(courses[i].course_author === "no_name"){
          auxCards[i] = '<div id="card--'+ i +
          '" class="card--item"><img src="'+ 
          courses[i].url_img +
          '"alt=""><div class="card--content"><div class="card--text"><h1>'
          + courses[i].course_name +'<span></span></h1></div><div class="card--price"><h3>R$ '+ courses[i].price +'</h3><div class="button__see--more"><a href="'
          + courses[i].url_affiliate +
          '" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
        }else{
    
        
        auxCards[i] = '<div id="card--'+ i +
        '" class="card--item"><img src="'+ 
        courses[i].url_img +
        '"alt=""><div class="card--content"><div class="card--text"><h1>'
        + courses[i].course_name +'<span>'+ courses[i].course_author+
        '</span></h1></div><div class="card--price"><h3>R$ '+ courses[i].price +'</h3><div class="button__see--more"><a href="'
        + courses[i].url_affiliate +
        '" class="anchor--see-more" target="_blank">Ver curso</a></div></div></div></div></div>'
      }
      }
}
  



    container.innerHTML =  auxCards

  })}

  