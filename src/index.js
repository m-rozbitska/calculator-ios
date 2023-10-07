document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('#calc_form');

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const screen = document.querySelector('#screen');

  const operand_btns = document.querySelectorAll("button[data-type=operand]");

  const operator_btns = document.querySelectorAll("button[data-type=operator]");
  

  const setDisplay = (inputS) => {
    if (inputS.length === 7){
      screen.style.fontSize = "3.7rem";
    } else if (inputS.length === 8){
      screen.style.fontSize = "3.3rem";
    } else if (inputS.length === 9){
      screen.style.fontSize = "3rem";
    } else if(inputS.length >= 10 ){
      display.style.fontSize = "2.6rem";
    };
  };
  

  let equation = [];
  operator_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      
    e.currentTarget.classList.add("active");

      switch (e.target.value) {
        case "%":
          screen.value = Number(screen.value) / 100;
          break;
        case "invert":
          screen.value = Number(screen.value) * -1;
          break;
        case "=":
          equation.push(screen.value);
          screen.value = eval(equation.join(""));
          equation = [];
          break;
        default:
          let last_item = equation[equation.length - 1];
          if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
            equation.pop();
            equation.push(e.target.value);
          } else {
            equation.push(screen.value);
            equation.push(e.target.value);
          }
          is_operator = true;
          break;
      };
    });
  });

  let is_operator = false;
  operand_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (screen.value == "0") {
        screen.value = e.target.value;
      } else if (is_operator) {
        is_operator = false;
        screen.value = e.target.value;
      } else if (screen.value.includes(".")) {
        screen.value = screen.value + "" + e.target.value.replace(".", "");
      } else {
        screen.value = screen.value + "" + e.target.value;
      };
    });
  });

  const remove_active = () => {
    operator_btns.forEach((btn) => {
    btn.classList.remove("active");
    });
  };
});




