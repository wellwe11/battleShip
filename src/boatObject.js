// create boat & add it's length & extra functions
const Ship = (l, ...fn) => ({
  boatLength: l,
  beenHit: 0,
  isFloating: 1,

  // boat gets shot and loses length
  hit() {
    this.boatLength--;
    this.beenHit++;

    // check if boat is destroyed or not
    if (this.boatLength <= 0) {
      this.isFloating = 0;
      return this.beenSunk();
    }

    return `Boats length was ${l}, now is ${this.boatLength}.`;
  },

  // boats status
  beenSunk() {
    return this.isFloating !== 0 ? "Boat floating" : "Boat sunk";
  },
  fn,
});

module.exports = Ship;
