// creates a 2d array
const create2dArr = (e) => {
  let arr = [];
  for (let i = 0; i < e; i++) {
    arr[i] = [];
    for (let j = 0; j < e; j++) arr[i].push(i * e + j);
  }
  return arr;
};

// locate boat on board. To find if there are any boards left alive
const findTypeOfItem = (items, type) =>
  items.find((n) =>
    n.find((i) => {
      return typeof i === type;
    })
  );

// find out what each click returns. I.e. a boat or empty cell
const iterateTwoDArray = (array, indexOne, indexTwo, itemslength, type) => {
  if (typeof array[indexOne][indexTwo] === "object") {
    return false;
  }

  if (indexTwo + itemslength > array[indexOne].length - 1) {
    return false;
  }

  if (type === "row") {
    for (let i = indexTwo; i <= indexTwo + itemslength; i++) {
      if (typeof array[indexOne][i] !== "number") {
        return false;
      }
    }
  }

  if (type === "column") {
    for (let i = indexTwo; i <= indexTwo + itemslength; i++) {
      if (typeof array[i][indexOne] !== "number") {
        return false;
      }
    }
  }

  return true;
};

// place same object between 2 points on array
const addItems = (array, indexOne, indexTwo, itemslength, arg, type) => {
  if (type === "row") {
    for (let i = indexTwo; i < indexTwo + itemslength; i++) {
      array[indexOne][i] = arg;
    }
  }

  if (type === "column") {
    for (let i = indexTwo; i < indexTwo + itemslength; i++) {
      array[i][indexOne] = arg;
    }
  }
};

// replace cell with argument. I.e. object/string/number
const addItem = (board, cordOne, cordTwo, arg) => {
  board[cordOne][cordTwo] = arg;
};

// For creating buttons inside of each board
const createElements = (container, amount, type) => {
  for (let i = 0; i <= amount; i++) {
    let element = document.createElement(type);
    element.textContent = i > 9 ? i : `0${i}`;
    element.id = `${container}btn${i}`;

    document.getElementById(container).appendChild(element);
  }
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
    }
  });
};

const changeBtnColor = (player, objClr, color) => {
  document.querySelectorAll(`#${player} > *`).forEach((el) => {
    if (el.style.backgroundColor === objClr) {
      el.style.backgroundColor = color;
    }
  });
};

// hit/miss handler for boards buttons
const targetHit = (element, text, color) => {
  element.textContent = text;
  element.style.backgroundColor = color;
};

// find & change specific cells value
const changeButtonSunk = (array, row, condition, arg) => {
  for (let i = 0; i < array[row].length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === condition) {
        array[i][j] = arg;
      }
    }
  }
};

// find matching arguments and replace cells with same object with argument
const changeObjButtonsSunk = (array, el, arg) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === arg) {
        el.parentElement.querySelectorAll("*").forEach((btn) => {
          let btnIdNr = btn.id.replace(/\D/g, "");

          if (Number(btnIdNr) === Number([i, j].join(""))) {
            btn.textContent = arg;
          }
        });
      }
    }
  }
};

// checks & adds objects over several cells, in random position
const addObjectsTo2dArray = (object, array) => {
  // boats to be placed and their respective length
  const amount = [2, 2, 2, 3, 3, 3, 4, 4, 5];

  for (let i = 0; i < amount.length; i++) {
    // create a boat for each loop
    const boat = object(amount[i]);

    let placed = false;
    while (!placed) {
      // random coordinates
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);

      // check if boat with relevant length fits on current coordinates
      const spaceToRight = iterateTwoDArray(array, x, y, amount[i], "row"); // row
      const spaceBelow = iterateTwoDArray(array, y, x, amount[i], "column"); // column

      if (spaceToRight) {
        addItems(array, x, y, boat.boatLength, boat, "row");
        placed = true;
      } else if (!spaceToRight && spaceBelow) {
        addItems(array, y, x, boat.boatLength, boat, "column");
        placed = true;
      }
    }
  }
};

