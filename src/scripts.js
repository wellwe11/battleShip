// creates a 2d array
export const createBoard = (n) => {
  let board = [];
  let num = 1;
  for (let i = 0; i < n; i++) {
    board[i] = [];
    for (let j = 0; j < n; j++) board[i].push(num++);
  }
  return board;
};

// add items to board
export const findCoordinate = (j, cordOne, cordTwo) => j[cordOne]?.[cordTwo];

// find block with a boat and replace it
export const findItem = (items, arg) => items.find((n) => n === arg);

// replace number in array with a boat
export const replaceNew = (arr, cordOne, cordTwo, arg) =>
  (arr[cordOne][cordTwo] = arg);

// look for boats location and return it
export const findCordWithNoNr = (arr, index, columns) => {
  const rowIndex = Math.floor(index / columns);
  const colIndex = index % columns;
  return arr[rowIndex][colIndex];
};
