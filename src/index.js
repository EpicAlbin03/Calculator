const btns = document.querySelectorAll(".btn");
const display = document.querySelector("#display");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let btnValue = e.target.innerHTML;

    if (btnValue == "C") {
      display.value = "";
    } else if (display.value == "Error") {
      display.value = "" + btnValue;
    } else if (btnValue == "DEL") {
      display.value = display.value.slice(0, -1);
    } else if (btnValue == "=") {
      display.value = evaluate(display.value);
    } else if (display.value.slice(-1) == "%" && btnValue.match(/[0-9.]/)) {
      display.value += "*" + btnValue;
    } else {
      display.value += btnValue;
    }
  });
});

function evaluate(expression) {
  if (expression.includes("%")) {
    expression = expression.replace(/%/g, "/100");
  }

  let numbers = expression.match(/[0-9.]+/g);
  if (numbers == null) {
    return "Error";
  }
  let operators = expression.match(/[\+\-\*\/]/g);
  let result = 0;

  if (operators != null) {
    for (let i = 0; i < operators.length; i++) {
      switch (operators[i]) {
        case "+":
          result = parseFloat(numbers[i]) + parseFloat(numbers[i + 1]);
          break;
        case "-":
          result = parseFloat(numbers[i]) - parseFloat(numbers[i + 1]);
          break;
        case "*":
          result = parseFloat(numbers[i]) * parseFloat(numbers[i + 1]);
          break;
        case "/":
          result = parseFloat(numbers[i]) / parseFloat(numbers[i + 1]);
          break;
      }

      numbers[i + 1] = result;
    }
  } else {
    result = expression;
  }

  if (isNaN(result) || !isFinite(result)) {
    result = "Error";
  } else if (result == 0) {
    result = "";
  }

  return result;
}
