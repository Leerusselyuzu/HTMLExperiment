document.getElementById('button').addEventListener('click', synchronous);

assetsTotal = 0;
expenseTotal = 0;
incomeTotal = 0;

const inputGatherer = function() {
    // Gather Expense Inputs
   expenseTotal =  setTimeout(() => {
        let result = 0
        for (let input of document.querySelectorAll(".expenseInput")) {
            if (input.name === "included") {
                result += input.value - 0 //convert to number
            } else {
                result += + 0 //convert to number
            }
            
        }
        document.getElementById('expenseDisplay').innerHTML = `£${result}`
        expenseTotal = result
    }, 0)
    // Gather Assets Inputs
     assetsTotal =  setTimeout(() => {
        let result = 0
        for (let input of document.querySelectorAll(".assetInput")) {
            if (input.name === "included") {
                result += input.value - 0 //convert to number
                console.log(result)
            } else {
                result += + 0 //convert to number
            }

        }
        document.getElementById('assetsDisplay').innerHTML = `£${result}`
        assetsTotal = result
    }, 0)
    // Gather Income Inputs
     incomeTotal =  setTimeout(() => {
        let result = 0
        for (let input of document.querySelectorAll(".incomeInput"))
            if (input.name === "included") {
                result += input.value - 0 //convert to number
        } else {
                result += + 0 //convert to number
        } 
        document.getElementById('incomeDisplay').innerHTML = `£${result}`
        incomeTotal = result
    }, 0)


    };
   
    //submit values and work out runway calculaation
    function submitValues() {
        let runway = 0;
        let balance = assetsTotal;
        do {
            balance = (balance - expenseTotal) + incomeTotal;
            runway++;
        } while (runway < 60 && balance >= 0);
    
        if (runway === 60) {
            document.getElementById('months').innerHTML = `You will never run out of money at this rate`;
        } else {
            document.getElementById('months').innerHTML = `You have ${runway - 1} months left before you run out of money`;
        }
    
    };

    function synchronous() {
        inputGatherer();
        setTimeout(submitValues);
    };

 //Pass toggle target and select next input to include or exclude the value from runway calculations
function optionSelected (me) {
    let nextSiblingStart = me;
    getNextSiblingTest(nextSiblingStart);
    };

function getNextSiblingTest(nextSiblingStart) {

        let selector = '.'+nextSiblingStart.className+'Input';

        if (document.querySelector(`${selector}`).name === 'excluded') {
           document.querySelector(`${selector}`).setAttribute('name', 'included');
        } else {
            document.querySelector(`${selector}`).setAttribute('name', 'excluded');
        }
    };

    // dialog show / hide functionality 
    const dialog = document.querySelector('.example-dialog');
    dialog.addEventListener('close', () => {
        // this is where a function should go to reset the input values to empty when closed
    });
    
    const openDialog = document.querySelector('.open-dialog');
    openDialog.addEventListener('click', () => {
      if (typeof dialog.showModal === 'function') {
          dialog.showModal();
          dialog.style.display = 'flex';  
            console.log('I fired')      
    }});
    
    const addInputButton = document.querySelector('.addInput');
    addInputButton.addEventListener('click', () => {
        dialog.close();
        dialog.style.display = 'none'; 
    });

    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        document.querySelectorAll('dialogInput').value = '0';
        dialog.close();
        dialog.style.display = 'none'; 
    });
