const Gameboard = require("./gameBoard");
const Player = require("./playerObj");
const { findCoordinates } = require("./scripts");

const Game = () => {
  const playerOne = Player("jaja");
  const playerTwo = Player("jojo");

  const placeDeck = (length, amount, ...players) => {
    players.forEach((player) => {
      for (let i = 0; i < amount.length; i++) {
        for (let j = 0; j < amount[i]; j++) {
          console.log(amount[i], length[i]);
          let x = player.randomNum();
          let y = player.randomNum();
          if (typeof findCoordinates(player.board.board, x, y) === "number") {
            player.board.placeShip(x, y, length[j]);
          } else {
            console.log("taken");
          }
        }
      }
    });
  };

  return {
    playerOne,
    playerTwo,
    placeDeck,
  };
};

const someGame = Game();

const length = [5, 4, 3, 3, 2];
const amount = [1, 2, 3, 4, 5];

someGame.placeDeck(length, amount, someGame.playerOne, someGame.playerTwo);

console.log(someGame.playerOne.board.board);
console.log(someGame.playerTwo.board.board);
