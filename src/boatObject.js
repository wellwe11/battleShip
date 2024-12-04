// create boat & add it's length & extra functions
const Ship = (l) => {
  let boatLength = l;
  let beenHit = 0;
  let isFloating = 1;

  return {
    // boat gets shot and loses length
    hit() {
      boatLength--;
      beenHit++;

      // check if boat is destroyed or not
      if (boatLength <= 0) {
        isFloating = 0;
        return this.beenSunk();
      } else return `Boats length was ${l}, now is ${boatLength}.`;
    },

    // boats status
    beenSunk: () => (isFloating !== 0 ? "Boat floating" : "Boat sunk"),

    getLength: () => boatLength,

    isBoatFLoating: () => isFloating,
  };
};

module.exports = Ship;
