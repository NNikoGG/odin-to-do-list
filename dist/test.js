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

// Display the books in the page
function render(){
  let taskList = document.querySelector(".task-container");
  taskList.innerHTML = '';
  for (let i = 0; i < myTasks.length; i++){
      let task = myTasks[i];
      let taskWrapper = document.createElement('div');
      taskWrapper.className = "task";
      taskList.appendChild(taskWrapper);
      let taskName = document.createElement('p');
      taskName.innerText = task.title;
      let taskDescription = document.createElement('p');
      taskDescription.innerText = task.description;
      let taskDate = document.createElement('p');
      taskDate.innerText = task.date;
      let taskPriority = document.createElement('p');
      taskPriority.innerText = task.priority;
      let removeButton = document.createElement('button');
      removeButton.innerText = "X";
      removeButton.className = "remove-button";
      removeButton.dataset.index = i;

      taskWrapper.appendChild(taskName);
      taskWrapper.appendChild(taskDescription);
      taskWrapper.appendChild(taskDate);
      taskWrapper.appendChild(taskPriority);
      taskWrapper.appendChild(removeButton);
  }
}


function addTasksToMyTasks(title, description, date, priority) {
    let newTask = new Task(title, description, date, priority);
    myTasks.push(newTask);
    console.log(myTasks);
    render();
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

// Remove button
function remove(index){
  myTasks.splice(index, 1);
  render();
  console.log(myTasks);
}

document.addEventListener('click', function(event){
  if (event.target && event.target.className == 'remove-button') {
      let index = event.target.dataset.index; // Get the index from the data attribute
      remove(index);
  }
});



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