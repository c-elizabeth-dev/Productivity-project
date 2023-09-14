export default class TodoMain {
  
}


let checkElements = document.getElementsByClassName('circle-check-todo');


for (let i=0; i < checkElements.length; i++) {
    checkElements[i].addEventListener('click', function () {
        this.classList.toggle('circle-done')
    })
}

let newTask = document.querySelector('.appended-area');
let textbox = document.querySelector('.new-task-input');
let addButton = document.querySelector('.submit');


textbox.addEventListener('keydown', function (event) {
    if (event.key === 'Backspace') {
      event.preventDefault();
      event.stopImmediatePropagation();                                                      //* Prevent the default backspace behavior which navigates back in the browser
      textbox.value = textbox.value.slice(0, -1);           //* Remove the last character from the input value
    } else if (event.key === 'Enter') {
      event.preventDefault();
      event.stopImmediatePropagation(); 
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
