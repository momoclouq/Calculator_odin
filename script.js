//main functions - add/subtract/multiply/divide
function add (x, y){
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;
}

//function to control the main
function operate(num1, num2, operator){
    if (operator == "+") return add(num1, num2);
    if (operator == "-") return subtract(num1, num2);
    if (operator == "*") return multiply(num1, num2);
    if (operator == "/") return divide(num1, num2);
    return "wrong operator";
}

//initialize the buttons and the output
let allBtnNumpad = document.querySelectorAll("#numpad button");
let allBtnOperator = document.querySelectorAll("#operators button");
let calculateBtn = document.querySelector("#calculate");
let clearBtn = document.querySelector("#clear");
let outputDiv = document.querySelector("#output");
let errorDiv = document.querySelector("#error");

//set up the object and the current values
let operation = {
    operator: ""
};
let currentOperand = "";
let currentOperator = "";

//operations between inputs
//scenario 1: enter number
//change the output text, change the currentOperand
for (let i = 0; i < allBtnNumpad.length; i++){
    allBtnNumpad[i].addEventListener("click", (e) => {
        let currentNum = e.target.textContent;

        currentOperand += currentNum;
        outputDiv.textContent += currentNum;
    });
}

//scenario 2: enter operator
//change the output text, add the currentOperand to the operation.operand - if exists already then calculate the operation, reset the 
//add the currentOperator to the operation.operator (replace?)
for (let i = 0; i < allBtnOperator.length; i++){
    allBtnOperator[i].addEventListener("click", e => {
        currentOperator = e.target.textContent;

        if (currentOperand && "operands" in operation && operation.operator) {
            let result = operate(operation.operands, parseInt(currentOperand), operation.operator);
            outputDiv.textContent = result + " " + currentOperator + " ";
            operation.operands = result;
            operation.operator = currentOperator;
        } else if (currentOperand) {
            outputDiv.textContent += " " + currentOperator + " ";
            operation.operands = parseInt(currentOperand);
            operation.operator = currentOperator;
        } else if ("operands" in operation){
            outputDiv.textContent += " " + currentOperator + " ";
            operation.operator = currentOperator;
        } else {
            errorDiv.textContent = "no operands initialized";
            setTimeout(() => {
                errorDiv.textContent = "";
            }, 2000);
        }

        //reset
        currentOperand = "";
    });
}

//scenario 3: clear btn
//reset the operation, reset the currentOperator and the currentOperand
//add clear event (erase all operands and operator)
clearBtn.addEventListener("click", function(){
    outputDiv.textContent = "";
    currentOperand = [];
    currentOperator = "";
    operation = {
        operator: ""
    };
});

//scenario 4: equal.calculate btn
//calculate the opearation, change the outputDiv, change the operation and the currentOperand (currentOperator)
//add calculate evet to the calculate button (similar to basic operation between inputs)
calculateBtn.addEventListener("click", function(){
    if (currentOperand && "operands" in operation) {
        let result = operate(operation.operands, parseInt(currentOperand), operation.operator);
        outputDiv.textContent = result + " ";
        operation.operands = result;
        operation.operator = "";

        currentOperand = "";
    } else {
        errorDiv.textContent = "cannot calculate due to lack of data";
        setTimeout(() => {
            errorDiv.textContent = "";
        }, 2000);
    }
});