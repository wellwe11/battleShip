const Player = require("./playerObj");
const {
  displayPlayersBoats,
  hidePlayerBoats,
  loadForm,
  opponentSelector,
  userInputValue,
  submitClicked,
} = require("./scripts");

const Game = () => {
  const playerOne = Player(userInputValue("#nameOne"));
  const playerTwo = Player(userInputValue("#nameTwo") || "Computer");

  const placeDeck = (...players) => {
    players.forEach((player) => {
      player.board.placeShip();
    });
  };

  return {
    playerOne,
    playerOneAttacks: (el, cordOne, cordTwo) =>
      playerTwo.board.receiveAttack(el, cordOne, cordTwo),
    playerOneViewBoats: () =>
      displayPlayersBoats("boardContainerOne", playerOne.board.board),
    playerOneHideBoats: () => hidePlayerBoats("boardContainerOne", "green"),

    playerTwo,
    playerTwoAttacks: (el, cordOne, cordTwo) =>
      playerOne.board.receiveAttack(el, cordOne, cordTwo),
    playerTwoViewBoats: () =>
      displayPlayersBoats("boardContainerTwo", playerTwo.board.board),
    playerTwoHideBoats: () => hidePlayerBoats("boardContainerOne", "green"),

    placeDecks: () => placeDeck(playerOne, playerTwo),
  };
};

document.addEventListener("DOMContentLoaded", () => loadForm());

document
  .getElementById("computerOption")
  .addEventListener("click", () => opponentSelector().vsComputer());

document
  .getElementById("playerOption")
  .addEventListener("click", () => opponentSelector().vsPlayer());

//---------------//---------------//---------------//---------------//---------------//---------------

document.getElementById("submitBtn").addEventListener("click", (event) => {
  submitClicked(event);

  const someGame = Game();
  someGame.placeDecks();
  someGame.playerOneViewBoats();

  const playerOne = someGame.playerOne;
  const playerTwo = someGame.playerTwo;
  playerOne.turn = true;
  playerTwo.turn = false;

  document.querySelectorAll("#boardContainerOne > *").forEach((el) => {
    el.addEventListener("click", () => {
      if (!isNaN(el.textContent)) {
        someGame.playerOneAttacks(
          el,
          Number(el.textContent[0]),
          Number(el.textContent[1])
        );
        playerTwo.board.areShipsLeft();
      }
    });
  });

  // if option is vs computer
  // if vs player, make a 3 second countdown, and display instead second persons board
  document.querySelectorAll("#boardContainerTwo > *").forEach((el) => {
    el.addEventListener("click", () => {
      if (!isNaN(el.textContent)) {
        someGame.playerOneAttacks(
          el,
          Number(el.textContent[0]),
          Number(el.textContent[1])
        );
        playerTwo.board.areShipsLeft();

        if (document.getElementById("computerOption").checked) {
          let attacked = false;

          while (!attacked) {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);

            document
              .querySelectorAll("#boardContainerOne > *")
              .forEach((el) => {
                if (Number(el.textContent) === Number([x, y].join(""))) {
                  someGame.playerTwoAttacks(el, x, y);
                  playerTwo.board.areShipsLeft();
                  attacked = true;
                }
              });
          }
        } else if (document.getElementById("playerOption").checked) {
          // code
        }
      }
    });
  });
});
