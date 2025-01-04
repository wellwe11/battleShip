const changeAttribute = (...els) => {
  const changeAtr = (type, boolean) => {
    document
      .querySelectorAll(els)
      .forEach((el) => ((el.setAttribute = type), boolean));
  };

  return { changeAtr };
};

const changeDisplay = (...els) => {
  const displayElement = (type) =>
    document.querySelectorAll(els).forEach((el) => (el.style.display = type));

  return {
    displayElement,
  };
};

const loadForm = () => {
  changeDisplay("#playerForm").displayElement("flex");
  changeDisplay("#mainContent").displayElement("none");
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

const submitClicked = (event) => {
  event.preventDefault();
  changeDisplay("#playerForm").displayElement("none");
  changeDisplay("#mainContent").displayElement("grid");
};

const userInputValue = (el) => {
  const element = document.querySelector(el).value;

  return element;
};

module.exports = {
  loadForm,
  opponentSelector,
  submitClicked,
  userInputValue,
};
