//global variables
const digits = document.querySelectorAll('.digits');
const operators = document.querySelectorAll('.operators');
const display = document.querySelector('#textDisplay');
const eval = document.querySelector('#equationDisplay');
const addbutton = document.querySelector('#add');
const minusbutton = document.querySelector('#subtract');
const multiplybutton = document.querySelector('#multiply');
const dividebutton = document.querySelector('#divide');
const equalsbutton = document.querySelector('#equals');
const clearallbutton = document.querySelector('#clearall');
const clearbutton = document.querySelector('#clear');

let valuetodisplay = false;
let firstoperator = null;
let secondoperator = null;

let operands = ["", null];

// display.textContent = 0;

//eventlisteners
digits.forEach((button) => {
    button.addEventListener('click', displayChange);
});
// operators.forEach((button) => {
//     button.addEventListener('click', () => {
//         eval.textContent = operands[0] 
//     });
// });

addbutton.addEventListener('click', add);
minusbutton.addEventListener('click', minus);
multiplybutton.addEventListener('click', multiply);
dividebutton.addEventListener('click', divide);
equalsbutton.addEventListener('click', equals);
clearallbutton.addEventListener('click', clearAll);
clearbutton.addEventListener('click', clear);

function clear() {
    if (display.textContent.length >= 1) {
        if (valuetodisplay == false) {
            operands[0].toString().length > 1 ?
                operands[0] = parseInt(operands[0].toString().slice(0, -1)) : operands[0] = 0
            display.textContent = operands[0];
        } else {
            if (operands[1] > 0) {
                console.log(valuetodisplay);
                operands[1].toString().length > 1 ?
                    operands[1] = parseInt(operands[1].toString().slice(0, -1)) : operands[1] = 0
                display.textContent = operands[1];
            }
        }
    }
}

function clearAll() {
    operands[0] = 0;
    operands[1] = 0;
    valuetodisplay = false;
    firstoperator = null;
    secondoperator = null;
    display.textContent = operands[0];
}

function displayChange(event) {
    console.log(operands);
    let button = document.getElementById(event.target.id).textContent;

    if (valuetodisplay == false) {
        operands[0] += button;
        if (operands[0].length > 7) { 
            display.textContent = display.textContent.slice(1) + button}
            else { display.textContent = operands[0]; }

    } else {
        if (operands[1] == null || operands[1] ==  0) operands[1] = "";
        operands[1] += button;
        if (operands[1].length > 7) { 
            display.textContent = display.textContent.slice(1) + button}
            else { display.textContent = operands[1]; }
    }
}

function math(op, arr) {

    const newarr = arr.map(x => parseInt(x));
    console.log(operands);

    return op == '+' ? newarr.reduce((acc, val) => acc + val) :
        op == '-' ? newarr.reduce((acc, val) => acc - val) :
            op == '*' ? newarr.reduce((acc, val) => acc * val) :
                op == '/' ? newarr.reduce((acc, val) => acc / val) :
                    null;

}

function selectOperator(operator) {
    if (firstoperator != null && secondoperator == null) {
        secondoperator = operator;
        operands[0] = math(firstoperator, operands);
        display.textContent = operands[0];
    } else {
        operands[0] = math(secondoperator, operands);
        display.textContent = operands[0];
        secondoperator = operator;
    }
}

function equals() {
    console.log(firstoperator,  secondoperator);
    if (firstoperator != null && secondoperator == null) {
        operands[0] = math(firstoperator, operands);
        display.textContent = operands[0];
    } else if (firstoperator != null && secondoperator != null) {
        operands[0] = math(secondoperator, operands);
        display.textContent = operands[0];
    }
    firstoperator = null;
    secondoperator = null;
}

function add() {
    valuetodisplay = true;
    if (firstoperator == null && secondoperator == null) firstoperator = '+';
    if (operands[1] != null) {
        selectOperator('+');
        operands[1] = 0;
    }
}

function minus() {
    valuetodisplay = true;
    if (firstoperator == null && secondoperator == null) firstoperator = '-';
    if (operands[1] != null) {
        selectOperator('-');
        operands[1] = 0;
    }
}

function multiply() {
    valuetodisplay = true;
    if (firstoperator == null && secondoperator == null) firstoperator = '*';
    if (operands[1] != null) {
        selectOperator('*');
        operands[1] = 0;
    }
}

function divide() {
    valuetodisplay = true;
    if (firstoperator == null && secondoperator == null) firstoperator = '/';
    if (operands[1] != null) {
        selectOperator('/');
        operands[1] = 0;
    }
}