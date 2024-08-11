function resetGame() {
  const [computerScoreElement, playerScoreElement] = getScoreElement();
  playerScore = 0;
  computerScore = 0;
  computerScoreElement.innerHTML = computerScore;
  playerScoreElement.innerHTML = playerScore;

  document.getElementById('gameBoard').style.display = 'block';
  const resultBoard = document.getElementById('resultBoard');
  resultBoard.style.display = 'none';
}

function timer() {
  clearInterval(countdownTimer);
  second = 15;
  const timerElement = document.querySelector('#timer');

  countdownTimer = setInterval(() => {
    if (second <= 0) {
      clearInterval(countdownTimer);
      countdownTimer = null;
      resetGame();
    } else {
      second--;
      timerElement.innerText = `⏱️ 00:${second}`;
    }
  }, 1000);
}

function getScoreElement() {
  const computerScoreElement = document.querySelector('#computerScore');
  const playerScoreElement = document.querySelector('#playerScore');

  return [computerScoreElement, playerScoreElement];
}

function calculateResult(playerChoice, computerChoice) {
  const result = document.querySelector('#result');

  const [computerScoreElement, playerScoreElement] = getScoreElement();

  if (playerChoice === computerChoice) {
    result.innerHTML = '⚖️';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors️' && computerChoice === 'paper')
  ) {
    playerScore += 1;
    playerScoreElement.innerHTML = playerScore.toString();
    result.innerHTML = '🏆';
  } else {
    computerScore += 1;
    computerScoreElement.innerHTML = computerScore.toString();
    result.innerHTML = '❌';
  }
}

function showChoicesOnResultBoard(playerChoice, computerChoice) {
  document.getElementById('gameBoard').style.display = 'none';

  // Show the player choice text
  const resultBoard = document.getElementById('resultBoard');
  resultBoard.style.display = 'block';

  let player = document.querySelector('#player');
  player.innerHTML = choices[playerChoice];

  let computer = document.querySelector('#computer');
  computer.innerHTML = choices[computerChoice];
  calculateResult(playerChoice, computerChoice);
}

function playGame(event) {
  const playerChoice = event.target.dataset.choice;

  const randomIndex = Math.floor(Math.random() * Object.keys(choices).length);
  const keys = Object.keys(choices);
  const computerChoice = keys[randomIndex];

  showChoicesOnResultBoard(playerChoice, computerChoice);
}

const paperChoice = document.querySelector('#player-choice-paper');
if (paperChoice) {
  paperChoice.addEventListener('click', playGame);
  paperChoice.addEventListener('click', timer);
}

const rockChoice = document.querySelector('#player-choice-rock');
if (rockChoice) {
  rockChoice.addEventListener('click', playGame);
  rockChoice.addEventListener('click', timer);
}

const scissorChoice = document.querySelector('#player-choice-scissors');
if (scissorChoice) {
  scissorChoice.addEventListener('click', playGame);
  scissorChoice.addEventListener('click', timer);
}

let resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', resetGame);

const choices = {
  paper: '🤚🏻',
  rock: '👊🏻',
  scissors: '✌🏻',
};
let second = 15;
let countdownTimer;
let computerScore = 0;
let playerScore = 0;
