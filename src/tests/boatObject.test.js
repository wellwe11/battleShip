const Ship = require("../boatObject");

test("returns boats state ", () => {
  const boat = Ship(3);
  expect(boat.beenSunk()).toBe(true);
});
