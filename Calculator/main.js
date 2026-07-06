class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.currentOperand = this.currentOperand.toString() + operation.toString();
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '×':
                computation = previous * current;
                break;
            case '÷':
                computation = previous / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }
}

const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const clearButton = document.querySelector("[data-clear]");
const solutionButton = document.querySelector("[data-solution]");
const previousOperandTextElement = document.querySelector("[data-previous-output]");
const currentOperandTextElement = document.querySelector("[data-current-output]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

solutionButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});