const numberButtons = document.querySelectorAll('button[data-type="number"]');
const operationButtons = document.querySelectorAll('button[data-type="operation"]');
const specialButtons = document.querySelectorAll('button[data-type="special"]');
const allButtons = document.querySelectorAll('button');
const resultElement = document.getElementById("result");

const errorSounds = [
    'sounds/error/among-us-role-reveal-sound.mp3',
    'sounds/error/sponge-stank-noise.mp3',
    'sounds/error/spongebob-fail.mp3'
]
const numberOperationSounds = [
    'sounds/number-operation/bonk.mp3'
]

const resultSounds = [
    'sounds/result/Biden-SODA.mp3',
    'sounds/result/clash-royale-hog-rider.mp3',
    'sounds/result/deg-deg_4M6Cojn.mp3',
    'sounds/result/hawk-tuah.mp3',
    'sounds/result/mlg-airhorn.mp3',
    'sounds/result/obamna.mp3',
    'sounds/result/oh-my-god-meme.mp3',
    'sounds/result/sad-meow-song.mp3',
    'sounds/result/skibidi-toilet.mp3',
    'sounds/result/we-got-him.mp3',
    'sounds/result/yipeeee.mp3'
]

let calculationArray = []

numberButtons.forEach(button => {
    button.addEventListener('click', function(){
        console.log(this.dataset.value + ' was clicked!');
        // Tack on digit to to last element if it also was a digit
        if (calculationArray && (!isNaN(calculationArray[calculationArray.length-1]) || calculationArray[calculationArray.length-1] == '.')){
            console.log(this.dataset.value + " was appended to last number");
            calculationArray[calculationArray.length-1] += this.dataset.value;
        }
        else{
            calculationArray.push(this.dataset.value);
        }
        playSound(numberOperationSounds);

        
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', function(){
        // Input verification, only if last input is a number do we append the operation
        if (isLastInputNumber(calculationArray)){
            calculationArray.push(this.dataset.value);
        }
        else{
            playSound(errorSounds);
        }
        
    });
});

specialButtons.forEach(button => {
    button.addEventListener('click', function(){
        console.log('Special button is: ' + this.dataset.value);
        if (this.dataset.value == 'clear'){ // Clears all elements in array
            calculationArray = [];
            return;
        }
        else if(this.dataset.value == 'calculate'){ // Calculate result
            let result = calculateResult(calculationArray);
            calculationArray = result;
            return;
        }
        // Percent Function, valid if last input is a non 0 number
        else if(this.dataset.value == 'percent' && 
            isLastInputNumber(calculationArray) &&
            calculationArray[calculationArray.length-1] != 0)
        { 
            calculationArray[calculationArray.length-1] /= 100;
            return;
        }
        else if(this.dataset.value == 'sign'){ // Changes sign of last number
            if (isLastInputNumber(calculationArray)){ 
                calculationArray[calculationArray.length-1] *= -1;
            }
            else{
                // Play an error Noise
            }
            return;
        }
        else if(this.dataset.value == 'decimal'){ // Adds decimal point
            if (calculationArray && 
                isLastInputNumber(calculationArray) && 
                !calculationArray[calculationArray.length-1].includes('.'))
            {
                calculationArray[calculationArray.length-1] += '.';
            }
            else if (calculationArray.length > 0 && calculationArray[calculationArray.length-1].includes('.')){
                console.log('Error: Last number contains decimal');
                // Error, last number contains a decimal
            }
            else{
                calculationArray.push('0.');
            }
            return;
        }
    });
});


// Here is where the math happens 
// To do: There is a major error in my code in which it is string - operation - string math
function calculateResult(inputArray){
    // This code will follow order of operations, we will first loop and look for and calculate * and /
    // Then look for + and -, calculate
    // Last input is an operation which makes calculation invalid, return an the array and do not calculate
    if (!isLastInputNumber(calculationArray)){ 
        // Play an Error sound 
        console.log("Error: Last input is an operation");
        return calculationArray;
    }

    // Multiplication and Division 
    let newCalculationArray = [];
    for (let i = 0; i < calculationArray.length; i++){
        // Multiplication, error checks for index not needed, array already valid.
        if (calculationArray[i] == "×"){ 
            const firstNumber = Number(newCalculationArray.pop());
            const secondNumber = Number(calculationArray[i+1]);
            newCalculationArray.push((firstNumber * secondNumber).toString());
            i++;
        }
        // Division 
        else if (calculationArray[i] == "÷"){
            const firstNumber = Number(newCalculationArray.pop());
            const secondNumber = Number(calculationArray[i+1]);
            if (secondNumber == 0){ 
                console.log("Cannot divide by 0");
                newCalculationArray.push(firstNumber.toString());
                newCalculationArray.push("÷");
                // Error Sound 
            }
            else{
                newCalculationArray.push((firstNumber / secondNumber).toString());
                i++;
            }
        }
        else{
            newCalculationArray.push(calculationArray[i]);
        }
    }

    // Done multiplying and dividing, onto addition and subtraction
    calculationArray = newCalculationArray;
    newCalculationArray = [];
    for (let i = 0; i < calculationArray.length; i++){
        // Multiplication, error checks for index not needed, array already valid.
        if (calculationArray[i] == "+"){ 
            let firstNumber = Number(newCalculationArray.pop());
            let secondNumber = Number(calculationArray[i+1]);

            // Need to multiply by each number 10^n where n is the max number of decimal places
            // Add, then divide again by 10^n
            let maxDecimalPlace = Math.max(getDecimalPlaces(firstNumber), getDecimalPlaces(secondNumber));
            firstNumber *= (10 ** maxDecimalPlace);
            secondNumber *= (10 ** maxDecimalPlace);
            let result = firstNumber + secondNumber;
            result /= (10 ** maxDecimalPlace);
            newCalculationArray.push((result).toString());
            i++;
        }
        else if (calculationArray[i] == "-"){
            let firstNumber = Number(newCalculationArray.pop());
            let secondNumber = Number(calculationArray[i+1]);
            
            // Again complex exponent operation needed 
            let maxDecimalPlace = Math.max(getDecimalPlaces(firstNumber), getDecimalPlaces(secondNumber));
            firstNumber *= (10 ** maxDecimalPlace);
            secondNumber *= (10 ** maxDecimalPlace);
            let result = firstNumber - secondNumber;
            result /= (10 ** maxDecimalPlace);
            newCalculationArray.push((result).toString());
            i++;
        }
        else{
            newCalculationArray.push(calculationArray[i]);
        }
    }
    // Return Result, should be 1 number
    calculationArray = newCalculationArray;
    playSound(resultSounds);
    return calculationArray;
}

// Check if last element of array is a number
function isLastInputNumber(array){
    if (array && !isNaN(array[array.length-1])){
        return true;
    }
    else{
        return false;
    }
}

// Get the place value of the last digit as a int
function getDecimalPlaces(num) {
    const str = num.toString();
    const decimalIndex = str.indexOf('.');
    if (decimalIndex === -1){
        return 0;
    }
    else{
        return  str.length - decimalIndex - 1;
    }
}

function playSound(sounds){
    const len = sounds.length;
    const randomIndex = Math.floor(Math.random() * len);
    const randomSound = new Audio(sounds[randomIndex]);
    randomSound.play();
}

// Display Array
allButtons.forEach(button => {
    button.addEventListener('click', function(){
        resultElement.innerText = calculationArray.join(" ");
        console.log('Calculation Array: ' + calculationArray.join(" "));
    });
});





