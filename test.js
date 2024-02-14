// Tasks are stored in the form of object arrays
const myTasks = [];

// Task constructor
class Task {
    constructor(title, description, date, priority) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.priority = priority;
    }
}
  
function addTasksToMyTasks(title, description, date, priority) {
    let newTask = new Task(title, description, date, priority);
    myTasks.push(newTask);
    console.log(myTasks);
}

let taskForm = document.querySelector('#task-form');

// Submit button 
taskForm.addEventListener('submit', function(event){
    event.preventDefault();
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    let date = document.querySelector('#date').value;
    let priority = document.querySelector('#priority-select').value;
    addTasksToMyTasks(title, description, date, priority);
    taskForm.reset();
    formDialog.close();
})

// Display the task form when pressing the add task button
let addTaskButton = document.querySelector('#add-task-button');
let formDialog = document.querySelector('#form-dialog');
addTaskButton.addEventListener('click', () => {
    formDialog.showModal()
});

// Close the modal box when user clicks outside the modal
formDialog.addEventListener("click", e => {
    const dialogDimensions = formDialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      formDialog.close()
    }
})