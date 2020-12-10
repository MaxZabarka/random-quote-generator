

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
function randomInteger(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getQuote()


const container = document.querySelector('.container')
const body = document.querySelector('body')
const root = document.querySelector(':root');

container.addEventListener("click",flipCard)
flipCard()

function flipCard() {
  // var randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
  let randomColor = "hsl("+randomInteger(0,360)+","+
                          randomInteger(50,100)+"%,"+
                          randomInteger(0,80)+"%"

  console.log("Clicked")
  container.classList.toggle("flip")
  root.style.setProperty("--main-color",randomColor)
  setTimeout(function() {
    getQuote()

  }, 300);

  // body.style.backgroundColor = randomColor
  // var elements = document.querySelectorAll('.container');
  // for(var i=0; i<elements.length; i++){
  //     elements[i].style.color=randomColor
  // }

}
