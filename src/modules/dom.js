import { myTasks } from './tasks.js';

function render(tasks = myTasks) {
    let taskList = document.querySelector(".task-container");
    taskList.innerHTML = '';
    // Sort tasks by date using native JavaScript Date parsing
    const sortedTasks = myTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    for (let i = 0; i < sortedTasks.length; i++){
        let task = sortedTasks[i];
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

function renderTodayTasks() {
    let taskList = document.querySelector(".task-container");
    taskList.innerHTML = '';
  
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
  
    const todayTasks = myTasks.filter(task => task.date === today);
  
    for (let i = 0; i < todayTasks.length; i++) {
      let task = todayTasks[i];
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

function renderThisWeekTasks() {
    let taskList = document.querySelector(".task-container");
    taskList.innerHTML = '';
  
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);
  
    const thisWeekTasks = myTasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate >= today && taskDate <= sevenDaysFromNow;
    });
  
    for (let i = 0; i < thisWeekTasks.length; i++) {
      let task = thisWeekTasks[i];
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

export { render, renderTodayTasks, renderThisWeekTasks };
