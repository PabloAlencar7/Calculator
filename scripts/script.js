// Código em JavaScript para realizar funcionalidades de uma Calculadora virtual :)

const expression = document.querySelector(".expression");
const expressionDisplay = document.querySelector(".expressionDisplay");
const buttons = document.querySelectorAll(".gridButtons button");
const buttonHistory = document.querySelector(".buttonHistory");
const modalHistory = document.querySelector(".modalHistory");
const buttonCloseModal = document.querySelector(".buttonCloseModal");
const containerHistory = document.querySelector(".containerHistory");
const buttonClearHistory = document.querySelector(".buttonClearHistory");

buttonHistory.addEventListener("click", () => {
  modalHistory.showModal();
  updateHistory();
});

buttonCloseModal.addEventListener("click", () => {
  modalHistory.close();
});

function clearScreen() {
  expression.innerHTML = "";
  expressionDisplay.innerHTML = "";
}

function updateHistory() {
  const calculatorHistory = JSON.parse(
    localStorage.getItem("@calculator:history")
  );

  containerHistory.innerHTML = "";
  if (calculatorHistory) {
    calculatorHistory.forEach((value) => {
      const boxHistory = document.createElement('div');
      boxHistory.className = 'boxHistory';
  
      const expressionHistory = document.createElement('div');
      expressionHistory.className = 'expressionHistory';
      expressionHistory.textContent = value.expression;
  
      const resultHistory = document.createElement('div');
      resultHistory.className = 'resultHistory';
      resultHistory.textContent = value.result;
  
      boxHistory.appendChild(expressionHistory);
      boxHistory.appendChild(resultHistory);
  
      containerHistory.appendChild(boxHistory);
  });
  } else {
    containerHistory.innerHTML = `<div class="emptyHistory">Vazio</div>`;
  }
}

const totalNumbers = 13;
let isError = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isError) {
      clearScreen();
      isError = false;
    }

    switch (button.innerHTML) {
      case "C":
        clearScreen();
        break;

      case "DEL":
        expression.innerHTML = expression.innerHTML.slice(0, -1);
        break;

      case "=":
        try {
          if (expression.innerHTML.length > 0) {
            expressionDisplay.innerHTML = expression.innerHTML;
            expression.innerHTML = String(
              eval(expression.innerHTML.replace("x", "*").replace("%", "/100"))
            ).slice(0, totalNumbers);
          }

          const calculatorHistory = JSON.parse(
            localStorage.getItem("@calculator:history")
          );

          if (calculatorHistory) {
            localStorage.setItem(
              "@calculator:history",
              JSON.stringify([
                ...calculatorHistory,
                {
                  result: expression.innerHTML,
                  expression: expressionDisplay.innerHTML,
                },
              ])
            );
          } else {
            localStorage.setItem(
              "@calculator:history",
              JSON.stringify([
                {
                  result: expression.innerHTML,
                  expression: expressionDisplay.innerHTML,
                },
              ])
            );
          }

        } catch (error) {
          console.error(error);
          expression.innerHTML = "Error";
          isError = true;
        }
        break;

      default:
        if (expression.innerHTML.length >= 13) return;
        {
        }
        expression.innerHTML += button.innerHTML;
        break;
    }
  });
});

expression.innerHTML = "";
