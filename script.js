function addGlobalEventListener(type, selector, callback, parent = document) {
  parent.addEventListener(type, (e) => {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}

const acBtn = document.querySelector(".ac-button");
let AC = acBtn.innerHTML;

const sevenBtn = document.querySelector("#seven-button");
let seven = sevenBtn.innerHTML;

const display = document.querySelector("#screen-output");

const allBtns = document.querySelectorAll("button");
const allSelectors = {};

allBtns.forEach((button) => {
  button.className != "sign-button"
    ? (button.value = button.innerHTML)
    : (button.value = -1);
  allSelectors[button.id] = document.querySelector(`#${button.id}`);
});

addGlobalEventListener("click", "button", showOnDisplay);

function showOnDisplay(e) {
  let pressedBtn = e.target.value;
  let pressedBtnClass = e.target.className;

  switch (pressedBtnClass) {
    case "digit-button":
      display.innerHTML += pressedBtn;
      break;
    case "ac-button":
      display.innerHTML = "";
      break;
    case "sign-button":
      display.innerHTML *= pressedBtn;
      break;
  }
}
