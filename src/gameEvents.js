const Player = require("./playerObj");
const { displayPlayersBoats } = require("./scripts");

const Game = (...names) => {
  const players = names.map((name) => Player(name || "Computer"));

  return {
    players,
    placeDeck: (...players) => {
      players.forEach((player) => {
        player.board.placeShip();
      });
    },
    viewBoats: (player, board) => displayPlayersBoats(player, board),
  };
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("playerForm").style.display = "flex";
  document.getElementById("playerTwo").style.display = "none";
  document.querySelectorAll("#contentContainer > *").forEach((element) => {
    element.style.display = "none";
  });
});

document.getElementById("computerOption").addEventListener("click", () => {
  document.getElementById("playerTwo").style.display = "none";
  document.getElementById("playerTwo").setAttribute("required", false);
});

document.getElementById("PlayerOption").addEventListener("click", () => {
  document.getElementById("playerTwo").style.display = "flex";
  document.getElementById("playerTwo").setAttribute("required", true);
});

document.getElementById("submitBtn").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("playerForm").style.display = "none";
  document.querySelectorAll("#contentContainer > *").forEach((element) => {
    element.style.display = "grid";
  });

  const someGame = Game(
    document.getElementById("nameOne").value,
    document.getElementById("nameTwo").value
  );

  const playerOne = someGame.players[0];
  const playerTwo = someGame.players[1];

  console.log(someGame.players);

  someGame.placeDeck(playerOne, playerTwo);
  someGame.viewBoats("boardContainerOne", playerOne.board.board);

  // someGame.viewBoats("boardContainerTwo", boardTwo);

  document.querySelectorAll("#boardContainerOne > *").forEach((el) => {
    el.addEventListener("click", () => {
      if (!isNaN(el.textContent)) {
        playerOne.board.receiveAttack(
          el,
          Number(el.textContent[0]),
          Number(el.textContent[1])
        );
        playerTwo.board.areShipsLeft();
      }
    });
  });

  document.querySelectorAll("#boardContainerTwo > *").forEach((el) => {
    el.addEventListener("click", () => {
      if (!isNaN(el.textContent)) {
        playerTwo.board.receiveAttack(
          el,
          Number(el.textContent[0]),
          Number(el.textContent[1])
        );
        playerTwo.board.areShipsLeft();
      }
    });
  });
});
