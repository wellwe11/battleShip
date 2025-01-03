const Player = require("./playerObj");
const {
  displayPlayersBoats,
  changeBtnColor: hidePlayerBoats,
  loadForm,
  opponentSelector,
  userInputValue,
  submitClicked,
} = require("./scripts");

const {
  computerOptionChecked,
  playerGameLogic,
  playerTurn,
  toggleTurn,
  playerHitShip,
  noOneCanClick,
} = require("./gameEvents.scripts");

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
      }, 2000);
    },
    // display current players turns board with a timeout of 3 seconds
    displayCurrentBoard: (condition) => {
      let time = 3000;

      if (condition) {
        time = 0;
      }

      if (playerOne.turn === true) {
        setTimeout(() => {
          displayPlayersBoats("boardContainerOne", playerOne.board.board);
        }, time);
        hidePlayerBoats("boardContainerTwo", "gray", "green");
      } else if (playerOne.turn === false) {
        setTimeout(() => {
          displayPlayersBoats("boardContainerTwo", playerTwo.board.board);
        }, time);
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

    newTurn: (event, condition) => {
      let time = 3000;

      if (condition) {
        time = 0;
      }
      // if hit ship, players turn again
      playerHitShip(event, playerOne, playerTwo);
      // if miss, next players turn
      toggleTurn(playerOne, playerTwo);

      // new player turn with a cooldown to allow other player to look away in time
      noOneCanClick();

      console.log(time);
      // cooldown to prevent instant clicks
      setTimeout(() => {
        playerTurn(playerOne, playerTwo);
      }, time);
    },

    playerOne,
    playerTwo,
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
    someGame.newTurn();
    someGame.computerAttack();
  }
});

//---------------//---------------//---------------//---------------//---------------//---------------
