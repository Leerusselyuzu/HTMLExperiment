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
        dialog.value = '0';
        dialog.style.display = 'none';
    });
    
    const openDialog = document.querySelector('.open-dialog');
    openDialog.addEventListener('click', () => {
      if (typeof dialog.showModal === 'function') {
          dialog.showModal();
          dialog.style.display = 'flex';  
    }});
    
    const addInputButton = document.querySelector('.addInput');
    addInputButton.addEventListener('click', () => {
        let select = document.getElementById('typeSelector');
        let selectedValue = select.options[select.selectedIndex].value;
        let newInputCard = new createInput(selectedValue, dialogNameInput.value, dialogAmountInput.value);
        newInputCard.addNewInput();
        dialog.close();
    });

    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        dialog.close();
    });


    const createInputPrototype = {
        addNewInput() {

            const newInputCard = document.createElement("div");
            newInputCard.setAttribute('class', 'inputCard');
            newInputCard.innerHTML = `<div class="inputCardSwitch"><label class="switch"><input type="checkbox" class="${this.name}" checked onclick="return optionSelected(this)"><span class="slider round"></span></label></div><div class="inputCardData"><label for="expenses">${this.name}</label><input type="text" id="income" name="included" placeholder="£${this.amount}" class="${this.name}Input ${this.type}Input" value="${this.amount}"></div>`;
            newInputCard.setAttribute('class', 'inputCard');

            const targetDiv = document.getElementById(this.type+'List');
            console.log(targetDiv);

            targetDiv.appendChild(newInputCard);
        }
    }

    function createInput(type, name, amount) {
        this.type = type;
        this.name = name;
        this.amount = amount;
    }

    createInput.prototype = createInputPrototype;
    createInput.prototype.constructor = createInput;

