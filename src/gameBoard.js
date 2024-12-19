const {
  create2dArr: createBoard,
  findTypeOfItem,
  addItem: addItemToDeck,
  findIndex: findCoordinates,
  iterateTwoDArray: doesItFitInArray,
  addItems,
  iterateTwoDArray,
} = require("./scripts");

const Ship = require("./boatObject");

const Gameboard = (size) => {
  // increase a scalable board
  const board = createBoard(size);
  return {
    board,

    // add ship to specific coordinate
    placeShip: (cordOne, cordTwo, length, type) => {
      // create boat object
      const boat = Ship(length);

      addItems(board, cordOne, cordTwo, length, boat, type);
    },

    // gameboard receives click from opposing board
    receiveAttack: (cordOne, cordTwo) => {
      // target cell
      const attackedCell = findCoordinates(board, cordOne, cordTwo);

      // check if cell is a boat
      if (typeof attackedCell === "object") {
        addItemToDeck(board, cordOne, cordTwo, `${cordTwo} hit`);
        attackedCell.hit();
        if (attackedCell.hasSunk()) {
          addItemToDeck(board, cordOne, cordTwo, "sunk"); // locate sunken boats with string "sunk"
          return `${attackedCell} at ${[cordOne, cordTwo]} has sunk`;
        } else return `boat at ${[cordOne, cordTwo]} was hit`;

        // check if its not been hit before
      } else if (typeof attackedCell === "number") {
        return addItemToDeck(board, cordOne, cordTwo, "miss");
      }

      return "Cannot use hit on target: " + attackedCell; // if its been hit or some other error, return:
    },

    // returns true if deck contains object
    areShipsLeft: () => (!findTypeOfItem(board, "object") ? false : true),
  };
};

module.exports = Gameboard;
