// create boat & add it's length & extra functions
export const Ship = (l) => {
  let boatLength = l;
  let beenHit = 0;
  let floating = true;

  return {
    // Measure boats length compared to hits
    hit() {
      beenHit++;
      this.beenSunk();
    },

    // boats status
    beenSunk: () =>
      beenHit === boatLength ? (floating = false) : (floating = true),

    // returns true/false if boat is floating
    isFloating: () => floating,
  };
};

// module.exports = Ship;
