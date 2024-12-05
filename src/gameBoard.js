import { createBoard } from "./scripts";
import Ship from "./boatObject";

const Gameboard = (size) => {
  // crease a scalable board
  const board = createBoard(size);

  return {
    board,

    // add ship to specific coordinate
    placeShip: (cord, size) => {
      // create new boat
      let boat = Ship(size);
      let msg;

      // place boat on specified location
      board.forEach((row) => {
        row.forEach((cell, index) => {
          if (cell === cord && typeof cell !== "object") {
            row[index] = boat;
            msg = `Boat placed at ${cord}`;
          } else msg = "Place boat elsewhere";
        });
      });
      return msg;
    },

    // cordOne = row, cordTwo = collumn
    receiveAttack: (cordOne, cordTwo) => {
      let result;
      board.forEach((row, rowIndex) => {
        return row.forEach((cell, colIndex) => {
          if (rowIndex === cordOne && colIndex === cordTwo) {
            if (typeof cell !== "number") {
              cell.hit();
              result = "boat has been hit";
            } else {
              row[colIndex] = "miss";
              result = "miss";
            }
          }
        });
      });
      return result;
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

const someBoard = Gameboard(3);

module.exports = Gameboard;
