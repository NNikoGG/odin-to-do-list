/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAllTasks: () => (/* binding */ getAllTasks),
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   renderCompletedTasks: () => (/* binding */ renderCompletedTasks),
/* harmony export */   renderProjects: () => (/* binding */ renderProjects),
/* harmony export */   renderTasksByProject: () => (/* binding */ renderTasksByProject),
/* harmony export */   renderThisWeekTasks: () => (/* binding */ renderThisWeekTasks),
/* harmony export */   renderTodayTasks: () => (/* binding */ renderTodayTasks)
/* harmony export */ });
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ "./src/modules/tasks.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/modules/projects.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isToday.mjs");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/isThisWeek.mjs");




function render(tasks = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm, editTaskForm) {
  let taskList = document.querySelector(".task-container");
  taskList.innerHTML = '';
  
  // Sort tasks by date using native JavaScript Date parsing
  const sortedTasks = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  for (let i = 0; i < sortedTasks.length; i++){
      let task = sortedTasks[i];
      let taskWrapper = document.createElement('div');
      taskWrapper.className = "task";
      taskWrapper.dataset.index = i;
      if(task.projectTitle) {
        taskWrapper.dataset.projectTitle = task.projectTitle; 
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
        (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.toggleTaskCompletion)(projectTitle, index);
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
            document.querySelector('#edit-project-select').value = task.projectTitle;
            // Store the task's index and project title in the form's dataset
            editTaskForm.dataset.editingIndex = taskIndex;
            editTaskForm.dataset.projectTitle = task.projectTitle;
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
  return _projects_js__WEBPACK_IMPORTED_MODULE_1__.myProjects.flatMap(project => project.tasks);
}

function renderTodayTasks(formDialog, taskForm, editTaskForm) {
  const allTasks = getAllTasks();
  const todayTasks = allTasks.filter(task => (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.isToday)(new Date(task.date)));
  render(todayTasks, formDialog, taskForm, editTaskForm);
}

function renderThisWeekTasks(formDialog, taskForm, editTaskForm) {
  const allTasks = getAllTasks();
  const thisWeekTasks = allTasks.filter(task => (0,date_fns__WEBPACK_IMPORTED_MODULE_3__.isThisWeek)(new Date(task.date)));
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
  projects.forEach((project, index) => {
    // Render project buttons
    const projectButton = document.createElement('button');
    projectButton.id = `project-button-${index}`;
    projectButton.innerHTML = `
      <i class="fa-solid fa-list-ul"></i>
      <p>${project.title}</p>
    `;
    projectButton.addEventListener('click', () => {
      renderTasksByProject(project.title);
    });

    const editProjectButton = document.createElement('i');
    editProjectButton.dataset.index = index;
    editProjectButton.id = `edit-project-button-${index}`;
    editProjectButton.className = "fa-solid fa-pen-to-square";

    const removeProjectButton = document.createElement('i');
    removeProjectButton.dataset.index = index;
    removeProjectButton.id = `remove-project-button-${index}`;
    removeProjectButton.className = "fa-solid fa-circle-xmark";

    projectsContainer.appendChild(projectButton);
    projectButton.appendChild(editProjectButton);
    projectButton.appendChild(removeProjectButton);

    // Add options to the select menu
    const option = document.createElement('option');
    option.value = project.title;
    option.textContent = project.title;
    projectSelect.appendChild(option);
  });
}


function renderTasksByProject(projectTitle) {
  const project = _projects_js__WEBPACK_IMPORTED_MODULE_1__.myProjects.find(p => p.title === projectTitle);
  if (project) {
    render(project.tasks);
  } else {
    console.error('Project not found:', projectTitle);
  }
}




/***/ }),

/***/ "./src/modules/events.js":
/*!*******************************!*\
  !*** ./src/modules/events.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ "./src/modules/tasks.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./src/modules/dom.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects.js */ "./src/modules/projects.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");





const events = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const taskForm = document.querySelector('#task-form');
        const editTaskForm = document.querySelector('#edit-task-form');
        const projectForm = document.querySelector('#project-form');
        const addTaskButton = document.querySelector('#add-task-button');
        const formDialog = document.querySelector('#form-dialog');
        const editTaskDialog = document.querySelector('#edit-task-dialog');
        const projectDialog = document.querySelector('#project-dialog');
        const allTasksButton = document.querySelector('#all-tasks-button');
        const todayButton = document.querySelector('#today-button');
        const thisWeekButton = document.querySelector('#this-week-button');
        const completedTasksButton = document.querySelector('#completed-button');
        const addProjectButton = document.querySelector('#add-project-button');
        const editProjectDialog = document.querySelector('#edit-project-dialog');
        const editProjectForm = document.querySelector('#edit-project-form');

        // Loading previously saved tasks
        (0,_storage_js__WEBPACK_IMPORTED_MODULE_3__.loadFromLocalStorage)();

        // Adding a default project if no projects exist
        if (_projects_js__WEBPACK_IMPORTED_MODULE_2__.myProjects.length === 0) {
            const defaultProject = new _projects_js__WEBPACK_IMPORTED_MODULE_2__.Project("Default");
            _projects_js__WEBPACK_IMPORTED_MODULE_2__.myProjects.push(defaultProject);
            (0,_storage_js__WEBPACK_IMPORTED_MODULE_3__.saveToLocalStorage)();
        }

        taskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.querySelector('#title').value;
            const description = document.querySelector('#description').value;
            const date = document.querySelector('#date').value;
            const priority = document.querySelector('#priority-select').value;
            const projectTitle = document.querySelector('#project-select').value;
          
            if (taskForm.dataset.editingIndex !== undefined) {
              const taskIndex = taskForm.dataset.editingIndex;
              (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.updateTask)(projectTitle, taskIndex, title, description, date, priority, newProjectTitle);
              delete taskForm.dataset.editingIndex; // Clear the editing index
            } else {
              (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.addTask)(title, description, date, priority, projectTitle);
            }
          
            (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderTasksByProject)(projectTitle);
            taskForm.reset();
            formDialog.close();
        });
        
        editTaskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.querySelector('#edit-title').value;
            const description = document.querySelector('#edit-description').value;
            const date = document.querySelector('#edit-date').value;
            const priority = document.querySelector('#edit-priority-select').value;
            const projectTitle = editTaskForm.dataset.projectTitle;
            const newProjectTitle = document.querySelector('#edit-project-select').value;
            const taskIndex = editTaskForm.dataset.editingIndex;
          
            (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.updateTask)(projectTitle, taskIndex, title, description, date, priority, newProjectTitle);
            (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderTasksByProject)(newProjectTitle); 
            editTaskForm.reset();
            editTaskDialog.close();
            delete editTaskForm.dataset.editingIndex;
            delete editTaskForm.dataset.projectTitle;
        });       
        
        document.querySelector('#edit-project-select').addEventListener('change', function() {
            editTaskForm.dataset.projectTitle = this.value;
        });

        projectForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const projectTitle = document.querySelector('#project-title').value;
            if (projectForm.dataset.editingIndex !== undefined) {
                const projectIndex = projectForm.dataset.editingIndex;
                (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.updateProject)(projectIndex, projectTitle);
                delete projectForm.dataset.editingIndex; // Clear the editing index
            } else {
                (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.addProject)(projectTitle);
            }
        
            (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderProjects)(_projects_js__WEBPACK_IMPORTED_MODULE_2__.myProjects);
            projectForm.reset();
            projectDialog.close();
            delete projectForm.dataset.editingIndex;
        });

        editProjectForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const projectIndex = editProjectForm.dataset.projectIndex;
            const newProjectTitle = document.querySelector('#edit-project-title').value;
        
            if (projectIndex !== undefined) {
                (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.updateProject)(projectIndex, newProjectTitle);
                (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderProjects)(_projects_js__WEBPACK_IMPORTED_MODULE_2__.myProjects);
                editProjectDialog.close();
                delete editProjectForm.dataset.projectIndex; // Clear the project index
            } else {
                console.error('Project index not found');
            }
        });        
        
        addTaskButton.addEventListener('click', () => {
            formDialog.showModal();
        });

        formDialog.addEventListener('click', (e) => {
            const dialogDimensions = formDialog.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                formDialog.close();
            }
        });


        addProjectButton.addEventListener('click', () => {
            projectDialog.showModal();
        });

        projectDialog.addEventListener('click', (e) => {
            const dialogDimensions = projectDialog.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                projectDialog.close();
            }
        });
    
        allTasksButton.addEventListener('click', () => {
            const allTasks = (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.getAllTasks)();
            (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(allTasks, formDialog, taskForm, editTaskForm);
        });
        todayButton.addEventListener('click', () => (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderTodayTasks)(formDialog, taskForm, editTaskForm));
        thisWeekButton.addEventListener('click', () => (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderThisWeekTasks)(formDialog, taskForm, editTaskForm));
        completedTasksButton.addEventListener('click', () => (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderCompletedTasks)(formDialog, taskForm, editTaskForm));
        
        document.addEventListener('click', function(event) {
            if (event.target && event.target.id.startsWith('remove-button-')) {
              const projectTitle = event.target.closest('.task').dataset.projectTitle;
              const taskIndex = event.target.dataset.index;
              const updatedTasks = (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.removeTask)(projectTitle, taskIndex);
              (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(updatedTasks, formDialog, taskForm); // Re-render with the updated tasks array
            }

            else if (event.target && event.target.id.startsWith('edit-project-button-')) {
                editProjectDialog.showModal();
                editProjectForm.dataset.projectIndex = event.target.dataset.index;
                editProjectDialog.addEventListener('click', (e) => {
                    const dialogDimensions = editProjectDialog.getBoundingClientRect();
                    if (
                        e.clientX < dialogDimensions.left ||
                        e.clientX > dialogDimensions.right ||
                        e.clientY < dialogDimensions.top ||
                        e.clientY > dialogDimensions.bottom
                    ) {
                        editProjectDialog.close();
                    }
                });
            }

            else if (event.target && event.target.id.startsWith('remove-project-button-')) {
                const projectIndex = parseInt(event.target.dataset.index);
                (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.removeProject)(projectIndex);
                (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderProjects)(_projects_js__WEBPACK_IMPORTED_MODULE_2__.myProjects); // Re-render the projects list
        
                // Determine the index of the project to render after deletion
                const newProjectIndex = projectIndex > 0 ? projectIndex - 1 : 0;
        
                // Render the tasks of the new project if it exists
                if (_projects_js__WEBPACK_IMPORTED_MODULE_2__.myProjects.length > 0) {
                    (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderTasksByProject)(_projects_js__WEBPACK_IMPORTED_MODULE_2__.myProjects[newProjectIndex].title);
                } else {
                    (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)([]); // Clear the tasks list if no projects are left
                }
            }

          });

        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(_tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm, editTaskForm, editTaskDialog); // Initial render
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderProjects)(_projects_js__WEBPACK_IMPORTED_MODULE_2__.myProjects);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (events);


/***/ }),

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   addProject: () => (/* binding */ addProject),
/* harmony export */   myProjects: () => (/* binding */ myProjects),
/* harmony export */   removeProject: () => (/* binding */ removeProject),
/* harmony export */   updateProject: () => (/* binding */ updateProject)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");


