import {
  createBoard,
  addToCoordinate,
  findCordOfObject,
  findTypeOfItem,
  addItemToDeck,
} from "./scripts";
import { Ship } from "./boatObject";

export const Gameboard = (size) => {
  // crease a scalable board
  const board = createBoard(size);
  return {
    board,

    // add ship to specific coordinate
    placeShip: (cordOne, cordTwo, length) => {
      const boat = Ship(length);
      const boatcord = addToCoordinate(board, cordOne, cordTwo);
      addItemToDeck(board, cordOne, cordTwo, boat);
      return boatcord;
    },

    // gameboard receives click from opposing board
    receiveAttack: (index) => {
      const coords = findCordOfObject(index, size);
      return addItemToDeck(board, coords[0], coords[1], "hit");
    },

    // returns true if deck contains object
    areShipsLeft: () => (!findTypeOfItem(board, "object") ? false : true),
  };
};

// module.exports = Gameboard;
