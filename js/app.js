// GAME FUNCTION:
// - Player must guess a number between a min and a max
// - Player gets a certain amount of guesses
// - Notify player of guess remaining
// - Notify player of correct answer if lose
// - Offer player to play again

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
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

// Play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

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
      gameOver(false, `Game Over. Correct number was ${winningNum}.`);
    } else {
      // Game continues

      // Change border color
      guessInput.style.border = 'medium solid red';

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
  won === true
    ? ((borderStyle = 'medium solid green'), (color = 'green'))
    : ((borderStyle = 'medium solid red'), (color = 'red'));
  // Disable input
  guessInput.disabled = true;

  // Change border color
  guessInput.style.border = borderStyle;

  // Set text color
  message.style.color = color;

  // Set message
  setMessage(msg);

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
