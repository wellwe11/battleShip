const {
  create2dArr: createBoard,
  findTypeOfItem,
  addItem: addItemToDeck,
  findIndex: findCoordinates,
  iterateTwoDArray: doesItFitInArray,
  addItems,
  iterateTwoDArray,
  updateBoard,
  findAllTypes,
} = require("./scripts");

const Ship = require("./boatObject");

const Gameboard = (size) => {
  // increase a scalable board
  const board = createBoard(size);

  return {
    board,

    // function to add boats randomly to their board
    placeShip: () => {
      // boats to be placed and their respective length
      const amount = [2, 2, 2, 3, 3, 3, 4, 4, 5];

      for (let i = 0; i < amount.length; i++) {
        // create a boat for each loop
        const boat = Ship(amount[i]);

        let placed = false;
        while (!placed) {
          // random coordinates
          let x = Math.floor(Math.random() * 10);
          let y = Math.floor(Math.random() * 10);

          // check if boat with relevant length fits on current coordinates
          const spaceToRight = iterateTwoDArray(board, x, y, amount[i], "row"); // row
          const spaceBelow = iterateTwoDArray(board, y, x, amount[i], "column"); // column

          if (spaceToRight) {
            addItems(board, x, y, boat.boatLength, boat, "row");
            placed = true;
          } else if (!spaceToRight && spaceBelow) {
            addItems(board, y, x, boat.boatLength, boat, "column");
            placed = true;
          }
        }
      }
    },

    // gameboard receives click from opposing board
    receiveAttack: (obj, cordOne, cordTwo) => {
      // target cell
      let attackedCell = board[cordOne][cordTwo];

      // check if cell is a boat
      if (typeof attackedCell === "object") {
        obj.textContent = "hit";
        obj.style.backgroundColor = "red";

        attackedCell.hit();

        if (attackedCell.hasSunk()) {
          for (let i = 0; i < board[cordOne].length; i++) {
            for (let j = 0; j < board[i].length; j++) {
              if (board[i][j] === attackedCell) {
                board[i][j] = "sunk";
              }
            }
          }

          for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
              if (board[i][j] === "sunk") {
                obj.parentElement.querySelectorAll("*").forEach((btn) => {
                  let btnIdNr = btn.id.replace(/\D/g, "");

                  if (Number(btnIdNr) === Number([i, j].join(""))) {
                    btn.textContent = "sunk";
                  }
                });
                console.log(i, j);
              }
            }
          }
          console.log(board);
        } else console.log(`boat at ${[cordOne, cordTwo]} was hit`);

        // check if its not been hit before
      } else if (typeof attackedCell === "number") {
        obj.textContent = "miss";
        obj.style.backgroundColor = "white";
        return addItemToDeck(board, cordOne, cordTwo, "miss");
      }

      return "Cannot use hit on target: " + attackedCell; // if its been hit or some other error, return:
    },

    // returns true if deck contains object
    areShipsLeft: () => (!findTypeOfItem(board, "object") ? false : true),
  };
};

module.exports = Gameboard;
