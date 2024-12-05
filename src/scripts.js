// creates a 2d array
export const createBoard = (n) => {
  let board = [];
  let num = 1;
  for (let i = 0; i < n; i++) {
    board[i] = [];
    for (let j = 0; j < n; j++) {
      board[i].push(num++);
    }
  }
  return board;
};
