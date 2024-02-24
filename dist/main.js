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
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   renderProjects: () => (/* binding */ renderProjects),
/* harmony export */   renderTasksByProject: () => (/* binding */ renderTasksByProject),
/* harmony export */   renderThisWeekTasks: () => (/* binding */ renderThisWeekTasks),
/* harmony export */   renderTodayTasks: () => (/* binding */ renderTodayTasks)
/* harmony export */ });
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ "./src/modules/tasks.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/modules/projects.js");



function render(tasks = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm) {
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

        taskWrapper.addEventListener('click', function(event) {
          const clickedElement = event.target;
          if (clickedElement.id.startsWith('edit-button-')) {
            // This condition ensures that the logic is executed only if the task wrapper or one of its direct children (excluding buttons) is clicked
            const index = clickedElement.dataset.index;
            const task = tasks[index]; // Use the tasks parameter
            const formDialog = document.querySelector('#form-dialog');
            if (task) {
              document.querySelector('#title').value = task.title;
              document.querySelector('#description').value = task.description;
              document.querySelector('#date').value = task.date;
              document.querySelector('#priority-select').value = task.priority;
              formDialog.showModal();
            }
            else {
              console.error('Task not found at index:', index);
            }
          }
        });
    }
}

function renderTodayTasks(tasks = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm) {
  let taskList = document.querySelector(".task-container");
  taskList.innerHTML = '';
  const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
  const todayTasks = tasks.filter(task => task.date === today);
  render(todayTasks, formDialog, taskForm); // Use the main render function to render today's tasks
}

