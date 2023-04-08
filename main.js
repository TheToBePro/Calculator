const initdisplayer = document.querySelector(".initdisplayer");
const maindisplayer = document.querySelector(".maindisplayer");

const operatorsBtns = document.querySelectorAll(".operator");
const numbersBtns = document.querySelectorAll(".number");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const decimalBtn = document.querySelector(".dot");
const result = document.querySelector(".result");

let FirstNumber = "";
let lastNumber = "";
let operators = null;
let shouldResetScreen = false;

clearBtn.addEventListener("click", clearFunc);
deleteBtn.addEventListener("click", deleteFunction);
decimalBtn.addEventListener("click", apendpoint);
result.addEventListener("click", evaluate);

numbersBtns.forEach((Btn) =>
  Btn.addEventListener("click", () => appendNumber(Btn.textContent))
);

operatorsBtns.forEach((Btn) =>
  Btn.addEventListener("click", () => appendOpreator(Btn.textContent))
);

function appendNumber(number) {
  if (initdisplayer.textContent === "0" || shouldResetScreen) resetScreen();
  initdisplayer.textContent += number;
}

function clearFunc() {
  initdisplayer.textContent = "0";
  maindisplayer.textContent = "";
  FirstNumber = "";
  lastNumber = "";
  operators = null;
}

function resetScreen() {
  initdisplayer.textContent = "";
  shouldResetScreen = false;
}

function deleteFunction() {
  initdisplayer.textContent = initdisplayer.textContent.toString().slice(0, -1);
}

function apendpoint() {
  if (shouldResetScreen) resetScreen();
  if (initdisplayer.textContent === "") initdisplayer.textContent = "0";
  if (initdisplayer.textContent.includes(".")) return;
  initdisplayer.textContent += ".";
}

function appendOpreator(operator) {
  if (operators !== null) evaluate();
  FirstNumber = initdisplayer.textContent;
  console.log(FirstNumber);
  operators = operator;
  maindisplayer.textContent = `${FirstNumber} ${operators}`;
  shouldResetScreen = true;
}

function evaluate() {
  if (operators === null || shouldResetScreen) return;
  if (operators === "/" && initdisplayer.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  lastNumber = initdisplayer.textContent;
  console.log(lastNumber);
  initdisplayer.textContent = roundResult(
    oprate(operators, FirstNumber, lastNumber)
  );
  maindisplayer.textContent = `${FirstNumber} ${operators} ${lastNumber} =`;
  operators = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function add(a, b) {
  return a + b;
}

function substrc(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function oprate(operate, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operate) {
    case "+":
      return add(a, b);
    case "-":
      return substrc(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
