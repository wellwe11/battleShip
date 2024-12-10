const {
  create2dArr: createBoard,
  findTypeOfItem,
  addItem: addItemToDeck,
  findIndex: findCoordinates,
} = require("./scripts");

const Ship = require("./boatObject");

const Gameboard = (size) => {
  // increase a scalable board
  const board = createBoard(size, 1);
  return {
    board,

    // add ship to specific coordinate
    placeShip: (cordOne, cordTwo, length) => {
      // create boat object
      const boat = Ship(length);

      // find matching cell on 2d array to place boat
      const boatcord = findCoordinates(board, cordOne, cordTwo);

      // place boat on matching coordinates
      if (typeof boatcord === "number")
        return addItemToDeck(board, cordOne, cordTwo, boat);
      return `${cordOne} & ${cordTwo} is taken: object`;
    },

    // gameboard receives click from opposing board
    receiveAttack: (cordOne, cordTwo) => {
      // target cell
      const attackedCell = findCoordinates(board, cordOne, cordTwo);

      // check if cell is a boat
      if (typeof attackedCell === "object") {
        attackedCell.hit();
        if (attackedCell.hasSunk()) {
          addItemToDeck(board, cordOne, cordTwo, "sunk"); // locate sunken boats with string "sunk"
          return `boat at ${[cordOne, cordTwo]} has sunk`;
        } else return `boat at ${[cordOne, cordTwo]} was hit`;

        // check if its not been hit before
      } else if (typeof attackedCell === "number") {
        return addItemToDeck(board, cordOne, cordTwo, "hit");
      }

      return "Cannot use hit on target: " + attackedCell; // if its been hit or some other error, return:
    },

    // returns true if deck contains object
    areShipsLeft: () => (!findTypeOfItem(board, "object") ? false : true),
  };
};

module.exports = Gameboard;
