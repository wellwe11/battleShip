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
  changeBtnColor,
  findDomEl,
};

// final change: if bot hits boat, extend player-click block
