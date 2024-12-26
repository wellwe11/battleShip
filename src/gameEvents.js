const Player = require("./playerObj");
const { displayPlayersBoats } = require("./scripts");

const Game = () => {
  const playerOne = Player("jaja");
  const playerTwo = Player("jojo");

  return {
    playerOne,
    playerTwo,
    placeDeck: (...players) => {
      players.forEach((player) => {
        player.board.placeShip();
      });
    },
    viewBoats: (player, board) => displayPlayersBoats(player, board),
  };
};

const someGame = Game();

const playerOne = someGame.playerOne;
const boardOne = playerOne.board.board;

const playerTwo = someGame.playerTwo;
const boardTwo = playerTwo.board.board;

someGame.placeDeck(playerOne, playerTwo);
someGame.viewBoats("boardContainerOne", boardOne);
// someGame.viewBoats("boardContainerTwo", boardTwo);

document.querySelectorAll("#contentContainer > * > *").forEach((el) => {
  el.addEventListener("click", () => {
    if (!isNaN(el.textContent)) {
      playerTwo.board.receiveAttack(
        el,
        Number(el.textContent[0]),
        Number(el.textContent[1])
      );
      playerTwo.board.areShipsLeft();
    }
  });
});

console.log(boardTwo);
