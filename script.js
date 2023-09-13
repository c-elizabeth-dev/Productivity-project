//* To do --- start---



let checkElements = document.getElementsByClassName('circle-check-todo');


for (let i=0; i < checkElements.length; i++) {
    checkElements[i].addEventListener('click', function () {
        this.classList.toggle('circle-done')
    })
}

let newTask = document.querySelector('.appended-area');
let textbox = document.querySelector('.new-task-input');
let addButton = document.querySelector('.submit');


// document.addEventListener('keydown', function (event) {
//   let patternForText = /[0-9]/g;
//   let patternForOperatorsText = /[+\-*\/]/g
//   if (event.key.match(patternForText)) {
//     event.preventDefault();
//     newTask.appendNumber(event.key)
//     newTask.updateDisplay()
//   }
// });

textbox.addEventListener('keydown', function (event) {
    if (event.key === 'Backspace') {
      event.preventDefault();                               //* Prevent the default backspace behavior which navigates back in the browser
      textbox.value = textbox.value.slice(0, -1);           //* Remove the last character from the input value
    } else if (event.key === 'Enter') {
      event.preventDefault();
      addButton.click();
    }
  });

addButton.addEventListener('click', function takeData(){    //* when button is clicked then execute this function
let taskText = textbox.value;
if (taskText.trim() !== '') {                               //* if not equal to empty (whitespace is trimmed) then execute following

let taskContainer = document.createElement('div');
taskContainer.classList.add('new-created-task');

    let newText=document.createElement('div');
    newText.classList.add('new-text');
    newText.textContent=taskText;

    let newCheck = document.createElement('div');
    newCheck.classList.add('circle-check-todo');

    let deleteIcon = document.createElement('ion-icon');
    deleteIcon.classList.add ('delete-icon');
    deleteIcon.setAttribute('name', 'trash');
    deleteIcon.addEventListener('click', function(){
        newTask.removeChild(taskContainer);
    });


    taskContainer.appendChild(newCheck);
    taskContainer.appendChild(newText);
    taskContainer.appendChild(deleteIcon);

newTask.appendChild(taskContainer);

// localStorage.setItem(newTask);

textbox.value= '';
}
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('circle-check-todo')) {
        event.target.classList.toggle('circle-done');
    }
});












//* Calculator -- start --
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)      //! converts the current operand to a string and 'slices' the last value from the string ex: (from index 0, all the way from -1 from the end)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {                                     //! will execute calculation already written before continuing with further calculation
        this.compute()                                                       //! checks if the previous operand already existed and does the computation before doing operand choosing
      }                                             
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {                                     
      let computation
      const prev = parseFloat(this.previousOperand)                          //! parse float, converting the string 'number' back to a number
      const current = parseFloat(this.currentOperand)                        //! parse float, converting the string 'number' back to a number
      if (isNaN(prev) || isNaN(current)) return                              //! checks if it is NaN or there is no current value then it will return (stop)
      switch (this.operation) {                                              //! allows us to do a group of if statements with our operations
        case '+':
          computation = prev + current                                       //! setting previous number and current number to add together
          break                                                              //! add break so the switch doesn't continue
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation                                      //! sets current operand as result of calculation
      this.operation = undefined                                             //! sets operation as undefined
      this.previousOperand = ''                                              //! sets previous operand as empty string
    }
  
    getDisplayNumber(number) {                                               //! return number alone would allow commas but...
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])           //! parseFloat string to number
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {                                         //! if the display is not null then display previous operand text element which is a concatenation of the prev operand and operation
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''                      //! or else display blank
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {                         //!calls the compute function and updates the display of the calculator
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {                         //! because in delete we set slice, it will only delete the last digit from current operand
    calculator.delete()
    calculator.updateDisplay()
  })
  
  document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    if (event.key.match(patternForNumbers)) {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key === '.') {
      event.preventDefault();
      calculator.appendNumber(event.key)
      calculator.updateDisplay()
    }
    if (event.key.match(patternForOperators)) {
      event.preventDefault();
      calculator.chooseOperation(event.key)
      calculator.updateDisplay()
    }
    if (event.key === 'Enter' || event.key === '=') {
      event.preventDefault();
      calculator.compute()
      calculator.updateDisplay()
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      calculator.delete()
      calculator.updateDisplay()
    }
    if (event.key == 'Delete') {
      event.preventDefault();
      calculator.clear()
      calculator.updateDisplay()
    }
  
  });

  //* Calculator -- end --


  //* Calendar ---Start ---

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();

  const day = document.querySelector(".calendar-dates");

  const currentDate = document.querySelector(".calendar-current-date");
  const prevNextIcons = document.querySelectorAll(".calendar-navigation span");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const manipulate = () => {
    let dayOne = new Date (year, month, 1).getDay();
    let lastDate = new Date (year, month +1, 0).getDate();
    let dayEnd = new Date(year, month, lastDate).getDay();
    let monthLastDate = new Date(year, month, 0).getDate();
    let lit="";
  

  for (let i=dayOne; i>0; i--) {
    lit +=
    `<li class="inactive">${monthLastDate - i + 1}</li>`;
  }

  for (let i=1; i <= lastDate; i++) {
    let isToday = i === date.getDate()
    && month === new Date().getMonth()
    && year === new Date().getFullYear()
    ? "active" : "";
    lit += `<li class="${isToday}">${i}</li>`
  }

  for (let i = dayEnd; i<6; i++) {
    lit += `<li class="inactive">${i - dayEnd + 1}</li>`
  }

  currentDate.innerText = `${months[month]} ${year}`;
  day.innerHTML=lit;
}

manipulate();

prevNextIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        month = icon.id ==="calendar-prev" ? month -1 :month +1;
        if (month < 0 || month > 11) {
            date = new Date(year, month, new Date().getDate());
            year = date.getFullYear();
            month = date.getMonth();
        }
        else {
            date = new Date();
        }
        manipulate();
        
    });
});

//* ---Calendar End ---
