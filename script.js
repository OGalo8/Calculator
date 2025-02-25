let firstDigit = 0;
let secondDigit = 0;
let operation;
let toCalculate = [];

let calculationDone = false;

let operationRegex = /[x\+\-%/=]/;
let secondDigitRegex = /[x\+\-%/=]\d+/;

const myButtons = document.querySelector(".buttons-container");

const display = document.querySelector("#screen-output");

const allBtns = document.querySelectorAll("button");

allBtns.forEach((button) => {
  switch (button.className) {
    case "sign-button":
      button.value = -1;
      break;
    default:
      button.value = button.innerHTML;
      break;
  }
});

function showOnDisplay(e) {
  if (display.innerHTML == 0) display.innerHTML = "";

  let currentSelector = e.target;
  let pressedBtnValue = e.target.value;
  let pressedBtnClass = e.target.className;

  switch (pressedBtnClass) {
    case "digit-button":
      if (calculationDone == true) resetVariables();
      console.log(pressedBtnValue, firstDigit, toCalculate, calculationDone); //remove later
      display.innerHTML += pressedBtnValue;
      break;
    case "ac-button":
      resetVariables();
      break;
    case "sign-button":
      display.innerHTML *= pressedBtnValue;
      break;
    case "operation-button":
      firstDigit = display.innerHTML;
      toCalculate.push(firstDigit);
      operation = pressedBtnValue.match(operationRegex)[0];
      toCalculate.push(operation);

      display.innerHTML += operation;

      console.log(firstDigit, operation, toCalculate, calculationDone); //remove later

      currentSelector.style.backgroundColor = "red";

      break;
    case "equal-button":
      let almostSecondDigit = display.innerHTML.match(secondDigitRegex)[0];
      secondDigit = Number(almostSecondDigit.slice(1));
      toCalculate.push(secondDigit);

      currentSelector.style.backgroundColor = "green";

      let result = operate();
      display.innerHTML = result;

      console.log(result);
      calculationDone = true;

      startCalculating();
      console.log(pressedBtnValue, toCalculate, calculationDone);

      break;
  }
}

function startCalculating() {
  myButtons.removeEventListener("click", handleButtonClick); // Removes event listener (in case it already exists)

  myButtons.addEventListener("click", handleButtonClick); // Adds a new event listener
}

function resetVariables() {
  firstDigit = 0;
  secondDigit = 0;
  toCalculate = [];
  display.innerHTML = "";
  calculationDone = false;
}

function handleButtonClick(e) {
  if (e.target.matches("button")) {
    showOnDisplay(e);
  }
}

function operate() {
  let currentResult;
  switch (operation) {
    case "%":
      currentResult = toCalculate[0] / 100;
      break;
    case "/":
      currentResult = toCalculate[0] / toCalculate[2];
      break;
    case "x":
      currentResult = toCalculate[0] * toCalculate[2];
      break;
    case "-":
      currentResult = toCalculate[0] - toCalculate[2];
      break;
    case "+":
      currentResult = toCalculate[0] - toCalculate[2];
      break;
  }
  return currentResult;
}

startCalculating();
