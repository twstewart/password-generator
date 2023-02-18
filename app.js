const resultEl = document.querySelector("#result");
const lengthEl = document.querySelector("#length");
const lowerEl = document.querySelector("#lowercase");
const upperEl = document.querySelector("#uppercase");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");
const clipboardBtn = document.querySelector("#clipboard");
const generateBtn = document.querySelector("#generate");

const funcs = {
  lower: randomLower,
  upper: randomUpper,
  numbers: randomNumber,
  symbols: randomSymbols,
};

generateBtn.addEventListener("click", handleGenerateBtnClick);

function handleGenerateBtnClick(_e) {
  const length = Number(lengthEl.value);
  const lower = lowerEl.checked;
  const upper = upperEl.checked;
  const numbers = numbersEl.checked;
  const symbols = symbolsEl.checked;

  resultEl.textContent = passwordGenerator(length, lower, upper, numbers, symbols);
}

function passwordGenerator(length, lower, upper, numbers, symbols) {
  let generatedPassword = "";
  const types = [{ lower }, { upper }, { numbers }, { symbols }].filter((item) => Object.values(item)[0]);

  if (types.length === 0) {
    alert("Please check at least one (1) of the boxes to generate a secure password!");
    return "";
  }

  for (let i = 0; i < length; i += types.length) {
    const shuffledTypes = types.sort((_a, _b) => 0.5 - Math.random());

    shuffledTypes.forEach((type) => {
      const fn = Object.keys(type)[0];
      generatedPassword += funcs[fn]();
    });
  }

  return generatedPassword.slice(0, length);
}

function randomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function randomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function randomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function randomSymbols() {
  const symbols = "!@#$%^&*";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
