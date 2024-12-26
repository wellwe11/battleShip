// creates a 2d array
const create2dArr = (e) => {
  let arr = [];
  for (let i = 0; i < e; i++) {
    arr[i] = [];
    for (let j = 0; j < e; j++) arr[i].push(i * e + j);
  }
  return arr;
};

// to find coordinates to place boat
const findIndex = (i, indexOne, indexTwo) => i[indexOne]?.[indexTwo];

// to split objects index into coordinates
const splitArray = (arr) => arr.toString().split("");

// locate boat on board. To find if there are any boards left alive
const findTypeOfItem = (items, type) =>
  items.find((n) =>
    n.find((i) => {
      return typeof i === type;
    })
  );

// select both boards (thesy both contain objects)
const findAllTypes = (type, ...items) =>
  items.map((item) =>
    item.filter((index) => index.some((i) => typeof i === type))
  );

const iterateTwoDArray = (array, indexOne, indexTwo, itemslength, type) => {
  if (typeof array[indexOne][indexTwo] === "object") {
    return false;
  }

  if (type === "row") {
    if (indexTwo + itemslength > array[indexOne].length - 1) {
      return false;
    }

    for (let i = indexTwo; i <= indexTwo + itemslength; i++) {
      if (typeof array[indexOne][i] !== "number") {
        return false;
      }
    }
  }

  if (type === "column") {
    if (indexTwo + itemslength > array[indexOne].length - 1) {
      return false;
    }

    for (let i = indexTwo; i <= indexTwo + itemslength; i++) {
      if (typeof array[i][indexOne] !== "number") {
        return false;
      }
    }
  }

  return true;
};

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

// replace number in array with a boat with matching coordinates
const addItem = (board, cordOne, cordTwo, arg) => {
  board[cordOne][cordTwo] = arg;
};

// returns index of objects. I.e. function will return 3, 2 for boat in cell 3, 3
const findCordWithNoNr = (arr, row, columns) => {
  const rowIndex = Math.floor(row / columns);
  const colIndex = row % columns;
  return arr[rowIndex][colIndex];
};

// returns splitted cords from objects to help navigate attacks
const findCordOfObject = (row, columns) => {
  const rowIndex = Math.floor(row / columns);
  const colIndex = row % columns;
  return [rowIndex, colIndex];
};

const createElements = (container, amount, type) => {
  for (let i = 0; i <= amount; i++) {
    let element = document.createElement(type);
    element.textContent = i > 9 ? i : `0${i}`;
    element.id = `${container}btn${i}`;

    document.getElementById(container).appendChild(element);
  }
};

const displayPlayersBoats = (player, board) => {
  document.querySelectorAll(`#${player} > *`).forEach((el) => {
    if (
      typeof board[Number(el.textContent[0])][Number(el.textContent[1])] ===
      "object"
    ) {
      el.style.backgroundColor = "gray";
    }
  });
};

module.exports = {
  create2dArr,
  findIndex,
  splitArray,
  findTypeOfItem,
  addItem,
  findCordWithNoNr,
  findCordOfObject,
  findAllTypes,
  createElements,
  iterateTwoDArray,
  addItems,
  displayPlayersBoats,
};
