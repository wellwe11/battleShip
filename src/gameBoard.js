import {
  createBoard,
  findCoordinate,
  findCordWithNoNr,
  replaceNew,
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
      const boatcord = findCoordinate(board, cordOne, cordTwo);
      replaceNew(board, cordOne, cordTwo, boat);
      return boatcord;
    },

    receiveAttack: (index) => {
      const boat = findCordWithNoNr(board, index, size);
      return boat;
      // return replaceNew(cordOne, cordTwo, "hit");
    },

    areShipsLeft: () => {
      let num = 0;
      board.forEach((row) => {
        row.forEach((_, index) => {
          if (typeof row[index] === "object") {
            num++;
          }
        });
      });
      if (num === 0) return "All ships have been sunk";
      else return num;
    },
  };
};

// module.exports = Gameboard;
