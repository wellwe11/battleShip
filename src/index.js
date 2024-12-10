const Gameboard = require("./gameBoard");
const Player = require("./playerObj");
const { findIndex: findCoordinates, findAllTypes } = require("./scripts");

const Game = () => {
  const playerOne = Player("jaja");
  const playerTwo = Player("jojo");

  const placeDeck = (length, amount, ...players) => {
    // loop through each player
    players.forEach((player) => {
      // how many of each ship
      for (let i = 0; i < amount.length; i++) {
        // length for each specific boat
        for (let j = 0; j < amount[i]; j++) {
          let placed = false;
          while (!placed) {
            let x = player.randomNum();
            let y = player.randomNum();
            if (typeof findCoordinates(player.board.board, x, y) === "number") {
              player.board.placeShip(x, y, length[j]);
              placed = true;
            }
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

console.log(
  findAllTypes(
    "object",
    someGame.playerOne.board.board,
    someGame.playerTwo.board.board
  )
);

console.log(someGame.playerOne.board.board);
console.log(someGame.playerTwo.board.board);
