import { createBoard } from "./scripts";
import Ship from "./boatObject";

const Gameboard = (size) => {
  const board = createBoard(size);

  return {
    board,

    placeShip: (cord, size) => {
      let boat = Ship(size);
      board.forEach((arr) => {
        arr.forEach((cell) => {
          if (cell === cord) return cell;
        });
      });
    },
  };
};

module.exports = Gameboard;
