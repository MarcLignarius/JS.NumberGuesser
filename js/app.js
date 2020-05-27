// GAME FUNCTION:
// - Player must guess a number between a min and a max
// - Player gets a certain amount of guesses
// - Notify player of guess remaining
// - Notify player of correct answer if lose
// - Offer player to play again

// Game values
let min = 1,
  max = 10,
  winningNum = 2,
  guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessInput = document.querySelector('#guess-input'),
  guessBtn = document.querySelector('#guess-btn'),
  message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  // Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if correct
  else if (guess === winningNum) {
    // Game over - won

    gameOver(true, `${winningNum} is correct. YOU WIN!`);
  } else {
    // Check if incorrect
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game over
      isGameOver(false, `Game Over. Correct number was ${winningNum}.`);
    } else {
      // Game continues

      // Change border color
      guessInput.style.borderColor = 'red';

      // Set message
      setMessage(`${guess} is incorrect. ${guessesLeft} guesses left.`, 'red');

      // Clear input
      guessInput.value = '';
    }
  }
});

// Is game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  // Disable input
  guessInput.disabled;

  // Change border color
  guessInput.style.borderColor = color;

  // Set text color
  message.style.color = color;

  // Set message
  setMessage(msg);
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
