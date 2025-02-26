let firstDigit = 0;
let secondDigit = 0;
let operation;
let result;

let toCalculate = [];

let lastEqualFlag = false;

let operationRegex = /[x\+\-%/=]/;
let secondDigitRegex = /[x\+\-%/=][\d\.]+/;

const myButtons = document.querySelector(".buttons-container");
const allBtns = document.querySelectorAll("button");

const display = document.querySelector("#screen-output");

const decimalPointBtn = document.querySelector("#decimal-point-button");

function showOnDisplay(e) {
  let currentSelector = e.target;
  let pressedBtnValue = e.target.value;
  let pressedBtnClass = e.target.className;
  let pressedBtnId = e.target.id;

  switch (pressedBtnClass) {
    case "digit-button":
      if (display.innerHTML == 0) display.innerHTML = "";
      if (lastEqualFlag == true) {
        lastEqualFlag = !lastEqualFlag;
        reset();
      }

      display.innerHTML += pressedBtnValue;

      if (pressedBtnId == "decimal-point-button") {
        decimalPointBtn.value = "";
      }

      break;
    case "ac-button":
      reset();
      display.innerHTML = "0";
      break;
    case "sign-button":
      display.innerHTML *= pressedBtnValue;
      break;
    case "operation-button":
      if (lastEqualFlag == true) {
        toCalculate = [];
        lastEqualFlag = !lastEqualFlag;
      }

      if (decimalPointBtn.value == "") decimalPointBtn.value = "."; //this reactivates the decimal point button
      deactivateOperationsBtns();
      firstDigit = display.innerHTML; //we capture the first digit without the operator
      toCalculate.push(firstDigit);
      operation = pressedBtnValue.match(operationRegex)[0]; // we extract the operator from the pressedBtnValue striing
      toCalculate.push(operation);

      display.innerHTML += operation; //showing the full string (including operator)

      currentSelector.style.backgroundColor = "red";

      break;
    case "equal-button":
      let almostSecondDigit = display.innerHTML.match(secondDigitRegex)[0]; //we extract the 2nd digit with the operator
      secondDigit = Number(almostSecondDigit.slice(1)); // removing the operator
      toCalculate.push(secondDigit);

      currentSelector.style.backgroundColor = "green";

      result = operate(); //switch to know how to operate the array items
      display.innerHTML = result; // erase current display and show the result

      lastEqualFlag = true;
      reactivateOperationsBtns();
      startCalculating(); //will remove the current event listeners and

      break;
  }
  console.log(toCalculate, "lastEqualFlag:", lastEqualFlag);
}

function startCalculating() {
  myButtons.removeEventListener("click", handleButtonClick); // Removes event listener (in case it already exists)

  myButtons.addEventListener("click", handleButtonClick); // Adds a new event listener
}

function handleButtonClick(e) {
  if (e.target.matches("button")) {
    showOnDisplay(e);
  }
}

function reset() {
  if (decimalPointBtn.value == "") decimalPointBtn.value = ".";
  firstDigit = 0;
  secondDigit = 0;
  toCalculate = [];
  display.innerHTML = "";
  lastEqualFlag = false;
  reactivateOperationsBtns();
  assignValueToButtons(); //setear de nuevo el valor de todos los botones
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
  return Math.round((currentResult + Number.EPSILON) * 100) / 100;
}

function assignValueToButtons() {
  allBtns.forEach((button) => {
    if (button.className == "sign-button") {
      button.value = -1;
    } else {
      button.value = button.innerHTML;
    }
  });
}

function deactivateOperationsBtns() {
  allBtns.forEach((button) => {
    if (button.className == "operation-button") {
      button.disabled = true;
    }
  });
}

function reactivateOperationsBtns() {
  allBtns.forEach((button) => {
    if (button.className == "operation-button") {
      button.disabled = false;
    }
  });
}

assignValueToButtons();
startCalculating();
