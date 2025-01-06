const { Game } = require("./gameEvents");

const { loadForm, opponentSelector, submitClicked } = require("../form/form");
const {
  changePlayerBoard,
  previewBoard,
} = require("../gameBoard/gameBoard.scripts");

const someGame = Game();

// event listeners for form
document.addEventListener("DOMContentLoaded", () => loadForm());

document.getElementById("computerOption").addEventListener("click", () => {
  document.getElementById("checkPlayerTwo").setAttribute("disabled", true);
  opponentSelector().vsComputer();
});

document.getElementById("playerOption").addEventListener("click", () => {
  document.getElementById("checkPlayerTwo").removeAttribute("disabled");
  opponentSelector().vsPlayer();
});

// randomize player ones board
document.getElementById("checkPlayerOne").addEventListener("click", (event) => {
  if (document.getElementById("checkPlayerOne").checked) {
    document.getElementById("newFleetSetup").removeAttribute("disabled");
  } else if (
    !document.getElementById("checkPlayerOne").checked &&
    !document.getElementById("checkPlayerTwo").checked
  ) {
    document.getElementById("newFleetSetup").setAttribute("disabled", true);
  }

  previewBoard("boardContainerOne", someGame.playerOne.board.board, event);
  document
    .getElementById("newFleetSetup")
    .addEventListener("click", (event) => {
      event.preventDefault();
      changePlayerBoard(
        "boardContainerOne",
        event,
        someGame.createDeck,
        "playerOne",
        someGame.playerOne.board.board
      );
    });
});

// randomize players two board
document.getElementById("checkPlayerTwo").addEventListener("click", (event) => {
  if (document.getElementById("checkPlayerTwo").checked) {
    document.getElementById("newFleetSetup").removeAttribute("disabled");
  } else if (
    !document.getElementById("checkPlayerOne").checked &&
    !document.getElementById("checkPlayerTwo").checked
  ) {
    document.getElementById("newFleetSetup").setAttribute("disabled", true);
  }

  previewBoard("boardContainerTwo", someGame.playerTwo.board.board, event);
  document
    .getElementById("newFleetSetup")
    .addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById("newFleetSetup").removeAttribute("disabled");
      changePlayerBoard(
        "boardContainerTwo",
        event,
        someGame.createDeck,
        "playerTwo",
        someGame.playerTwo.board.board
      );
    });
});

document.getElementById("submitBtn").addEventListener("click", (event) => {
  submitClicked(event);
  someGame.displayCurrentBoard(true);

  if (
    !someGame.playerOne.board.board.some((item) =>
      item.some((cell) => typeof cell === "object")
    )
  ) {
    someGame.createDeck("playerOne");
  }

  if (
    !someGame.playerTwo.board.board.some((item) =>
      item.some((cell) => typeof cell === "object")
    )
  ) {
    someGame.createDeck("playerTwo");
  }

  if (document.getElementById("playerOption").checked) {
    let playerTwoScore = 0;
    let playerOneScore = 0;
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

          if (event.target.textContent === "sunk") {
            if (event.target.parentElement.id === "boardContainerOne") {
              playerTwoScore++;
              document.getElementById("scoreTwo").textContent =
                playerTwoScore > 8 ? "player two wins!" : playerTwoScore;
            } else if (event.target.parentElement.id === "boardContainerTwo") {
              playerOneScore++;
              document.getElementById("scoreOne").textContent =
                playerOneScore > 8 ? "player one wins!" : playerOneScore;
            }
          }
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