// Project constructor
class Project {
    constructor(title) {
      this.title = title;
      this.tasks = [];
    }
  
    addTask(task) {
      this.tasks.push(task);
    }
  
    removeTask(index) {
      this.tasks.splice(index, 1);
    }
}
  
  
// Projects are stored in the form of object arrays
const myProjects = [];

function addProject(projectTitle) {
    const newProject = new Project(projectTitle);
    myProjects.push(newProject);
    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveToLocalStorage)();
    return myProjects;
}

function removeProject(projectIndex) {
    myProjects.splice(projectIndex, 1);
    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveToLocalStorage)();
    return myProjects;
}

function updateProject(projectIndex, newProjectTitle) {
  const project = myProjects[projectIndex];
  if (project) {
      project.title = newProjectTitle; // Update the title property
      (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveToLocalStorage)();
  } else {
      console.error('Project not found at index:', projectIndex);
  }
}



  
  

/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadFromLocalStorage: () => (/* binding */ loadFromLocalStorage),
/* harmony export */   saveToLocalStorage: () => (/* binding */ saveToLocalStorage)
/* harmony export */ });
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.js */ "./src/modules/projects.js");
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks.js */ "./src/modules/tasks.js");




function saveToLocalStorage() {
  const data = {
      projects: _projects_js__WEBPACK_IMPORTED_MODULE_0__.myProjects.map(project => ({
          title: project.title,
          tasks: project.tasks.map(task => ({
              title: task.title,
              description: task.description,
              date: task.date,
              priority: task.priority,
              completed: task.completed
          }))
      }))
  };
  localStorage.setItem('todoData', JSON.stringify(data));
}

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('todoData'));
  if (data) {
      _projects_js__WEBPACK_IMPORTED_MODULE_0__.myProjects.length = 0; // Clear existing projects
      _projects_js__WEBPACK_IMPORTED_MODULE_0__.myProjects.push(...data.projects.map(projectData => {
          const project = new _projects_js__WEBPACK_IMPORTED_MODULE_0__.Project(projectData.title);
          project.tasks = projectData.tasks.map(taskData => {
              const task = new _tasks_js__WEBPACK_IMPORTED_MODULE_1__.Task(taskData.title, taskData.description, taskData.date, taskData.priority, projectData.title);
              task.completed = taskData.completed;
              return task;
          });
          return project;
      }));
  }
}




/***/ }),

/***/ "./src/modules/tasks.js":
/*!******************************!*\
  !*** ./src/modules/tasks.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Task: () => (/* binding */ Task),
/* harmony export */   addTask: () => (/* binding */ addTask),
/* harmony export */   myTasks: () => (/* binding */ myTasks),
/* harmony export */   removeTask: () => (/* binding */ removeTask),
/* harmony export */   toggleTaskCompletion: () => (/* binding */ toggleTaskCompletion),
/* harmony export */   updateTask: () => (/* binding */ updateTask)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/modules/storage.js");



// Task constructor
class Task {
  constructor(title, description, date, priority, projectTitle) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.projectTitle = projectTitle;
    this.completed = false;
  }
}

// Tasks are stored in the form of object arrays
const myTasks = [];

function addTask(title, description, date, priority, projectTitle) {
  let project = _projects__WEBPACK_IMPORTED_MODULE_0__.myProjects.find(p => p.title === projectTitle);
  if (!project) {
    console.error('Project not found:', projectTitle);
    return;
  }
  const newTask = new Task(title, description, date, priority, projectTitle);
  project.addTask(newTask);
  (0,_storage__WEBPACK_IMPORTED_MODULE_1__.saveToLocalStorage)();
}



function removeTask(projectTitle, taskIndex) {
  const project = _projects__WEBPACK_IMPORTED_MODULE_0__.myProjects.find(p => p.title === projectTitle);
  if (!project) {
    console.error('Project not found:', projectTitle);
    return;
  }
  project.tasks.splice(taskIndex, 1);
  (0,_storage__WEBPACK_IMPORTED_MODULE_1__.saveToLocalStorage)();
  return project.tasks; // Return the updated tasks array
}


function updateTask(projectTitle, editTaskIndex, title, description, date, priority, newProjectTitle) {
  console.log(`Updating task in project: ${projectTitle}, task index: ${editTaskIndex}`);
  const project = _projects__WEBPACK_IMPORTED_MODULE_0__.myProjects.find(p => p.title === projectTitle);
  if (!project) {
    console.error('Project not found:', projectTitle);
    return;
  }
  console.log('Original project tasks before updating:', project.tasks);
  let task;
  if (editTaskIndex >= 0 && editTaskIndex < project.tasks.length) {
    task = project.tasks[editTaskIndex];
  } else {
    console.error('Task not found at index:', editTaskIndex);
    return;
  }

  // Update the task properties
  task.title = title;
  task.description = description;
  task.date = date;
  task.priority = priority;

  console.log('Original project tasks after updating but before moving:', project.tasks);

  // Check if the project has been changed
  if (newProjectTitle && newProjectTitle !== projectTitle) {
    // Find the new project
    const newProject = _projects__WEBPACK_IMPORTED_MODULE_0__.myProjects.find(p => p.title === newProjectTitle);
    if (newProject) {
      // Remove the task from the current project
      project.tasks.splice(editTaskIndex, 1);

      // Add the task to the new project
      newProject.addTask(task);
      task.project = newProject; // Update the task's project reference
      console.log('New project tasks:', newProject.tasks);
    } else {
      console.error('New project not found:', newProjectTitle);
    }
  }

  // Save changes to local storage
  (0,_storage__WEBPACK_IMPORTED_MODULE_1__.saveToLocalStorage)();
}


function toggleTaskCompletion(projectTitle, taskIndex) {
  const project = _projects__WEBPACK_IMPORTED_MODULE_0__.myProjects.find(p => p.title === projectTitle);
  if (!project) {
    console.error('Project not found:', projectTitle);
    return;
  }
  const task = project.tasks[taskIndex];
  if (!task) {
    console.error('Task not found at index:', taskIndex);
    return;
  }
  task.completed = !task.completed;
  (0,_storage__WEBPACK_IMPORTED_MODULE_1__.saveToLocalStorage)();
}





/***/ }),

/***/ "./node_modules/date-fns/_lib/defaultOptions.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/_lib/defaultOptions.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: () => (/* binding */ getDefaultOptions),
/* harmony export */   setDefaultOptions: () => (/* binding */ setDefaultOptions)
/* harmony export */ });
let defaultOptions = {};

function getDefaultOptions() {
  return defaultOptions;
}

function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}


/***/ }),

/***/ "./node_modules/date-fns/isSameDay.mjs":
/*!*********************************************!*\
  !*** ./node_modules/date-fns/isSameDay.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isSameDay: () => (/* binding */ isSameDay)
/* harmony export */ });
/* harmony import */ var _startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startOfDay.mjs */ "./node_modules/date-fns/startOfDay.mjs");


