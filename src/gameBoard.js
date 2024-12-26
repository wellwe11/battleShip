const {
  create2dArr: createBoard,
  findTypeOfItem,
  addItem: addItemToDeck,
  targetHit: boatHit,
  targetHit: boatMiss,
  changeButtonSunk: btnSunk,
  changeObjButtonsSunk: objectSunk,
  addObjectsTo2dArray: createDeck,
} = require("./scripts");

const Ship = require("./boatObject");

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
      // cell matching clicked button
      let attackedCell = board[cordOne][cordTwo];
      console.log(board);

      // check if cell is a boat
      if (typeof attackedCell === "object") {
        console.log(obj.parentElement);
        // change color/text of btn
        boatHit(obj, "hit", "red");
        // change objects values
        attackedCell.hit();

        if (attackedCell.hasSunk()) {
          // change last button clicked to sunk
          btnSunk(board, cordOne, attackedCell, "sunk");
          // find matching buttons to object and change sunk as well
          objectSunk(board, obj, "sunk");
        } else console.log(`boat at ${[cordOne, cordTwo]} was hit`);

        // check if its not been hit before
      } else if (typeof attackedCell === "number") {
        // change color/text of btn
        boatMiss(obj, "miss", "white");
        return addItemToDeck(board, cordOne, cordTwo, "miss");
      }
    },

    // returns true if deck contains object
    areShipsLeft: () =>
      !findTypeOfItem(board, "object") ? console.log(false) : console.log(true),
  };
};

module.exports = Gameboard;
