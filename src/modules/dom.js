import { myTasks, toggleTaskCompletion } from './tasks.js';
import { myProjects } from './projects.js';
import { format, isToday, isThisWeek } from 'date-fns';

function render(tasks = myTasks, formDialog, taskForm, editTaskForm) {
    let taskList = document.querySelector(".task-container");
    taskList.innerHTML = '';
    
    // Sort tasks by date using native JavaScript Date parsing
    const sortedTasks = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    for (let i = 0; i < sortedTasks.length; i++){
        let task = sortedTasks[i];
        let taskWrapper = document.createElement('div');
        taskWrapper.className = "task";
        taskWrapper.dataset.index = i;
        if(task.project) {
          taskWrapper.dataset.projectTitle = task.project.title;
        }

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
          const projectTitle = this.closest('.task').dataset.projectTitle;
          const index = this.dataset.index;
          toggleTaskCompletion(projectTitle, index);
          render(tasks, formDialog, taskForm, editTaskForm); // Re-render the tasks
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
        editButton.addEventListener('click', function(event) {
          // Prevent the event from triggering the taskWrapper's click event
          event.stopPropagation();
          const taskIndex = this.dataset.index;
          const task = tasks[taskIndex];
          const editTaskForm = document.querySelector('#edit-task-form');
          const editTaskDialog = document.querySelector('#edit-task-dialog');
          if (task) {
              document.querySelector('#edit-title').value = task.title;
              document.querySelector('#edit-description').value = task.description;
              document.querySelector('#edit-date').value = task.date;
              document.querySelector('#edit-priority-select').value = task.priority;
              document.querySelector('#edit-project-select').value = task.project.title;
              // Store the task's index and project title in the form's dataset
              editTaskForm.dataset.editingIndex = taskIndex;
              editTaskForm.dataset.projectTitle = task.project.title;
              // Show the edit task dialog
              editTaskDialog.showModal();
              editTaskDialog.addEventListener('click', (e) => {
                const dialogDimensions = editTaskDialog.getBoundingClientRect();
                if (
                    e.clientX < dialogDimensions.left ||
                    e.clientX > dialogDimensions.right ||
                    e.clientY < dialogDimensions.top ||
                    e.clientY > dialogDimensions.bottom
                ) {
                    editTaskDialog.close();
                }
              });
          } else {
              console.error('Task not found at index:', taskIndex);
          }
        });

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
    }
}

function getAllTasks() {
  return myProjects.flatMap(project => project.tasks);
}

function renderTodayTasks(formDialog, taskForm, editTaskForm) {
  const allTasks = getAllTasks();
  const todayTasks = allTasks.filter(task => isToday(new Date(task.date)));
  render(todayTasks, formDialog, taskForm, editTaskForm);
}

function renderThisWeekTasks(formDialog, taskForm, editTaskForm) {
  const allTasks = getAllTasks();
  const thisWeekTasks = allTasks.filter(task => isThisWeek(new Date(task.date)));
  render(thisWeekTasks, formDialog, taskForm, editTaskForm);
}

function renderCompletedTasks(formDialog, taskForm, editTaskForm) {
  const allTasks = getAllTasks();
  const completedTasks = allTasks.filter(task => task.completed);
  render(completedTasks, formDialog, taskForm, editTaskForm);
}

function renderProjects(projects) {
  const projectsContainer = document.querySelector('.projects-container');
  const projectSelect = document.querySelector('#project-select');
  projectsContainer.innerHTML = ''; // Clear existing projects
  projectSelect.innerHTML = '<option value="none">Select Project</option>'; // Reset the select menu
  const editProjectSelect = document.querySelector('#edit-project-select');
  editProjectSelect.innerHTML = '<option value="none">Select Project</option>';
  projects.forEach((project) => {
      const option = document.createElement('option');
      option.value = project.title;
      option.textContent = project.title;
      editProjectSelect.appendChild(option);
  });
  projects.forEach((project, index) => {
    // Render project buttons
    const projectButton = document.createElement('button');
    projectButton.id = `project-${index}`;
    projectButton.innerHTML = `
      <i class="fa-solid fa-list-ul"></i>
      <p>${project.title}</p>
    `;
    projectButton.addEventListener('click', () => {
      renderTasksByProject(project.title);
    });
    projectsContainer.appendChild(projectButton);

    // Add options to the select menu
    const option = document.createElement('option');
    option.value = project.title;
    option.textContent = project.title;
    projectSelect.appendChild(option);
  });
}

function renderTasksByProject(projectTitle) {
  const project = myProjects.find(p => p.title === projectTitle);
  if (project) {
    render(project.tasks);
  } else {
    console.error('Project not found:', projectTitle);
  }
}

export { render, renderTodayTasks, renderThisWeekTasks, renderCompletedTasks, renderTasksByProject, renderProjects, getAllTasks };
