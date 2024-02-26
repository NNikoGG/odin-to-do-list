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

        // Loading previously saved tasks
        (0,_storage_js__WEBPACK_IMPORTED_MODULE_3__.loadFromLocalStorage)();

        // Adding a default project if it doesn't exist
        const defaultProjectExists = _projects_js__WEBPACK_IMPORTED_MODULE_2__.myProjects.some(project => project.title === "Default");
        if (!defaultProjectExists) {
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

function updateProject(projectIndex, projectTitle) {
    const project = myProjects[projectIndex];
    project.projectTitle = projectTitle;
    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveToLocalStorage)();
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
    projects: _projects_js__WEBPACK_IMPORTED_MODULE_0__.myProjects,
    tasks: _tasks_js__WEBPACK_IMPORTED_MODULE_1__.myTasks
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
        const task = new _tasks_js__WEBPACK_IMPORTED_MODULE_1__.Task(taskData.title, taskData.description, taskData.date, taskData.priority, project);
        task.completed = taskData.completed;
        return task;
      });
      return project;
    }));

    _tasks_js__WEBPACK_IMPORTED_MODULE_1__.myTasks.length = 0; // Clear existing tasks
    _tasks_js__WEBPACK_IMPORTED_MODULE_1__.myTasks.push(...data.tasks);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztVQ3pEdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055Qzs7QUFFekMsOERBQU0sRyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL21vZHVsZXMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvX2xpYi9kZWZhdWx0T3B0aW9ucy5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzU2FtZURheS5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2lzU2FtZVdlZWsubWpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9pc1RoaXNXZWVrLm1qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvaXNUb2RheS5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3N0YXJ0T2ZEYXkubWpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9zdGFydE9mV2Vlay5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL3RvRGF0ZS5tanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG15VGFza3MsIHRvZ2dsZVRhc2tDb21wbGV0aW9uIH0gZnJvbSAnLi90YXNrcy5qcyc7XG5pbXBvcnQgeyBteVByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XG5pbXBvcnQgeyBpc1RvZGF5LCBpc1RoaXNXZWVrIH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5mdW5jdGlvbiByZW5kZXIodGFza3MgPSBteVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSwgZWRpdFRhc2tGb3JtKSB7XG4gIGxldCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XG4gIHRhc2tMaXN0LmlubmVySFRNTCA9ICcnO1xuICBcbiAgLy8gU29ydCB0YXNrcyBieSBkYXRlIHVzaW5nIG5hdGl2ZSBKYXZhU2NyaXB0IERhdGUgcGFyc2luZ1xuICBjb25zdCBzb3J0ZWRUYXNrcyA9IHRhc2tzLnNvcnQoKGEsIGIpID0+IG5ldyBEYXRlKGEuZGF0ZSkgLSBuZXcgRGF0ZShiLmRhdGUpKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0ZWRUYXNrcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgdGFzayA9IHNvcnRlZFRhc2tzW2ldO1xuICAgICAgbGV0IHRhc2tXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0YXNrV3JhcHBlci5jbGFzc05hbWUgPSBcInRhc2tcIjtcbiAgICAgIHRhc2tXcmFwcGVyLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgICAgaWYodGFzay5wcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgdGFza1dyYXBwZXIuZGF0YXNldC5wcm9qZWN0VGl0bGUgPSB0YXNrLnByb2plY3RUaXRsZTsgXG4gICAgICB9XG4gICAgICAvLyBDaGVjayBpZiB0aGUgdGFzayBpcyBjb21wbGV0ZWQgYW5kIGFkZCB0aGUgJ2NvbXBsZXRlZCcgY2xhc3MgYWNjb3JkaW5nbHlcbiAgICAgIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgICAgICB0YXNrV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhc2tXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICAgICAgfSAgICAgICAgXG4gICAgICB0YXNrTGlzdC5hcHBlbmRDaGlsZCh0YXNrV3JhcHBlcik7XG4gICAgICBsZXQgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgdG9nZ2xlQnV0dG9uLmlkID0gYHRvZ2dsZS1idXR0b24tJHtpfWA7XG4gICAgICB0b2dnbGVCdXR0b24uY2xhc3NOYW1lID0gdGFzay5jb21wbGV0ZWQgPyBcImZhLXNvbGlkIGZhLWNpcmNsZS1jaGVja1wiIDogXCJmYS1yZWd1bGFyIGZhLWNpcmNsZVwiO1xuICAgICAgdG9nZ2xlQnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgICAgdG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIFByZXZlbnQgdGhlIGV2ZW50IGZyb20gYnViYmxpbmcgdXAgdG8gdGhlIHRhc2tXcmFwcGVyXG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IHRoaXMuY2xvc2VzdCgnLnRhc2snKS5kYXRhc2V0LnByb2plY3RUaXRsZTtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGFzZXQuaW5kZXg7XG4gICAgICAgIHRvZ2dsZVRhc2tDb21wbGV0aW9uKHByb2plY3RUaXRsZSwgaW5kZXgpO1xuICAgICAgICByZW5kZXIodGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtLCBlZGl0VGFza0Zvcm0pOyAvLyBSZS1yZW5kZXIgdGhlIHRhc2tzXG4gICAgICB9KTsgICAgIFxuXG4gICAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICB0YXNrTmFtZS5pZCA9ICd0YXNrLXRpdGxlJztcbiAgICAgIHRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGl0bGU7XG4gICAgICBsZXQgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgdGFza0Rlc2NyaXB0aW9uLmlkID0gJ3Rhc2stZGVzY3JpcHRpb24nO1xuICAgICAgdGFza0Rlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICB0YXNrRGF0ZS5pZCA9ICd0YXNrLWRhdGUnO1xuICAgICAgdGFza0RhdGUuaW5uZXJUZXh0ID0gdGFzay5kYXRlO1xuICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHRhc2tQcmlvcml0eS5pZCA9ICd0YXNrLXByaW9yaXR5JztcbiAgICAgIHRhc2tQcmlvcml0eS5pbm5lclRleHQgPSB0YXNrLnByaW9yaXR5O1xuICAgICAgbGV0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICBlZGl0QnV0dG9uLmlkID0gYGVkaXQtYnV0dG9uLSR7aX1gO1xuICAgICAgZWRpdEJ1dHRvbi5jbGFzc05hbWUgPSBcImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmVcIjtcbiAgICAgIGVkaXRCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XG4gICAgICBlZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gUHJldmVudCB0aGUgZXZlbnQgZnJvbSB0cmlnZ2VyaW5nIHRoZSB0YXNrV3JhcHBlcidzIGNsaWNrIGV2ZW50XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSB0aGlzLmRhdGFzZXQuaW5kZXg7XG4gICAgICAgIGNvbnN0IHRhc2sgPSB0YXNrc1t0YXNrSW5kZXhdO1xuICAgICAgICBjb25zdCBlZGl0VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrLWZvcm0nKTtcbiAgICAgICAgY29uc3QgZWRpdFRhc2tEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrLWRpYWxvZycpO1xuICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGl0bGUnKS52YWx1ZSA9IHRhc2sudGl0bGU7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kZXNjcmlwdGlvbicpLnZhbHVlID0gdGFzay5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LWRhdGUnKS52YWx1ZSA9IHRhc2suZGF0ZTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByaW9yaXR5LXNlbGVjdCcpLnZhbHVlID0gdGFzay5wcmlvcml0eTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByb2plY3Qtc2VsZWN0JykudmFsdWUgPSB0YXNrLnByb2plY3RUaXRsZTtcbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSB0YXNrJ3MgaW5kZXggYW5kIHByb2plY3QgdGl0bGUgaW4gdGhlIGZvcm0ncyBkYXRhc2V0XG4gICAgICAgICAgICBlZGl0VGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXggPSB0YXNrSW5kZXg7XG4gICAgICAgICAgICBlZGl0VGFza0Zvcm0uZGF0YXNldC5wcm9qZWN0VGl0bGUgPSB0YXNrLnByb2plY3RUaXRsZTtcbiAgICAgICAgICAgIC8vIFNob3cgdGhlIGVkaXQgdGFzayBkaWFsb2dcbiAgICAgICAgICAgIGVkaXRUYXNrRGlhbG9nLnNob3dNb2RhbCgpO1xuICAgICAgICAgICAgZWRpdFRhc2tEaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBkaWFsb2dEaW1lbnNpb25zID0gZWRpdFRhc2tEaWFsb2cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIGUuY2xpZW50WCA8IGRpYWxvZ0RpbWVuc2lvbnMubGVmdCB8fFxuICAgICAgICAgICAgICAgICAgZS5jbGllbnRYID4gZGlhbG9nRGltZW5zaW9ucy5yaWdodCB8fFxuICAgICAgICAgICAgICAgICAgZS5jbGllbnRZIDwgZGlhbG9nRGltZW5zaW9ucy50b3AgfHxcbiAgICAgICAgICAgICAgICAgIGUuY2xpZW50WSA+IGRpYWxvZ0RpbWVuc2lvbnMuYm90dG9tXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgZWRpdFRhc2tEaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUYXNrIG5vdCBmb3VuZCBhdCBpbmRleDonLCB0YXNrSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9KTsgICAgICAgIFxuXG4gICAgICBsZXQgcmVtb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgcmVtb3ZlQnV0dG9uLmlkID0gYHJlbW92ZS1idXR0b24tJHtpfWA7XG4gICAgICByZW1vdmVCdXR0b24uY2xhc3NOYW1lID0gXCJmYS1zb2xpZCBmYS1jaXJjbGUteG1hcmtcIjtcbiAgICAgIHJlbW92ZUJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcblxuICAgICAgdGFza1dyYXBwZXIuaW5zZXJ0QmVmb3JlKHRvZ2dsZUJ1dHRvbiwgdGFza1dyYXBwZXIuZmlyc3RDaGlsZCk7XG4gICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrTmFtZSk7XG4gICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xuICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5KTtcbiAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQocmVtb3ZlQnV0dG9uKTtcbiAgfVxufVxuXG5cblxuZnVuY3Rpb24gZ2V0QWxsVGFza3MoKSB7XG4gIHJldHVybiBteVByb2plY3RzLmZsYXRNYXAocHJvamVjdCA9PiBwcm9qZWN0LnRhc2tzKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyVG9kYXlUYXNrcyhmb3JtRGlhbG9nLCB0YXNrRm9ybSwgZWRpdFRhc2tGb3JtKSB7XG4gIGNvbnN0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcbiAgY29uc3QgdG9kYXlUYXNrcyA9IGFsbFRhc2tzLmZpbHRlcih0YXNrID0+IGlzVG9kYXkobmV3IERhdGUodGFzay5kYXRlKSkpO1xuICByZW5kZXIodG9kYXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRoaXNXZWVrVGFza3MoZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSkge1xuICBjb25zdCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XG4gIGNvbnN0IHRoaXNXZWVrVGFza3MgPSBhbGxUYXNrcy5maWx0ZXIodGFzayA9PiBpc1RoaXNXZWVrKG5ldyBEYXRlKHRhc2suZGF0ZSkpKTtcbiAgcmVuZGVyKHRoaXNXZWVrVGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtLCBlZGl0VGFza0Zvcm0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDb21wbGV0ZWRUYXNrcyhmb3JtRGlhbG9nLCB0YXNrRm9ybSwgZWRpdFRhc2tGb3JtKSB7XG4gIGNvbnN0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcbiAgY29uc3QgY29tcGxldGVkVGFza3MgPSBhbGxUYXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLmNvbXBsZXRlZCk7XG4gIHJlbmRlcihjb21wbGV0ZWRUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclByb2plY3RzKHByb2plY3RzKSB7XG4gIGNvbnN0IHByb2plY3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWNvbnRhaW5lcicpO1xuICBjb25zdCBwcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3Qtc2VsZWN0Jyk7XG4gIHByb2plY3RzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnOyAvLyBDbGVhciBleGlzdGluZyBwcm9qZWN0c1xuICBwcm9qZWN0U2VsZWN0LmlubmVySFRNTCA9ICc8b3B0aW9uIHZhbHVlPVwibm9uZVwiPlNlbGVjdCBQcm9qZWN0PC9vcHRpb24+JzsgLy8gUmVzZXQgdGhlIHNlbGVjdCBtZW51XG4gIGNvbnN0IGVkaXRQcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtcHJvamVjdC1zZWxlY3QnKTtcbiAgZWRpdFByb2plY3RTZWxlY3QuaW5uZXJIVE1MID0gJzxvcHRpb24gdmFsdWU9XCJub25lXCI+U2VsZWN0IFByb2plY3Q8L29wdGlvbj4nO1xuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IHByb2plY3QudGl0bGU7XG4gICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0LnRpdGxlO1xuICAgICAgZWRpdFByb2plY3RTZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgfSk7XG4gIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgLy8gUmVuZGVyIHByb2plY3QgYnV0dG9uc1xuICAgIGNvbnN0IHByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBwcm9qZWN0QnV0dG9uLmlkID0gYHByb2plY3QtJHtpbmRleH1gO1xuICAgIHByb2plY3RCdXR0b24uaW5uZXJIVE1MID0gYFxuICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1saXN0LXVsXCI+PC9pPlxuICAgICAgPHA+JHtwcm9qZWN0LnRpdGxlfTwvcD5cbiAgICBgO1xuICAgIHByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICByZW5kZXJUYXNrc0J5UHJvamVjdChwcm9qZWN0LnRpdGxlKTtcbiAgICB9KTtcbiAgICBwcm9qZWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0QnV0dG9uKTtcblxuICAgIC8vIEFkZCBvcHRpb25zIHRvIHRoZSBzZWxlY3QgbWVudVxuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIG9wdGlvbi52YWx1ZSA9IHByb2plY3QudGl0bGU7XG4gICAgb3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcbiAgICBwcm9qZWN0U2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYXNrc0J5UHJvamVjdChwcm9qZWN0VGl0bGUpIHtcbiAgY29uc3QgcHJvamVjdCA9IG15UHJvamVjdHMuZmluZChwID0+IHAudGl0bGUgPT09IHByb2plY3RUaXRsZSk7XG4gIGlmIChwcm9qZWN0KSB7XG4gICAgcmVuZGVyKHByb2plY3QudGFza3MpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2plY3Qgbm90IGZvdW5kOicsIHByb2plY3RUaXRsZSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgcmVuZGVyLCByZW5kZXJUb2RheVRhc2tzLCByZW5kZXJUaGlzV2Vla1Rhc2tzLCByZW5kZXJDb21wbGV0ZWRUYXNrcywgcmVuZGVyVGFza3NCeVByb2plY3QsIHJlbmRlclByb2plY3RzLCBnZXRBbGxUYXNrcyB9O1xuIiwiaW1wb3J0IHsgYWRkVGFzaywgcmVtb3ZlVGFzaywgdXBkYXRlVGFzaywgbXlUYXNrcyB9IGZyb20gJy4vdGFza3MuanMnO1xuaW1wb3J0IHsgcmVuZGVyLCBnZXRBbGxUYXNrcywgcmVuZGVyVG9kYXlUYXNrcywgcmVuZGVyVGhpc1dlZWtUYXNrcywgcmVuZGVyQ29tcGxldGVkVGFza3MsIHJlbmRlclRhc2tzQnlQcm9qZWN0LCByZW5kZXJQcm9qZWN0cyB9IGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCB7IGFkZFByb2plY3QsIG15UHJvamVjdHMsIHVwZGF0ZVByb2plY3QsIFByb2plY3QgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcbmltcG9ydCB7IHNhdmVUb0xvY2FsU3RvcmFnZSwgbG9hZEZyb21Mb2NhbFN0b3JhZ2UgfSBmcm9tICcuL3N0b3JhZ2UuanMnO1xuXG5jb25zdCBldmVudHMgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XG4gICAgICAgIGNvbnN0IGVkaXRUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRhc2stZm9ybScpO1xuICAgICAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWZvcm0nKTtcbiAgICAgICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1idXR0b24nKTtcbiAgICAgICAgY29uc3QgZm9ybURpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLWRpYWxvZycpO1xuICAgICAgICBjb25zdCBlZGl0VGFza0RpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRhc2stZGlhbG9nJyk7XG4gICAgICAgIGNvbnN0IHByb2plY3REaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1kaWFsb2cnKTtcbiAgICAgICAgY29uc3QgYWxsVGFza3NCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWxsLXRhc2tzLWJ1dHRvbicpO1xuICAgICAgICBjb25zdCB0b2RheUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RheS1idXR0b24nKTtcbiAgICAgICAgY29uc3QgdGhpc1dlZWtCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhpcy13ZWVrLWJ1dHRvbicpO1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wbGV0ZWQtYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtYnV0dG9uJyk7XG5cbiAgICAgICAgLy8gTG9hZGluZyBwcmV2aW91c2x5IHNhdmVkIHRhc2tzXG4gICAgICAgIGxvYWRGcm9tTG9jYWxTdG9yYWdlKCk7XG5cbiAgICAgICAgLy8gQWRkaW5nIGEgZGVmYXVsdCBwcm9qZWN0IGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3RFeGlzdHMgPSBteVByb2plY3RzLnNvbWUocHJvamVjdCA9PiBwcm9qZWN0LnRpdGxlID09PSBcIkRlZmF1bHRcIik7XG4gICAgICAgIGlmICghZGVmYXVsdFByb2plY3RFeGlzdHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoXCJEZWZhdWx0XCIpO1xuICAgICAgICAgICAgbXlQcm9qZWN0cy5wdXNoKGRlZmF1bHRQcm9qZWN0KTtcbiAgICAgICAgICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJykudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eS1zZWxlY3QnKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXNlbGVjdCcpLnZhbHVlO1xuICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgY29uc3QgdGFza0luZGV4ID0gdGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7XG4gICAgICAgICAgICAgIHVwZGF0ZVRhc2socHJvamVjdFRpdGxlLCB0YXNrSW5kZXgsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIG5ld1Byb2plY3RUaXRsZSk7XG4gICAgICAgICAgICAgIGRlbGV0ZSB0YXNrRm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDsgLy8gQ2xlYXIgdGhlIGVkaXRpbmcgaW5kZXhcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdFRpdGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAgIHJlbmRlclRhc2tzQnlQcm9qZWN0KHByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgZm9ybURpYWxvZy5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGVkaXRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGl0bGUnKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kYXRlJykudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByaW9yaXR5LXNlbGVjdCcpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZWRpdFRhc2tGb3JtLmRhdGFzZXQucHJvamVjdFRpdGxlO1xuICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtcHJvamVjdC1zZWxlY3QnKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IGVkaXRUYXNrRm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDtcbiAgICAgICAgICBcbiAgICAgICAgICAgIHVwZGF0ZVRhc2socHJvamVjdFRpdGxlLCB0YXNrSW5kZXgsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIG5ld1Byb2plY3RUaXRsZSk7XG4gICAgICAgICAgICByZW5kZXJUYXNrc0J5UHJvamVjdChuZXdQcm9qZWN0VGl0bGUpOyBcbiAgICAgICAgICAgIGVkaXRUYXNrRm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgZWRpdFRhc2tEaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgIGRlbGV0ZSBlZGl0VGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7XG4gICAgICAgICAgICBkZWxldGUgZWRpdFRhc2tGb3JtLmRhdGFzZXQucHJvamVjdFRpdGxlO1xuICAgICAgICB9KTsgICAgICAgXG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1wcm9qZWN0LXNlbGVjdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWRpdFRhc2tGb3JtLmRhdGFzZXQucHJvamVjdFRpdGxlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC10aXRsZScpLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHByb2plY3RGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0SW5kZXggPSBwcm9qZWN0Rm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDtcbiAgICAgICAgICAgICAgICB1cGRhdGVQcm9qZWN0KHByb2plY3RJbmRleCwgcHJvamVjdFRpdGxlKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgcHJvamVjdEZvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7IC8vIENsZWFyIHRoZSBlZGl0aW5nIGluZGV4XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkZFByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICByZW5kZXJQcm9qZWN0cyhteVByb2plY3RzKTtcbiAgICAgICAgICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICBwcm9qZWN0RGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgICBkZWxldGUgcHJvamVjdEZvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBmb3JtRGlhbG9nLnNob3dNb2RhbCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3JtRGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZ0RpbWVuc2lvbnMgPSBmb3JtRGlhbG9nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WCA8IGRpYWxvZ0RpbWVuc2lvbnMubGVmdCB8fFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WCA+IGRpYWxvZ0RpbWVuc2lvbnMucmlnaHQgfHxcbiAgICAgICAgICAgICAgICBlLmNsaWVudFkgPCBkaWFsb2dEaW1lbnNpb25zLnRvcCB8fFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSA+IGRpYWxvZ0RpbWVuc2lvbnMuYm90dG9tXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBmb3JtRGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHByb2plY3REaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9qZWN0RGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZ0RpbWVuc2lvbnMgPSBwcm9qZWN0RGlhbG9nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WCA8IGRpYWxvZ0RpbWVuc2lvbnMubGVmdCB8fFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WCA+IGRpYWxvZ0RpbWVuc2lvbnMucmlnaHQgfHxcbiAgICAgICAgICAgICAgICBlLmNsaWVudFkgPCBkaWFsb2dEaW1lbnNpb25zLnRvcCB8fFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSA+IGRpYWxvZ0RpbWVuc2lvbnMuYm90dG9tXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0RGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBhbGxUYXNrc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcbiAgICAgICAgICAgIHJlbmRlcihhbGxUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0b2RheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHJlbmRlclRvZGF5VGFza3MoZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSkpO1xuICAgICAgICB0aGlzV2Vla0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHJlbmRlclRoaXNXZWVrVGFza3MoZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSkpO1xuICAgICAgICBjb21wbGV0ZWRUYXNrc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHJlbmRlckNvbXBsZXRlZFRhc2tzKGZvcm1EaWFsb2csIHRhc2tGb3JtLCBlZGl0VGFza0Zvcm0pKTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoJ3JlbW92ZS1idXR0b24tJykpIHtcbiAgICAgICAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy50YXNrJykuZGF0YXNldC5wcm9qZWN0VGl0bGU7XG4gICAgICAgICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkVGFza3MgPSByZW1vdmVUYXNrKHByb2plY3RUaXRsZSwgdGFza0luZGV4KTtcbiAgICAgICAgICAgICAgcmVuZGVyKHVwZGF0ZWRUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pOyAvLyBSZS1yZW5kZXIgd2l0aCB0aGUgdXBkYXRlZCB0YXNrcyBhcnJheVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJlbmRlcihteVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSwgZWRpdFRhc2tGb3JtLCBlZGl0VGFza0RpYWxvZyk7IC8vIEluaXRpYWwgcmVuZGVyXG4gICAgICAgIHJlbmRlclByb2plY3RzKG15UHJvamVjdHMpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBldmVudHM7XG4iLCJpbXBvcnQgeyBzYXZlVG9Mb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XHJcblxyXG4vLyBQcm9qZWN0IGNvbnN0cnVjdG9yXHJcbmNsYXNzIFByb2plY3Qge1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpIHtcclxuICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICB0aGlzLnRhc2tzID0gW107XHJcbiAgICB9XHJcbiAgXHJcbiAgICBhZGRUYXNrKHRhc2spIHtcclxuICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgcmVtb3ZlVGFzayhpbmRleCkge1xyXG4gICAgICB0aGlzLnRhc2tzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbn1cclxuICBcclxuICBcclxuLy8gUHJvamVjdHMgYXJlIHN0b3JlZCBpbiB0aGUgZm9ybSBvZiBvYmplY3QgYXJyYXlzXHJcbmNvbnN0IG15UHJvamVjdHMgPSBbXTtcclxuXHJcbmZ1bmN0aW9uIGFkZFByb2plY3QocHJvamVjdFRpdGxlKSB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QocHJvamVjdFRpdGxlKTtcclxuICAgIG15UHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xyXG4gICAgcmV0dXJuIG15UHJvamVjdHM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVByb2plY3QocHJvamVjdEluZGV4KSB7XHJcbiAgICBteVByb2plY3RzLnNwbGljZShwcm9qZWN0SW5kZXgsIDEpO1xyXG4gICAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XHJcbiAgICByZXR1cm4gbXlQcm9qZWN0cztcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdChwcm9qZWN0SW5kZXgsIHByb2plY3RUaXRsZSkge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IG15UHJvamVjdHNbcHJvamVjdEluZGV4XTtcclxuICAgIHByb2plY3QucHJvamVjdFRpdGxlID0gcHJvamVjdFRpdGxlO1xyXG4gICAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGFkZFByb2plY3QsIHJlbW92ZVByb2plY3QsIHVwZGF0ZVByb2plY3QsIG15UHJvamVjdHMsIFByb2plY3R9O1xyXG4gIFxyXG4gICIsImltcG9ydCB7IG15UHJvamVjdHMgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcclxuaW1wb3J0IHsgbXlUYXNrcyB9IGZyb20gJy4vdGFza3MuanMnO1xyXG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tICcuL3Rhc2tzLmpzJztcclxuXHJcbmZ1bmN0aW9uIHNhdmVUb0xvY2FsU3RvcmFnZSgpIHtcclxuICBjb25zdCBkYXRhID0ge1xyXG4gICAgcHJvamVjdHM6IG15UHJvamVjdHMsXHJcbiAgICB0YXNrczogbXlUYXNrc1xyXG4gIH07XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9EYXRhJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkRnJvbUxvY2FsU3RvcmFnZSgpIHtcclxuICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb0RhdGEnKSk7XHJcbiAgaWYgKGRhdGEpIHtcclxuICAgIG15UHJvamVjdHMubGVuZ3RoID0gMDsgLy8gQ2xlYXIgZXhpc3RpbmcgcHJvamVjdHNcclxuICAgIG15UHJvamVjdHMucHVzaCguLi5kYXRhLnByb2plY3RzLm1hcChwcm9qZWN0RGF0YSA9PiB7XHJcbiAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0RGF0YS50aXRsZSk7XHJcbiAgICAgIHByb2plY3QudGFza3MgPSBwcm9qZWN0RGF0YS50YXNrcy5tYXAodGFza0RhdGEgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0YXNrRGF0YS50aXRsZSwgdGFza0RhdGEuZGVzY3JpcHRpb24sIHRhc2tEYXRhLmRhdGUsIHRhc2tEYXRhLnByaW9yaXR5LCBwcm9qZWN0KTtcclxuICAgICAgICB0YXNrLmNvbXBsZXRlZCA9IHRhc2tEYXRhLmNvbXBsZXRlZDtcclxuICAgICAgICByZXR1cm4gdGFzaztcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBwcm9qZWN0O1xyXG4gICAgfSkpO1xyXG5cclxuICAgIG15VGFza3MubGVuZ3RoID0gMDsgLy8gQ2xlYXIgZXhpc3RpbmcgdGFza3NcclxuICAgIG15VGFza3MucHVzaCguLi5kYXRhLnRhc2tzKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IHNhdmVUb0xvY2FsU3RvcmFnZSwgbG9hZEZyb21Mb2NhbFN0b3JhZ2UgfTtcclxuIiwiaW1wb3J0IHsgbXlQcm9qZWN0cyB9IGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQgeyBzYXZlVG9Mb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbi8vIFRhc2sgY29uc3RydWN0b3JcbmNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0VGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMucHJvamVjdFRpdGxlID0gcHJvamVjdFRpdGxlO1xuICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gIH1cbn1cblxuLy8gVGFza3MgYXJlIHN0b3JlZCBpbiB0aGUgZm9ybSBvZiBvYmplY3QgYXJyYXlzXG5jb25zdCBteVRhc2tzID0gW107XG5cbmZ1bmN0aW9uIGFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdFRpdGxlKSB7XG4gIGxldCBwcm9qZWN0ID0gbXlQcm9qZWN0cy5maW5kKHAgPT4gcC50aXRsZSA9PT0gcHJvamVjdFRpdGxlKTtcbiAgaWYgKCFwcm9qZWN0KSB7XG4gICAgY29uc29sZS5lcnJvcignUHJvamVjdCBub3QgZm91bmQ6JywgcHJvamVjdFRpdGxlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3RUaXRsZSk7XG4gIHByb2plY3QuYWRkVGFzayhuZXdUYXNrKTtcbiAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XG59XG5cblxuXG5mdW5jdGlvbiByZW1vdmVUYXNrKHByb2plY3RUaXRsZSwgdGFza0luZGV4KSB7XG4gIGNvbnN0IHByb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xuICBpZiAoIXByb2plY3QpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9qZWN0LnRhc2tzLnNwbGljZSh0YXNrSW5kZXgsIDEpO1xuICBzYXZlVG9Mb2NhbFN0b3JhZ2UoKTtcbiAgcmV0dXJuIHByb2plY3QudGFza3M7IC8vIFJldHVybiB0aGUgdXBkYXRlZCB0YXNrcyBhcnJheVxufVxuXG5cbmZ1bmN0aW9uIHVwZGF0ZVRhc2socHJvamVjdFRpdGxlLCBlZGl0VGFza0luZGV4LCB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBuZXdQcm9qZWN0VGl0bGUpIHtcbiAgY29uc29sZS5sb2coYFVwZGF0aW5nIHRhc2sgaW4gcHJvamVjdDogJHtwcm9qZWN0VGl0bGV9LCB0YXNrIGluZGV4OiAke2VkaXRUYXNrSW5kZXh9YCk7XG4gIGNvbnN0IHByb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xuICBpZiAoIXByb2plY3QpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zb2xlLmxvZygnT3JpZ2luYWwgcHJvamVjdCB0YXNrcyBiZWZvcmUgdXBkYXRpbmc6JywgcHJvamVjdC50YXNrcyk7XG4gIGxldCB0YXNrO1xuICBpZiAoZWRpdFRhc2tJbmRleCA+PSAwICYmIGVkaXRUYXNrSW5kZXggPCBwcm9qZWN0LnRhc2tzLmxlbmd0aCkge1xuICAgIHRhc2sgPSBwcm9qZWN0LnRhc2tzW2VkaXRUYXNrSW5kZXhdO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1Rhc2sgbm90IGZvdW5kIGF0IGluZGV4OicsIGVkaXRUYXNrSW5kZXgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aGUgdGFzayBwcm9wZXJ0aWVzXG4gIHRhc2sudGl0bGUgPSB0aXRsZTtcbiAgdGFzay5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB0YXNrLmRhdGUgPSBkYXRlO1xuICB0YXNrLnByaW9yaXR5ID0gcHJpb3JpdHk7XG5cbiAgY29uc29sZS5sb2coJ09yaWdpbmFsIHByb2plY3QgdGFza3MgYWZ0ZXIgdXBkYXRpbmcgYnV0IGJlZm9yZSBtb3Zpbmc6JywgcHJvamVjdC50YXNrcyk7XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIHByb2plY3QgaGFzIGJlZW4gY2hhbmdlZFxuICBpZiAobmV3UHJvamVjdFRpdGxlICYmIG5ld1Byb2plY3RUaXRsZSAhPT0gcHJvamVjdFRpdGxlKSB7XG4gICAgLy8gRmluZCB0aGUgbmV3IHByb2plY3RcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbXlQcm9qZWN0cy5maW5kKHAgPT4gcC50aXRsZSA9PT0gbmV3UHJvamVjdFRpdGxlKTtcbiAgICBpZiAobmV3UHJvamVjdCkge1xuICAgICAgLy8gUmVtb3ZlIHRoZSB0YXNrIGZyb20gdGhlIGN1cnJlbnQgcHJvamVjdFxuICAgICAgcHJvamVjdC50YXNrcy5zcGxpY2UoZWRpdFRhc2tJbmRleCwgMSk7XG5cbiAgICAgIC8vIEFkZCB0aGUgdGFzayB0byB0aGUgbmV3IHByb2plY3RcbiAgICAgIG5ld1Byb2plY3QuYWRkVGFzayh0YXNrKTtcbiAgICAgIHRhc2sucHJvamVjdCA9IG5ld1Byb2plY3Q7IC8vIFVwZGF0ZSB0aGUgdGFzaydzIHByb2plY3QgcmVmZXJlbmNlXG4gICAgICBjb25zb2xlLmxvZygnTmV3IHByb2plY3QgdGFza3M6JywgbmV3UHJvamVjdC50YXNrcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05ldyBwcm9qZWN0IG5vdCBmb3VuZDonLCBuZXdQcm9qZWN0VGl0bGUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNhdmUgY2hhbmdlcyB0byBsb2NhbCBzdG9yYWdlXG4gIHNhdmVUb0xvY2FsU3RvcmFnZSgpO1xufVxuXG5cbmZ1bmN0aW9uIHRvZ2dsZVRhc2tDb21wbGV0aW9uKHByb2plY3RUaXRsZSwgdGFza0luZGV4KSB7XG4gIGNvbnN0IHByb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xuICBpZiAoIXByb2plY3QpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB0YXNrID0gcHJvamVjdC50YXNrc1t0YXNrSW5kZXhdO1xuICBpZiAoIXRhc2spIHtcbiAgICBjb25zb2xlLmVycm9yKCdUYXNrIG5vdCBmb3VuZCBhdCBpbmRleDonLCB0YXNrSW5kZXgpO1xuICAgIHJldHVybjtcbiAgfVxuICB0YXNrLmNvbXBsZXRlZCA9ICF0YXNrLmNvbXBsZXRlZDtcbiAgc2F2ZVRvTG9jYWxTdG9yYWdlKCk7XG59XG5cbmV4cG9ydCB7IGFkZFRhc2ssIHJlbW92ZVRhc2ssIHVwZGF0ZVRhc2ssIHRvZ2dsZVRhc2tDb21wbGV0aW9uLCBteVRhc2tzLCBUYXNrIH07XG5cbiIsImxldCBkZWZhdWx0T3B0aW9ucyA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gIHJldHVybiBkZWZhdWx0T3B0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldERlZmF1bHRPcHRpb25zKG5ld09wdGlvbnMpIHtcbiAgZGVmYXVsdE9wdGlvbnMgPSBuZXdPcHRpb25zO1xufVxuIiwiaW1wb3J0IHsgc3RhcnRPZkRheSB9IGZyb20gXCIuL3N0YXJ0T2ZEYXkubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgaXNTYW1lRGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgaW4gdGhlIHNhbWUgZGF5IChhbmQgeWVhciBhbmQgbW9udGgpP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJlIHRoZSBnaXZlbiBkYXRlcyBpbiB0aGUgc2FtZSBkYXkgKGFuZCB5ZWFyIGFuZCBtb250aCk/XG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGVMZWZ0IC0gVGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSBkYXRlUmlnaHQgLSBUaGUgc2Vjb25kIGRhdGUgdG8gY2hlY2tcblxuICogQHJldHVybnMgVGhlIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSBkYXkgKGFuZCB5ZWFyIGFuZCBtb250aClcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDQgU2VwdGVtYmVyIDA2OjAwOjAwIGFuZCA0IFNlcHRlbWJlciAxODowMDowMCBpbiB0aGUgc2FtZSBkYXk/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVEYXkobmV3IERhdGUoMjAxNCwgOCwgNCwgNiwgMCksIG5ldyBEYXRlKDIwMTQsIDgsIDQsIDE4LCAwKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgNCBTZXB0ZW1iZXIgYW5kIDQgT2N0b2JlciBpbiB0aGUgc2FtZSBkYXk/XG4gKiBjb25zdCByZXN1bHQgPSBpc1NhbWVEYXkobmV3IERhdGUoMjAxNCwgOCwgNCksIG5ldyBEYXRlKDIwMTQsIDksIDQpKVxuICogLy89PiBmYWxzZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgNCBTZXB0ZW1iZXIsIDIwMTQgYW5kIDQgU2VwdGVtYmVyLCAyMDE1IGluIHRoZSBzYW1lIGRheT9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzU2FtZURheShuZXcgRGF0ZSgyMDE0LCA4LCA0KSwgbmV3IERhdGUoMjAxNSwgOCwgNCkpXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVEYXkoZGF0ZUxlZnQsIGRhdGVSaWdodCkge1xuICBjb25zdCBkYXRlTGVmdFN0YXJ0T2ZEYXkgPSBzdGFydE9mRGF5KGRhdGVMZWZ0KTtcbiAgY29uc3QgZGF0ZVJpZ2h0U3RhcnRPZkRheSA9IHN0YXJ0T2ZEYXkoZGF0ZVJpZ2h0KTtcblxuICByZXR1cm4gK2RhdGVMZWZ0U3RhcnRPZkRheSA9PT0gK2RhdGVSaWdodFN0YXJ0T2ZEYXk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgaXNTYW1lRGF5O1xuIiwiaW1wb3J0IHsgc3RhcnRPZldlZWsgfSBmcm9tIFwiLi9zdGFydE9mV2Vlay5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGlzU2FtZVdlZWt9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBpc1NhbWVXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIHdlZWsgKGFuZCBtb250aCBhbmQgeWVhcik/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBcmUgdGhlIGdpdmVuIGRhdGVzIGluIHRoZSBzYW1lIHdlZWsgKGFuZCBtb250aCBhbmQgeWVhcik/XG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGVMZWZ0IC0gVGhlIGZpcnN0IGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSBkYXRlUmlnaHQgLSBUaGUgc2Vjb25kIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSBvcHRpb25zIC0gQW4gb2JqZWN0IHdpdGggb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zIFRoZSBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgd2VlayAoYW5kIG1vbnRoIGFuZCB5ZWFyKVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBcmUgMzEgQXVndXN0IDIwMTQgYW5kIDQgU2VwdGVtYmVyIDIwMTQgaW4gdGhlIHNhbWUgd2Vlaz9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzU2FtZVdlZWsobmV3IERhdGUoMjAxNCwgNywgMzEpLCBuZXcgRGF0ZSgyMDE0LCA4LCA0KSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB3ZWVrIHN0YXJ0cyB3aXRoIE1vbmRheSxcbiAqIC8vIGFyZSAzMSBBdWd1c3QgMjAxNCBhbmQgNCBTZXB0ZW1iZXIgMjAxNCBpbiB0aGUgc2FtZSB3ZWVrP1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lV2VlayhuZXcgRGF0ZSgyMDE0LCA3LCAzMSksIG5ldyBEYXRlKDIwMTQsIDgsIDQpLCB7XG4gKiAgIHdlZWtTdGFydHNPbjogMVxuICogfSlcbiAqIC8vPT4gZmFsc2VcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDEgSmFudWFyeSAyMDE0IGFuZCAxIEphbnVhcnkgMjAxNSBpbiB0aGUgc2FtZSB3ZWVrP1xuICogY29uc3QgcmVzdWx0ID0gaXNTYW1lV2VlayhuZXcgRGF0ZSgyMDE0LCAwLCAxKSwgbmV3IERhdGUoMjAxNSwgMCwgMSkpXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1NhbWVXZWVrKGRhdGVMZWZ0LCBkYXRlUmlnaHQsIG9wdGlvbnMpIHtcbiAgY29uc3QgZGF0ZUxlZnRTdGFydE9mV2VlayA9IHN0YXJ0T2ZXZWVrKGRhdGVMZWZ0LCBvcHRpb25zKTtcbiAgY29uc3QgZGF0ZVJpZ2h0U3RhcnRPZldlZWsgPSBzdGFydE9mV2VlayhkYXRlUmlnaHQsIG9wdGlvbnMpO1xuXG4gIHJldHVybiArZGF0ZUxlZnRTdGFydE9mV2VlayA9PT0gK2RhdGVSaWdodFN0YXJ0T2ZXZWVrO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzU2FtZVdlZWs7XG4iLCJpbXBvcnQgeyBpc1NhbWVXZWVrIH0gZnJvbSBcIi4vaXNTYW1lV2Vlay5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIGlzVGhpc1dlZWt9IGZ1bmN0aW9uIG9wdGlvbnMuXG4gKi9cblxuLyoqXG4gKiBAbmFtZSBpc1RoaXNXZWVrXG4gKiBAY2F0ZWdvcnkgV2VlayBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgc2FtZSB3ZWVrIGFzIHRoZSBjdXJyZW50IGRhdGU/XG4gKiBAcHVyZSBmYWxzZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHNhbWUgd2VlayBhcyB0aGUgY3VycmVudCBkYXRlP1xuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF0ZSBpcyBpbiB0aGlzIHdlZWtcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMjUgU2VwdGVtYmVyIDIwMTQsIGlzIDIxIFNlcHRlbWJlciAyMDE0IGluIHRoaXMgd2Vlaz9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzVGhpc1dlZWsobmV3IERhdGUoMjAxNCwgOCwgMjEpKVxuICogLy89PiB0cnVlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDI1IFNlcHRlbWJlciAyMDE0IGFuZCB3ZWVrIHN0YXJ0cyB3aXRoIE1vbmRheVxuICogLy8gaXMgMjEgU2VwdGVtYmVyIDIwMTQgaW4gdGhpcyB3ZWVrP1xuICogY29uc3QgcmVzdWx0ID0gaXNUaGlzV2VlayhuZXcgRGF0ZSgyMDE0LCA4LCAyMSksIHsgd2Vla1N0YXJ0c09uOiAxIH0pXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1RoaXNXZWVrKGRhdGUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGlzU2FtZVdlZWsoZGF0ZSwgRGF0ZS5ub3coKSwgb3B0aW9ucyk7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgaXNUaGlzV2VlaztcbiIsImltcG9ydCB7IGlzU2FtZURheSB9IGZyb20gXCIuL2lzU2FtZURheS5tanNcIjtcblxuLyoqXG4gKiBAbmFtZSBpc1RvZGF5XG4gKiBAY2F0ZWdvcnkgRGF5IEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIHRvZGF5P1xuICogQHB1cmUgZmFsc2VcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIHRvZGF5P1xuICpcbiAqIEB0eXBlUGFyYW0gRGF0ZVR5cGUgLSBUaGUgYERhdGVgIHR5cGUsIHRoZSBmdW5jdGlvbiBvcGVyYXRlcyBvbi4gR2V0cyBpbmZlcnJlZCBmcm9tIHBhc3NlZCBhcmd1bWVudHMuIEFsbG93cyB0byB1c2UgZXh0ZW5zaW9ucyBsaWtlIFtgVVRDRGF0ZWBdKGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy91dGMpLlxuICpcbiAqIEBwYXJhbSBkYXRlIC0gVGhlIGRhdGUgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyBUaGUgZGF0ZSBpcyB0b2RheVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyA2IE9jdG9iZXIgMjAxNCwgaXMgNiBPY3RvYmVyIDE0OjAwOjAwIHRvZGF5P1xuICogY29uc3QgcmVzdWx0ID0gaXNUb2RheShuZXcgRGF0ZSgyMDE0LCA5LCA2LCAxNCwgMCkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVG9kYXkoZGF0ZSkge1xuICByZXR1cm4gaXNTYW1lRGF5KGRhdGUsIERhdGUubm93KCkpO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IGlzVG9kYXk7XG4iLCJpbXBvcnQgeyB0b0RhdGUgfSBmcm9tIFwiLi90b0RhdGUubWpzXCI7XG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZkRheVxuICogQGNhdGVnb3J5IERheSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIHN0YXJ0IG9mIGEgZGF5IGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSBkYXkgZm9yIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIHJlc3VsdCB3aWxsIGJlIGluIHRoZSBsb2NhbCB0aW1lem9uZS5cbiAqXG4gKiBAdHlwZVBhcmFtIERhdGVUeXBlIC0gVGhlIGBEYXRlYCB0eXBlLCB0aGUgZnVuY3Rpb24gb3BlcmF0ZXMgb24uIEdldHMgaW5mZXJyZWQgZnJvbSBwYXNzZWQgYXJndW1lbnRzLiBBbGxvd3MgdG8gdXNlIGV4dGVuc2lvbnMgbGlrZSBbYFVUQ0RhdGVgXShodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvdXRjKS5cbiAqXG4gKiBAcGFyYW0gZGF0ZSAtIFRoZSBvcmlnaW5hbCBkYXRlXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgZGF5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFRoZSBzdGFydCBvZiBhIGRheSBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gVHVlIFNlcCAwMiAyMDE0IDAwOjAwOjAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGFydE9mRGF5KGRhdGUpIHtcbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIF9kYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gX2RhdGU7XG59XG5cbi8vIEZhbGxiYWNrIGZvciBtb2R1bGFyaXplZCBpbXBvcnRzOlxuZXhwb3J0IGRlZmF1bHQgc3RhcnRPZkRheTtcbiIsImltcG9ydCB7IHRvRGF0ZSB9IGZyb20gXCIuL3RvRGF0ZS5tanNcIjtcbmltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4vX2xpYi9kZWZhdWx0T3B0aW9ucy5tanNcIjtcblxuLyoqXG4gKiBUaGUge0BsaW5rIHN0YXJ0T2ZXZWVrfSBmdW5jdGlvbiBvcHRpb25zLlxuICovXG5cbi8qKlxuICogQG5hbWUgc3RhcnRPZldlZWtcbiAqIEBjYXRlZ29yeSBXZWVrIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgc3RhcnQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgc3RhcnQgb2YgYSB3ZWVrIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAqIFRoZSByZXN1bHQgd2lsbCBiZSBpbiB0aGUgbG9jYWwgdGltZXpvbmUuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGRhdGUgLSBUaGUgb3JpZ2luYWwgZGF0ZVxuICogQHBhcmFtIG9wdGlvbnMgLSBBbiBvYmplY3Qgd2l0aCBvcHRpb25zXG4gKlxuICogQHJldHVybnMgVGhlIHN0YXJ0IG9mIGEgd2Vla1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBUaGUgc3RhcnQgb2YgYSB3ZWVrIGZvciAyIFNlcHRlbWJlciAyMDE0IDExOjU1OjAwOlxuICogY29uc3QgcmVzdWx0ID0gc3RhcnRPZldlZWsobmV3IERhdGUoMjAxNCwgOCwgMiwgMTEsIDU1LCAwKSlcbiAqIC8vPT4gU3VuIEF1ZyAzMSAyMDE0IDAwOjAwOjAwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRoZSB3ZWVrIHN0YXJ0cyBvbiBNb25kYXksIHRoZSBzdGFydCBvZiB0aGUgd2VlayBmb3IgMiBTZXB0ZW1iZXIgMjAxNCAxMTo1NTowMDpcbiAqIGNvbnN0IHJlc3VsdCA9IHN0YXJ0T2ZXZWVrKG5ldyBEYXRlKDIwMTQsIDgsIDIsIDExLCA1NSwgMCksIHsgd2Vla1N0YXJ0c09uOiAxIH0pXG4gKiAvLz0+IE1vbiBTZXAgMDEgMjAxNCAwMDowMDowMFxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRPZldlZWsoZGF0ZSwgb3B0aW9ucykge1xuICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIGNvbnN0IHdlZWtTdGFydHNPbiA9XG4gICAgb3B0aW9ucz8ud2Vla1N0YXJ0c09uID8/XG4gICAgb3B0aW9ucz8ubG9jYWxlPy5vcHRpb25zPy53ZWVrU3RhcnRzT24gPz9cbiAgICBkZWZhdWx0T3B0aW9ucy53ZWVrU3RhcnRzT24gPz9cbiAgICBkZWZhdWx0T3B0aW9ucy5sb2NhbGU/Lm9wdGlvbnM/LndlZWtTdGFydHNPbiA/P1xuICAgIDA7XG5cbiAgY29uc3QgX2RhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gIGNvbnN0IGRheSA9IF9kYXRlLmdldERheSgpO1xuICBjb25zdCBkaWZmID0gKGRheSA8IHdlZWtTdGFydHNPbiA/IDcgOiAwKSArIGRheSAtIHdlZWtTdGFydHNPbjtcblxuICBfZGF0ZS5zZXREYXRlKF9kYXRlLmdldERhdGUoKSAtIGRpZmYpO1xuICBfZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIF9kYXRlO1xufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHN0YXJ0T2ZXZWVrO1xuIiwiLyoqXG4gKiBAbmFtZSB0b0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGFuIGluc3RhbmNlIG9mIERhdGUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIGl0cyBjbG9uZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBudW1iZXIsIGl0IGlzIHRyZWF0ZWQgYXMgYSB0aW1lc3RhbXAuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG5vbmUgb2YgdGhlIGFib3ZlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogKipOb3RlKio6ICphbGwqIERhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBhbnkgKmRhdGUtZm5zKiBmdW5jdGlvbiBpcyBwcm9jZXNzZWQgYnkgYHRvRGF0ZWAuXG4gKlxuICogQHR5cGVQYXJhbSBEYXRlVHlwZSAtIFRoZSBgRGF0ZWAgdHlwZSwgdGhlIGZ1bmN0aW9uIG9wZXJhdGVzIG9uLiBHZXRzIGluZmVycmVkIGZyb20gcGFzc2VkIGFyZ3VtZW50cy4gQWxsb3dzIHRvIHVzZSBleHRlbnNpb25zIGxpa2UgW2BVVENEYXRlYF0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL3V0YykuXG4gKlxuICogQHBhcmFtIGFyZ3VtZW50IC0gVGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqXG4gKiBAcmV0dXJucyBUaGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICBjb25zdCBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpO1xuXG4gIC8vIENsb25lIHRoZSBkYXRlXG4gIGlmIChcbiAgICBhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHxcbiAgICAodHlwZW9mIGFyZ3VtZW50ID09PSBcIm9iamVjdFwiICYmIGFyZ1N0ciA9PT0gXCJbb2JqZWN0IERhdGVdXCIpXG4gICkge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgYXJndW1lbnQuY29uc3RydWN0b3IoK2FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChcbiAgICB0eXBlb2YgYXJndW1lbnQgPT09IFwibnVtYmVyXCIgfHxcbiAgICBhcmdTdHIgPT09IFwiW29iamVjdCBOdW1iZXJdXCIgfHxcbiAgICB0eXBlb2YgYXJndW1lbnQgPT09IFwic3RyaW5nXCIgfHxcbiAgICBhcmdTdHIgPT09IFwiW29iamVjdCBTdHJpbmddXCJcbiAgKSB7XG4gICAgLy8gVE9ETzogQ2FuIHdlIGdldCByaWQgb2YgYXM/XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUT0RPOiBDYW4gd2UgZ2V0IHJpZCBvZiBhcz9cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufVxuXG4vLyBGYWxsYmFjayBmb3IgbW9kdWxhcml6ZWQgaW1wb3J0czpcbmV4cG9ydCBkZWZhdWx0IHRvRGF0ZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9tb2R1bGVzL2V2ZW50cy5qc1wiO1xuXG5ldmVudHMoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=