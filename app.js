//#region Element references
const btnRock = document.getElementById("btnRock");
const btnPaper = document.getElementById("btnPaper");
const btnScissors = document.getElementById("btnScissors");
const scorePlayer = document.getElementById("scorePlayer");
const scoreComputer = document.getElementById("scoreComputer");
const gameOverEl = document.getElementById("gameOver");
const roundInfoEl = document.getElementById("roundInfo");
const restartButton = document.getElementById("restartButton");
//#endregion

//#region Variables
let score = [0, 0];
let done = false;
//#endregion

//#region Game logic
function getComputerChoice() {
  const random = Math.random();
  let result = "scissors";
  if (random <= 0.33) result = "rock";
  else if (random <= 0.66) result = "paper";
  return result;
}

function getPlayerChoice(choice) {
  let result;
  if (choice) result = choice;
  else result = prompt("Pick one: Rock, Paper, Scissors", "rock");
  result = result.trim().toLowerCase();
  if (result !== "rock" && result !== "paper" && result !== "scissors") result = "rock";
  return result;
}

function getWinner(choice1, choice2) {
  let winner = 0;
  if (choice1 === choice2) {
    return winner;
  }
  if (choice1 === "rock") {
    if (choice2 === "paper") {
      winner = 2;
    } else {
      winner = 1;
    }
  } else if (choice1 === "paper") {
    if (choice2 === "rock") {
      winner = 1;
    } else {
      winner = 2;
    }
  } else {
    if (choice2 === "rock") {
      winner = 2;
    } else {
      winner = 1;
    }
  }
  return winner;
}

function handleScore(result) {
  const scoreIndex = result[1] - 1;
  if (scoreIndex < 0 && scoreIndex > score.length) return;
  score[scoreIndex] += 1;
}
//#endregion

//#region Game
function play(choice1, choice2) {
  let winner = getWinner(choice1, choice2);
  let result = "Draw! Both chosen " + choice1;
  if (winner === 1) {
    result = "You win! " + choice1 + " beats " + choice2 + ".";
  } else if (winner === 2) {
    result = "You lose! " + choice2 + " beats " + choice1 + ".";
  }
  return [result, winner];
}
//#endregion

//#region UI logic
function updateUI(score, roundResult, done) {
  scorePlayer.textContent = score[0];
  scoreComputer.textContent = score[1];
  roundInfoEl.textContent = roundResult ? roundResult[0] : "Choose one";
  gameOverEl.style.display = done ? "flex" : "none";
}
//#endregion

//#region Event handlers
function clickHandler(choice) {
  if (done) return;
  const roundResult = play(getPlayerChoice(choice), getComputerChoice());
  handleScore(roundResult);
  if (score[0] >= 5 || score[1] >= 5) {
    done = true;
  }
  updateUI(score, roundResult, done);
}
//#endregion

//#region Event subscription
btnRock.addEventListener("click", clickHandler.bind(null, "rock"));
btnPaper.addEventListener("click", clickHandler.bind(null, "paper"));
btnScissors.addEventListener("click", clickHandler.bind(null, "scissors"));
restartButton.addEventListener("click", () => {
  score = [0, 0];
  done = false;
  updateUI(score, null, done);
});
//#endregion
