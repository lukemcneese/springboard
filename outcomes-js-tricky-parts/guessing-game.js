function guessingGame() {
    const ANSWER = Math.floor(Math.random() *100);
    let numGuesses = 0;
    let guessed = false;

    return function guess(num){
    if (guessed) return "The game is over, you already won!"
    numGuesses++;
    if (num === ANSWER) {
        guessed = true;
        return `You win! You found ${num} in ${numGuesses} guesses`
    }
    if (num < ANSWER) return `${num} is too low!`;
    if (num > ANSWER) return `${num} is too hight!`;
    };

}

module.exports = { guessingGame };
