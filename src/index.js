const Player = require("./playerObj");
const {
  findIndex: findCoordinates,
  returnFoundItems,
  addItem: addItemToDeck,
  checkArrayForNumbers,
  checkVerticalSpace,
} = require("./scripts");

const Game = () => {
  const playerOne = Player("jaja");
  const playerTwo = Player("jojo");

  // create deck of random boats for each player
  const placeDeck = (...players) => {
    // length each type of boat has
    const length = [5, 4, 3, 3, 2];

    // amount of boats
    const amount = [1, 2, 3, 4, 5];

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

const playerOne = someGame.playerOne;
const boardOne = playerOne.board.board;

const playerTwo = someGame.playerTwo;
const boardTwo = playerTwo.board.board;

someGame.placeDeck(playerOne, playerTwo);

returnFoundItems(
  (cordOne, cordTwo) => {
    const boat = findCoordinates(boardOne, cordOne, cordTwo);
    let boatLength = boat.boatLength;

    checkArrayForNumbers(boardOne, cordOne, cordTwo, boatLength);
    checkVerticalSpace(boardOne, cordOne, cordTwo, boatLength);
  },

  (cordOne, cordTwo) => {},
  boardOne,
  boardTwo
);

console.log(
  playerOne.board.receiveAttack(1, 5),
  playerOne.board.receiveAttack(1, 6),
  playerOne.board.receiveAttack(1, 7),
  playerOne.board.receiveAttack(1, 8),
  playerOne.board.receiveAttack(1, 9)
);

console.table(boardOne);
// console.log(someGame.playerTwo.board.board);
