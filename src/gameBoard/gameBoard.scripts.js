const { displayPlayersBoats } = require("../gameEvents/gameEvents.scripts");

// replace cell with argument. I.e. object/string/number
const addItem = (board, cordOne, cordTwo, arg) => {
  board[cordOne][cordTwo] = arg;
};

// hit/miss handler for boards buttons
const targetHit = (element, text, color) => {
  element.textContent = text;
  element.style.backgroundColor = color;
};

// find out what each click returns. I.e. a boat or empty cell
const iterateTwoDArray = (array, indexOne, indexTwo, itemslength, type) => {
  // exit early if last item is alreay taken
  if (typeof array[indexOne][indexTwo] === "object") {
    return false;
  }

  if (indexTwo + itemslength > array[indexOne].length - 1) {
    return false;
  }

  if (type === "row") {
    for (let i = indexTwo; i <= indexTwo + itemslength; i++) {
      if (typeof array[indexOne][i] !== "number") {
        return false;
      }
    }
  }

  if (type === "column") {
    for (let i = indexTwo; i <= indexTwo + itemslength; i++) {
      if (typeof array[i][indexOne] !== "number") {
        return false;
      }
    }
  }

  return true;
};

// find & change specific cells value
const boardObjectSunk = (array, row, condition, arg) => {
  for (let i = 0; i < array[row].length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === condition) {
        array[i][j] = arg;
      }
    }
  }
};

// find matching arguments and replace cells with same object with argument
const boardButtonsSunk = (array, el, arg) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === arg) {
        el.parentElement.querySelectorAll("*").forEach((btn) => {
          let btnIdNr = Number(btn.id.replace(/\D/g, ""));

          if (btnIdNr === Number([i, j].join(""))) {
            btn.textContent = arg;
          }
        });
      }
    }
  }
};

// places a boat in cells between two indexes if they are avaliable and within the array
const addItems = (array, indexOne, indexTwo, itemslength, arg, type) => {
  if (type === "row") {
    for (let i = indexTwo; i < indexTwo + itemslength; i++) {
      array[indexOne][i] = arg;
    }
  }

  if (type === "column") {
    for (let i = indexTwo; i < indexTwo + itemslength; i++) {
      array[i][indexOne] = arg;
    }
  }
};

// checks & adds objects over several cells, in random position
const addObjectsTo2dArray = (object, array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      array[i][j] = j;
    }
  }
  const createBoard = () => {
    // boats to be placed and their respective length
    const amount = [2, 2, 2, 3, 3, 3, 4, 4, 5];

    for (let i = 0; i < amount.length; i++) {
      // create a boat for each loop
      const boat = object(amount[i]);

      let placed = false;
      while (!placed) {
        // random coordinates
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);

        // check if boat with relevant length fits on current coordinates
        const spaceToRight = iterateTwoDArray(array, x, y, amount[i], "row"); // row
        const spaceBelow = iterateTwoDArray(array, y, x, amount[i], "column"); // column

        if (spaceToRight) {
          addItems(array, x, y, boat.boatLength, boat, "row");
          placed = true;
        } else if (!spaceToRight && spaceBelow) {
          addItems(array, y, x, boat.boatLength, boat, "column");
          placed = true;
        }
      }
    }
  };
  createBoard();
};

const previewBoard = (boarderId, playerDeck, event) => {
  let playerBoard = document.getElementById(boarderId);

  if (event.target.checked) {
    playerBoard.style.display = "grid";
    playerBoard.style.width = "200px";
    playerBoard.style.height = "0px";
    displayPlayersBoats(boarderId, playerDeck);
  } else {
    playerBoard.style.display = "none";
  }
};

const changePlayerBoard = (boarderId, event, fn, player, playerDeck) => {
  if (event.target) {
    fn(player);
    displayPlayersBoats(`${boarderId}`, playerDeck);
  }
};

module.exports = {
  addItem,
  targetHit,
  boardObjectSunk,
  boardButtonsSunk,
  addObjectsTo2dArray,
  previewBoard,
  changePlayerBoard,
};
