const Player = require("./playerObj");
const { iterateTwoDArray } = require("./scripts");

const Game = () => {
  const playerOne = Player("jaja");
  const playerTwo = Player("jojo");

  const amount = [2, 2, 2, 3, 3, 3, 4, 4, 5];
  // create deck of random boats for each player
  const placeDeck = (...players) => {
    // amount of boats

    // loop through each player
    players.forEach((player) => {
      let attempts = 0;
      // how many of each ship
      for (let i = 0; i < amount.length; i++) {
        // length for each specific boat
        let placed = false;

        while (!placed && attempts < 1000) {
          attempts++;
          let x = player.randomNum();
          let y = player.randomNum();

          const spaceToRight = iterateTwoDArray(
            player.board.board,
            x,
            y,
            amount[i],
            "row"
          );

          const spaceBelow = iterateTwoDArray(
            player.board.board,
            x,
            y,
            amount[i],
            "column"
          );

          if (spaceToRight) {
            player.board.placeShip(x, y, amount[i], "row");
            placed = true;
          } else if (!spaceToRight && spaceBelow) {
            player.board.placeShip(y, x, amount[i], "column");
            placed = true;
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

//

// console.log(
//   playerOne.board.receiveAttack(1, 5),
//   playerOne.board.receiveAttack(1, 6),
//   playerOne.board.receiveAttack(1, 7),
//   playerOne.board.receiveAttack(1, 8),
//   playerOne.board.receiveAttack(1, 9)
// );

console.log(boardOne);

let boatCoordinates;
let divCoordinates;

document.querySelectorAll("#boardContainerOne > *").forEach((div) => {
  if (
    typeof boardOne[Number(div.textContent[0])][Number(div.textContent[1])] ===
    "object"
  ) {
    div.style.backgroundColor = "gray";
    div.textContent =
      boardOne[Number(div.textContent[0])][
        Number(div.textContent[1])
      ].boatLength;
  }
});
