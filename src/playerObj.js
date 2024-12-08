const Gameboard = require("./gameBoard");

const Player = (playerName) => {
  let name = playerName || "Computer";
  let turn = false;

  // number to place boat randomly
  const randomNum = () => {
    let n = Math.floor(Math.random() * 6);
    return n;
  };

  return {
    board: Gameboard(6),
    randomNum,
    name,
    turn,
  };
};

module.exports = Player;
