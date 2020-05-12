
var slider = document.getElementById('my-range')
var output = document.getElementById('range-value')


output.innerHTML - slider.value



slider.oninput = function(){
    

    output.innerHTML = parseFloat(this.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


slider.addEventListener("mousemove", function(){
    var x = slider.value / 15
    var color = 'linear-gradient(90deg, rgb(80,139,166)'+ x +'%,  rgb(96,96,96)'+ x +'%)'
    
    slider.style.background = color
})