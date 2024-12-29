const Player = require("./playerObj");
const {
  displayPlayersBoats,
  changeBtnColor: hidePlayerBoats,
  loadForm,
  opponentSelector,
  userInputValue,
  submitClicked,
  computerOptionChecked,
  playerGameLogic,
  playerTurn,
} = require("./scripts");

const Game = () => {
  const playerOne = Player(userInputValue("#nameOne"));
  const playerTwo = Player(userInputValue("#nameTwo") || "Computer");

  playerOne.turn = true;
  playerTwo.turn = false;

  const placeDeck = (...players) => {
    players.forEach((player) => {
      player.board.placeShip();
    });
  };
  placeDeck(playerOne, playerTwo);

  const currentPlayer = playerTurn(playerOne, playerTwo);

  playerGameLogic("#boardContainerTwo > *", playerTwo.board.receiveAttack);
  playerGameLogic("#boardContainerOne > *", playerOne.board.receiveAttack);

  return {
    displayCurrentBoard: () => {
      if (playerOne.turn === true) {
        setTimeout(() => {
          displayPlayersBoats("boardContainerOne", playerOne.board.board);
        }, 3000);
        hidePlayerBoats("boardContainerTwo", "gray", "green");
      } else if (playerOne.turn === false) {
        setTimeout(() => {
          displayPlayersBoats("boardContainerTwo", playerTwo.board.board);
        }, 3000);
        hidePlayerBoats("boardContainerOne", "gray", "green");
      }
    },

    displayVsComputer: () => {
      displayPlayersBoats("boardContainerOne", playerOne.board.board);
    },

    computerAttack: () => computerOptionChecked(playerOne.board.receiveAttack),

    newTurn: () => {
      currentPlayer.changePlayerTurn(), currentPlayer.clickableBoard();
    },
  };
};

//---------------//---------------//---------------//---------------//---------------//---------------
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
    someGame.newTurn();
    someGame.displayCurrentBoard();
    document.querySelectorAll("#contentContainer > * > *").forEach((btn) => {
      btn.addEventListener("click", () => {
        someGame.newTurn();
        someGame.displayCurrentBoard();
      });
    });
  } else if (document.getElementById("computerOption").checked) {
    someGame.displayVsComputer();
    someGame.newTurn();
    someGame.computerAttack();
  }
});

//---------------//---------------//---------------//---------------//---------------//---------------
