const Player = require("../playerObj/playerObj");

const { changeBtnColor: hidePlayerBoats } = require("../scripts");

const {
  playerGameLogic,
  playerTurn,
  toggleTurn,
  playerHitShip,
  noOneCanClick,
  playVsBot,
  placeDeck,
  displayPlayersBoats,
} = require("./gameEvents.scripts");

const { userInputValue } = require("../form/form");

const Game = () => {
  // enforce always to players
  const playerOne = Player(userInputValue("#nameOne"));
  const playerTwo = Player(userInputValue("#nameTwo") || "Computer");

  // pre-determined turn
  playerOne.turn = true;
  playerTwo.turn = false;

  placeDeck(playerOne, playerTwo);

  let currentPlayer = playerOne.turn === true ? playerOne : playerTwo;
  console.log(currentPlayer);
  let CurrentPlayerBoard = currentPlayer.board.board;
  console.log(CurrentPlayerBoard);

  // connects buttons to arrays. I.e button 32 is clicked, compared matching array cell
  playerGameLogic("#boardContainerOne > *", playerOne.board.receiveAttack);
  playerGameLogic("#boardContainerTwo > *", playerTwo.board.receiveAttack);

  return {
    // enforce player ones board at start to be viewable after 3 seconds
    viewBoardStart: () => {
      noOneCanClick();
      setTimeout(() => {
        displayPlayersBoats("boardContainerOne", CurrentPlayerBoard);
        playerTurn(playerOne, playerTwo);
      }, 2000);
    },
    // display current players turns board with a timeout of 3 seconds
    displayCurrentBoard: (condition) => {
      let time = 3000;

      if (condition) {
        time = 0;
      }

      if (playerOne.turn === true) {
        setTimeout(() => {
          displayPlayersBoats("boardContainerOne", playerOne.board.board);
        }, time);
        hidePlayerBoats("boardContainerTwo", "gray", "green");
      } else if (playerOne.turn === false) {
        setTimeout(() => {
          displayPlayersBoats("boardContainerTwo", playerTwo.board.board);
        }, time);
        hidePlayerBoats("boardContainerOne", "gray", "green");
      }
    },

    // constantly display player boats as changing isn't needed
    displayVsComputer: () => {
      displayPlayersBoats("boardContainerOne", playerOne.board.board);
    },

    // random attack on player board
    computerAttack: () => {
      playVsBot(playerOne.board.receiveAttack);
    },

    newTurn: (event, condition) => {
      let time = 3000;

      if (condition) {
        time = 0;
      }
      // if hit ship, players turn again
      playerHitShip(event, playerOne, playerTwo);
      // if miss, next players turn
      toggleTurn(playerOne, playerTwo);

      // new player turn with a cooldown to allow other player to look away in time
      noOneCanClick();

      console.log(time);
      // cooldown to prevent instant clicks
      setTimeout(() => {
        playerTurn(playerOne, playerTwo);
      }, time);
    },

    playerOne,
    playerTwo,
  };
};

module.exports = { Game };
