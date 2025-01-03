const Gameboard = require("./gameBoard");
const GameBoard = require("./gameBoard");

test("place a boat", () => {
  const someBoard = GameBoard(6);

  someBoard.placeShip(3, 2, 2);

  expect(typeof someBoard.board[3][2]).toBe("object");
});

test("place several boats", () => {
  const someBoard = GameBoard(6);

  someBoard.placeShip(3, 2, 2);
  someBoard.placeShip(1, 4, 2);

  expect(typeof someBoard.board[3][2]).toBe("object");
  expect(typeof someBoard.board[1][4]).toBe("object");
});

test("place boat on same place should not work", () => {
  const someBoard = Gameboard(6);

  someBoard.placeShip(3, 2, 2);

  expect(someBoard.placeShip(3, 2, 2)).toBe("3 & 2 is taken: object");
});

test("an attack hits a boat", () => {
  const someBoard = GameBoard(5);

  someBoard.placeShip(3, 2, 2);

  expect(someBoard.receiveAttack(3, 2)).toBe("boat at 3,2 was hit");
});

test("an attack misses", () => {
  const someBoard = GameBoard(5);

  someBoard.placeShip(3, 2, 2);

  expect(someBoard.receiveAttack(3, 3)).toBe("hit");
});

test("boat sinks", () => {
  const someBoard = GameBoard(5);
  someBoard.placeShip(3, 2, 2);

  expect(someBoard.receiveAttack(3, 2)).toBe("boat at 3,2 was hit");
  expect(someBoard.receiveAttack(3, 2)).toBe("boat at 3,2 has sunk");
});

test("check if all boats are dead", () => {
  const someBoard = GameBoard(5);

  someBoard.placeShip(3, 2, 2);
  expect(someBoard.areShipsLeft()).toBe(true);

  someBoard.receiveAttack(3, 2);
  someBoard.receiveAttack(3, 2);
  expect(someBoard.areShipsLeft()).toBe(false);
});
