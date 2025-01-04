const computerOptionChecked = (fn) => {
  const attackPlayerBoard = () => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let CordNumber = Number([x, y].join(""));

    document.querySelectorAll("#boardContainerOne > *").forEach((elOne) => {
      if (Number(elOne.getAttribute("data-number")) === CordNumber) {
        if (Number(elOne.textContent)) {
          document
            .querySelectorAll("#boardContainerTwo > *")
            .forEach((elTwo) => {
              if (!elTwo.disabled) {
                elTwo.style.pointerEvents = "none";
              }
            });
          setTimeout(() => {
            fn(elOne, x, y);
            elOne.disabled = true;

            if (elOne.textContent === "hit" || elOne.textContent === "sunk") {
              attackPlayerBoard();
            } else {
              document
                .querySelectorAll("#boardContainerTwo > *")
                .forEach((elTwo) => {
                  if (!elTwo.disabled) {
                    elTwo.style.pointerEvents = "auto";
                  }
                });
            }
          }, 2000);
        } else {
          attackPlayerBoard();
        }
      }
    });
  };

  return {
    attackPlayerBoard,
  };
};

const playVsBot = (fn) => {
  document.querySelectorAll("#boardContainerTwo > *").forEach((el) => {
    el.addEventListener("click", (event) => {
      if (
        event &&
        event.target.textContent !== "hit" &&
        event.target.textContent !== "sunk"
      ) {
        computerOptionChecked(fn).attackPlayerBoard();
      }
    });
  });
};

const toggleTurn = (playerOne, playerTwo) => {
  playerOne.turn = !playerOne.turn;
  playerTwo.turn = !playerTwo.turn;

  return playerOne.turn ? playerTwo : playerOne;
};

const playerHitShip = (event, playerOne, playerTwo) => {
  if (event !== undefined) {
    let parentContainer = event.parentElement.id;

    if (event.textContent === "hit" || event.textContent === "sunk") {
      if (parentContainer === "boardContainerOne") {
        playerOne.turn = true;
        playerTwo.turn = false;
      } else if (parentContainer === "boardContainerTwo") {
        playerOne.turn = false;
        playerTwo.turn = true;
      }
    }
  }
};

const changePointerEvent = (el, onOff) => {
  document.querySelectorAll(el).forEach((btn) => {
    btn.style.pointerEvents = onOff;
  });
};

const noOneCanClick = () => {
  changePointerEvent("#contentContainer > *", "none");
};

const playerTurn = (playerOne, playerTwo) => {
  if (!playerOne.turn && playerTwo.turn) {
    changePointerEvent("#boardContainerOne", "auto");
    changePointerEvent("#boardContainerTwo", "none");
  } else if (!playerTwo.turn && playerOne.turn) {
    changePointerEvent("#boardContainerOne", "none");
    changePointerEvent("#boardContainerTwo", "auto");
  }
};

const playerGameLogic = (container, attack) => {
  document.querySelectorAll(container).forEach((el) => {
    if (!isNaN(el.textContent)) {
      el.addEventListener("click", () => {
        attack(el, Number(el.textContent[0]), Number(el.textContent[1]));
        el.disabled = true;
      });
    }
  });
};

// place decks for each player
const placeDeck = (...players) => {
  players.forEach((player) => {
    player.board.placeShip();
  });
};

// view elements that contain objects
const displayPlayersBoats = (player, board) => {
  document.querySelectorAll(`#${player} > *`).forEach((el) => {
    if (
      !isNaN(el.textContent) &&
      typeof board[Number(el.textContent[0])][Number(el.textContent[1])] ===
        "object"
    ) {
      el.style.backgroundColor = "gray";
    } else if (el.textContent === "hit" || el.textContent === "sunk") {
      el.style.backgroundColor = "red";
    } else if (el.textContent === "miss") {
      el.style.backgroundColor = "white";
    } else if (Number(el.textContent)) {
      el.style.backgroundColor = "green";
    }
  });
};

module.exports = {
  playVsBot,
  playerGameLogic,
  toggleTurn,
  playerTurn,
  playerHitShip,
  noOneCanClick,
  placeDeck,
  displayPlayersBoats,
};
