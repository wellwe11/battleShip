const Player = require("./playerObj");
const {
  displayPlayersBoats,
  hidePlayerBoats,
  loadForm,
  opponentSelector,
  userInputValue,
  submitClicked,
  computerOptionChecked,
  playerGameLogic,
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

  console.log(playerOne, playerTwo);

  playerGameLogic(
    "#boardContainerOne > *",
    playerOne,
    someGame.playerTwoAttacks
  );
  playerGameLogic(
    "#boardContainerTwo > *",
    playerTwo,
    someGame.playerOneAttacks
  );

  if (document.getElementById("computerOption").checked) {
    computerOptionChecked(someGame);
    playerTwo.board.areShipsLeft();
  }
});
