import { myTasks, toggleTaskCompletion } from './tasks.js';


function render(tasks = myTasks, formDialog, taskForm) {
    let taskList = document.querySelector(".task-container");
    taskList.innerHTML = '';
    
    // Sort tasks by date using native JavaScript Date parsing
    const sortedTasks = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    for (let i = 0; i < sortedTasks.length; i++){
        let task = sortedTasks[i];
        let taskWrapper = document.createElement('div');
        taskWrapper.className = "task";
        taskWrapper.dataset.index = i;

        // Check if the task is completed and add the 'completed' class accordingly
        if (task.completed) {
          taskWrapper.classList.add('completed');
        } else {
          taskWrapper.classList.remove('completed');
        }        

        taskList.appendChild(taskWrapper);

        let toggleButton = document.createElement('i');
        toggleButton.id = `toggle-button-${i}`;
        toggleButton.className = task.completed ? "fa-solid fa-circle-check" : "fa-regular fa-circle";
        toggleButton.dataset.index = i;
        toggleButton.addEventListener('click', function(event) {
          event.stopPropagation(); // Prevent the event from bubbling up to the taskWrapper
          const index = this.dataset.index;
          toggleTaskCompletion(index);
          render(tasks, formDialog, taskForm); // Re-render the tasks
        });      
        let taskName = document.createElement('p');
        taskName.id = 'task-title';
        taskName.innerText = task.title;
        let taskDescription = document.createElement('p');
        taskDescription.id = 'task-description';
        taskDescription.innerText = task.description;
        let taskDate = document.createElement('p');
        taskDate.id = 'task-date';
        taskDate.innerText = task.date;
        let taskPriority = document.createElement('p');
        taskPriority.id = 'task-priority';
        taskPriority.innerText = task.priority;
        let editButton = document.createElement('i');
        editButton.id = `edit-button-${i}`;
        editButton.className = "fa-solid fa-pen-to-square";
        editButton.dataset.index = i;
        let removeButton = document.createElement('i');
        removeButton.id = `remove-button-${i}`;
        removeButton.className = "fa-solid fa-circle-xmark";
        removeButton.dataset.index = i;

        taskWrapper.insertBefore(toggleButton, taskWrapper.firstChild);
        taskWrapper.appendChild(taskName);
        taskWrapper.appendChild(taskDescription);
        taskWrapper.appendChild(taskDate);
        taskWrapper.appendChild(taskPriority);
        taskWrapper.appendChild(editButton);
        taskWrapper.appendChild(removeButton);

        // In the render function in dom.js
        taskWrapper.addEventListener('click', function() {
          const index = this.dataset.index;
          const task = myTasks[index];
          document.querySelector('#title').value = task.title;
          document.querySelector('#description').value = task.description;
          document.querySelector('#date').value = task.date;
          document.querySelector('#priority-select').value = task.priority;
          formDialog.showModal();

          // Store the index of the task being edited in the form
          taskForm.dataset.editingIndex = index;
        });
    }
}

function renderTodayTasks(tasks = myTasks, formDialog, taskForm) {
  let taskList = document.querySelector(".task-container");
  taskList.innerHTML = '';
  const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
  const todayTasks = tasks.filter(task => task.date === today);
  render(todayTasks, formDialog, taskForm); // Use the main render function to render today's tasks
}

function renderThisWeekTasks(tasks = myTasks, formDialog, taskForm) {
  let taskList = document.querySelector(".task-container");
  taskList.innerHTML = '';
  const today = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(today.getDate() + 7);
  const thisWeekTasks = tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate >= today && taskDate <= sevenDaysFromNow;
  });
  render(thisWeekTasks, formDialog, taskForm); // Use the main render function to render this week's tasks
}


export { render, renderTodayTasks, renderThisWeekTasks };
