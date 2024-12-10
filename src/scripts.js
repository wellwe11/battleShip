// creates a 2d array
const create2dArr = (n, i) => {
  let arr = [];
  let num = i;
  for (let i = 0; i < n; i++) {
    arr[i] = [];
    for (let j = 0; j < n; j++) arr[i].push(num++);
  }
  return arr;
};

// to find coordinates to place boat
const findIndex = (i, indexOne, indexTwo) => i[indexOne]?.[indexTwo];

// to split objects index into coordinates
const splitArray = (arr) => arr.toString().split("");

// locate boat on board. To find if there are any boards left alive
const findTypeOfItem = (items, type) => {
  return items.find((n) =>
    n.find((i) => {
      return typeof i === type;
    })
  );
};

const findAllTypes = (type, ...items) =>
  items.map((item) =>
    item.filter((index) => index.some((i) => typeof i === type))
  );

// replace number in array with a boat with matching coordinates
const addItem = (item, indexOne, indexTwo, arg) =>
  (item[indexOne][indexTwo] = arg);

// returns index of objects. I.e. function will return 32 for boat in cell 33
const findCordWithNoNr = (arr, row, columns) => {
  const rowIndex = Math.floor(row / columns);
  const colIndex = row % columns;
  console.log(rowIndex, colIndex);
  return arr[rowIndex][colIndex];
};

// returns splitted cords from objects to help navigate attacks
const findCordOfObject = (row, columns) => {
  const rowIndex = Math.floor(row / columns);
  const colIndex = row % columns;
  return [rowIndex, colIndex];
};

// check objects length

// check for free space relative to objects length r, l, u, d (random)
// if free:
// find those coordinates
// replace coordinates text with "boat"
// if it is object:
// change location of object:
// code has to be run BEFORE boat is placed at coordinates

module.exports = {
  create2dArr,
  findIndex,
  splitArray,
  findTypeOfItem,
  addItem,
  findCordWithNoNr,
  findCordOfObject,
  findAllTypes,
};
