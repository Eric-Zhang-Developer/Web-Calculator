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
            // Placeholder for sounds 
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
        calculationArray.push(this.dataset.value);
    });
});

allButtons.forEach(button => {
    button.addEventListener('click', function(){
        resultElement.innerText = calculationArray.join(" ");
        console.log('Calculation Array: ' + calculationArray.join(" "));
    });
});




