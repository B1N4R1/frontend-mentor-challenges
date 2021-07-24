class Calculator {

    constructor(prevOperandText, curOperandText){
        this.curOperandText = curOperandText;
        this.prevOperandText = prevOperandText;
        this.clear();
    }

    clear() {
        this.curOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.curOperand = this.curOperand.toString().slice(0, -1);
    }

    appendNum(number) {
        if(number === '.' && this.curOperand.includes('.')) return;
        this.curOperand = this.curOperand.toString() + number.toString();
    }

    getOperation(operation) {
        if (this.curOperand === '') return;
        if (this.prevOperand !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.prevOperand = this.curOperand;
        this.curOperand = '';
    }

    calculate() {
        let result;
        const prev = parseFloat(this.prevOperand);
        const cur = parseFloat(this.curOperand);

        if (isNaN(prev) || isNaN(cur)) return;

        switch (this.operation) {
            
            case '+':
                result = prev + cur;
                break;
            
            case '-':
                result = prev - cur;
                break;
            
            case 'x':
                result = prev * cur;
                break;

            case '/':
                result = prev / cur;
                break;
        
            default:
                return;

        }


        this.curOperand = this.roundNumber(result);
        this.operation = undefined;
        this.prevOperand = '';

    }

    roundNumber(number) {

        const strNum = number.toString();
        const decimals = strNum.split('.')[1];

        if (decimals != null) {
            
            if (decimals.match(/^0+$/g)) {
                number = Math.round(number * 100) / 100;
            }
            else{
                number = number.toPrecision(5);
            }

        }

        return number;

    }

    convertNumber(number) {

        let result;
        const strNum = number.toString();
        const digits = parseFloat(strNum.split('.')[0])
        const decimals = strNum.split('.')[1];

        result = (isNaN(digits)) ? '' : digits.toLocaleString('en', {maximumFractionDigits: 0});
        result = (decimals != null) ? `${result}.${decimals}` : result;

        return result;

    }

    updateDisplay() {

        this.curOperandText.innerText = this.convertNumber(this.curOperand);
        this.prevOperandText.innerText = (this.operation != null) ? `${this.convertNumber(this.prevOperand)} ${this.operation}` : '';

    }

}

const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equal = document.querySelector('[data-equal]');
const del = document.querySelector('[data-del]');
const reset = document.querySelector('[data-reset]');
const prevOperandText = document.querySelector('[data-prev-operand]');
const curOperandText = document.querySelector('[data-cur-operand]');

const calculator = new Calculator(prevOperandText, curOperandText);

numbers.forEach(number => {
    number.addEventListener("click", () => {
        calculator.appendNum(number.innerText);
        calculator.updateDisplay();
    });
});

operations.forEach(operation => {
    operation.addEventListener("click", () => {
        calculator.getOperation(operation.innerText);
        calculator.updateDisplay();
    });
});

equal.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});

reset.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

del.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});