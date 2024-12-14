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

// apply functions to objects inside 2d array
const returnFoundItems = (fnOne = () => {}, fnTwo = () => {}, ...items) => {
  items.forEach((arr, arrIndex) =>
    arr.forEach((row, index) =>
      row.forEach((i, columnIndex) => {
        if (typeof i === "object")
          arrIndex === 0
            ? fnOne(index, columnIndex)
            : fnTwo(index, columnIndex);
      })
    )
  );
};

// check if there are horizontal space for boat to place itself on board
const checkArrayForNumbers = (array, indexOne, indexTwo, itemsLength) => {
  let arr = array[indexOne];

  if (
    typeof arr[indexTwo - 1] === "number" &&
    typeof arr[indexTwo - itemsLength] === "number" &&
    indexTwo - itemsLength >= 0
  ) {
    for (let i = indexTwo; i >= indexTwo - itemsLength + 1 && i >= 0; i--) {
      if (typeof arr[i] === "number") {
        addItem(array, indexOne, i, boatIndex);
      }
    }
  }
};

const checkVerticalSpace = (array, indexOne, indexTwo, itemsLength) => {
  let nums = [];
  for (let i = indexOne; i < itemsLength + itemsLength; i++) {
    if (typeof array[i][indexTwo] === "number") {
      nums.push(array[i][indexTwo]);

      console.log(nums);

      if (nums.length <= itemsLength) {
        addItem(array, i, indexTwo, array[indexOne][indexTwo]);
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
  const element = document.getElementById(container);
  for (let i = 0; i < amount; i++) {
    let div = document.createElement("div");
    element.appendChild(div);
  }

  return element;
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
  returnFoundItems,
  checkArrayForNumbers,
  checkVerticalSpace,
  createDivs,
};
