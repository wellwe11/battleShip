const GameBoard = require("../gameBoard");

test("return matching cell", () => {
  const board = GameBoard(5);
  expect(board.placeShip(3, 3)).toBe(3);
});
