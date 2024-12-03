const someTest = require("./testJest");

test("someTest('yo') to be 'yo is input'", () => {
  expect(someTest("yo")).toBe("yo is input");
});
