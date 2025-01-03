// create a 2d board that helps navigate boats positioning & logic
const create2dArr = (e) => {
  let arr = [];
  for (let i = 0; i < e; i++) {
    arr[i] = [];
    for (let j = 0; j < e; j++) arr[i].push(i * e + j);
  }
  return arr;
};

// For creating buttons inside of each board
const createElements = (container, amount, type) => {
  for (let i = 0; i <= amount; i++) {
    let element = document.createElement(type);
    element.textContent = i > 9 ? i : `0${i}`;
    element.id = `${container}btn${i}`;
    element.setAttribute("data-number", i);

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

const findDomEl = (el) => {
  const element = document.querySelectorAll(el);

  return element;
};

module.exports = {
  create2dArr,
  createElements,
  displayPlayersBoats,
  changeBtnColor,
  findDomEl,
};

// final change: if bot hits boat, extend player-click block
