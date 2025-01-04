const {
  addItem: addItemToDeck,
  targetHit: boatHit,
  targetHit: boatMiss,
  boardObjectSunk,
  boardButtonsSunk,
  addObjectsTo2dArray: createDeck,
} = require("./gameBoard.scripts");

const { create2dArr: createBoard, findTypeOfItem } = require("../scripts");

const Ship = require("../boatObject/boatObject");

const Gameboard = (size) => {
  // create board
  const board = createBoard(size);

  return {
    board,

    //  add boats random positions to board
    placeShip: () => {
      createDeck(Ship, board);
    },

    // gameboard receives click from opposing board
    receiveAttack: (obj, cordOne, cordTwo) => {
      // target array item
      let attackedCell = board[cordOne][cordTwo];

      // check if cell is a boat
      if (typeof attackedCell === "object") {
        // change color/text of btn
        boatHit(obj, "hit", "red");

        attackedCell.hit();

        if (attackedCell.hasSunk()) {
          // change cells content to sunk
          boardObjectSunk(board, cordOne, attackedCell, "sunk");
          // find matching buttons to object and change sunk as well
          boardButtonsSunk(board, obj, "sunk");
          console.log(board);
        }

        // check if its not been hit before
      } else if (typeof attackedCell === "number") {
        // change color/text of btn
        boatMiss(obj, "miss", "white");
        // change value of board to miss
        addItemToDeck(board, cordOne, cordTwo, "miss");
      }
    },

    // returns true if deck contains object
    areShipsLeft: () =>
      !findTypeOfItem(board, "object") ? console.log(false) : console.log(true),
  };
};

module.exports = Gameboard;
