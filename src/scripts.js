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

const iterateTwoDArray = (array, row, column, itemslength, type) => {
  const indexOne = type === "row" ? row : column;
  const indexTwo = type === "column" ? column : row;

  console.log(indexTwo + itemslength, array.length);

  if (
    indexTwo + itemslength >= array[indexOne].length ||
    indexOne + itemslength >= array[indexTwo].length
  ) {
    return false;
  }

  if (typeof array[indexOne][indexTwo] === "object") {
    return false;
  }

  for (let i = indexTwo; i <= indexTwo + itemslength; i++) {
    if (typeof array[indexOne]?.[i] === "object") {
      return false;
    }
  }

  return true;
};

const addItems = (array, indexOne, indexTwo, itemslength, arg, type) => {
  if (type === "row") {
    for (let i = indexTwo; i < indexTwo + itemslength; i++) {
      array[indexOne][i] = arg;
    }
  } else if (type === "column") {
    for (let i = indexOne; i < indexOne + itemslength; i++) {
      array[i][indexTwo] = arg;
    }
  }
};

// replace number in array with a boat with matching coordinates
const addItem = (item, indexOne, indexTwo, arg) =>
  (item[indexOne][indexTwo] = arg);

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

const createDivs = (container, amount) => {
  for (let i = 0; i <= amount; i++) {
    let div = document.createElement("div");
    div.textContent = i > 9 ? i : `0${i}`;

    document.getElementById(container).appendChild(div);
  }
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
  createDivs,
  iterateTwoDArray,
  addItems,
};
