// var timer = document.getElementById('timer');
// var textDisplay = document.getElementById('textDisplay');
// var textInput = document.getElementById('textInput');
// console.log(typeof timer.innerHTML);
// var time = parseInt(timer.innerHTML);
// const dx =1;
// setInterval(() => {
//     if(time){
//     time-=dx;
//     console.log(time);
//     timer.innerHTML = time.toString();
//     }
// }, 1000);

//global variables
var correctWord=0, incorrectWord=0;

var score= document.getElementById('score');
score.style.opacity=0;
const api = 'http://api.quotable.io/random';

function getRandomQuote() {
    return fetch(api).
        then(response => response.json())
        .then(data => data.content);
}

//  function getNextQuote(){
//     const quote =  getRandomQuote();
//     console.log(quote);
// }


async function getNextQuote() {
    const quote = await getRandomQuote();
    textDisplay.innerHTML = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        // characterSpan.classList.add('incorrect');
        textDisplay.appendChild(characterSpan);
        textInput.value = null;
    })
}
getNextQuote();

//event listeners
textInput.addEventListener('input', () => {

    //timer starts
    var timer = document.getElementById('timer');
    var textDisplay = document.getElementById('textDisplay');
    var textInput = document.getElementById('textInput');
    var quoteBody = document.getElementById('quoteBody')

    // console.log(typeof timer.innerHTML);
    var time = parseInt(timer.innerHTML);
    const dx = 1;
    setInterval(() => {
        if (time) {
            time -= dx;
            // console.log(time);
            timer.innerHTML = time.toString();
        }
        else{
            quoteBody.style.opacity = 0;
            score.style.opacity = 1;
        }
    }, 1000);

    //Check correct/incorrect words
    const arrayQuote = textDisplay.querySelectorAll('span');
    const arrayInput = textInput.value.split('');
    var correct = true;
    arrayQuote.forEach((characterQuote,index) => {
        var character = arrayInput[index];
        if (character == null) {
            characterQuote.classList.remove('correct');
            characterQuote.classList.remove('incorrect');
            correct = false;
        }
        else if (character === characterQuote.innerText) {
            characterQuote.classList.add('correct');
            characterQuote.classList.remove('incorrect');

        }
        else {
            characterQuote.classList.add('incorrect');
            characterQuote.classList.remove('correct');
            correct = false;
        }
        if( character == ' ')
        textInput.value = null;
    })

    if (correct)
        getNextQuote();
})

var restartButton = document.getElementById('restart');
restartButton.addEventListener('click', () => {
    window.location.reload();
})
