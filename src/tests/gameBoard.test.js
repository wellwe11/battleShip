const GameBoard = require("../gameBoard");

// place boats
test("place several boats", () => {
  const someBoard = GameBoard(5);
  someBoard.placeShip(3, 5);
  someBoard.placeShip(5, 2);
  someBoard.placeShip(7, 3);

  expect(typeof someBoard.board[0][2]).toBe("object");
  expect(typeof someBoard.board[0][4]).toBe("object");
  expect(typeof someBoard.board[1][1]).toBe("object");
});

test("place boat on same place should not work", () => {
  const someBoard = GameBoard(5);
  someBoard.placeShip(3, 5);

  expect(someBoard.placeShip(3, 5)).toBe("Place boat elsewhere");
});

test("an attack hits a boat", () => {
  const someBoard = GameBoard(5);

  someBoard.placeShip(10, 5);

  expect(someBoard.receiveAttack(1, 4)).toBe("boat has been hit");
});

test("an attack misses", () => {
  const someBoard = GameBoard(3);

  someBoard.placeShip(1, 2);

  expect(someBoard.receiveAttack(1, 1)).toBe("miss");
});

test("boat sinks, change boat location to 'sunken boat'", () => {});

test("check if board contains 'miss'", () => {
  const someBoard = GameBoard(3);
  someBoard.placeShip(1, 2);
  someBoard.receiveAttack(1, 1);

  // flat to flatten our 2d array, otherwise toContain only checks first layer array
  expect(someBoard.board.flat()).toContain("miss");
});

test("no ships left = areShipsLeft = 0", () => {
  const someBoard = GameBoard(3);
  someBoard.placeShip(10, 5);
  someBoard.receiveAttack(1, 4);

  expect(someBoard.areShipsLeft()).toBe("All ships have been sunk");
});

test("check if there are ships left", () => {
  const someBoard = GameBoard(3);
  someBoard.placeShip(4, 5);
  someBoard.receiveAttack(1, 2);

  expect(someBoard.areShipsLeft()).toBe(1);
});

test("check that all ships have been sunk", () => {
  const someBoard = GameBoard(3);

  someBoard.placeShip(10, 3);
  someBoard.receiveAttack(1, 4);
  someBoard.receiveAttack(1, 4);
  someBoard.receiveAttack(1, 4);

  expect(someBoard.areShipsLeft()).toBe("All ships have been sunk");
});