/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check

 * @returns The dates are in the same day (and year and month)
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(dateLeft, dateRight) {
  const dateLeftStartOfDay = (0,_startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateLeft);
  const dateRightStartOfDay = (0,_startOfDay_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfDay)(dateRight);

  return +dateLeftStartOfDay === +dateRightStartOfDay;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSameDay);


/***/ }),

/***/ "./node_modules/date-fns/isSameWeek.mjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isSameWeek.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isSameWeek: () => (/* binding */ isSameWeek)
/* harmony export */ });
/* harmony import */ var _startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startOfWeek.mjs */ "./node_modules/date-fns/startOfWeek.mjs");


/**
 * The {@link isSameWeek} function options.
 */

/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same week (and month and year)
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameWeek(dateLeft, dateRight, options) {
  const dateLeftStartOfWeek = (0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfWeek)(dateLeft, options);
  const dateRightStartOfWeek = (0,_startOfWeek_mjs__WEBPACK_IMPORTED_MODULE_0__.startOfWeek)(dateRight, options);

  return +dateLeftStartOfWeek === +dateRightStartOfWeek;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isSameWeek);


/***/ }),

/***/ "./node_modules/date-fns/isThisWeek.mjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/isThisWeek.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isThisWeek: () => (/* binding */ isThisWeek)
/* harmony export */ });
/* harmony import */ var _isSameWeek_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSameWeek.mjs */ "./node_modules/date-fns/isSameWeek.mjs");


/**
 * The {@link isThisWeek} function options.
 */

/**
 * @name isThisWeek
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to check
 * @param options - The object with options
 *
 * @returns The date is in this week
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */
function isThisWeek(date, options) {
  return (0,_isSameWeek_mjs__WEBPACK_IMPORTED_MODULE_0__.isSameWeek)(date, Date.now(), options);
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isThisWeek);


/***/ }),

/***/ "./node_modules/date-fns/isToday.mjs":
/*!*******************************************!*\
  !*** ./node_modules/date-fns/isToday.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   isToday: () => (/* binding */ isToday)
/* harmony export */ });
/* harmony import */ var _isSameDay_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isSameDay.mjs */ "./node_modules/date-fns/isSameDay.mjs");


/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to check
 *
 * @returns The date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(date) {
  return (0,_isSameDay_mjs__WEBPACK_IMPORTED_MODULE_0__.isSameDay)(date, Date.now());
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isToday);


/***/ }),

/***/ "./node_modules/date-fns/startOfDay.mjs":
/*!**********************************************!*\
  !*** ./node_modules/date-fns/startOfDay.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfDay: () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date) {
  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_0__.toDate)(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfDay);


/***/ }),

/***/ "./node_modules/date-fns/startOfWeek.mjs":
/*!***********************************************!*\
  !*** ./node_modules/date-fns/startOfWeek.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   startOfWeek: () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toDate.mjs */ "./node_modules/date-fns/toDate.mjs");
/* harmony import */ var _lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/defaultOptions.mjs */ "./node_modules/date-fns/_lib/defaultOptions.mjs");



/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = (0,_lib_defaultOptions_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultOptions)();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = (0,_toDate_mjs__WEBPACK_IMPORTED_MODULE_1__.toDate)(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startOfWeek);


/***/ }),

/***/ "./node_modules/date-fns/toDate.mjs":
/*!******************************************!*\
  !*** ./node_modules/date-fns/toDate.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   toDate: () => (/* binding */ toDate)
/* harmony export */ });
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (
    argument instanceof Date ||
    (typeof argument === "object" && argStr === "[object Date]")
  ) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new argument.constructor(+argument);
  } else if (
    typeof argument === "number" ||
    argStr === "[object Number]" ||
    typeof argument === "string" ||
    argStr === "[object String]"
  ) {
    // TODO: Can we get rid of as?
    return new Date(argument);
  } else {
    // TODO: Can we get rid of as?
    return new Date(NaN);
  }
}

// Fallback for modularized imports:
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toDate);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/events.js */ "./src/modules/events.js");


