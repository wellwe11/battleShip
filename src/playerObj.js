const Gameboard = require("./gameBoard");

const Player = (playerName) => {
  let name = playerName || "Computer";
  let turn = false;

  // number to place boat randomly
  const randomNum = () => {
    let n = Math.floor(Math.random() * 10);
    return n;
  };

  return {
    board: Gameboard(10),
    randomNum,
    name,
    turn,
  };
};

module.exports = Player;
