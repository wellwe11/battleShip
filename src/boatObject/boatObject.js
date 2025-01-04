// create boat & add it's length & extra functions
const Ship = (l) => {
  let boatLength = l;
  let beenHit = 0;
  let floatSatus = false;

  const hit = () => (beenHit++, beenSunk()); // measure boats length compared to hits

  const beenSunk = () => (floatSatus = beenHit === boatLength); // boats status

  return {
    hit,
    boatLength,
    hasBeenHit: () => beenHit,
    hasSunk: () => floatSatus, // returns true/false if boat is floating
  };
};

module.exports = Ship;
