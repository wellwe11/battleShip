const Ship = require("../boatObject");

test("returns boats state ", () => {
  const boat = Ship(3);
  expect(boat.hasSunk()).toBe(false);
});

test("boat has sunk", () => {
  const boat = Ship(3);
  boat.hit();
  boat.hit();
  boat.hit();
  expect(boat.hasSunk()).toBe(true);
});