function renderThisWeekTasks(tasks = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm) {
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

function renderProjects(projects) {
  const projectsContainer = document.querySelector('.projects-container');
  const projectSelect = document.querySelector('#project-select');
  projectsContainer.innerHTML = ''; // Clear existing projects
  projectSelect.innerHTML = '<p>Select Project</option>'; // Reset the select menu

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
        const projectForm = document.querySelector('#project-form')
        const addTaskButton = document.querySelector('#add-task-button');
        const formDialog = document.querySelector('#form-dialog');
        const projectDialog = document.querySelector('#project-dialog')
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
              (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.updateTask)(projectTitle, taskIndex, title, description, date, priority);
              delete taskForm.dataset.editingIndex; // Clear the editing index
            } else {
              (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.addTask)(title, description, date, priority, projectTitle);
            }
          
            (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderTasksByProject)(projectTitle);
            taskForm.reset();
            formDialog.close();
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
    
        allTasksButton.addEventListener('click', () => (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(_tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm));
        todayButton.addEventListener('click', () => (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderTodayTasks)(_tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm));
        thisWeekButton.addEventListener('click', () => (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderThisWeekTasks)(_tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm));
    
        document.addEventListener('click', function(event) {
            if (event.target && event.target.id.startsWith('remove-button-')) {
              const projectTitle = event.target.closest('.task').dataset.projectTitle;
              const taskIndex = event.target.dataset.index;
              const updatedTasks = (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.removeTask)(projectTitle, taskIndex);
              (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(updatedTasks, formDialog, taskForm); // Re-render with the updated tasks array
            }
          });
          
        
        completedTasksButton.addEventListener('click', () => {
            const completedTasks = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks.filter(task => task.completed);
            (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(completedTasks, formDialog, taskForm);
        });
        
        addProjectButton.addEventListener('click', () => {
            
        })

        ;(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(_tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm);// Initial render
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


function updateTask(projectTitle, taskIndex, title, description, date, priority) {
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
  task.title = title;
  task.description = description;
  task.date = date;
  task.priority = priority;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUEyRDtBQUNoQjs7QUFFM0Msd0JBQXdCLDhDQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isd0JBQXdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBO0FBQ0EsMkNBQTJDLEVBQUU7QUFDN0M7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBO0FBQ0EsVUFBVSwrREFBb0I7QUFDOUIsK0NBQStDO0FBQy9DLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsRUFBRTtBQUN6QztBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsRUFBRTtBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUEsa0NBQWtDLDhDQUFPO0FBQ3pDO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQSw0Q0FBNEM7QUFDNUM7O0FBRUEscUNBQXFDLDhDQUFPO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsK0NBQStDO0FBQy9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQywwREFBMEQ7O0FBRTFEO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxNQUFNO0FBQ3hDO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7QUFJQTtBQUNBLGtCQUFrQixvREFBVTtBQUM1QjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFK0Y7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RKekI7QUFDeUM7QUFDaEM7O0FBRS9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxpREFBTztBQUMxQyxRQUFRLG9EQUFVO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHFEQUFVO0FBQ3hCLG9EQUFvRDtBQUNwRCxjQUFjO0FBQ2QsY0FBYyxrREFBTztBQUNyQjtBQUNBO0FBQ0EsWUFBWSw2REFBb0I7QUFDaEM7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwyREFBYTtBQUM3Qix5REFBeUQ7QUFDekQsY0FBYztBQUNkLGdCQUFnQix3REFBVTtBQUMxQjtBQUNBO0FBQ0EsWUFBWSx1REFBYyxDQUFDLG9EQUFVO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7OztBQUdUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1REFBdUQsK0NBQU0sQ0FBQyw4Q0FBTztBQUNyRSxvREFBb0QseURBQWdCLENBQUMsOENBQU87QUFDNUUsdURBQXVELDREQUFtQixDQUFDLDhDQUFPO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMscURBQVU7QUFDN0MsY0FBYywrQ0FBTSxzQ0FBc0M7QUFDMUQ7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDhDQUFPO0FBQzFDLFlBQVksK0NBQU07QUFDbEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQsUUFBUSxnREFBTSxDQUFDLDhDQUFPLHdCQUF3QjtBQUM5QyxRQUFRLHVEQUFjLENBQUMsb0RBQVU7QUFDakMsS0FBSztBQUNMOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JIdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3dFO0FBQ3hFO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q3dDOztBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsaURBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0Esa0JBQWtCLGlEQUFVO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7OztBQUdBO0FBQ0Esa0JBQWtCLGlEQUFVO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsaURBQVU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFMEU7Ozs7Ozs7O1VDdEUxRTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnlDOztBQUV6Qyw4REFBTSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrcy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbXlUYXNrcywgdG9nZ2xlVGFza0NvbXBsZXRpb24gfSBmcm9tICcuL3Rhc2tzLmpzJztcbmltcG9ydCB7IG15UHJvamVjdHMgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcblxuZnVuY3Rpb24gcmVuZGVyKHRhc2tzID0gbXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pIHtcbiAgICBsZXQgdGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpO1xuICAgIHRhc2tMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgIFxuICAgIC8vIFNvcnQgdGFza3MgYnkgZGF0ZSB1c2luZyBuYXRpdmUgSmF2YVNjcmlwdCBEYXRlIHBhcnNpbmdcbiAgICBjb25zdCBzb3J0ZWRUYXNrcyA9IHRhc2tzLnNvcnQoKGEsIGIpID0+IG5ldyBEYXRlKGEuZGF0ZSkgLSBuZXcgRGF0ZShiLmRhdGUpKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvcnRlZFRhc2tzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgbGV0IHRhc2sgPSBzb3J0ZWRUYXNrc1tpXTtcbiAgICAgICAgbGV0IHRhc2tXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRhc2tXcmFwcGVyLmNsYXNzTmFtZSA9IFwidGFza1wiO1xuICAgICAgICB0YXNrV3JhcHBlci5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICAgICAgaWYodGFzay5wcm9qZWN0KSB7XG4gICAgICAgICAgdGFza1dyYXBwZXIuZGF0YXNldC5wcm9qZWN0VGl0bGUgPSB0YXNrLnByb2plY3QudGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdGFzayBpcyBjb21wbGV0ZWQgYW5kIGFkZCB0aGUgJ2NvbXBsZXRlZCcgY2xhc3MgYWNjb3JkaW5nbHlcbiAgICAgICAgaWYgKHRhc2suY29tcGxldGVkKSB7XG4gICAgICAgICAgdGFza1dyYXBwZXIuY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFza1dyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxldGVkJyk7XG4gICAgICAgIH0gICAgICAgIFxuXG4gICAgICAgIHRhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2tXcmFwcGVyKTtcblxuICAgICAgICBsZXQgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICB0b2dnbGVCdXR0b24uaWQgPSBgdG9nZ2xlLWJ1dHRvbi0ke2l9YDtcbiAgICAgICAgdG9nZ2xlQnV0dG9uLmNsYXNzTmFtZSA9IHRhc2suY29tcGxldGVkID8gXCJmYS1zb2xpZCBmYS1jaXJjbGUtY2hlY2tcIiA6IFwiZmEtcmVndWxhciBmYS1jaXJjbGVcIjtcbiAgICAgICAgdG9nZ2xlQnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpO1xuXG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIFByZXZlbnQgdGhlIGV2ZW50IGZyb20gYnViYmxpbmcgdXAgdG8gdGhlIHRhc2tXcmFwcGVyXG4gICAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gdGhpcy5jbG9zZXN0KCcudGFzaycpLmRhdGFzZXQucHJvamVjdFRpdGxlO1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4O1xuICAgICAgICAgIHRvZ2dsZVRhc2tDb21wbGV0aW9uKHByb2plY3RUaXRsZSwgaW5kZXgpO1xuICAgICAgICAgIHJlbmRlcih0YXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pOyAvLyBSZS1yZW5kZXIgdGhlIHRhc2tzXG4gICAgICAgIH0pOyAgICAgXG5cbiAgICAgICAgbGV0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICB0YXNrTmFtZS5pZCA9ICd0YXNrLXRpdGxlJztcbiAgICAgICAgdGFza05hbWUuaW5uZXJUZXh0ID0gdGFzay50aXRsZTtcbiAgICAgICAgbGV0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uLmlkID0gJ3Rhc2stZGVzY3JpcHRpb24nO1xuICAgICAgICB0YXNrRGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gdGFzay5kZXNjcmlwdGlvbjtcbiAgICAgICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICB0YXNrRGF0ZS5pZCA9ICd0YXNrLWRhdGUnO1xuICAgICAgICB0YXNrRGF0ZS5pbm5lclRleHQgPSB0YXNrLmRhdGU7XG4gICAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHRhc2tQcmlvcml0eS5pZCA9ICd0YXNrLXByaW9yaXR5JztcbiAgICAgICAgdGFza1ByaW9yaXR5LmlubmVyVGV4dCA9IHRhc2sucHJpb3JpdHk7XG4gICAgICAgIGxldCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBlZGl0QnV0dG9uLmlkID0gYGVkaXQtYnV0dG9uLSR7aX1gO1xuICAgICAgICBlZGl0QnV0dG9uLmNsYXNzTmFtZSA9IFwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiO1xuICAgICAgICBlZGl0QnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgICAgICBsZXQgcmVtb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICByZW1vdmVCdXR0b24uaWQgPSBgcmVtb3ZlLWJ1dHRvbi0ke2l9YDtcbiAgICAgICAgcmVtb3ZlQnV0dG9uLmNsYXNzTmFtZSA9IFwiZmEtc29saWQgZmEtY2lyY2xlLXhtYXJrXCI7XG4gICAgICAgIHJlbW92ZUJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcblxuICAgICAgICB0YXNrV3JhcHBlci5pbnNlcnRCZWZvcmUodG9nZ2xlQnV0dG9uLCB0YXNrV3JhcHBlci5maXJzdENoaWxkKTtcbiAgICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza05hbWUpO1xuICAgICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eSk7XG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xuICAgICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZChyZW1vdmVCdXR0b24pO1xuXG4gICAgICAgIHRhc2tXcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBjbGlja2VkRWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICBpZiAoY2xpY2tlZEVsZW1lbnQuaWQuc3RhcnRzV2l0aCgnZWRpdC1idXR0b24tJykpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgY29uZGl0aW9uIGVuc3VyZXMgdGhhdCB0aGUgbG9naWMgaXMgZXhlY3V0ZWQgb25seSBpZiB0aGUgdGFzayB3cmFwcGVyIG9yIG9uZSBvZiBpdHMgZGlyZWN0IGNoaWxkcmVuIChleGNsdWRpbmcgYnV0dG9ucykgaXMgY2xpY2tlZFxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjbGlja2VkRWxlbWVudC5kYXRhc2V0LmluZGV4O1xuICAgICAgICAgICAgY29uc3QgdGFzayA9IHRhc2tzW2luZGV4XTsgLy8gVXNlIHRoZSB0YXNrcyBwYXJhbWV0ZXJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1EaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS1kaWFsb2cnKTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpLnZhbHVlID0gdGFzay50aXRsZTtcbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJykudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpLnZhbHVlID0gdGFzay5kYXRlO1xuICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHktc2VsZWN0JykudmFsdWUgPSB0YXNrLnByaW9yaXR5O1xuICAgICAgICAgICAgICBmb3JtRGlhbG9nLnNob3dNb2RhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Rhc2sgbm90IGZvdW5kIGF0IGluZGV4OicsIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyVG9kYXlUYXNrcyh0YXNrcyA9IG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKSB7XG4gIGxldCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XG4gIHRhc2tMaXN0LmlubmVySFRNTCA9ICcnO1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7IC8vIEdldCB0b2RheSdzIGRhdGUgaW4gWVlZWS1NTS1ERCBmb3JtYXRcbiAgY29uc3QgdG9kYXlUYXNrcyA9IHRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suZGF0ZSA9PT0gdG9kYXkpO1xuICByZW5kZXIodG9kYXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pOyAvLyBVc2UgdGhlIG1haW4gcmVuZGVyIGZ1bmN0aW9uIHRvIHJlbmRlciB0b2RheSdzIHRhc2tzXG59XG5cbmZ1bmN0aW9uIHJlbmRlclRoaXNXZWVrVGFza3ModGFza3MgPSBteVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSkge1xuICBsZXQgdGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpO1xuICB0YXNrTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBzZXZlbkRheXNGcm9tTm93ID0gbmV3IERhdGUoKTtcbiAgc2V2ZW5EYXlzRnJvbU5vdy5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDcpO1xuICBjb25zdCB0aGlzV2Vla1Rhc2tzID0gdGFza3MuZmlsdGVyKHRhc2sgPT4ge1xuICAgICAgY29uc3QgdGFza0RhdGUgPSBuZXcgRGF0ZSh0YXNrLmRhdGUpO1xuICAgICAgcmV0dXJuIHRhc2tEYXRlID49IHRvZGF5ICYmIHRhc2tEYXRlIDw9IHNldmVuRGF5c0Zyb21Ob3c7XG4gIH0pO1xuICByZW5kZXIodGhpc1dlZWtUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pOyAvLyBVc2UgdGhlIG1haW4gcmVuZGVyIGZ1bmN0aW9uIHRvIHJlbmRlciB0aGlzIHdlZWsncyB0YXNrc1xufVxuXG5mdW5jdGlvbiByZW5kZXJQcm9qZWN0cyhwcm9qZWN0cykge1xuICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1jb250YWluZXInKTtcbiAgY29uc3QgcHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXNlbGVjdCcpO1xuICBwcm9qZWN0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJzsgLy8gQ2xlYXIgZXhpc3RpbmcgcHJvamVjdHNcbiAgcHJvamVjdFNlbGVjdC5pbm5lckhUTUwgPSAnPHA+U2VsZWN0IFByb2plY3Q8L29wdGlvbj4nOyAvLyBSZXNldCB0aGUgc2VsZWN0IG1lbnVcblxuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgIC8vIFJlbmRlciBwcm9qZWN0IGJ1dHRvbnNcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgcHJvamVjdEJ1dHRvbi5pZCA9IGBwcm9qZWN0LSR7aW5kZXh9YDtcbiAgICBwcm9qZWN0QnV0dG9uLmlubmVySFRNTCA9IGBcbiAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlzdC11bFwiPjwvaT5cbiAgICAgIDxwPiR7cHJvamVjdC50aXRsZX08L3A+XG4gICAgYDtcbiAgICBwcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgcmVuZGVyVGFza3NCeVByb2plY3QocHJvamVjdC50aXRsZSk7XG4gICAgfSk7XG4gICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEJ1dHRvbik7XG5cbiAgICAvLyBBZGQgb3B0aW9ucyB0byB0aGUgc2VsZWN0IG1lbnVcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBvcHRpb24udmFsdWUgPSBwcm9qZWN0LnRpdGxlO1xuICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG4gICAgcHJvamVjdFNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICB9KTtcbn1cblxuXG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tzQnlQcm9qZWN0KHByb2plY3RUaXRsZSkge1xuICBjb25zdCBwcm9qZWN0ID0gbXlQcm9qZWN0cy5maW5kKHAgPT4gcC50aXRsZSA9PT0gcHJvamVjdFRpdGxlKTtcbiAgaWYgKHByb2plY3QpIHtcbiAgICByZW5kZXIocHJvamVjdC50YXNrcyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcignUHJvamVjdCBub3QgZm91bmQ6JywgcHJvamVjdFRpdGxlKTtcbiAgfVxufVxuXG5leHBvcnQgeyByZW5kZXIsIHJlbmRlclRvZGF5VGFza3MsIHJlbmRlclRoaXNXZWVrVGFza3MsIHJlbmRlclRhc2tzQnlQcm9qZWN0LCByZW5kZXJQcm9qZWN0cyB9O1xuIiwiaW1wb3J0IHsgYWRkVGFzaywgcmVtb3ZlVGFzaywgdXBkYXRlVGFzaywgbXlUYXNrcyB9IGZyb20gJy4vdGFza3MuanMnO1xuaW1wb3J0IHsgcmVuZGVyLCByZW5kZXJUb2RheVRhc2tzLCByZW5kZXJUaGlzV2Vla1Rhc2tzLCByZW5kZXJUYXNrc0J5UHJvamVjdCwgcmVuZGVyUHJvamVjdHMgfSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgeyBhZGRQcm9qZWN0LCBteVByb2plY3RzLCB1cGRhdGVQcm9qZWN0LCBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XG5cbmNvbnN0IGV2ZW50cyA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgICAgICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJylcbiAgICAgICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1idXR0b24nKTtcbiAgICAgICAgY29uc3QgZm9ybURpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLWRpYWxvZycpO1xuICAgICAgICBjb25zdCBwcm9qZWN0RGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZGlhbG9nJylcbiAgICAgICAgY29uc3QgYWxsVGFza3NCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWxsLXRhc2tzLWJ1dHRvbicpO1xuICAgICAgICBjb25zdCB0b2RheUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RheS1idXR0b24nKTtcbiAgICAgICAgY29uc3QgdGhpc1dlZWtCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhpcy13ZWVrLWJ1dHRvbicpO1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wbGV0ZWQtYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QtYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gbmV3IFByb2plY3QoXCJEZWZhdWx0XCIpO1xuICAgICAgICBteVByb2plY3RzLnB1c2goZGVmYXVsdFByb2plY3QpO1xuICAgICAgICBcbiAgICAgICAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHktc2VsZWN0JykudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1zZWxlY3QnKS52YWx1ZTtcbiAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0YXNrRm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4O1xuICAgICAgICAgICAgICB1cGRhdGVUYXNrKHByb2plY3RUaXRsZSwgdGFza0luZGV4LCB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KTtcbiAgICAgICAgICAgICAgZGVsZXRlIHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4OyAvLyBDbGVhciB0aGUgZWRpdGluZyBpbmRleFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgICAgcmVuZGVyVGFza3NCeVByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICAgICAgICAgIHRhc2tGb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICBmb3JtRGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgXG4gICAgXG4gICAgICAgIHByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtdGl0bGUnKS52YWx1ZTtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0Rm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gcHJvamVjdEZvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7XG4gICAgICAgICAgICAgICAgdXBkYXRlUHJvamVjdChwcm9qZWN0SW5kZXgsIHByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHByb2plY3RGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4OyAvLyBDbGVhciB0aGUgZWRpdGluZyBpbmRleFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGRQcm9qZWN0KHByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdHMobXlQcm9qZWN0cyk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgcHJvamVjdERpYWxvZy5jbG9zZSgpO1xuICAgICAgICAgICAgZGVsZXRlIHByb2plY3RGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4O1xuICAgICAgICB9KTtcblxuICAgICAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZm9ybURpYWxvZy5zaG93TW9kYWwoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZvcm1EaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGlhbG9nRGltZW5zaW9ucyA9IGZvcm1EaWFsb2cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZS5jbGllbnRYIDwgZGlhbG9nRGltZW5zaW9ucy5sZWZ0IHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRYID4gZGlhbG9nRGltZW5zaW9ucy5yaWdodCB8fFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSA8IGRpYWxvZ0RpbWVuc2lvbnMudG9wIHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRZID4gZGlhbG9nRGltZW5zaW9ucy5ib3R0b21cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGZvcm1EaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcHJvamVjdERpYWxvZy5zaG93TW9kYWwoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb2plY3REaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGlhbG9nRGltZW5zaW9ucyA9IHByb2plY3REaWFsb2cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZS5jbGllbnRYIDwgZGlhbG9nRGltZW5zaW9ucy5sZWZ0IHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRYID4gZGlhbG9nRGltZW5zaW9ucy5yaWdodCB8fFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSA8IGRpYWxvZ0RpbWVuc2lvbnMudG9wIHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRZID4gZGlhbG9nRGltZW5zaW9ucy5ib3R0b21cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHByb2plY3REaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGFsbFRhc2tzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcmVuZGVyKG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKSk7XG4gICAgICAgIHRvZGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcmVuZGVyVG9kYXlUYXNrcyhteVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSkpO1xuICAgICAgICB0aGlzV2Vla0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHJlbmRlclRoaXNXZWVrVGFza3MobXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pKTtcbiAgICBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aCgncmVtb3ZlLWJ1dHRvbi0nKSkge1xuICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnRhc2snKS5kYXRhc2V0LnByb2plY3RUaXRsZTtcbiAgICAgICAgICAgICAgY29uc3QgdGFza0luZGV4ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRUYXNrcyA9IHJlbW92ZVRhc2socHJvamVjdFRpdGxlLCB0YXNrSW5kZXgpO1xuICAgICAgICAgICAgICByZW5kZXIodXBkYXRlZFRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSk7IC8vIFJlLXJlbmRlciB3aXRoIHRoZSB1cGRhdGVkIHRhc2tzIGFycmF5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBjb21wbGV0ZWRUYXNrc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tzID0gbXlUYXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLmNvbXBsZXRlZCk7XG4gICAgICAgICAgICByZW5kZXIoY29tcGxldGVkVGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmVuZGVyKG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKTsvLyBJbml0aWFsIHJlbmRlclxuICAgICAgICByZW5kZXJQcm9qZWN0cyhteVByb2plY3RzKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzO1xuIiwiLy8gUHJvamVjdCBjb25zdHJ1Y3RvclxyXG5jbGFzcyBQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgdGhpcy50YXNrcyA9IFtdO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgYWRkVGFzayh0YXNrKSB7XHJcbiAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxuICAgIH1cclxuICBcclxuICAgIHJlbW92ZVRhc2soaW5kZXgpIHtcclxuICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG59XHJcbiAgXHJcbiAgXHJcbi8vIFByb2plY3RzIGFyZSBzdG9yZWQgaW4gdGhlIGZvcm0gb2Ygb2JqZWN0IGFycmF5c1xyXG5jb25zdCBteVByb2plY3RzID0gW107XHJcblxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3RUaXRsZSkge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RUaXRsZSk7XHJcbiAgICBteVByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICByZXR1cm4gbXlQcm9qZWN0cztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0SW5kZXgpIHtcclxuICAgIG15UHJvamVjdHMuc3BsaWNlKHByb2plY3RJbmRleCwgMSk7XHJcbiAgICByZXR1cm4gbXlQcm9qZWN0cztcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdChwcm9qZWN0SW5kZXgsIHByb2plY3RUaXRsZSkge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IG15UHJvamVjdHNbcHJvamVjdEluZGV4XTtcclxuICAgIHByb2plY3QucHJvamVjdFRpdGxlID0gcHJvamVjdFRpdGxlO1xyXG59XHJcblxyXG5leHBvcnQgeyBhZGRQcm9qZWN0LCByZW1vdmVQcm9qZWN0LCB1cGRhdGVQcm9qZWN0LCBteVByb2plY3RzLCBQcm9qZWN0fTtcclxuICBcclxuICAiLCJpbXBvcnQgeyBteVByb2plY3RzIH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcblxuLy8gVGFzayBjb25zdHJ1Y3RvclxuY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgfVxufVxuXG4vLyBUYXNrcyBhcmUgc3RvcmVkIGluIHRoZSBmb3JtIG9mIG9iamVjdCBhcnJheXNcbmNvbnN0IG15VGFza3MgPSBbXTtcblxuZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0VGl0bGUpIHtcbiAgbGV0IHByb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xuICBpZiAoIXByb2plY3QpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gIHByb2plY3QuYWRkVGFzayhuZXdUYXNrKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVUYXNrKHByb2plY3RUaXRsZSwgdGFza0luZGV4KSB7XG4gIGNvbnN0IHByb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xuICBpZiAoIXByb2plY3QpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9qZWN0LnRhc2tzLnNwbGljZSh0YXNrSW5kZXgsIDEpO1xuICByZXR1cm4gcHJvamVjdC50YXNrczsgLy8gUmV0dXJuIHRoZSB1cGRhdGVkIHRhc2tzIGFycmF5XG59XG5cblxuZnVuY3Rpb24gdXBkYXRlVGFzayhwcm9qZWN0VGl0bGUsIHRhc2tJbmRleCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSkge1xuICBjb25zdCBwcm9qZWN0ID0gbXlQcm9qZWN0cy5maW5kKHAgPT4gcC50aXRsZSA9PT0gcHJvamVjdFRpdGxlKTtcbiAgaWYgKCFwcm9qZWN0KSB7XG4gICAgY29uc29sZS5lcnJvcignUHJvamVjdCBub3QgZm91bmQ6JywgcHJvamVjdFRpdGxlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgdGFzayA9IHByb2plY3QudGFza3NbdGFza0luZGV4XTtcbiAgaWYgKCF0YXNrKSB7XG4gICAgY29uc29sZS5lcnJvcignVGFzayBub3QgZm91bmQgYXQgaW5kZXg6JywgdGFza0luZGV4KTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFzay50aXRsZSA9IHRpdGxlO1xuICB0YXNrLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHRhc2suZGF0ZSA9IGRhdGU7XG4gIHRhc2sucHJpb3JpdHkgPSBwcmlvcml0eTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlVGFza0NvbXBsZXRpb24ocHJvamVjdFRpdGxlLCB0YXNrSW5kZXgpIHtcbiAgY29uc3QgcHJvamVjdCA9IG15UHJvamVjdHMuZmluZChwID0+IHAudGl0bGUgPT09IHByb2plY3RUaXRsZSk7XG4gIGlmICghcHJvamVjdCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2plY3Qgbm90IGZvdW5kOicsIHByb2plY3RUaXRsZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHRhc2sgPSBwcm9qZWN0LnRhc2tzW3Rhc2tJbmRleF07XG4gIGlmICghdGFzaykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1Rhc2sgbm90IGZvdW5kIGF0IGluZGV4OicsIHRhc2tJbmRleCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhc2suY29tcGxldGVkID0gIXRhc2suY29tcGxldGVkO1xufVxuXG5leHBvcnQgeyBhZGRUYXNrLCByZW1vdmVUYXNrLCB1cGRhdGVUYXNrLCB0b2dnbGVUYXNrQ29tcGxldGlvbiwgbXlUYXNrcyB9O1xuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBldmVudHMgZnJvbSBcIi4vbW9kdWxlcy9ldmVudHMuanNcIjtcblxuZXZlbnRzKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9