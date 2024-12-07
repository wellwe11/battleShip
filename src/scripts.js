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
export const addToCoordinate = (i, cordOne, cordTwo) => i[cordOne]?.[cordTwo];

export const splitArray = (arr) => {
  let array = arr.toString().split("");
  return array;
};

// locate boat on board. To find if there are any boards left alive
export const findTypeOfItem = (items, arg) => {
  return items.find((n) =>
    n.find((i) => {
      return typeof i === arg;
    })
  );
};

// Finds specific item - currently unused
export const findItem = (items, arg) =>
  items.find((n) => n.find((i) => i === arg));

// replace number in array with a boat with matching cords
export const addItemToDeck = (arr, cordOne, cordTwo, arg) =>
  (arr[cordOne][cordTwo] = arg);

// returns index of objects. I.e. function will re turn 32 for boat in cell 33
export const findCordWithNoNr = (arr, index, columns) => {
  const rowIndex = Math.floor(index / columns);
  const colIndex = index % columns;
  console.log(rowIndex, colIndex);
  return arr[rowIndex][colIndex];
};

// returns splitted coords from objects to help navigate attacks
export const findCordOfObject = (index, columns) => {
  const rowIndex = Math.floor(index / columns);
  const colIndex = index % columns;
  return [rowIndex, colIndex];
};
