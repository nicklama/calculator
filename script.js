const output = document.querySelector(".calc__output__main");
const btnNums = document.querySelectorAll(".calc__row__btnNum");
const btnOps = document.querySelectorAll(".calc__row__btnOps");
const btnClear = document.querySelector("#btnClear");
const btnDel = document.querySelector("#btnDel");
const btnEquals = document.querySelector("#btnEquals");
const btnDot = document.querySelector("#btnDot");
const prevOut = document.querySelector(".calc__output__prevOut");
let currentOut = "";
let evalArr = [];
let prevEvalCheck = false;

const dispOutput = () => {
    // output font size is reduced based on the current length
    if (currentOut.length > 14) output.style.fontSize = "30px";
    else if (currentOut.length > 11) output.style.fontSize = "40px";
    else output.style.fontSize = "50px";

    output.innerHTML = currentOut; // outputs current value to the screen
};

// Evaluation function
const myEval = (n, m, operation) => {
    if (n === "π") n = Math.PI;
    else n = parseFloat(n);
    if (m === "π") m = Math.PI;
    else m = parseFloat(m);

    // for operations followed by a negative sign
    if (operation[1] === "-") {
        m = -m; // 2nd value is set to be negative
        operation = operation.slice(0, -1);
    }

    if (operation === "+") return n + m;
    if (operation === "-") return n - m;
    if (operation === "×") return n * m;
    if (operation === "÷") return n / m;
    if (operation === "^") return n ** m;
};

// Digit buttons
for (let i = 0; i < btnNums.length; i++) {
    btnNums[i].addEventListener("click", () => {
        if (prevEvalCheck) {
            currentOut = "";
            prevEvalCheck = false;
        }
        currentOut += btnNums[i].innerHTML;
        dispOutput();
    });
}

// Operation buttons
for (let i = 0; i < btnOps.length; i++) {
    btnOps[i].addEventListener("click", () => {
        if (prevEvalCheck) prevEvalCheck = false; // stops new numbers from clearing the output after an eval and then an operation

        let currVal = currentOut[currentOut.length - 1]; // last char in the output
        let prevVal = currentOut[currentOut.length - 2]; // second last char in the output
        if (/[-]/.test(currVal) && /[+×÷]/.test(prevVal)) {
            return; // returns if a negative is after an operation to prevent other operations being added
        } else if (/[-]/.test(currVal) && /[0-9]/.test(prevVal)) {
            currentOut = currentOut.slice(0, -1); // last char is removed then later replaced with the pressed operator
        } else if (/[+×÷^]/.test(currVal) && /[+×÷^]/.test(btnOps[i].innerHTML)) {
            currentOut = currentOut.slice(0, -1); // prevents two operators being pressed in a row
        } else if (/[0-9π]/.test(currVal) && btnOps[i].innerHTML === "π") {
            return; // stops repeated presses of PI or directly after a number (an operation is required between a digit and PI to be evaluated)
        }

        currentOut += btnOps[i].innerHTML;
        dispOutput();
    });
}

// Equal button
btnEquals.addEventListener("click", () => {
    prevOut.innerHTML = currentOut + "="; // displays the previous calculation at the top

    evalArr = currentOut.split(/([-+×÷^]+)/); // splits the current eval into an array separated by operations

    if (evalArr[0] === "") evalArr.splice(0, 1, "0"); // adds a zero to the start of the array for expressions starting with a negative number

    let currentTot = evalArr[0];
    for (let i = 1; i < evalArr.length; i += 2) {
        // iterates from index 1 which contains an operator then a number in the next index
        currentTot = myEval(currentTot, evalArr[i + 1], evalArr[i]);
    }
    // plus before the var converts the result to a number which removes extra zeros, then the empty string converts it back to a string
    currentOut = +currentTot.toPrecision(9) + "";
    prevEvalCheck = true; // tracks when equals has been pressed
    dispOutput();
});

// Decimal button
btnDot.addEventListener("click", () => {
    if (prevEvalCheck) {
        currentOut = "";
        prevEvalCheck = false;
    }
    evalArr = currentOut.split(/([-+×÷^]+)/);
    if (evalArr[evalArr.length - 1].includes(".")) return; // returns if the current number already contains a decimal

    currentOut += btnDot.innerHTML;
    dispOutput();
});

// Delete key
btnDel.addEventListener("click", () => {
    currentOut = currentOut.slice(0, -1); // removes the last char from the output string
    dispOutput();
});

// All clear (AC) button
btnClear.addEventListener("click", () => {
    currentOut = "";
    prevOut.innerHTML = "";
    dispOutput();
});

// Event listener to allow keyboard inputs
document.addEventListener("keydown", (e) => {
    // The button index has to be specified since the nodelist is not ordered
    if (e.key === "0") btnNums[9].click();
    if (e.key === "1") btnNums[6].click();
    if (e.key === "2") btnNums[7].click();
    if (e.key === "3") btnNums[8].click();
    if (e.key === "4") btnNums[3].click();
    if (e.key === "5") btnNums[4].click();
    if (e.key === "6") btnNums[5].click();
    if (e.key === "7") btnNums[0].click();
    if (e.key === "8") btnNums[1].click();
    if (e.key === "9") btnNums[2].click();

    if (e.key === ".") btnDot.click();
    if (e.key === "Backspace") btnDel.click();
    if (e.key === "Delete") btnClear.click();

    if (e.key === "p") btnOps[0].click(); // PI
    if (e.key === "^") btnOps[1].click();
    if (e.key === "/") btnOps[2].click();
    if (e.key === "*") btnOps[3].click();
    if (e.key === "-") btnOps[4].click();
    if (e.key === "+") btnOps[5].click();
    if (e.key === "=" || e.key === "Enter") btnEquals.click();
});
