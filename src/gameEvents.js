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
  toggleTurn,
  playerHitShip,
  noOneCanClick,
} = require("./scripts");

const Game = () => {
  // enforce always to players
  const playerOne = Player(userInputValue("#nameOne"));
  const playerTwo = Player(userInputValue("#nameTwo") || "Computer");

  // pre-determined turn
  playerOne.turn = false;
  playerTwo.turn = true;

  // place decks for each player
  const placeDeck = (...players) => {
    players.forEach((player) => {
      player.board.placeShip();
    });
  };
  placeDeck(playerOne, playerTwo);

  // connects buttons to arrays. I.e button 32 is clicked, compared matching array cell
  playerGameLogic("#boardContainerTwo > *", playerTwo.board.receiveAttack);
  playerGameLogic("#boardContainerOne > *", playerOne.board.receiveAttack);

  return {
    // enforce player ones board at start to be viewable after 3 seconds
    viewBoardStart: () => {
      setTimeout(() => {
        displayPlayersBoats("boardContainerOne", playerOne.board.board);
      }, 3000);
    },
    // display current players turns board with a timeout of 3 seconds
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

    // constantly display player boats as changing isn't needed
    displayVsComputer: () => {
      displayPlayersBoats("boardContainerOne", playerOne.board.board);
    },

    // random attack on player board
    computerAttack: () => {
      computerOptionChecked(playerOne.board.receiveAttack);
    },

    newTurn: (event) => {
      // if hit ship, players turn again
      playerHitShip(event, playerOne, playerTwo);
      // if miss, next players turn
      toggleTurn(playerOne, playerTwo);

      // new player turn with a cooldown to allow other player to look away in time
      noOneCanClick();

      // cooldown to prevent instant clicks
      setTimeout(() => {
        playerTurn(playerOne, playerTwo);
      }, 3000);
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
    someGame.viewBoardStart();
    document.querySelectorAll("#contentContainer > * > *").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        someGame.newTurn(event.target);
        someGame.displayCurrentBoard();
      });
    });
  } else if (document.getElementById("computerOption").checked) {
    someGame.displayVsComputer();
    someGame.newTurn();
    someGame.computerAttack();

    document.querySelectorAll("#boardContainerTwo > *").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        if (event) {
          document.querySelectorAll("#boardContainerTwo > *").forEach((btn) => {
            btn.style.pointerEvents = "none";
          });
          setTimeout(() => {
            document
              .querySelectorAll("#boardContainerTwo > *")
              .forEach((btn) => {
                btn.style.pointerEvents = "auto";
              });
          }, 3000);
        }
      });
    });
  }
});

//---------------//---------------//---------------//---------------//---------------//---------------
