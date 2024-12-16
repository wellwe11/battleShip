// creates a 2d array
const create2dArr = (e) => {
  let arr = [];
  for (let i = 0; i < e; i++) {
    arr[i] = [];
    for (let j = 0; j < e; j++) arr[i].push(j + 1);
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

// check if there are horizontal space for boat to place itself on board
const checkHorizontalSpace = (array, indexOne, indexTwo, itemsLength) => {
  let arr = array[indexOne];

  if (
    typeof arr[indexTwo - 1] === "number" &&
    typeof arr[indexTwo - itemsLength] === "number" &&
    indexTwo - itemsLength >= 0
  ) {
    for (let i = indexTwo; i >= indexTwo - itemsLength + 1 && i >= 0; i--) {
      if (typeof arr[i] === "number") {
        return true;
      }
    }
  }
};

// check if there are horizontal space for boat to place itself on board
const addHorizontal = (array, indexOne, indexTwo, itemsLength) => {
  let arr = array[indexOne];
  let boatIndex = findIndex(array, indexOne, indexTwo);

  if (
    typeof arr[indexTwo - 1] === "number" &&
    typeof arr[indexTwo - itemsLength] === "number" &&
    indexTwo - itemsLength >= 0
  ) {
    for (let i = indexTwo; i >= indexTwo - itemsLength + 1 && i >= 0; i--) {
      if (typeof arr[i] === "number") {
        array[indexOne][i] = boatIndex;
      }
    }
  }
};

const checkVerticalSpace = (array, indexOne, indexTwo, itemsLength) => {
  let nums = [];
  for (let i = indexOne; i < itemsLength + itemsLength; i++) {
    if (typeof array[i][indexTwo] === "number") {
      nums.push(array[i][indexTwo]);

      if (nums.length <= itemsLength) {
        return true;
      }
    }
  }
};

const addVertical = (array, indexOne, indexTwo, itemsLength) => {
  let nums = [];
  for (let i = indexOne; i < itemsLength + itemsLength; i++) {
    if (typeof array[i][indexTwo] === "number") {
      nums.push(array[i][indexTwo]);

      if (nums.length <= itemsLength) {
        array[i - 1][indexTwo] = array[indexOne][indexTwo];
      }
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
  for (let i = 1; i <= amount; i++) {
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
  checkHorizontalSpace,
  checkVerticalSpace,
  createDivs,
  addHorizontal,
  addVertical,
};
