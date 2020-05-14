
$(document).ready(function(){
  var auxDb = []
  
  var jsonDb = ({
    carimbo: '',
    email: '',
    course_name: '',
    course_author: '',
    price: '',
    category: '',
    subcategory: '',
    url_img: '',
    url_affiliate: ''
  })

$.ajax({
  type: 'GET',

  url: "https://spreadsheets.google.com/feeds/cells/1GGrQ8FumS7wmYozTBCFAFL8I8Mk4hGpvTqNEVg5hFq4/1/public/full?alt=json",
  success: function(data){


    $.each(data.feed.entry, function(i, data){

      auxDb[i] = data.content["$t"]

      return auxDb
    })

    
    // returnObj.carimbo = this[(key+0)*i];
    // returnObj.email = this[(key+1)*i];
    // returnObj.course_name = this[(key+2)*i];
    // returnObj.course_author = this[(key+3)*i];
    // returnObj.price = this[(key+4)*i];
    // returnObj.category = this[(key+5)*i];
    // returnObj.subcategory = this[(key+6)*i];
    // returnObj.url_img = this[(key+7)*i];
    // returnObj.url_affiliate = this[(key+8)*i];




  var count =0

      var returnObj = new jsonDb()

      
      $.each(auxDb, function(i,data){
        count++
      returnObj[i].carimbo = data[(i+0)*count];
      returnObj[i].email = data[(i+1)*count];
      returnObj[i].course_name = data[(i+2)*count];
      returnObj[i].course_author = data[(i+3)*count];
      returnObj[i].price = data[(i+4)*count];
      returnObj[i].category = data[(i+5)*count];
      returnObj[i].subcategory = data[(i+6)*count];
      returnObj[i].url_img = data[(i+7)*count];
      returnObj[i].url_affiliate = data[(i+8)*count];

      return returnObj
    })

  console.log(returnObj)
    // var jsonDb = JSON.stringify(auxDb)

    // jsonDb = { ...auxDb };
    // jsonDb = Object.assign({}, auxDb[1]);
    // const count = $(auxDb).size()
    // console.log(count)
    // $.each(auxDb, function(i,data){

    // })

    // for( i = 0; i < count ; i++){






    // }

  }})})

