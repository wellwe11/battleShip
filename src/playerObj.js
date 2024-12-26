const Gameboard = require("./gameBoard");

const Player = (playerName) => {
  let name = playerName || "Computer";
  let turn = false;

  return {
    board: Gameboard(10),
    name,
    turn,
  };
};

module.exports = Player;
