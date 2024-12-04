const Ship = require("../boatObject");

test("Boats length is same as input", () => {
  const boat = Ship(3);
  expect(boat.getLength()).toBe(3);
});

test("boats length decreased by getting hit and sinks if length === 0", () => {
  const boat = Ship(3);
  expect(boat.hit()).toBe("Boats length was 3, now is 2.");

  boat.hit();
  boat.hit();
  expect(boat.hit()).toBe("Boat sunk");
});

test("returns boats length", () => {
  const boat = Ship(5);
  expect(boat.getLength()).toBe(5);
});

test("returns boats state (floating)", () => {
  const boat = Ship(3);
  expect(boat.isBoatFLoating()).toBe(1);
});
