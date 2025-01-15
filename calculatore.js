const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');


let currentInput = '';
let previousInput = '';
let operator = '';


function updateDisplay() {
    if (operator && previousInput) {
        display.value = `(${previousInput}) ${operator} ${currentInput}`; 
    } else {
        display.value = currentInput || previousInput || '0'; 
    }
}


function handleNumberInput(value) {
    if (currentInput.length < 15) { 
        if (/^0(?!\.)/.test(currentInput)) { 
            currentInput = value;
        } else {
            
            if (!isNaN(value) || (value === '.' && !currentInput.includes('.'))) {
                currentInput += value;
            }
        }
        updateDisplay();
    }
}


function handleOperatorInput(value) {
    if (currentInput === '' && previousInput === '') return; 

    if (currentInput !== '' && previousInput !== '') {
        calculate(); 
    }

    operator = value;
    previousInput = currentInput;
    currentInput = '';
}


function clearInputs() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Cannot divide by zero' : prev / current; 
            break;
        default:
            return;
    }

    currentInput = result.toString().substring(0, 15); 
    operator = '';
    previousInput = '';
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (!isNaN(value)) {
            handleNumberInput(value);
        } else if (['+', '-', '*', '/'].includes(value)) {
            handleOperatorInput(value);
        } else if (value === 'C') {
            clearInputs();
        }

        updateDisplay();
    });
});


equalsButton.addEventListener('click', () => {
    calculate();
    updateDisplay();
});


clearInputs();
