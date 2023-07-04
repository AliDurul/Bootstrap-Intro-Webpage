class HangMan{
    constructor(word, remainingGuess, status){
        this.word = word.toLowerCase().split("");
        this.remainingGuess = remainingGuess;
        this.guessedLetters = [];
        this.status = "playing";
    }
    calculateStatus(){
        const finished = this.word.every((letter) => {
            return this.guessedLetters.includes(letter) || letter === ' ';
          });
        
          if (this.remainingGuess === 0) {
            this.status = "failed";
          } else if (finished) {
            this.status = "finished";
          } else {
            this.status = "playing";
          }
    }
      get statusMessage(){
        if (this.status === "playing") {
            return `Guesses left: ${this.remainingGuess}`;
          } else if (this.status === "failed") {
            return `Nice try! The word was "${this.word.join("")}".`;
          } else {
            return "Great work! You guessed the world.";
          }
    }
    get puzzle(){
        let puzzle = "";

        this.word.forEach((letter) => {
          if (this.guessedLetters.includes(letter) || letter === " ") {
            puzzle += letter;
          } else {
            puzzle += "*";
          }
        });
      
        return puzzle;
    }
    makeGuess(guess){
         guess = guess.toLowerCase();
  const isUnique = !this.guessedLetters.includes(guess);
  const isBadGuess = !this.word.includes(guess);

  if (this.status !== "playing") {
    return;
  }

  if (isUnique) {
    this.guessedLetters.push(guess);
  }

  if (isUnique && isBadGuess) {
    this.remainingGuess--;
  }
  this.calculateStatus();
    }
}
