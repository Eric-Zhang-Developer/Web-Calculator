const numberButtons = document.querySelectorAll('button[data-type="number"]');
const operationButtons = document.querySelectorAll('button[data-type="operation"]');
const specialButtons = document.querySelectorAll('button[data-type="special"]');
const allButtons = document.querySelectorAll('button');
const resultElement = document.getElementById("result");

let calculationArray = []

numberButtons.forEach(button => {
    button.addEventListener('click', function(){
        console.log(this.dataset.value + ' was clicked!');
        // Tack on digit to to last element if it also was a digit
        if (calculationArray && !isNaN(calculationArray[calculationArray.length-1])){
            calculationArray[calculationArray.length-1] += this.dataset.value;
        }
        else{
            calculationArray.push(this.dataset.value);
        }
        
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', function(){
        // Input verification, only if last input is a number do we append the operation
        if (calculationArray && !isNaN(calculationArray[calculationArray.length-1])){
            calculationArray.push(this.dataset.value);
        }
        else{
            // Placeholder for sounds this will play a choice of error meme sound 
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
        else if(this.dataset.value == 'percent'){
            // To-Do - Implement percent function
            return;
        }
        else if(this.dataset.value == 'sign'){ // Changes sign of last number
            // To-Do - Implement sign function
            return;
        }
        calculationArray.push(this.dataset.value);
    });
});

// Here is where the math happens 
function calculateResult(inputArray){
    // This code will follow order of operations, we will first loop and look for and calculate * and /
    // Then look for + and -, calculate

    // Last input is an operation which makes calculation invalid, return an the array and do not calculate
    if (calculationArray && isNaN(calculationArray[calculationArray.length-1])){ 
        // Play an Error sound 
        console.log("Error: Last input is an operation");
        return calculationArray;
    }

    newCalculationArray = [];
    for (let i = 0; i < calculationArray.length; i++){
        if (calculationArray[i] == "×"){
            // To-Do: implement multiplication
        }
        if (calculationArray[i] == "÷"){
            // To-do: implement divison
        }
    }
    return [0];
}

allButtons.forEach(button => {
    button.addEventListener('click', function(){
        resultElement.innerText = calculationArray.join(" ");
        console.log('Calculation Array: ' + calculationArray.join(" "));
    });
});




