// Selecting the elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const rules = document.querySelector('.rules')

// Setting the initial values
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

function switchPlayer() {
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    document.getElementById(`current--${activePlayer}`).textContent = 0;//DRY1
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
}

// Roll the dice functionality
btnRoll.addEventListener('click', function () {
    rules.classList.add('hidden');
    if (playing) {
        // Generate random dice
        const dice = Math.trunc(Math.random() * 6) + 1;
        // Display rolled dice
        diceEl.classList.remove('hidden');
        diceEl.src = `./assets/dice-${dice}.png`;

        // Check if rolled value is 1
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore; //DRY1
        // Switch player
        } else {
            switchPlayer();
        }
    }
})

// Hold score & end game functionality
btnHold.addEventListener('click', function () {
    if(playing) {
        // Save current score to active player's total score
        diceEl.classList.add('hidden');
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]; //DRY1
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
            document.querySelector(`.player--${activePlayer}`).insertAdjacentHTML('afterbegin', "<h1 class='current'>You Won!</h1>")
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player-active`);
        } else {
            // If total score is not enough, switch player
            switchPlayer();
        }
    }
})

// Refresh page functionality
btnNew.addEventListener('click', function() {location.reload()});
