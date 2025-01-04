const { Game } = require("./gameEvents");

const { loadForm, opponentSelector, submitClicked } = require("../form/form");

// event listeners for form
document.addEventListener("DOMContentLoaded", () => loadForm());

document
  .getElementById("computerOption")
  .addEventListener("click", () => opponentSelector().vsComputer());

document
  .getElementById("playerOption")
  .addEventListener("click", () => opponentSelector().vsPlayer());

document.getElementById("submitBtn").addEventListener("click", (event) => {
  submitClicked(event);
  const someGame = Game();

  if (document.getElementById("playerOption").checked) {
    someGame.viewBoardStart();
    document.querySelectorAll("#contentContainer > * > *").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        // !!!!seperate logic from handlers!!!!
        if (
          event.target.textContent === "hit" ||
          event.target.textContent === "sunk"
        ) {
          someGame.newTurn(event.target, true);
          someGame.displayCurrentBoard(true);
        } else {
          someGame.newTurn(event.target);
          someGame.displayCurrentBoard();
        }
      });
    });
  } else if (document.getElementById("computerOption").checked) {
    someGame.displayVsComputer();
    someGame.computerAttack();
  }
});
