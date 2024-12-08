// creates a 2d array
const createBoard = (n) => {
  let board = [];
  let num = 1;
  for (let i = 0; i < n; i++) {
    board[i] = [];
    for (let j = 0; j < n; j++) board[i].push(num++);
  }
  return board;
};

// to find coordinates to place boat
const findCoordinates = (i, cordOne, cordTwo) => i[cordOne]?.[cordTwo];

// to split objects index into coordinates
const splitArray = (arr) => arr.toString().split("");

// locate boat on board. To find if there are any boards left alive
const findTypeOfItem = (items, arg) => {
  return items.find((n) =>
    n.find((i) => {
      return typeof i === arg;
    })
  );
};

// Finds specific item - currently unused
const findItem = (items, arg) => items.find((n) => n.find((i) => i === arg));

// replace number in array with a boat with matching coordinates
const addItemToDeck = (arr, cordOne, cordTwo, arg) =>
  (arr[cordOne][cordTwo] = arg);

// returns index of objects. I.e. function will return 32 for boat in cell 33
const findCordWithNoNr = (arr, index, columns) => {
  const rowIndex = Math.floor(index / columns);
  const colIndex = index % columns;
  console.log(rowIndex, colIndex);
  return arr[rowIndex][colIndex];
};

// returns splitted cords from objects to help navigate attacks
const findCordOfObject = (index, columns) => {
  const rowIndex = Math.floor(index / columns);
  const colIndex = index % columns;
  return [rowIndex, colIndex];
};

module.exports = {
  createBoard,
  findCoordinates,
  splitArray,
  findTypeOfItem,
  findItem,
  addItemToDeck,
  findCordWithNoNr,
  findCordOfObject,
};
