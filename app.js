function getComputerChoice() {
  const random = Math.random();
  let result = "scissors";
  if (random <= 0.33) result = "rock";
  else if (random <= 0.66) result = "paper";
  return result;
}

function getPlayerChoice() {
  let result = prompt("Pick one: Rock, Paper, Scissors", "rock");
  result = result.trim().toLowerCase();
  if (result !== "rock" || result !== "paper" || result !== "scissors") result = "rock";
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

let score = [0, 0];
function game() {
  let result;
  for (let i = 0; i < 5; i++) {
    console.log("Round " + (i + 1));
    const result = play(getPlayerChoice(), getComputerChoice());
    console.log(result[0]);
    const scoreIndex = result[1] - 1;
    score[scoreIndex] += 1;
    console.log("");
  }
  result = "Draw! Scores: " + score[0] + " - " + score[1] + " of 5 rounds";
  if (score[0] > score[1]) {
    result = "You win by " + score[0] + " - " + score[1] + " of 5 rounds";
  } else {
    result = "You lose by " + score[1] + " - " + score[0] + " of 5 rounds";
  }
  return result;
}

console.log("Final result: " + game());
