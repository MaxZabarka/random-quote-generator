function getQuote() {
  fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(data => {
    addQuote(data.content,data.author)
  })
  .catch(error => console.error(error))
}

function addQuote(quote,author) {
  console.log(quote,author)
  let quoteElement = document.querySelector(".quote")
  let authorElement = document.querySelector(".author")

  quoteElement.innerText = quote;
  authorElement.innerText = "- " + author;
}

function flipCard() {
  let randColor = randomColor()

  console.log("Clicked")
  container.classList.toggle("flip")
  root.style.setProperty("--main-color",randColor)
  setTimeout(function() {
    getQuote()

  }, 300);
}

//Helpers
function luminanace(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrastFunc(rgb1, rgb2) {
    var lum1 = luminanace(rgb1[0], rgb1[1], rgb1[2]);
    var lum2 = luminanace(rgb2[0], rgb2[1], rgb2[2]);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05)
         / (darkest + 0.05);
}
function hsl2rgb(h,s,l)
{
  let a=s*Math.min(l,1-l);
  let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
  return [f(0)*255,f(8)*255,f(4)*255];
}
function randomColor() {
  do {
    var randomColorHSL = [randomInteger(0,360),randomInteger(50,100)/100,randomInteger(50,100)/100]
    console.log(randomColorHSL)
    var randomColorRGB = hsl2rgb(...randomColorHSL)
    console.log(randomColorRGB)
    var contrast = contrastFunc(randomColorRGB,[255,255,255])
    console.log(contrast)
  } while (contrast < 2)
  return "hsl("+randomColorHSL[0]+","+
                          randomColorHSL[1]*100+"%,"+
                          randomColorHSL[2]*100+"%)"
}
function randomInteger(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Selectors
const container = document.querySelector('.container')
const body = document.querySelector('body')
const root = document.querySelector(':root');

//Event listeners
container.addEventListener("click",flipCard)

flipCard()
