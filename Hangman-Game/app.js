const puzzleEl = document.querySelector('#puzzle')
const guessEl = document.querySelector('#guesses')
 
const game1 = new HangMan("car parts",3) 
puzzleEl.textContent = game1.puzzle;
guessEl.textContent = game1.statusMessage;


window.addEventListener('keypress', function(e){
    const guess = e.key

    game1.makeGuess(guess);
    puzzleEl.textContent = game1.puzzle
    guessEl.textContent = game1.statusMessage
})
// Making an HTTP request
const request = new XMLHttpRequest()

request.addEventListener('readystatechange', (e =>{
    if(e.target.readyState === 4){
        const data = JSON.parse(e.target.responseText)
        console.log(data);
    }
}))

request.open('GET', 'https://puzzle.mead.io/puzzle')
Request.send()
