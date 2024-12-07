import { Gameboard } from "./gameBoard";
import { findCoordinate } from "./scripts";

export const Player = (playerName) => {
  let name = playerName || "Computer";

  /* 
    playerObject should have its own logic. 
    ships


    who's turn it is
    attack i.e. const attack = (player, cordOne, cordTwo) => player.board.recieveAttack(cordOne, cordTwo);
  */

  // have them placed on the board

  // number to place boat randomly
  const randomNum = () => {
    let n = Math.floor(Math.random() * 10);
    return n;
  };

  return {
    board: Gameboard(10),
    randomNum,
    name,
  };
};

const somePlayer = Player("jaja");

somePlayer.board.placeShip(3, 2);

console.log(somePlayer.board.receiveAttack(33));

console.log(somePlayer.board.board);
