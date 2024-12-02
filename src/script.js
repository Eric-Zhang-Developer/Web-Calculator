const numberButtons = document.querySelectorAll('button[data-type="number"]');
const operationButtons = document.querySelectorAll('button[data-type="operation"]');

numberButtons.forEach(button => {
    button.addEventListener('click', function(){
        console.log(this.dataset.value + ' was clicked!');
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', function(){
        console.log('Operation is: ' + this.dataset.value);
    });
});

