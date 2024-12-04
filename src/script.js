const numberButtons = document.querySelectorAll('button[data-type="number"]');
const operationButtons = document.querySelectorAll('button[data-type="operation"]');
const specialButtons = document.querySelectorAll('button[data-type="special"]');
const allButtons = document.querySelectorAll('button');
const resultElement = document.getElementById("result");

let calculationArray = []

numberButtons.forEach(button => {
    button.addEventListener('click', function(){
        console.log(this.dataset.value + ' was clicked!');
        calculationArray.push(this.dataset.value);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', function(){
        console.log('Operation is: ' + this.dataset.value);
        calculationArray.push(this.dataset.value);
    });
});

specialButtons.forEach(button => {
    button.addEventListener('click', function(){
        console.log('Special button is: ' + this.dataset.value);
        calculationArray.push(this.dataset.value);
        console.log('Calculation Array: ' + calculationArray);
    });
});

allButtons.forEach(button => {
    button.addEventListener('click', function(){
        resultElement.innerText = calculationArray.join(" ");
        console.log('Calculation Array: ' + calculationArray.join(" "));
    });
});




