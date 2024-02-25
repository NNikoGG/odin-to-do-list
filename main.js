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
  return _projects_js__WEBPACK_IMPORTED_MODULE_1__.myProjects.flatMap(project => project.tasks);
}

function renderTodayTasks(formDialog, taskForm, editTaskForm) {
  const today = new Date().toISOString().slice(0, 10);
  const allTasks = getAllTasks();
  const todayTasks = allTasks.filter(task => task.date === today);
  render(todayTasks, formDialog, taskForm, editTaskForm);
}

function renderThisWeekTasks(formDialog, taskForm, editTaskForm) {
  const today = new Date();
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 6); // Assuming a week is 7 days including today
  const allTasks = getAllTasks();
  const thisWeekTasks = allTasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate >= today && taskDate <= endOfWeek;
  });
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
        const defaultProject = new _projects_js__WEBPACK_IMPORTED_MODULE_2__.Project("Default");
        _projects_js__WEBPACK_IMPORTED_MODULE_2__.myProjects.push(defaultProject);
        
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
            (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderTasksByProject)(newProjectTitle); // Or render all tasks if needed
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

        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(_tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm, editTaskForm, editTaskDialog);// Initial render
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
    return myProjects;
}

function removeProject(projectIndex) {
    myProjects.splice(projectIndex, 1);
    return myProjects;
}

function updateProject(projectIndex, projectTitle) {
    const project = myProjects[projectIndex];
    project.projectTitle = projectTitle;
}


  
  

/***/ }),

/***/ "./src/modules/tasks.js":
/*!******************************!*\
  !*** ./src/modules/tasks.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTask: () => (/* binding */ addTask),
/* harmony export */   myTasks: () => (/* binding */ myTasks),
/* harmony export */   removeTask: () => (/* binding */ removeTask),
/* harmony export */   toggleTaskCompletion: () => (/* binding */ toggleTaskCompletion),
/* harmony export */   updateTask: () => (/* binding */ updateTask)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");


// Task constructor
class Task {
  constructor(title, description, date, priority, project) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.project = project;
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
  const newTask = new Task(title, description, date, priority, project);
  project.addTask(newTask);
}


