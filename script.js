// Calculator state variables
let displayValue = '0';
let previousValue = null;
let operator = null;
let waitingForNewValue = false;

// Get display element
const display = document.getElementById('display');

/**
 * Update the display screen with current value
 */
function updateDisplay() {
    display.textContent = displayValue;
}

/**
 * Append a number to the display
 * @param {string} number - The number to append
 */
function appendNumber(number) {
    // If waiting for new value, replace current display
    if (waitingForNewValue) {
        displayValue = number;
        waitingForNewValue = false;
    } else {
        // If display is '0', replace it; otherwise append
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

/**
 * Append an operator to the calculation
 * @param {string} op - The operator (+, -, ×, ÷)
 */
function appendOperator(op) {
    // Get the current input value as a number
    const inputValue = parseFloat(displayValue);
    
    // If there's a previous value and operator, calculate first (chained operations)
    if (previousValue !== null && operator !== null && !waitingForNewValue) {
        // Perform the calculation but keep result for chaining
        const currentValue = parseFloat(displayValue);
        let result;
        
        // Use switch-case to handle different operators
        switch (operator) {
            case '+':
                result = previousValue + currentValue;
                break;
            case '-':
                result = previousValue - currentValue;
                break;
            case '×':
                result = previousValue * currentValue;
                break;
            case '÷':
                // Prevent division by zero
                if (currentValue === 0) {
                    displayValue = 'Error';
                    updateDisplay();
                    resetCalculator();
                    return;
                }
                result = previousValue / currentValue;
                break;
            default:
                return;
        }
        
        // Update display with result
        if (result % 1 === 0) {
            displayValue = result.toString();
        } else {
            displayValue = parseFloat(result.toFixed(10)).toString();
        }
        updateDisplay();
        
        // Store result as previous value for next operation
        previousValue = parseFloat(displayValue);
    } else if (previousValue === null) {
        // First operator: store current value
        previousValue = inputValue;
    }
    
    // Store the new operator and wait for next number input
    // This prevents multiple operators in a row - only the last one is kept
    operator = op;
    waitingForNewValue = true;
}

/**
 * Perform the calculation using switch-case
 * This function is called when equals button is clicked
 */
function calculate() {
    const currentValue = parseFloat(displayValue);
    
    // If there's no operator or previous value, nothing to calculate
    if (previousValue === null || operator === null) {
        return;
    }
    
    let result;
    
    // Use switch-case to handle different operators
    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '×':
            result = previousValue * currentValue;
            break;
        case '÷':
            // Prevent division by zero using if-else
            if (currentValue === 0) {
                displayValue = 'Error';
                updateDisplay();
                resetCalculator();
                return;
            } else {
                result = previousValue / currentValue;
            }
            break;
        default:
            return;
    }
    
    // Round result to handle floating point precision issues
    // Check if result is a whole number
    if (result % 1 === 0) {
        displayValue = result.toString();
    } else {
        // Limit decimal places to 10
        displayValue = parseFloat(result.toFixed(10)).toString();
    }
    
    updateDisplay();
    
    // Reset calculator state after calculation
    resetCalculator();
}

/**
 * Clear the display and reset calculator state
 */
function clearDisplay() {
    displayValue = '0';
    resetCalculator();
    updateDisplay();
}

/**
 * Reset calculator state variables
 */
function resetCalculator() {
    previousValue = null;
    operator = null;
    waitingForNewValue = false;
}

// Initialize display on page load
updateDisplay();

