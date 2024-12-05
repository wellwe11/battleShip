import { Player } from "./playerObj";

const playerOne = Player();
const playerTwo = Player();

/*gameBoard functions:
placeShip() - i.e. placeShip(3, 1) will place boat on row[index] 3, with length 1
receiveAttack() - i.e. receiveAttack(3, 1) will attack row 2, column 0
areShipsLeft() - checks if any boats are left on current deck
*/

/* boat functions: 
hit() - playerOnes boat gets hit, decreasing the boats length
beenSunk() - automatically checks if boat is sunk. If sunk, logs it
getLength() - checks if boats length is above 0
isBoatFLoating() - if boat floats, will return 1. Otherwise returns 0
*/