function removeTask(projectTitle, taskIndex) {
  const project = _projects__WEBPACK_IMPORTED_MODULE_0__.myProjects.find(p => p.title === projectTitle);
  if (!project) {
    console.error('Project not found:', projectTitle);
    return;
  }
  project.tasks.splice(taskIndex, 1);
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
      console.log('Original project tasks after moving:', project.tasks);

      // Add the task to the new project
      newProject.addTask(task);
      task.project = newProject; // Update the task's project reference
      console.log('New project tasks:', newProject.tasks);
    } else {
      console.error('New project not found:', newProjectTitle);
    }
  }
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
}





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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaURBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxrQkFBa0IsaURBQVU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFMEU7Ozs7Ozs7O1VDakcxRTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnlDOztBQUV6Qyw4REFBTSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbXlUYXNrcywgdG9nZ2xlVGFza0NvbXBsZXRpb24gfSBmcm9tICcuL3Rhc2tzLmpzJztcbmltcG9ydCB7IG15UHJvamVjdHMgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcblxuZnVuY3Rpb24gcmVuZGVyKHRhc2tzID0gbXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSkge1xuICAgIGxldCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XG4gICAgdGFza0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgXG4gICAgLy8gU29ydCB0YXNrcyBieSBkYXRlIHVzaW5nIG5hdGl2ZSBKYXZhU2NyaXB0IERhdGUgcGFyc2luZ1xuICAgIGNvbnN0IHNvcnRlZFRhc2tzID0gdGFza3Muc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYS5kYXRlKSAtIG5ldyBEYXRlKGIuZGF0ZSkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydGVkVGFza3MubGVuZ3RoOyBpKyspe1xuICAgICAgICBsZXQgdGFzayA9IHNvcnRlZFRhc2tzW2ldO1xuICAgICAgICBsZXQgdGFza1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGFza1dyYXBwZXIuY2xhc3NOYW1lID0gXCJ0YXNrXCI7XG4gICAgICAgIHRhc2tXcmFwcGVyLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgICAgICBpZih0YXNrLnByb2plY3QpIHtcbiAgICAgICAgICB0YXNrV3JhcHBlci5kYXRhc2V0LnByb2plY3RUaXRsZSA9IHRhc2sucHJvamVjdC50aXRsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB0YXNrIGlzIGNvbXBsZXRlZCBhbmQgYWRkIHRoZSAnY29tcGxldGVkJyBjbGFzcyBhY2NvcmRpbmdseVxuICAgICAgICBpZiAodGFzay5jb21wbGV0ZWQpIHtcbiAgICAgICAgICB0YXNrV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfSAgICAgICAgXG5cbiAgICAgICAgdGFza0xpc3QuYXBwZW5kQ2hpbGQodGFza1dyYXBwZXIpO1xuXG4gICAgICAgIGxldCB0b2dnbGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5pZCA9IGB0b2dnbGUtYnV0dG9uLSR7aX1gO1xuICAgICAgICB0b2dnbGVCdXR0b24uY2xhc3NOYW1lID0gdGFzay5jb21wbGV0ZWQgPyBcImZhLXNvbGlkIGZhLWNpcmNsZS1jaGVja1wiIDogXCJmYS1yZWd1bGFyIGZhLWNpcmNsZVwiO1xuICAgICAgICB0b2dnbGVCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XG5cbiAgICAgICAgdG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudCB0aGUgZXZlbnQgZnJvbSBidWJibGluZyB1cCB0byB0aGUgdGFza1dyYXBwZXJcbiAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSB0aGlzLmNsb3Nlc3QoJy50YXNrJykuZGF0YXNldC5wcm9qZWN0VGl0bGU7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGFzZXQuaW5kZXg7XG4gICAgICAgICAgdG9nZ2xlVGFza0NvbXBsZXRpb24ocHJvamVjdFRpdGxlLCBpbmRleCk7XG4gICAgICAgICAgcmVuZGVyKHRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSwgZWRpdFRhc2tGb3JtKTsgLy8gUmUtcmVuZGVyIHRoZSB0YXNrc1xuICAgICAgICB9KTsgICAgIFxuXG4gICAgICAgIGxldCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgdGFza05hbWUuaWQgPSAndGFzay10aXRsZSc7XG4gICAgICAgIHRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGl0bGU7XG4gICAgICAgIGxldCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbi5pZCA9ICd0YXNrLWRlc2NyaXB0aW9uJztcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgdGFza0RhdGUuaWQgPSAndGFzay1kYXRlJztcbiAgICAgICAgdGFza0RhdGUuaW5uZXJUZXh0ID0gdGFzay5kYXRlO1xuICAgICAgICBsZXQgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICB0YXNrUHJpb3JpdHkuaWQgPSAndGFzay1wcmlvcml0eSc7XG4gICAgICAgIHRhc2tQcmlvcml0eS5pbm5lclRleHQgPSB0YXNrLnByaW9yaXR5O1xuICAgICAgICBsZXQgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgZWRpdEJ1dHRvbi5pZCA9IGBlZGl0LWJ1dHRvbi0ke2l9YDtcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc05hbWUgPSBcImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmVcIjtcbiAgICAgICAgZWRpdEJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICAgICAgZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgLy8gUHJldmVudCB0aGUgZXZlbnQgZnJvbSB0cmlnZ2VyaW5nIHRoZSB0YXNrV3JhcHBlcidzIGNsaWNrIGV2ZW50XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgY29uc3QgdGFza0luZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4O1xuICAgICAgICAgIGNvbnN0IHRhc2sgPSB0YXNrc1t0YXNrSW5kZXhdO1xuICAgICAgICAgIGNvbnN0IGVkaXRUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRhc2stZm9ybScpO1xuICAgICAgICAgIGNvbnN0IGVkaXRUYXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1kaWFsb2cnKTtcbiAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10aXRsZScpLnZhbHVlID0gdGFzay50aXRsZTtcbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGVzY3JpcHRpb24nKS52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LWRhdGUnKS52YWx1ZSA9IHRhc2suZGF0ZTtcbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtcHJpb3JpdHktc2VsZWN0JykudmFsdWUgPSB0YXNrLnByaW9yaXR5O1xuICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1wcm9qZWN0LXNlbGVjdCcpLnZhbHVlID0gdGFzay5wcm9qZWN0LnRpdGxlO1xuICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgdGFzaydzIGluZGV4IGFuZCBwcm9qZWN0IHRpdGxlIGluIHRoZSBmb3JtJ3MgZGF0YXNldFxuICAgICAgICAgICAgICBlZGl0VGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXggPSB0YXNrSW5kZXg7XG4gICAgICAgICAgICAgIGVkaXRUYXNrRm9ybS5kYXRhc2V0LnByb2plY3RUaXRsZSA9IHRhc2sucHJvamVjdC50aXRsZTtcbiAgICAgICAgICAgICAgLy8gU2hvdyB0aGUgZWRpdCB0YXNrIGRpYWxvZ1xuICAgICAgICAgICAgICBlZGl0VGFza0RpYWxvZy5zaG93TW9kYWwoKTtcbiAgICAgICAgICAgICAgZWRpdFRhc2tEaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpYWxvZ0RpbWVuc2lvbnMgPSBlZGl0VGFza0RpYWxvZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIGUuY2xpZW50WCA8IGRpYWxvZ0RpbWVuc2lvbnMubGVmdCB8fFxuICAgICAgICAgICAgICAgICAgICBlLmNsaWVudFggPiBkaWFsb2dEaW1lbnNpb25zLnJpZ2h0IHx8XG4gICAgICAgICAgICAgICAgICAgIGUuY2xpZW50WSA8IGRpYWxvZ0RpbWVuc2lvbnMudG9wIHx8XG4gICAgICAgICAgICAgICAgICAgIGUuY2xpZW50WSA+IGRpYWxvZ0RpbWVuc2lvbnMuYm90dG9tXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGVkaXRUYXNrRGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUYXNrIG5vdCBmb3VuZCBhdCBpbmRleDonLCB0YXNrSW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHJlbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgcmVtb3ZlQnV0dG9uLmlkID0gYHJlbW92ZS1idXR0b24tJHtpfWA7XG4gICAgICAgIHJlbW92ZUJ1dHRvbi5jbGFzc05hbWUgPSBcImZhLXNvbGlkIGZhLWNpcmNsZS14bWFya1wiO1xuICAgICAgICByZW1vdmVCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XG5cbiAgICAgICAgdGFza1dyYXBwZXIuaW5zZXJ0QmVmb3JlKHRvZ2dsZUJ1dHRvbiwgdGFza1dyYXBwZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcbiAgICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xuICAgICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpO1xuICAgICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcbiAgICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQocmVtb3ZlQnV0dG9uKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldEFsbFRhc2tzKCkge1xuICByZXR1cm4gbXlQcm9qZWN0cy5mbGF0TWFwKHByb2plY3QgPT4gcHJvamVjdC50YXNrcyk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRvZGF5VGFza3MoZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSkge1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7XG4gIGNvbnN0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcbiAgY29uc3QgdG9kYXlUYXNrcyA9IGFsbFRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suZGF0ZSA9PT0gdG9kYXkpO1xuICByZW5kZXIodG9kYXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRoaXNXZWVrVGFza3MoZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSkge1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IGVuZE9mV2VlayA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgZW5kT2ZXZWVrLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgNik7IC8vIEFzc3VtaW5nIGEgd2VlayBpcyA3IGRheXMgaW5jbHVkaW5nIHRvZGF5XG4gIGNvbnN0IGFsbFRhc2tzID0gZ2V0QWxsVGFza3MoKTtcbiAgY29uc3QgdGhpc1dlZWtUYXNrcyA9IGFsbFRhc2tzLmZpbHRlcih0YXNrID0+IHtcbiAgICBjb25zdCB0YXNrRGF0ZSA9IG5ldyBEYXRlKHRhc2suZGF0ZSk7XG4gICAgcmV0dXJuIHRhc2tEYXRlID49IHRvZGF5ICYmIHRhc2tEYXRlIDw9IGVuZE9mV2VlaztcbiAgfSk7XG4gIHJlbmRlcih0aGlzV2Vla1Rhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSwgZWRpdFRhc2tGb3JtKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29tcGxldGVkVGFza3MoZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSkge1xuICBjb25zdCBhbGxUYXNrcyA9IGdldEFsbFRhc2tzKCk7XG4gIGNvbnN0IGNvbXBsZXRlZFRhc2tzID0gYWxsVGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay5jb21wbGV0ZWQpO1xuICByZW5kZXIoY29tcGxldGVkVGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtLCBlZGl0VGFza0Zvcm0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJQcm9qZWN0cyhwcm9qZWN0cykge1xuICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1jb250YWluZXInKTtcbiAgY29uc3QgcHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXNlbGVjdCcpO1xuICBwcm9qZWN0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJzsgLy8gQ2xlYXIgZXhpc3RpbmcgcHJvamVjdHNcbiAgcHJvamVjdFNlbGVjdC5pbm5lckhUTUwgPSAnPG9wdGlvbiB2YWx1ZT1cIm5vbmVcIj5TZWxlY3QgUHJvamVjdDwvb3B0aW9uPic7IC8vIFJlc2V0IHRoZSBzZWxlY3QgbWVudVxuICBjb25zdCBlZGl0UHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByb2plY3Qtc2VsZWN0Jyk7XG4gIGVkaXRQcm9qZWN0U2VsZWN0LmlubmVySFRNTCA9ICc8b3B0aW9uIHZhbHVlPVwibm9uZVwiPlNlbGVjdCBQcm9qZWN0PC9vcHRpb24+JztcbiAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICBvcHRpb24udmFsdWUgPSBwcm9qZWN0LnRpdGxlO1xuICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcbiAgICAgIGVkaXRQcm9qZWN0U2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gIH0pO1xuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgIC8vIFJlbmRlciBwcm9qZWN0IGJ1dHRvbnNcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgcHJvamVjdEJ1dHRvbi5pZCA9IGBwcm9qZWN0LSR7aW5kZXh9YDtcbiAgICBwcm9qZWN0QnV0dG9uLmlubmVySFRNTCA9IGBcbiAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlzdC11bFwiPjwvaT5cbiAgICAgIDxwPiR7cHJvamVjdC50aXRsZX08L3A+XG4gICAgYDtcbiAgICBwcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgcmVuZGVyVGFza3NCeVByb2plY3QocHJvamVjdC50aXRsZSk7XG4gICAgfSk7XG4gICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEJ1dHRvbik7XG5cbiAgICAvLyBBZGQgb3B0aW9ucyB0byB0aGUgc2VsZWN0IG1lbnVcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBvcHRpb24udmFsdWUgPSBwcm9qZWN0LnRpdGxlO1xuICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG4gICAgcHJvamVjdFNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyVGFza3NCeVByb2plY3QocHJvamVjdFRpdGxlKSB7XG4gIGNvbnN0IHByb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xuICBpZiAocHJvamVjdCkge1xuICAgIHJlbmRlcihwcm9qZWN0LnRhc2tzKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xuICB9XG59XG5cbmV4cG9ydCB7IHJlbmRlciwgcmVuZGVyVG9kYXlUYXNrcywgcmVuZGVyVGhpc1dlZWtUYXNrcywgcmVuZGVyQ29tcGxldGVkVGFza3MsIHJlbmRlclRhc2tzQnlQcm9qZWN0LCByZW5kZXJQcm9qZWN0cywgZ2V0QWxsVGFza3MgfTtcbiIsImltcG9ydCB7IGFkZFRhc2ssIHJlbW92ZVRhc2ssIHVwZGF0ZVRhc2ssIG15VGFza3MgfSBmcm9tICcuL3Rhc2tzLmpzJztcbmltcG9ydCB7IHJlbmRlciwgZ2V0QWxsVGFza3MsIHJlbmRlclRvZGF5VGFza3MsIHJlbmRlclRoaXNXZWVrVGFza3MsIHJlbmRlckNvbXBsZXRlZFRhc2tzLCByZW5kZXJUYXNrc0J5UHJvamVjdCwgcmVuZGVyUHJvamVjdHMgfSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgeyBhZGRQcm9qZWN0LCBteVByb2plY3RzLCB1cGRhdGVQcm9qZWN0LCBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XG5cbmNvbnN0IGV2ZW50cyA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgICAgICAgY29uc3QgZWRpdFRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1mb3JtJyk7XG4gICAgICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICAgICAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrLWJ1dHRvbicpO1xuICAgICAgICBjb25zdCBmb3JtRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tZGlhbG9nJyk7XG4gICAgICAgIGNvbnN0IGVkaXRUYXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1kaWFsb2cnKTtcbiAgICAgICAgY29uc3QgcHJvamVjdERpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRpYWxvZycpO1xuICAgICAgICBjb25zdCBhbGxUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhbGwtdGFza3MtYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IHRvZGF5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZGF5LWJ1dHRvbicpO1xuICAgICAgICBjb25zdCB0aGlzV2Vla0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aGlzLXdlZWstYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXBsZXRlZC1idXR0b24nKTtcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1idXR0b24nKTtcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBuZXcgUHJvamVjdChcIkRlZmF1bHRcIik7XG4gICAgICAgIG15UHJvamVjdHMucHVzaChkZWZhdWx0UHJvamVjdCk7XG4gICAgICAgIFxuICAgICAgICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJykudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eS1zZWxlY3QnKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXNlbGVjdCcpLnZhbHVlO1xuICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgY29uc3QgdGFza0luZGV4ID0gdGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7XG4gICAgICAgICAgICAgIHVwZGF0ZVRhc2socHJvamVjdFRpdGxlLCB0YXNrSW5kZXgsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIG5ld1Byb2plY3RUaXRsZSk7XG4gICAgICAgICAgICAgIGRlbGV0ZSB0YXNrRm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDsgLy8gQ2xlYXIgdGhlIGVkaXRpbmcgaW5kZXhcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdFRpdGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAgIHJlbmRlclRhc2tzQnlQcm9qZWN0KHByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgZm9ybURpYWxvZy5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGVkaXRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGl0bGUnKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1kYXRlJykudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByaW9yaXR5LXNlbGVjdCcpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZWRpdFRhc2tGb3JtLmRhdGFzZXQucHJvamVjdFRpdGxlO1xuICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtcHJvamVjdC1zZWxlY3QnKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IGVkaXRUYXNrRm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDtcbiAgICAgICAgICBcbiAgICAgICAgICAgIHVwZGF0ZVRhc2socHJvamVjdFRpdGxlLCB0YXNrSW5kZXgsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIG5ld1Byb2plY3RUaXRsZSk7XG4gICAgICAgICAgICByZW5kZXJUYXNrc0J5UHJvamVjdChuZXdQcm9qZWN0VGl0bGUpOyAvLyBPciByZW5kZXIgYWxsIHRhc2tzIGlmIG5lZWRlZFxuICAgICAgICAgICAgZWRpdFRhc2tGb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICBlZGl0VGFza0RpYWxvZy5jbG9zZSgpO1xuICAgICAgICAgICAgZGVsZXRlIGVkaXRUYXNrRm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDtcbiAgICAgICAgICAgIGRlbGV0ZSBlZGl0VGFza0Zvcm0uZGF0YXNldC5wcm9qZWN0VGl0bGU7XG4gICAgICAgIH0pOyAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByb2plY3Qtc2VsZWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlZGl0VGFza0Zvcm0uZGF0YXNldC5wcm9qZWN0VGl0bGUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBwcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXRpdGxlJykudmFsdWU7XG4gICAgICAgICAgICBpZiAocHJvamVjdEZvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9IHByb2plY3RGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4O1xuICAgICAgICAgICAgICAgIHVwZGF0ZVByb2plY3QocHJvamVjdEluZGV4LCBwcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwcm9qZWN0Rm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDsgLy8gQ2xlYXIgdGhlIGVkaXRpbmcgaW5kZXhcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkUHJvamVjdChwcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHJlbmRlclByb2plY3RzKG15UHJvamVjdHMpO1xuICAgICAgICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIHByb2plY3REaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgIGRlbGV0ZSBwcm9qZWN0Rm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGZvcm1EaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm1EaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGlhbG9nRGltZW5zaW9ucyA9IGZvcm1EaWFsb2cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZS5jbGllbnRYIDwgZGlhbG9nRGltZW5zaW9ucy5sZWZ0IHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRYID4gZGlhbG9nRGltZW5zaW9ucy5yaWdodCB8fFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSA8IGRpYWxvZ0RpbWVuc2lvbnMudG9wIHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRZID4gZGlhbG9nRGltZW5zaW9ucy5ib3R0b21cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGZvcm1EaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcHJvamVjdERpYWxvZy5zaG93TW9kYWwoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb2plY3REaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGlhbG9nRGltZW5zaW9ucyA9IHByb2plY3REaWFsb2cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZS5jbGllbnRYIDwgZGlhbG9nRGltZW5zaW9ucy5sZWZ0IHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRYID4gZGlhbG9nRGltZW5zaW9ucy5yaWdodCB8fFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSA8IGRpYWxvZ0RpbWVuc2lvbnMudG9wIHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRZID4gZGlhbG9nRGltZW5zaW9ucy5ib3R0b21cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHByb2plY3REaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGFsbFRhc2tzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWxsVGFza3MgPSBnZXRBbGxUYXNrcygpO1xuICAgICAgICAgICAgcmVuZGVyKGFsbFRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSwgZWRpdFRhc2tGb3JtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRvZGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcmVuZGVyVG9kYXlUYXNrcyhmb3JtRGlhbG9nLCB0YXNrRm9ybSwgZWRpdFRhc2tGb3JtKSk7XG4gICAgICAgIHRoaXNXZWVrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcmVuZGVyVGhpc1dlZWtUYXNrcyhmb3JtRGlhbG9nLCB0YXNrRm9ybSwgZWRpdFRhc2tGb3JtKSk7XG4gICAgICAgIGNvbXBsZXRlZFRhc2tzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcmVuZGVyQ29tcGxldGVkVGFza3MoZm9ybURpYWxvZywgdGFza0Zvcm0sIGVkaXRUYXNrRm9ybSkpO1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aCgncmVtb3ZlLWJ1dHRvbi0nKSkge1xuICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnRhc2snKS5kYXRhc2V0LnByb2plY3RUaXRsZTtcbiAgICAgICAgICAgICAgY29uc3QgdGFza0luZGV4ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRUYXNrcyA9IHJlbW92ZVRhc2socHJvamVjdFRpdGxlLCB0YXNrSW5kZXgpO1xuICAgICAgICAgICAgICByZW5kZXIodXBkYXRlZFRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSk7IC8vIFJlLXJlbmRlciB3aXRoIHRoZSB1cGRhdGVkIHRhc2tzIGFycmF5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgcmVuZGVyKG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtLCBlZGl0VGFza0Zvcm0sIGVkaXRUYXNrRGlhbG9nKTsvLyBJbml0aWFsIHJlbmRlclxuICAgICAgICByZW5kZXJQcm9qZWN0cyhteVByb2plY3RzKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzO1xuIiwiLy8gUHJvamVjdCBjb25zdHJ1Y3RvclxyXG5jbGFzcyBQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgdGhpcy50YXNrcyA9IFtdO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgYWRkVGFzayh0YXNrKSB7XHJcbiAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxuICAgIH1cclxuICBcclxuICAgIHJlbW92ZVRhc2soaW5kZXgpIHtcclxuICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG59XHJcbiAgXHJcbiAgXHJcbi8vIFByb2plY3RzIGFyZSBzdG9yZWQgaW4gdGhlIGZvcm0gb2Ygb2JqZWN0IGFycmF5c1xyXG5jb25zdCBteVByb2plY3RzID0gW107XHJcblxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3RUaXRsZSkge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RUaXRsZSk7XHJcbiAgICBteVByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICByZXR1cm4gbXlQcm9qZWN0cztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0SW5kZXgpIHtcclxuICAgIG15UHJvamVjdHMuc3BsaWNlKHByb2plY3RJbmRleCwgMSk7XHJcbiAgICByZXR1cm4gbXlQcm9qZWN0cztcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdChwcm9qZWN0SW5kZXgsIHByb2plY3RUaXRsZSkge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IG15UHJvamVjdHNbcHJvamVjdEluZGV4XTtcclxuICAgIHByb2plY3QucHJvamVjdFRpdGxlID0gcHJvamVjdFRpdGxlO1xyXG59XHJcblxyXG5leHBvcnQgeyBhZGRQcm9qZWN0LCByZW1vdmVQcm9qZWN0LCB1cGRhdGVQcm9qZWN0LCBteVByb2plY3RzLCBQcm9qZWN0fTtcclxuICBcclxuICAiLCJpbXBvcnQgeyBteVByb2plY3RzIH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcblxuLy8gVGFzayBjb25zdHJ1Y3RvclxuY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgfVxufVxuXG4vLyBUYXNrcyBhcmUgc3RvcmVkIGluIHRoZSBmb3JtIG9mIG9iamVjdCBhcnJheXNcbmNvbnN0IG15VGFza3MgPSBbXTtcblxuZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0VGl0bGUpIHtcbiAgbGV0IHByb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xuICBpZiAoIXByb2plY3QpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gIHByb2plY3QuYWRkVGFzayhuZXdUYXNrKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVUYXNrKHByb2plY3RUaXRsZSwgdGFza0luZGV4KSB7XG4gIGNvbnN0IHByb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xuICBpZiAoIXByb2plY3QpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9qZWN0LnRhc2tzLnNwbGljZSh0YXNrSW5kZXgsIDEpO1xuICByZXR1cm4gcHJvamVjdC50YXNrczsgLy8gUmV0dXJuIHRoZSB1cGRhdGVkIHRhc2tzIGFycmF5XG59XG5cblxuZnVuY3Rpb24gdXBkYXRlVGFzayhwcm9qZWN0VGl0bGUsIGVkaXRUYXNrSW5kZXgsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIG5ld1Byb2plY3RUaXRsZSkge1xuICBjb25zb2xlLmxvZyhgVXBkYXRpbmcgdGFzayBpbiBwcm9qZWN0OiAke3Byb2plY3RUaXRsZX0sIHRhc2sgaW5kZXg6ICR7ZWRpdFRhc2tJbmRleH1gKTtcbiAgY29uc3QgcHJvamVjdCA9IG15UHJvamVjdHMuZmluZChwID0+IHAudGl0bGUgPT09IHByb2plY3RUaXRsZSk7XG4gIGlmICghcHJvamVjdCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2plY3Qgbm90IGZvdW5kOicsIHByb2plY3RUaXRsZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnNvbGUubG9nKCdPcmlnaW5hbCBwcm9qZWN0IHRhc2tzIGJlZm9yZSB1cGRhdGluZzonLCBwcm9qZWN0LnRhc2tzKTtcbiAgbGV0IHRhc2s7XG4gIGlmIChlZGl0VGFza0luZGV4ID49IDAgJiYgZWRpdFRhc2tJbmRleCA8IHByb2plY3QudGFza3MubGVuZ3RoKSB7XG4gICAgdGFzayA9IHByb2plY3QudGFza3NbZWRpdFRhc2tJbmRleF07XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcignVGFzayBub3QgZm91bmQgYXQgaW5kZXg6JywgZWRpdFRhc2tJbmRleCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRoZSB0YXNrIHByb3BlcnRpZXNcbiAgdGFzay50aXRsZSA9IHRpdGxlO1xuICB0YXNrLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHRhc2suZGF0ZSA9IGRhdGU7XG4gIHRhc2sucHJpb3JpdHkgPSBwcmlvcml0eTtcblxuICBjb25zb2xlLmxvZygnT3JpZ2luYWwgcHJvamVjdCB0YXNrcyBhZnRlciB1cGRhdGluZyBidXQgYmVmb3JlIG1vdmluZzonLCBwcm9qZWN0LnRhc2tzKTtcblxuICAvLyBDaGVjayBpZiB0aGUgcHJvamVjdCBoYXMgYmVlbiBjaGFuZ2VkXG4gIGlmIChuZXdQcm9qZWN0VGl0bGUgJiYgbmV3UHJvamVjdFRpdGxlICE9PSBwcm9qZWN0VGl0bGUpIHtcbiAgICAvLyBGaW5kIHRoZSBuZXcgcHJvamVjdFxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBuZXdQcm9qZWN0VGl0bGUpO1xuICAgIGlmIChuZXdQcm9qZWN0KSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIHRhc2sgZnJvbSB0aGUgY3VycmVudCBwcm9qZWN0XG4gICAgICBwcm9qZWN0LnRhc2tzLnNwbGljZShlZGl0VGFza0luZGV4LCAxKTtcbiAgICAgIGNvbnNvbGUubG9nKCdPcmlnaW5hbCBwcm9qZWN0IHRhc2tzIGFmdGVyIG1vdmluZzonLCBwcm9qZWN0LnRhc2tzKTtcblxuICAgICAgLy8gQWRkIHRoZSB0YXNrIHRvIHRoZSBuZXcgcHJvamVjdFxuICAgICAgbmV3UHJvamVjdC5hZGRUYXNrKHRhc2spO1xuICAgICAgdGFzay5wcm9qZWN0ID0gbmV3UHJvamVjdDsgLy8gVXBkYXRlIHRoZSB0YXNrJ3MgcHJvamVjdCByZWZlcmVuY2VcbiAgICAgIGNvbnNvbGUubG9nKCdOZXcgcHJvamVjdCB0YXNrczonLCBuZXdQcm9qZWN0LnRhc2tzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcignTmV3IHByb2plY3Qgbm90IGZvdW5kOicsIG5ld1Byb2plY3RUaXRsZSk7XG4gICAgfVxuICB9XG59XG5cblxuZnVuY3Rpb24gdG9nZ2xlVGFza0NvbXBsZXRpb24ocHJvamVjdFRpdGxlLCB0YXNrSW5kZXgpIHtcbiAgY29uc3QgcHJvamVjdCA9IG15UHJvamVjdHMuZmluZChwID0+IHAudGl0bGUgPT09IHByb2plY3RUaXRsZSk7XG4gIGlmICghcHJvamVjdCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2plY3Qgbm90IGZvdW5kOicsIHByb2plY3RUaXRsZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHRhc2sgPSBwcm9qZWN0LnRhc2tzW3Rhc2tJbmRleF07XG4gIGlmICghdGFzaykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1Rhc2sgbm90IGZvdW5kIGF0IGluZGV4OicsIHRhc2tJbmRleCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhc2suY29tcGxldGVkID0gIXRhc2suY29tcGxldGVkO1xufVxuXG5leHBvcnQgeyBhZGRUYXNrLCByZW1vdmVUYXNrLCB1cGRhdGVUYXNrLCB0b2dnbGVUYXNrQ29tcGxldGlvbiwgbXlUYXNrcyB9O1xuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBldmVudHMgZnJvbSBcIi4vbW9kdWxlcy9ldmVudHMuanNcIjtcblxuZXZlbnRzKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9