const changeDisplay = (...els) => {
  const displayElement = (type) =>
    document.querySelectorAll(els).forEach((el) => (el.style.display = type));

  return {
    displayElement,
  };
};

const changeAttribute = (...els) => {
  const changeAtr = (type, boolean) => {
    document
      .querySelectorAll(els)
      .forEach((el) => ((el.setAttribute = type), boolean));
  };

  return { changeAtr };
};

//
const loadForm = () => {
  changeDisplay("#playerForm").displayElement("flex");
  changeDisplay("#playerTwo", "#contentContainer > *").displayElement("none");
};

const opponentSelector = () => {
  const vsComputer = () => {
    changeDisplay("#playerTwo").displayElement("none");
    changeAttribute("#playerTwo").changeAtr("required", false);
  };

  const vsPlayer = () => {
    changeDisplay("#playerTwo").displayElement("flex");
    changeAttribute("#playerTwo").changeAtr("required", true);
  };

  return {
    vsComputer,
    vsPlayer,
  };
};

const userInputValue = (el) => {
  const element = document.querySelector(el).value;

  return element;
};

const submitClicked = (event) => {
  event.preventDefault();
  changeDisplay("#playerForm").displayElement("none");
  changeDisplay("#contentContainer > *").displayElement("grid");
};

const findDomEl = (el) => {
  const element = document.querySelectorAll(el);

  return element;
};

const computerOptionChecked = (fn) => {
  document.querySelectorAll("#boardContainerTwo > *").forEach((el) => {
    el.addEventListener("click", (event) => {
      if (event) {
        let attacked = false;

        while (!attacked) {
          let x = Math.floor(Math.random() * 10);
          let y = Math.floor(Math.random() * 10);

          document.querySelectorAll("#boardContainerOne > *").forEach((el) => {
            if (Number(el.textContent) === Number([x, y].join(""))) {
              setTimeout(() => {
                fn(el, x, y);
                el.disabled = true;
              }, 3001);
              attacked = true;
            }
          });
        }
      }
    });
  });
};

const playerGameLogic = (container, attack) => {
  findDomEl(container).forEach((el) => {
    if (!isNaN(el.textContent)) {
      el.addEventListener("click", () => {
        attack(el, Number(el.textContent[0]), Number(el.textContent[1]));
        el.disabled = true;
      });
    }
  });
};

const changePointerEvent = (el, onOff) => {
  document.querySelectorAll(el).forEach((btn) => {
    btn.style.pointerEvents = onOff;
  });
};

const playerTurn = (playerOne, playerTwo) => {
  const changePlayerTurn = () => {
    document.querySelectorAll("#contentContainer > * > *").forEach((el) => {
      el.addEventListener("click", () => {
        if (el.parentElement.id === "boardContainerTwo") {
          playerOne.turn = false;
          playerTwo.turn = true;
        } else if (el.parentElement.id === "boardContainerOne") {
          playerOne.turn = true;
          playerTwo.turn = false;
        }
      });
    });
  };

  const clickableBoard = () => {
    console.log(playerOne.turn, playerTwo.turn);
    document.querySelectorAll("#boardContainerOne").forEach((btn) => {
      btn.style.pointerEvents = "none";
    });
    if (!playerOne.turn && playerTwo.turn) {
      changePointerEvent("#boardContainerOne", "auto");
      changePointerEvent("#boardContainerTwo", "none");
    } else if (!playerTwo.turn && playerOne.turn) {
      changePointerEvent("#boardContainerOne", "none");
      changePointerEvent("#boardContainerTwo", "auto");
    }
  };

  return {
    changePlayerTurn,
    clickableBoard,
  };
};

module.exports = {
  create2dArr,
  findTypeOfItem,
  addItem,
  createElements,
  displayPlayersBoats,
  targetHit,
  changeButtonSunk,
  changeObjButtonsSunk,
  addObjectsTo2dArray,
  changeBtnColor,
  loadForm,
  opponentSelector,
  findDomEl,
  userInputValue,
  submitClicked,
  computerOptionChecked,
  playerGameLogic,
  playerTurn,
};