(0,_modules_events_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055Qzs7QUFFekMsOERBQU0sRyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9kZWZhdWx0T3B0aW9ucy5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzU2FtZURheS5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzU2FtZVdlZWsubWpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc1RoaXNXZWVrLm1qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNUb2RheS5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZEYXkubWpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mV2Vlay5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3RvRGF0ZS5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG15VGFza3MsIHRvZ2dsZVRhc2tDb21wbGV0aW9uIH0gZnJvbSAnLi90YXNrcy5qcyc7XHJcbmltcG9ydCB7IG15UHJvamVjdHMgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcclxuaW1wb3J0IHsgaXNUb2RheSwgaXNUaGlzV2VlayB9IGZyb20gJ2RhdGUtZm5zJztcclxuXHJcbmZ1bmN0aW9uIHJlbmRlcih0YXNrcyA9IG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtLCBlZGl0VGFza0Zvcm0pIHtcclxuICBsZXQgdGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpO1xyXG4gIHRhc2tMaXN0LmlubmVySFRNTCA9ICcnO1xyXG4gIFxyXG4gIC8vIFNvcnQgdGFza3MgYnkgZGF0ZSB1c2luZyBuYXRpdmUgSmF2YVNjcmlwdCBEYXRlIHBhcnNpbmdcclxuICBjb25zdCBzb3J0ZWRUYXNrcyA9IHRhc2tzLnNvcnQoKGEsIGIpID0+IG5ldyBEYXRlKGEuZGF0ZSkgLSBuZXcgRGF0ZShiLmRhdGUpKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNvcnRlZFRhc2tzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgbGV0IHRhc2sgPSBzb3J0ZWRUYXNrc1tpXTtcclxuICAgICAgbGV0IHRhc2tXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRhc2tXcmFwcGVyLmNsYXNzTmFtZSA9IFwidGFza1wiO1xyXG4gICAgICB0YXNrV3JhcHBlci5kYXRhc2V0LmluZGV4ID0gaTtcclxuICAgICAgaWYodGFzay5wcm9qZWN0VGl0bGUpIHtcclxuICAgICAgICB0YXNrV3JhcHBlci5kYXRhc2V0LnByb2plY3RUaXRsZSA9IHRhc2sucHJvamVjdFRpdGxlOyBcclxuICAgICAgfVxyXG4gICAgICAvLyBDaGVjayBpZiB0aGUgdGFzayBpcyBjb21wbGV0ZWQgYW5kIGFkZCB0aGUgJ2NvbXBsZXRlZCcgY2xhc3MgYWNjb3JkaW5nbHlcclxuICAgICAgaWYgKHRhc2suY29tcGxldGVkKSB7XHJcbiAgICAgICAgdGFza1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGFza1dyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxldGVkJyk7XHJcbiAgICAgIH0gICAgICAgIFxyXG4gICAgICB0YXNrTGlzdC5hcHBlbmRDaGlsZCh0YXNrV3JhcHBlcik7XHJcbiAgICAgIGxldCB0b2dnbGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgIHRvZ2dsZUJ1dHRvbi5pZCA9IGB0b2dnbGUtYnV0dG9uLSR7aX1gO1xyXG4gICAgICB0b2dnbGVCdXR0b24uY2xhc3NOYW1lID0gdGFzay5jb21wbGV0ZWQgPyBcImZhLXNvbGlkIGZhLWNpcmNsZS1jaGVja1wiIDogXCJmYS1yZWd1bGFyIGZhLWNpcmNsZVwiO1xyXG4gICAgICB0b2dnbGVCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XHJcbiAgICAgIHRvZ2dsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIFByZXZlbnQgdGhlIGV2ZW50IGZyb20gYnViYmxpbmcgdXAgdG8gdGhlIHRhc2tXcmFwcGVyXHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gdGhpcy5jbG9zZXN0KCcudGFzaycpLmRhdGFzZXQucHJvamVjdFRpdGxlO1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4O1xyXG4gICAgICAgIHRvZ2dsZVRhc2tDb21wbGV0aW9uKHByb2plY3RUaXRsZSwgaW5kZXgpO1xyXG4gICAgICAgIHJlbmRlcih0YXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSk7IC8vIFJlLXJlbmRlciB0aGUgdGFza3NcclxuICAgICAgfSk7ICAgICBcclxuXHJcbiAgICAgIGxldCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgdGFza05hbWUuaWQgPSAndGFzay10aXRsZSc7XHJcbiAgICAgIHRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGl0bGU7XHJcbiAgICAgIGxldCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIHRhc2tEZXNjcmlwdGlvbi5pZCA9ICd0YXNrLWRlc2NyaXB0aW9uJztcclxuICAgICAgdGFza0Rlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRhc2suZGVzY3JpcHRpb247XHJcbiAgICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgdGFza0RhdGUuaWQgPSAndGFzay1kYXRlJztcclxuICAgICAgdGFza0RhdGUuaW5uZXJUZXh0ID0gdGFzay5kYXRlO1xyXG4gICAgICBsZXQgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICB0YXNrUHJpb3JpdHkuaWQgPSAndGFzay1wcmlvcml0eSc7XHJcbiAgICAgIHRhc2tQcmlvcml0eS5pbm5lclRleHQgPSB0YXNrLnByaW9yaXR5O1xyXG4gICAgICBsZXQgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgZWRpdEJ1dHRvbi5pZCA9IGBlZGl0LWJ1dHRvbi0ke2l9YDtcclxuICAgICAgZWRpdEJ1dHRvbi5jbGFzc05hbWUgPSBcImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmVcIjtcclxuICAgICAgZWRpdEJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcclxuICAgICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gUHJldmVudCB0aGUgZXZlbnQgZnJvbSB0cmlnZ2VyaW5nIHRoZSB0YXNrV3JhcHBlcidzIGNsaWNrIGV2ZW50XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgY29uc3QgdGFza0luZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4O1xyXG4gICAgICAgIGNvbnN0IHRhc2sgPSB0YXNrc1t0YXNrSW5kZXhdO1xyXG4gICAgICAgIGNvbnN0IGVkaXRUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRhc2stZm9ybScpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRUYXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1kaWFsb2cnKTtcclxuICAgICAgICBpZiAodGFzaykge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10aXRsZScpLnZhbHVlID0gdGFzay50aXRsZTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGVzY3JpcHRpb24nKS52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LWRhdGUnKS52YWx1ZSA9IHRhc2suZGF0ZTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtcHJpb3JpdHktc2VsZWN0JykudmFsdWUgPSB0YXNrLnByaW9yaXR5O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1wcm9qZWN0LXNlbGVjdCcpLnZhbHVlID0gdGFzay5wcm9qZWN0VGl0bGU7XHJcbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSB0YXNrJ3MgaW5kZXggYW5kIHByb2plY3QgdGl0bGUgaW4gdGhlIGZvcm0ncyBkYXRhc2V0XHJcbiAgICAgICAgICAgIGVkaXRUYXNrRm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleCA9IHRhc2tJbmRleDtcclxuICAgICAgICAgICAgZWRpdFRhc2tGb3JtLmRhdGFzZXQucHJvamVjdFRpdGxlID0gdGFzay5wcm9qZWN0VGl0bGU7XHJcbiAgICAgICAgICAgIC8vIFNob3cgdGhlIGVkaXQgdGFzayBkaWFsb2dcclxuICAgICAgICAgICAgZWRpdFRhc2tEaWFsb2cuc2hvd01vZGFsKCk7XHJcbiAgICAgICAgICAgIGVkaXRUYXNrRGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBkaWFsb2dEaW1lbnNpb25zID0gZWRpdFRhc2tEaWFsb2cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICBlLmNsaWVudFggPCBkaWFsb2dEaW1lbnNpb25zLmxlZnQgfHxcclxuICAgICAgICAgICAgICAgICAgZS5jbGllbnRYID4gZGlhbG9nRGltZW5zaW9ucy5yaWdodCB8fFxyXG4gICAgICAgICAgICAgICAgICBlLmNsaWVudFkgPCBkaWFsb2dEaW1lbnNpb25zLnRvcCB8fFxyXG4gICAgICAgICAgICAgICAgICBlLmNsaWVudFkgPiBkaWFsb2dEaW1lbnNpb25zLmJvdHRvbVxyXG4gICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICBlZGl0VGFza0RpYWxvZy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGFzayBub3QgZm91bmQgYXQgaW5kZXg6JywgdGFza0luZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pOyAgICAgICAgXHJcblxyXG4gICAgICBsZXQgcmVtb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICByZW1vdmVCdXR0b24uaWQgPSBgcmVtb3ZlLWJ1dHRvbi0ke2l9YDtcclxuICAgICAgcmVtb3ZlQnV0dG9uLmNsYXNzTmFtZSA9IFwiZmEtc29saWQgZmEtY2lyY2xlLXhtYXJrXCI7XHJcbiAgICAgIHJlbW92ZUJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcclxuXHJcbiAgICAgIHRhc2tXcmFwcGVyLmluc2VydEJlZm9yZSh0b2dnbGVCdXR0b24sIHRhc2tXcmFwcGVyLmZpcnN0Q2hpbGQpO1xyXG4gICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrTmFtZSk7XHJcbiAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XHJcbiAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcclxuICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5KTtcclxuICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XHJcbiAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHJlbW92ZUJ1dHRvbik7XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldEFsbFRhc2tzKCkge1xyXG4gIHJldHVybiBteVByb2plY3RzLmZsYXRNYXAocHJvamVjdCA9PiBwcm9qZWN0LnRhc2tzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyVG9kYXlUYXNrcyhmb3JtRGlhbG9nLCB0YXNrRm9ybSwgZWRpdFRhc2tGb3JtKSB7XHJcbiAgY29uc3QgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xyXG4gIGNvbnN0IHRvZGF5VGFza3MgPSBhbGxUYXNrcy5maWx0ZXIodGFzayA9PiBpc1RvZGF5KG5ldyBEYXRlKHRhc2suZGF0ZSkpKTtcclxuICByZW5kZXIodG9kYXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclRoaXNXZWVrVGFza3MoZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSkge1xyXG4gIGNvbnN0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcclxuICBjb25zdCB0aGlzV2Vla1Rhc2tzID0gYWxsVGFza3MuZmlsdGVyKHRhc2sgPT4gaXNUaGlzV2VlayhuZXcgRGF0ZSh0YXNrLmRhdGUpKSk7XHJcbiAgcmVuZGVyKHRoaXNXZWVrVGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtLCBlZGl0VGFza0Zvcm0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJDb21wbGV0ZWRUYXNrcyhmb3JtRGlhbG9nLCB0YXNrRm9ybSwgZWRpdFRhc2tGb3JtKSB7XHJcbiAgY29uc3QgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xyXG4gIGNvbnN0IGNvbXBsZXRlZFRhc2tzID0gYWxsVGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay5jb21wbGV0ZWQpO1xyXG4gIHJlbmRlcihjb21wbGV0ZWRUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclByb2plY3RzKHByb2plY3RzKSB7XHJcbiAgY29uc3QgcHJvamVjdHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMtY29udGFpbmVyJyk7XHJcbiAgY29uc3QgcHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXNlbGVjdCcpO1xyXG4gIHByb2plY3RzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnOyAvLyBDbGVhciBleGlzdGluZyBwcm9qZWN0c1xyXG4gIHByb2plY3RTZWxlY3QuaW5uZXJIVE1MID0gJzxvcHRpb24gdmFsdWU9XCJub25lXCI+U2VsZWN0IFByb2plY3Q8L29wdGlvbj4nOyAvLyBSZXNldCB0aGUgc2VsZWN0IG1lbnVcclxuICBjb25zdCBlZGl0UHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByb2plY3Qtc2VsZWN0Jyk7XHJcbiAgZWRpdFByb2plY3RTZWxlY3QuaW5uZXJIVE1MID0gJzxvcHRpb24gdmFsdWU9XCJub25lXCI+U2VsZWN0IFByb2plY3Q8L29wdGlvbj4nO1xyXG4gIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XHJcbiAgICAvLyBSZW5kZXIgcHJvamVjdCBidXR0b25zXHJcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBwcm9qZWN0QnV0dG9uLmlkID0gYHByb2plY3QtYnV0dG9uLSR7aW5kZXh9YDtcclxuICAgIHByb2plY3RCdXR0b24uaW5uZXJIVE1MID0gYFxyXG4gICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpc3QtdWxcIj48L2k+XHJcbiAgICAgIDxwPiR7cHJvamVjdC50aXRsZX08L3A+XHJcbiAgICBgO1xyXG4gICAgcHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgcmVuZGVyVGFza3NCeVByb2plY3QocHJvamVjdC50aXRsZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBlZGl0UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgIGVkaXRQcm9qZWN0QnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpbmRleDtcclxuICAgIGVkaXRQcm9qZWN0QnV0dG9uLmlkID0gYGVkaXQtcHJvamVjdC1idXR0b24tJHtpbmRleH1gO1xyXG4gICAgZWRpdFByb2plY3RCdXR0b24uY2xhc3NOYW1lID0gXCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlXCI7XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgIHJlbW92ZVByb2plY3RCdXR0b24uZGF0YXNldC5pbmRleCA9IGluZGV4O1xyXG4gICAgcmVtb3ZlUHJvamVjdEJ1dHRvbi5pZCA9IGByZW1vdmUtcHJvamVjdC1idXR0b24tJHtpbmRleH1gO1xyXG4gICAgcmVtb3ZlUHJvamVjdEJ1dHRvbi5jbGFzc05hbWUgPSBcImZhLXNvbGlkIGZhLWNpcmNsZS14bWFya1wiO1xyXG5cclxuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RCdXR0b24pO1xyXG4gICAgcHJvamVjdEJ1dHRvbi5hcHBlbmRDaGlsZChlZGl0UHJvamVjdEJ1dHRvbik7XHJcbiAgICBwcm9qZWN0QnV0dG9uLmFwcGVuZENoaWxkKHJlbW92ZVByb2plY3RCdXR0b24pO1xyXG5cclxuICAgIC8vIEFkZCBvcHRpb25zIHRvIHRoZSBzZWxlY3QgbWVudVxyXG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICBvcHRpb24udmFsdWUgPSBwcm9qZWN0LnRpdGxlO1xyXG4gICAgb3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgIHByb2plY3RTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcclxuICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclRhc2tzQnlQcm9qZWN0KHByb2plY3RUaXRsZSkge1xyXG4gIGNvbnN0IHByb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xyXG4gIGlmIChwcm9qZWN0KSB7XHJcbiAgICByZW5kZXIocHJvamVjdC50YXNrcyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2plY3Qgbm90IGZvdW5kOicsIHByb2plY3RUaXRsZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXIsIHJlbmRlclRvZGF5VGFza3MsIHJlbmRlclRoaXNXZWVrVGFza3MsIHJlbmRlckNvbXBsZXRlZFRhc2tzLCByZW5kZXJUYXNrc0J5UHJvamVjdCwgcmVuZGVyUHJvamVjdHMsIGdldEFsbFRhc2tzIH07XHJcbiIsImltcG9ydCB7IGFkZFRhc2ssIHJlbW92ZVRhc2ssIHVwZGF0ZVRhc2ssIG15VGFza3MgfSBmcm9tICcuL3Rhc2tzLmpzJztcclxuaW1wb3J0IHsgcmVuZGVyLCBnZXRBbGxUYXNrcywgcmVuZGVyVG9kYXlUYXNrcywgcmVuZGVyVGhpc1dlZWtUYXNrcywgcmVuZGVyQ29tcGxldGVkVGFza3MsIHJlbmRlclRhc2tzQnlQcm9qZWN0LCByZW5kZXJQcm9qZWN0cyB9IGZyb20gJy4vZG9tLmpzJztcclxuaW1wb3J0IHsgYWRkUHJvamVjdCwgbXlQcm9qZWN0cywgdXBkYXRlUHJvamVjdCwgcmVtb3ZlUHJvamVjdCwgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdHMuanMnO1xyXG5pbXBvcnQgeyBzYXZlVG9Mb2NhbFN0b3JhZ2UsIGxvYWRGcm9tTG9jYWxTdG9yYWdlIH0gZnJvbSAnLi9zdG9yYWdlLmpzJztcclxuXHJcbmNvbnN0IGV2ZW50cyA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XHJcbiAgICAgICAgY29uc3QgZWRpdFRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1mb3JtJyk7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XHJcbiAgICAgICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1idXR0b24nKTtcclxuICAgICAgICBjb25zdCBmb3JtRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tZGlhbG9nJyk7XHJcbiAgICAgICAgY29uc3QgZWRpdFRhc2tEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrLWRpYWxvZycpO1xyXG4gICAgICAgIGNvbnN0IHByb2plY3REaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kaWFsb2cnKTtcclxuICAgICAgICBjb25zdCBhbGxUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhbGwtdGFza3MtYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3QgdG9kYXlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9kYXktYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3QgdGhpc1dlZWtCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhpcy13ZWVrLWJ1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXBsZXRlZC1idXR0b24nKTtcclxuICAgICAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0LWJ1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IGVkaXRQcm9qZWN0RGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtcHJvamVjdC1kaWFsb2cnKTtcclxuICAgICAgICBjb25zdCBlZGl0UHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1wcm9qZWN0LWZvcm0nKTtcclxuXHJcbiAgICAgICAgLy8gTG9hZGluZyBwcmV2aW91c2x5IHNhdmVkIHRhc2tzXHJcbiAgICAgICAgbG9hZEZyb21Mb2NhbFN0b3JhZ2UoKTtcclxuXHJcbiAgICAgICAgLy8gQWRkaW5nIGEgZGVmYXVsdCBwcm9qZWN0IGlmIG5vIHByb2plY3RzIGV4aXN0XHJcbiAgICAgICAgaWYgKG15UHJvamVjdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoXCJEZWZhdWx0XCIpO1xyXG4gICAgICAgICAgICBteVByb2plY3RzLnB1c2goZGVmYXVsdFByb2plY3QpO1xyXG4gICAgICAgICAgICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eS1zZWxlY3QnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3Qtc2VsZWN0JykudmFsdWU7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0YXNrRm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDtcclxuICAgICAgICAgICAgICB1cGRhdGVUYXNrKHByb2plY3RUaXRsZSwgdGFza0luZGV4LCB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBuZXdQcm9qZWN0VGl0bGUpO1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSB0YXNrRm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDsgLy8gQ2xlYXIgdGhlIGVkaXRpbmcgaW5kZXhcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3RUaXRsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICByZW5kZXJUYXNrc0J5UHJvamVjdChwcm9qZWN0VGl0bGUpO1xyXG4gICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICBmb3JtRGlhbG9nLmNsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZWRpdFRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGl0bGUnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kZXNjcmlwdGlvbicpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGF0ZScpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByaW9yaXR5LXNlbGVjdCcpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBlZGl0VGFza0Zvcm0uZGF0YXNldC5wcm9qZWN0VGl0bGU7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1Byb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByb2plY3Qtc2VsZWN0JykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IGVkaXRUYXNrRm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICB1cGRhdGVUYXNrKHByb2plY3RUaXRsZSwgdGFza0luZGV4LCB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBuZXdQcm9qZWN0VGl0bGUpO1xyXG4gICAgICAgICAgICByZW5kZXJUYXNrc0J5UHJvamVjdChuZXdQcm9qZWN0VGl0bGUpOyBcclxuICAgICAgICAgICAgZWRpdFRhc2tGb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGVkaXRUYXNrRGlhbG9nLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBlZGl0VGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBlZGl0VGFza0Zvcm0uZGF0YXNldC5wcm9qZWN0VGl0bGU7XHJcbiAgICAgICAgfSk7ICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByb2plY3Qtc2VsZWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGVkaXRUYXNrRm9ybS5kYXRhc2V0LnByb2plY3RUaXRsZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXRpdGxlJykudmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChwcm9qZWN0Rm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBwcm9qZWN0Rm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVByb2plY3QocHJvamVjdEluZGV4LCBwcm9qZWN0VGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHByb2plY3RGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4OyAvLyBDbGVhciB0aGUgZWRpdGluZyBpbmRleFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdChwcm9qZWN0VGl0bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHJlbmRlclByb2plY3RzKG15UHJvamVjdHMpO1xyXG4gICAgICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICBwcm9qZWN0RGlhbG9nLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBwcm9qZWN0Rm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZWRpdFByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9IGVkaXRQcm9qZWN0Rm9ybS5kYXRhc2V0LnByb2plY3RJbmRleDtcclxuICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtcHJvamVjdC10aXRsZScpLnZhbHVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZiAocHJvamVjdEluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVByb2plY3QocHJvamVjdEluZGV4LCBuZXdQcm9qZWN0VGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyUHJvamVjdHMobXlQcm9qZWN0cyk7XHJcbiAgICAgICAgICAgICAgICBlZGl0UHJvamVjdERpYWxvZy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVkaXRQcm9qZWN0Rm9ybS5kYXRhc2V0LnByb2plY3RJbmRleDsgLy8gQ2xlYXIgdGhlIHByb2plY3QgaW5kZXhcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2plY3QgaW5kZXggbm90IGZvdW5kJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGZvcm1EaWFsb2cuc2hvd01vZGFsKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvcm1EaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkaWFsb2dEaW1lbnNpb25zID0gZm9ybURpYWxvZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS5jbGllbnRYIDwgZGlhbG9nRGltZW5zaW9ucy5sZWZ0IHx8XHJcbiAgICAgICAgICAgICAgICBlLmNsaWVudFggPiBkaWFsb2dEaW1lbnNpb25zLnJpZ2h0IHx8XHJcbiAgICAgICAgICAgICAgICBlLmNsaWVudFkgPCBkaWFsb2dEaW1lbnNpb25zLnRvcCB8fFxyXG4gICAgICAgICAgICAgICAgZS5jbGllbnRZID4gZGlhbG9nRGltZW5zaW9ucy5ib3R0b21cclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtRGlhbG9nLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByb2plY3REaWFsb2cuc2hvd01vZGFsKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByb2plY3REaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkaWFsb2dEaW1lbnNpb25zID0gcHJvamVjdERpYWxvZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS5jbGllbnRYIDwgZGlhbG9nRGltZW5zaW9ucy5sZWZ0IHx8XHJcbiAgICAgICAgICAgICAgICBlLmNsaWVudFggPiBkaWFsb2dEaW1lbnNpb25zLnJpZ2h0IHx8XHJcbiAgICAgICAgICAgICAgICBlLmNsaWVudFkgPCBkaWFsb2dEaW1lbnNpb25zLnRvcCB8fFxyXG4gICAgICAgICAgICAgICAgZS5jbGllbnRZID4gZGlhbG9nRGltZW5zaW9ucy5ib3R0b21cclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9qZWN0RGlhbG9nLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIGFsbFRhc2tzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XHJcbiAgICAgICAgICAgIHJlbmRlcihhbGxUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdG9kYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiByZW5kZXJUb2RheVRhc2tzKGZvcm1EaWFsb2csIHRhc2tGb3JtLCBlZGl0VGFza0Zvcm0pKTtcclxuICAgICAgICB0aGlzV2Vla0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHJlbmRlclRoaXNXZWVrVGFza3MoZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSkpO1xyXG4gICAgICAgIGNvbXBsZXRlZFRhc2tzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcmVuZGVyQ29tcGxldGVkVGFza3MoZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aCgncmVtb3ZlLWJ1dHRvbi0nKSkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcudGFzaycpLmRhdGFzZXQucHJvamVjdFRpdGxlO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmluZGV4O1xyXG4gICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRUYXNrcyA9IHJlbW92ZVRhc2socHJvamVjdFRpdGxlLCB0YXNrSW5kZXgpO1xyXG4gICAgICAgICAgICAgIHJlbmRlcih1cGRhdGVkVGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKTsgLy8gUmUtcmVuZGVyIHdpdGggdGhlIHVwZGF0ZWQgdGFza3MgYXJyYXlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5pZC5zdGFydHNXaXRoKCdlZGl0LXByb2plY3QtYnV0dG9uLScpKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0UHJvamVjdERpYWxvZy5zaG93TW9kYWwoKTtcclxuICAgICAgICAgICAgICAgIGVkaXRQcm9qZWN0Rm9ybS5kYXRhc2V0LnByb2plY3RJbmRleCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmluZGV4O1xyXG4gICAgICAgICAgICAgICAgZWRpdFByb2plY3REaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpYWxvZ0RpbWVuc2lvbnMgPSBlZGl0UHJvamVjdERpYWxvZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuY2xpZW50WCA8IGRpYWxvZ0RpbWVuc2lvbnMubGVmdCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLmNsaWVudFggPiBkaWFsb2dEaW1lbnNpb25zLnJpZ2h0IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuY2xpZW50WSA8IGRpYWxvZ0RpbWVuc2lvbnMudG9wIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuY2xpZW50WSA+IGRpYWxvZ0RpbWVuc2lvbnMuYm90dG9tXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRQcm9qZWN0RGlhbG9nLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aCgncmVtb3ZlLXByb2plY3QtYnV0dG9uLScpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBwYXJzZUludChldmVudC50YXJnZXQuZGF0YXNldC5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVQcm9qZWN0KHByb2plY3RJbmRleCk7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9qZWN0cyhteVByb2plY3RzKTsgLy8gUmUtcmVuZGVyIHRoZSBwcm9qZWN0cyBsaXN0XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGluZGV4IG9mIHRoZSBwcm9qZWN0IHRvIHJlbmRlciBhZnRlciBkZWxldGlvblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdEluZGV4ID0gcHJvamVjdEluZGV4ID4gMCA/IHByb2plY3RJbmRleCAtIDEgOiAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gUmVuZGVyIHRoZSB0YXNrcyBvZiB0aGUgbmV3IHByb2plY3QgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICBpZiAobXlQcm9qZWN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyVGFza3NCeVByb2plY3QobXlQcm9qZWN0c1tuZXdQcm9qZWN0SW5kZXhdLnRpdGxlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyKFtdKTsgLy8gQ2xlYXIgdGhlIHRhc2tzIGxpc3QgaWYgbm8gcHJvamVjdHMgYXJlIGxlZnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZW5kZXIobXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSwgZWRpdFRhc2tEaWFsb2cpOyAvLyBJbml0aWFsIHJlbmRlclxyXG4gICAgICAgIHJlbmRlclByb2plY3RzKG15UHJvamVjdHMpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50cztcclxuIiwiaW1wb3J0IHsgc2F2ZVRvTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xyXG5cclxuLy8gUHJvamVjdCBjb25zdHJ1Y3RvclxyXG5jbGFzcyBQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgdGhpcy50YXNrcyA9IFtdO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgYWRkVGFzayh0YXNrKSB7XHJcbiAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxuICAgIH1cclxuICBcclxuICAgIHJlbW92ZVRhc2soaW5kZXgpIHtcclxuICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG59XHJcbiAgXHJcbiAgXHJcbi8vIFByb2plY3RzIGFyZSBzdG9yZWQgaW4gdGhlIGZvcm0gb2Ygb2JqZWN0IGFycmF5c1xyXG5jb25zdCBteVByb2plY3RzID0gW107XHJcblxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3RUaXRsZSkge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RUaXRsZSk7XHJcbiAgICBteVByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICAgIHJldHVybiBteVByb2plY3RzO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVQcm9qZWN0KHByb2plY3RJbmRleCkge1xyXG4gICAgbXlQcm9qZWN0cy5zcGxpY2UocHJvamVjdEluZGV4LCAxKTtcclxuICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xyXG4gICAgcmV0dXJuIG15UHJvamVjdHM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVByb2plY3QocHJvamVjdEluZGV4LCBuZXdQcm9qZWN0VGl0bGUpIHtcclxuICBjb25zdCBwcm9qZWN0ID0gbXlQcm9qZWN0c1twcm9qZWN0SW5kZXhdO1xyXG4gIGlmIChwcm9qZWN0KSB7XHJcbiAgICAgIHByb2plY3QudGl0bGUgPSBuZXdQcm9qZWN0VGl0bGU7IC8vIFVwZGF0ZSB0aGUgdGl0bGUgcHJvcGVydHlcclxuICAgICAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcignUHJvamVjdCBub3QgZm91bmQgYXQgaW5kZXg6JywgcHJvamVjdEluZGV4KTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBhZGRQcm9qZWN0LCByZW1vdmVQcm9qZWN0LCB1cGRhdGVQcm9qZWN0LCBteVByb2plY3RzLCBQcm9qZWN0fTtcclxuICBcclxuICAiLCJpbXBvcnQgeyBteVByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XHJcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gJy4vdGFza3MuanMnO1xyXG5cclxuZnVuY3Rpb24gc2F2ZVRvTG9jYWxTdG9yYWdlKCkge1xyXG4gIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgIHByb2plY3RzOiBteVByb2plY3RzLm1hcChwcm9qZWN0ID0+ICh7XHJcbiAgICAgICAgICB0aXRsZTogcHJvamVjdC50aXRsZSxcclxuICAgICAgICAgIHRhc2tzOiBwcm9qZWN0LnRhc2tzLm1hcCh0YXNrID0+ICh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHRhc2sudGl0bGUsXHJcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRhc2suZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgZGF0ZTogdGFzay5kYXRlLFxyXG4gICAgICAgICAgICAgIHByaW9yaXR5OiB0YXNrLnByaW9yaXR5LFxyXG4gICAgICAgICAgICAgIGNvbXBsZXRlZDogdGFzay5jb21wbGV0ZWRcclxuICAgICAgICAgIH0pKVxyXG4gICAgICB9KSlcclxuICB9O1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvRGF0YScsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEZyb21Mb2NhbFN0b3JhZ2UoKSB7XHJcbiAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9EYXRhJykpO1xyXG4gIGlmIChkYXRhKSB7XHJcbiAgICAgIG15UHJvamVjdHMubGVuZ3RoID0gMDsgLy8gQ2xlYXIgZXhpc3RpbmcgcHJvamVjdHNcclxuICAgICAgbXlQcm9qZWN0cy5wdXNoKC4uLmRhdGEucHJvamVjdHMubWFwKHByb2plY3REYXRhID0+IHtcclxuICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0RGF0YS50aXRsZSk7XHJcbiAgICAgICAgICBwcm9qZWN0LnRhc2tzID0gcHJvamVjdERhdGEudGFza3MubWFwKHRhc2tEYXRhID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGFza0RhdGEudGl0bGUsIHRhc2tEYXRhLmRlc2NyaXB0aW9uLCB0YXNrRGF0YS5kYXRlLCB0YXNrRGF0YS5wcmlvcml0eSwgcHJvamVjdERhdGEudGl0bGUpO1xyXG4gICAgICAgICAgICAgIHRhc2suY29tcGxldGVkID0gdGFza0RhdGEuY29tcGxldGVkO1xyXG4gICAgICAgICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm4gcHJvamVjdDtcclxuICAgICAgfSkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgc2F2ZVRvTG9jYWxTdG9yYWdlLCBsb2FkRnJvbUxvY2FsU3RvcmFnZSB9O1xyXG4iLCJpbXBvcnQgeyBteVByb2plY3RzIH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcclxuaW1wb3J0IHsgc2F2ZVRvTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xyXG5cclxuLy8gVGFzayBjb25zdHJ1Y3RvclxyXG5jbGFzcyBUYXNrIHtcclxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0VGl0bGUpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XHJcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICB0aGlzLnByb2plY3RUaXRsZSA9IHByb2plY3RUaXRsZTtcclxuICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBUYXNrcyBhcmUgc3RvcmVkIGluIHRoZSBmb3JtIG9mIG9iamVjdCBhcnJheXNcclxuY29uc3QgbXlUYXNrcyA9IFtdO1xyXG5cclxuZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0VGl0bGUpIHtcclxuICBsZXQgcHJvamVjdCA9IG15UHJvamVjdHMuZmluZChwID0+IHAudGl0bGUgPT09IHByb2plY3RUaXRsZSk7XHJcbiAgaWYgKCFwcm9qZWN0KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdFRpdGxlKTtcclxuICBwcm9qZWN0LmFkZFRhc2sobmV3VGFzayk7XHJcbiAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlVGFzayhwcm9qZWN0VGl0bGUsIHRhc2tJbmRleCkge1xyXG4gIGNvbnN0IHByb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xyXG4gIGlmICghcHJvamVjdCkge1xyXG4gICAgY29uc29sZS5lcnJvcignUHJvamVjdCBub3QgZm91bmQ6JywgcHJvamVjdFRpdGxlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgcHJvamVjdC50YXNrcy5zcGxpY2UodGFza0luZGV4LCAxKTtcclxuICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcclxuICByZXR1cm4gcHJvamVjdC50YXNrczsgLy8gUmV0dXJuIHRoZSB1cGRhdGVkIHRhc2tzIGFycmF5XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUYXNrKHByb2plY3RUaXRsZSwgZWRpdFRhc2tJbmRleCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgbmV3UHJvamVjdFRpdGxlKSB7XHJcbiAgY29uc29sZS5sb2coYFVwZGF0aW5nIHRhc2sgaW4gcHJvamVjdDogJHtwcm9qZWN0VGl0bGV9LCB0YXNrIGluZGV4OiAke2VkaXRUYXNrSW5kZXh9YCk7XHJcbiAgY29uc3QgcHJvamVjdCA9IG15UHJvamVjdHMuZmluZChwID0+IHAudGl0bGUgPT09IHByb2plY3RUaXRsZSk7XHJcbiAgaWYgKCFwcm9qZWN0KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBjb25zb2xlLmxvZygnT3JpZ2luYWwgcHJvamVjdCB0YXNrcyBiZWZvcmUgdXBkYXRpbmc6JywgcHJvamVjdC50YXNrcyk7XHJcbiAgbGV0IHRhc2s7XHJcbiAgaWYgKGVkaXRUYXNrSW5kZXggPj0gMCAmJiBlZGl0VGFza0luZGV4IDwgcHJvamVjdC50YXNrcy5sZW5ndGgpIHtcclxuICAgIHRhc2sgPSBwcm9qZWN0LnRhc2tzW2VkaXRUYXNrSW5kZXhdO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdUYXNrIG5vdCBmb3VuZCBhdCBpbmRleDonLCBlZGl0VGFza0luZGV4KTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgdGFzayBwcm9wZXJ0aWVzXHJcbiAgdGFzay50aXRsZSA9IHRpdGxlO1xyXG4gIHRhc2suZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICB0YXNrLmRhdGUgPSBkYXRlO1xyXG4gIHRhc2sucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuXHJcbiAgY29uc29sZS5sb2coJ09yaWdpbmFsIHByb2plY3QgdGFza3MgYWZ0ZXIgdXBkYXRpbmcgYnV0IGJlZm9yZSBtb3Zpbmc6JywgcHJvamVjdC50YXNrcyk7XHJcblxyXG4gIC8vIENoZWNrIGlmIHRoZSBwcm9qZWN0IGhhcyBiZWVuIGNoYW5nZWRcclxuICBpZiAobmV3UHJvamVjdFRpdGxlICYmIG5ld1Byb2plY3RUaXRsZSAhPT0gcHJvamVjdFRpdGxlKSB7XHJcbiAgICAvLyBGaW5kIHRoZSBuZXcgcHJvamVjdFxyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG15UHJvamVjdHMuZmluZChwID0+IHAudGl0bGUgPT09IG5ld1Byb2plY3RUaXRsZSk7XHJcbiAgICBpZiAobmV3UHJvamVjdCkge1xyXG4gICAgICAvLyBSZW1vdmUgdGhlIHRhc2sgZnJvbSB0aGUgY3VycmVudCBwcm9qZWN0XHJcbiAgICAgIHByb2plY3QudGFza3Muc3BsaWNlKGVkaXRUYXNrSW5kZXgsIDEpO1xyXG5cclxuICAgICAgLy8gQWRkIHRoZSB0YXNrIHRvIHRoZSBuZXcgcHJvamVjdFxyXG4gICAgICBuZXdQcm9qZWN0LmFkZFRhc2sodGFzayk7XHJcbiAgICAgIHRhc2sucHJvamVjdCA9IG5ld1Byb2plY3Q7IC8vIFVwZGF0ZSB0aGUgdGFzaydzIHByb2plY3QgcmVmZXJlbmNlXHJcbiAgICAgIGNvbnNvbGUubG9nKCdOZXcgcHJvamVjdCB0YXNrczonLCBuZXdQcm9qZWN0LnRhc2tzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05ldyBwcm9qZWN0IG5vdCBmb3VuZDonLCBuZXdQcm9qZWN0VGl0bGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gU2F2ZSBjaGFuZ2VzIHRvIGxvY2FsIHN0b3JhZ2VcclxuICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVRhc2tDb21wbGV0aW9uKHByb2plY3RUaXRsZSwgdGFza0luZGV4KSB7XHJcbiAgY29uc3QgcHJvamVjdCA9IG15UHJvamVjdHMuZmluZChwID0+IHAudGl0bGUgPT09IHByb2plY3RUaXRsZSk7XHJcbiAgaWYgKCFwcm9qZWN0KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBjb25zdCB0YXNrID0gcHJvamVjdC50YXNrc1t0YXNrSW5kZXhdO1xyXG4gIGlmICghdGFzaykge1xyXG4gICAgY29uc29sZS5lcnJvcignVGFzayBub3QgZm91bmQgYXQgaW5kZXg6JywgdGFza0luZGV4KTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgdGFzay5jb21wbGV0ZWQgPSAhdGFzay5jb21wbGV0ZWQ7XHJcbiAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGFkZFRhc2ssIHJlbW92ZVRhc2ssIHVwZGF0ZVRhc2ssIHRvZ2dsZVRhc2tDb21wbGV0aW9uLCBteVRhc2tzLCBUYXNrIH07XHJcblxyXG4iLCJsZXQgZGVmYXVsdE9wdGlvbnMgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRPcHRpb25zKCkge1xuICByZXR1cm4gZGVmYXVsdE9wdGlvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0T3B0aW9ucyhuZXdPcHRpb25zKSB7XG4gIGRlZmF1bHRPcHRpb25zID0gbmV3T3B0aW9ucztcbn1cbiIsImltcG9ydCB7IHN0YXJ0T2ZEYXkgfSBmcm9tIFwiLi9zdGFydE9mRGF5Lm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIGlzU2FtZURheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIGRheSAoYW5kIHllYXIgYW5kIG1vbnRoKT9cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgZGF5IChhbmQgeWVhciBhbmQgbW9udGgpP1xuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlTGVmdCAtIFRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0gZGF0ZVJpZ2h0IC0gVGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrXG5cbiAqIEByZXR1cm5zIFRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgZGF5IChhbmQgeWVhciBhbmQgbW9udGgpXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSA0IFNlcHRlbWJlciAwNjowMDowMCBhbmQgNCBTZXB0ZW1iZXIgMTg6MDA6MDAgaW4gdGhlIHNhbWUgZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDQsIDYsIDApLCBuZXcgRGF0ZSgyMDE0LCA4LCA0LCAxOCwgMCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyIGFuZCA0IE9jdG9iZXIgaW4gdGhlIHNhbWUgZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDQpLCBuZXcgRGF0ZSgyMDE0LCA5LCA0KSlcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyLCAyMDE0IGFuZCA0IFNlcHRlbWJlciwgMjAxNSBpbiB0aGUgc2FtZSBkYXk/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVEYXkobmV3IERhdGUoMjAxNCwgOCwgNCksIG5ldyBEYXRlKDIwMTUsIDgsIDQpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lRGF5KGRhdGVMZWZ0LCBkYXRlUmlnaHQpIHtcbiAgY29uc3QgZGF0ZUxlZnRTdGFydE9mRGF5ID0gc3RhcnRPZkRheShkYXRlTGVmdCk7XG4gIGNvbnN0IGRhdGVSaWdodFN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRhdGVSaWdodCk7XG5cbiAgcmV0dXJuICtkYXRlTGVmdFN0YXJ0T2ZEYXkgPT09ICtkYXRlUmlnaHRTdGFydE9mRGF5O1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzU2FtZURheTtcbiIsImltcG9ydCB7IHN0YXJ0T2ZXZWVrIH0gZnJvbSBcIi4vc3RhcnRPZldlZWsubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBpc1NhbWVXZWVrfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgaXNTYW1lV2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSB3ZWVrIChhbmQgbW9udGggYW5kIHllYXIpP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSB3ZWVrIChhbmQgbW9udGggYW5kIHllYXIpP1xuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlTGVmdCAtIFRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0gZGF0ZVJpZ2h0IC0gVGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF0ZXMgYXJlIGluIHRoZSBzYW1lIHdlZWsgKGFuZCBtb250aCBhbmQgeWVhcilcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDMxIEF1Z3VzdCAyMDE0IGFuZCA0IFNlcHRlbWJlciAyMDE0IGluIHRoZSBzYW1lIHdlZWs/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVXZWVrKG5ldyBEYXRlKDIwMTQsIDcsIDMxKSwgbmV3IERhdGUoMjAxNCwgOCwgNCkpXG4gKiAvLz0+IHRydWVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgd2VlayBzdGFydHMgd2l0aCBNb25kYXksXG4gKiAvLyBhcmUgMzEgQXVndXN0IDIwMTQgYW5kIDQgU2VwdGVtYmVyIDIwMTQgaW4gdGhlIHNhbWUgd2Vlaz9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzU2FtZVdlZWsobmV3IERhdGUoMjAxNCwgNywgMzEpLCBuZXcgRGF0ZSgyMDE0LCA4LCA0KSwge1xuICogICB3ZWVrU3RhcnRzT246IDFcbiAqIH0pXG4gKiAvLz0+IGZhbHNlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFyZSAxIEphbnVhcnkgMjAxNCBhbmQgMSBKYW51YXJ5IDIwMTUgaW4gdGhlIHNhbWUgd2Vlaz9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzU2FtZVdlZWsobmV3IERhdGUoMjAxNCwgMCwgMSksIG5ldyBEYXRlKDIwMTUsIDAsIDEpKVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lV2VlayhkYXRlTGVmdCwgZGF0ZVJpZ2h0LCBvcHRpb25zKSB7XG4gIGNvbnN0IGRhdGVMZWZ0U3RhcnRPZldlZWsgPSBzdGFydE9mV2VlayhkYXRlTGVmdCwgb3B0aW9ucyk7XG4gIGNvbnN0IGRhdGVSaWdodFN0YXJ0T2ZXZWVrID0gc3RhcnRPZldlZWsoZGF0ZVJpZ2h0LCBvcHRpb25zKTtcblxuICByZXR1cm4gK2RhdGVMZWZ0U3RhcnRPZldlZWsgPT09ICtkYXRlUmlnaHRTdGFydE9mV2Vlaztcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc1NhbWVXZWVrO1xuIiwiaW1wb3J0IHsgaXNTYW1lV2VlayB9IGZyb20gXCIuL2lzU2FtZVdlZWsubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBpc1RoaXNXZWVrfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgaXNUaGlzV2Vla1xuICogQGNhdGVnb3J5IFdlZWsgSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgd2VlayBhcyB0aGUgY3VycmVudCBkYXRlP1xuICogQHB1cmUgZmFsc2VcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBzYW1lIHdlZWsgYXMgdGhlIGN1cnJlbnQgZGF0ZT9cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIGRhdGUgaXMgaW4gdGhpcyB3ZWVrXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDI1IFNlcHRlbWJlciAyMDE0LCBpcyAyMSBTZXB0ZW1iZXIgMjAxNCBpbiB0aGlzIHdlZWs/XG4gKiBjb25zdCByZXN1bHQgPSBpc1RoaXNXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAyNSBTZXB0ZW1iZXIgMjAxNCBhbmQgd2VlayBzdGFydHMgd2l0aCBNb25kYXlcbiAqIC8vIGlzIDIxIFNlcHRlbWJlciAyMDE0IGluIHRoaXMgd2Vlaz9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzVGhpc1dlZWsobmV3IERhdGUoMjAxNCwgOCwgMjEpLCB7IHdlZWtTdGFydHNPbjogMSB9KVxuICogLy89PiBmYWxzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNUaGlzV2VlayhkYXRlLCBvcHRpb25zKSB7XG4gIHJldHVybiBpc1NhbWVXZWVrKGRhdGUsIERhdGUubm93KCksIG9wdGlvbnMpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzVGhpc1dlZWs7XG4iLCJpbXBvcnQgeyBpc1NhbWVEYXkgfSBmcm9tIFwiLi9pc1NhbWVEYXkubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgaXNUb2RheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSB0b2RheT9cbiAqIEBwdXJlIGZhbHNlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSB0b2RheT9cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBkYXRlIHRvIGNoZWNrXG4gKlxuICogQHJldHVybnMgVGhlIGRhdGUgaXMgdG9kYXlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQsIGlzIDYgT2N0b2JlciAxNDowMDowMCB0b2RheT9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzVG9kYXkobmV3IERhdGUoMjAxNCwgOSwgNiwgMTQsIDApKVxuICogLy89PiB0cnVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1RvZGF5KGRhdGUpIHtcbiAgcmV0dXJuIGlzU2FtZURheShkYXRlLCBEYXRlLm5vdygpKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBpc1RvZGF5O1xuIiwiaW1wb3J0IHsgdG9EYXRlIH0gZnJvbSBcIi4vdG9EYXRlLm1qc1wiO1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZEYXlcbiAqIEBjYXRlZ29yeSBEYXkgSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBzdGFydCBvZiBhIGRheSBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIGRheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSBkYXkgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mRGF5KG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFR1ZSBTZXAgMDIgMjAxNCAwMDowMDowMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZkRheShkYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBfZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZEYXk7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5pbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuL19saWIvZGVmYXVsdE9wdGlvbnMubWpzXCI7XG5cbi8qKlxuICogVGhlIHtAbGluayBzdGFydE9mV2Vla30gZnVuY3Rpb24gb3B0aW9ucy5cbiAqL1xuXG4vKipcbiAqIEBuYW1lIHN0YXJ0T2ZXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgdGhlIGdpdmVuIGRhdGUuXG4gKiBUaGUgcmVzdWx0IHdpbGwgYmUgaW4gdGhlIGxvY2FsIHRpbWV6b25lLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIG9yaWdpbmFsIGRhdGVcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBzdGFydCBvZiBhIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVGhlIHN0YXJ0IG9mIGEgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCkpXG4gKiAvLz0+IFN1biBBdWcgMzEgMjAxNCAwMDowMDowMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0aGUgd2VlayBzdGFydHMgb24gTW9uZGF5LCB0aGUgc3RhcnQgb2YgdGhlIHdlZWsgZm9yIDIgU2VwdGVtYmVyIDIwMTQgMTE6NTU6MDA6XG4gKiBjb25zdCByZXN1bHQgPSBzdGFydE9mV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyLCAxMSwgNTUsIDApLCB7IHdlZWtTdGFydHNPbjogMSB9KVxuICogLy89PiBNb24gU2VwIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0T2ZXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICBjb25zdCB3ZWVrU3RhcnRzT24gPVxuICAgIG9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIG9wdGlvbnM/LmxvY2FsZT8ub3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMud2Vla1N0YXJ0c09uID8/XG4gICAgZGVmYXVsdE9wdGlvbnMubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICAwO1xuXG4gIGNvbnN0IF9kYXRlID0gdG9EYXRlKGRhdGUpO1xuICBjb25zdCBkYXkgPSBfZGF0ZS5nZXREYXkoKTtcbiAgY29uc3QgZGlmZiA9IChkYXkgPCB3ZWVrU3RhcnRzT24gPyA3IDogMCkgKyBkYXkgLSB3ZWVrU3RhcnRzT247XG5cbiAgX2RhdGUuc2V0RGF0ZShfZGF0ZS5nZXREYXRlKCkgLSBkaWZmKTtcbiAgX2RhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gIHJldHVybiBfZGF0ZTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCBzdGFydE9mV2VlaztcbiIsIi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBhcmd1bWVudCAtIFRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKlxuICogQHJldHVybnMgVGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ2xvbmUgdGhlIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUobmV3IERhdGUoMjAxNCwgMSwgMTEsIDExLCAzMCwgMzApKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCB0aGUgdGltZXN0YW1wIHRvIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUoMTM5MjA5ODQzMDAwMClcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQpIHtcbiAgY29uc3QgYXJnU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KTtcblxuICAvLyBDbG9uZSB0aGUgZGF0ZVxuICBpZiAoXG4gICAgYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlIHx8XG4gICAgKHR5cGVvZiBhcmd1bWVudCA9PT0gXCJvYmplY3RcIiAmJiBhcmdTdHIgPT09IFwiW29iamVjdCBEYXRlXVwiKVxuICApIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IGFyZ3VtZW50LmNvbnN0cnVjdG9yKCthcmd1bWVudCk7XG4gIH0gZWxzZSBpZiAoXG4gICAgdHlwZW9mIGFyZ3VtZW50ID09PSBcIm51bWJlclwiIHx8XG4gICAgYXJnU3RyID09PSBcIltvYmplY3QgTnVtYmVyXVwiIHx8XG4gICAgdHlwZW9mIGFyZ3VtZW50ID09PSBcInN0cmluZ1wiIHx8XG4gICAgYXJnU3RyID09PSBcIltvYmplY3QgU3RyaW5nXVwiXG4gICkge1xuICAgIC8vIFRPRE86IENhbiB3ZSBnZXQgcmlkIG9mIGFzP1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gVE9ETzogQ2FuIHdlIGdldCByaWQgb2YgYXM/XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cbn1cblxuLy8gRmFsbGJhY2sgZm9yIG1vZHVsYXJpemVkIGltcG9ydHM6XG5leHBvcnQgZGVmYXVsdCB0b0RhdGU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBldmVudHMgZnJvbSBcIi4vbW9kdWxlcy9ldmVudHMuanNcIjtcblxuZXZlbnRzKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9