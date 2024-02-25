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
            const editTaskDialog = document.querySelector('#edit-task-dialog');
            if (task) {
              document.querySelector('#title').value = task.title;
              document.querySelector('#description').value = task.description;
              document.querySelector('#date').value = task.date;
              document.querySelector('#priority-select').value = task.priority;
              editTaskDialog.showModal();
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
              (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.updateTask)(projectTitle, taskIndex, title, description, date, priority);
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
            const title = document.querySelector('#title').value;
            const description = document.querySelector('#description').value;
            const date = document.querySelector('#date').value;
            const priority = document.querySelector('#priority-select').value;
            const projectTitle = document.querySelector('#project-select').value;
            const editTaskIndex = editTaskForm.dataset.editingIndex;
            (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.updateTask)(projectTitle, editTaskIndex, title, description, date, priority);
            delete editTaskForm.dataset.editingIndex; 
            (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderTasksByProject)(projectTitle);
            editTaskForm.reset();
            editTaskDialog.close();
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


function updateTask(projectTitle, editTaskIndex, title, description, date, priority) {
  const project = _projects__WEBPACK_IMPORTED_MODULE_0__.myProjects.find(p => p.title === projectTitle);
  if (!project) {
    console.error('Project not found:', projectTitle);
    return;
  }
  const task = project.tasks[editTaskIndex];
  if (!task) {
    console.error('Task not found at index:', editTaskIndex);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBOztBQUUwRTs7Ozs7Ozs7VUN0RTFFO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUM7O0FBRXpDLDhEQUFNLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL21vZHVsZXMvZXZlbnRzLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2tzLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBteVRhc2tzLCB0b2dnbGVUYXNrQ29tcGxldGlvbiB9IGZyb20gJy4vdGFza3MuanMnO1xuaW1wb3J0IHsgbXlQcm9qZWN0cyB9IGZyb20gJy4vcHJvamVjdHMuanMnO1xuXG5mdW5jdGlvbiByZW5kZXIodGFza3MgPSBteVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSkge1xuICAgIGxldCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XG4gICAgdGFza0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgXG4gICAgLy8gU29ydCB0YXNrcyBieSBkYXRlIHVzaW5nIG5hdGl2ZSBKYXZhU2NyaXB0IERhdGUgcGFyc2luZ1xuICAgIGNvbnN0IHNvcnRlZFRhc2tzID0gdGFza3Muc29ydCgoYSwgYikgPT4gbmV3IERhdGUoYS5kYXRlKSAtIG5ldyBEYXRlKGIuZGF0ZSkpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydGVkVGFza3MubGVuZ3RoOyBpKyspe1xuICAgICAgICBsZXQgdGFzayA9IHNvcnRlZFRhc2tzW2ldO1xuICAgICAgICBsZXQgdGFza1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGFza1dyYXBwZXIuY2xhc3NOYW1lID0gXCJ0YXNrXCI7XG4gICAgICAgIHRhc2tXcmFwcGVyLmRhdGFzZXQuaW5kZXggPSBpO1xuICAgICAgICBpZih0YXNrLnByb2plY3QpIHtcbiAgICAgICAgICB0YXNrV3JhcHBlci5kYXRhc2V0LnByb2plY3RUaXRsZSA9IHRhc2sucHJvamVjdC50aXRsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB0YXNrIGlzIGNvbXBsZXRlZCBhbmQgYWRkIHRoZSAnY29tcGxldGVkJyBjbGFzcyBhY2NvcmRpbmdseVxuICAgICAgICBpZiAodGFzay5jb21wbGV0ZWQpIHtcbiAgICAgICAgICB0YXNrV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfSAgICAgICAgXG5cbiAgICAgICAgdGFza0xpc3QuYXBwZW5kQ2hpbGQodGFza1dyYXBwZXIpO1xuXG4gICAgICAgIGxldCB0b2dnbGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5pZCA9IGB0b2dnbGUtYnV0dG9uLSR7aX1gO1xuICAgICAgICB0b2dnbGVCdXR0b24uY2xhc3NOYW1lID0gdGFzay5jb21wbGV0ZWQgPyBcImZhLXNvbGlkIGZhLWNpcmNsZS1jaGVja1wiIDogXCJmYS1yZWd1bGFyIGZhLWNpcmNsZVwiO1xuICAgICAgICB0b2dnbGVCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XG5cbiAgICAgICAgdG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudCB0aGUgZXZlbnQgZnJvbSBidWJibGluZyB1cCB0byB0aGUgdGFza1dyYXBwZXJcbiAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSB0aGlzLmNsb3Nlc3QoJy50YXNrJykuZGF0YXNldC5wcm9qZWN0VGl0bGU7XG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGFzZXQuaW5kZXg7XG4gICAgICAgICAgdG9nZ2xlVGFza0NvbXBsZXRpb24ocHJvamVjdFRpdGxlLCBpbmRleCk7XG4gICAgICAgICAgcmVuZGVyKHRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSk7IC8vIFJlLXJlbmRlciB0aGUgdGFza3NcbiAgICAgICAgfSk7ICAgICBcblxuICAgICAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHRhc2tOYW1lLmlkID0gJ3Rhc2stdGl0bGUnO1xuICAgICAgICB0YXNrTmFtZS5pbm5lclRleHQgPSB0YXNrLnRpdGxlO1xuICAgICAgICBsZXQgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICB0YXNrRGVzY3JpcHRpb24uaWQgPSAndGFzay1kZXNjcmlwdGlvbic7XG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbi5pbm5lclRleHQgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHRhc2tEYXRlLmlkID0gJ3Rhc2stZGF0ZSc7XG4gICAgICAgIHRhc2tEYXRlLmlubmVyVGV4dCA9IHRhc2suZGF0ZTtcbiAgICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgdGFza1ByaW9yaXR5LmlkID0gJ3Rhc2stcHJpb3JpdHknO1xuICAgICAgICB0YXNrUHJpb3JpdHkuaW5uZXJUZXh0ID0gdGFzay5wcmlvcml0eTtcbiAgICAgICAgbGV0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIGVkaXRCdXR0b24uaWQgPSBgZWRpdC1idXR0b24tJHtpfWA7XG4gICAgICAgIGVkaXRCdXR0b24uY2xhc3NOYW1lID0gXCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlXCI7XG4gICAgICAgIGVkaXRCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XG4gICAgICAgIGxldCByZW1vdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIHJlbW92ZUJ1dHRvbi5pZCA9IGByZW1vdmUtYnV0dG9uLSR7aX1gO1xuICAgICAgICByZW1vdmVCdXR0b24uY2xhc3NOYW1lID0gXCJmYS1zb2xpZCBmYS1jaXJjbGUteG1hcmtcIjtcbiAgICAgICAgcmVtb3ZlQnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpO1xuXG4gICAgICAgIHRhc2tXcmFwcGVyLmluc2VydEJlZm9yZSh0b2dnbGVCdXR0b24sIHRhc2tXcmFwcGVyLmZpcnN0Q2hpbGQpO1xuICAgICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrTmFtZSk7XG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcbiAgICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5KTtcbiAgICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbik7XG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHJlbW92ZUJ1dHRvbik7XG5cbiAgICAgICAgdGFza1dyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IGNsaWNrZWRFbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgIGlmIChjbGlja2VkRWxlbWVudC5pZC5zdGFydHNXaXRoKCdlZGl0LWJ1dHRvbi0nKSkge1xuICAgICAgICAgICAgLy8gVGhpcyBjb25kaXRpb24gZW5zdXJlcyB0aGF0IHRoZSBsb2dpYyBpcyBleGVjdXRlZCBvbmx5IGlmIHRoZSB0YXNrIHdyYXBwZXIgb3Igb25lIG9mIGl0cyBkaXJlY3QgY2hpbGRyZW4gKGV4Y2x1ZGluZyBidXR0b25zKSBpcyBjbGlja2VkXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGNsaWNrZWRFbGVtZW50LmRhdGFzZXQuaW5kZXg7XG4gICAgICAgICAgICBjb25zdCB0YXNrID0gdGFza3NbaW5kZXhdOyAvLyBVc2UgdGhlIHRhc2tzIHBhcmFtZXRlclxuICAgICAgICAgICAgY29uc3QgZWRpdFRhc2tEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrLWRpYWxvZycpO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykudmFsdWUgPSB0YXNrLnRpdGxlO1xuICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKS52YWx1ZSA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJykudmFsdWUgPSB0YXNrLmRhdGU7XG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eS1zZWxlY3QnKS52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XG4gICAgICAgICAgICAgIGVkaXRUYXNrRGlhbG9nLnNob3dNb2RhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Rhc2sgbm90IGZvdW5kIGF0IGluZGV4OicsIGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyVG9kYXlUYXNrcyh0YXNrcyA9IG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKSB7XG4gIGxldCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XG4gIHRhc2tMaXN0LmlubmVySFRNTCA9ICcnO1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7IC8vIEdldCB0b2RheSdzIGRhdGUgaW4gWVlZWS1NTS1ERCBmb3JtYXRcbiAgY29uc3QgdG9kYXlUYXNrcyA9IHRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suZGF0ZSA9PT0gdG9kYXkpO1xuICByZW5kZXIodG9kYXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pOyAvLyBVc2UgdGhlIG1haW4gcmVuZGVyIGZ1bmN0aW9uIHRvIHJlbmRlciB0b2RheSdzIHRhc2tzXG59XG5cbmZ1bmN0aW9uIHJlbmRlclRoaXNXZWVrVGFza3ModGFza3MgPSBteVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSkge1xuICBsZXQgdGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpO1xuICB0YXNrTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBzZXZlbkRheXNGcm9tTm93ID0gbmV3IERhdGUoKTtcbiAgc2V2ZW5EYXlzRnJvbU5vdy5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDcpO1xuICBjb25zdCB0aGlzV2Vla1Rhc2tzID0gdGFza3MuZmlsdGVyKHRhc2sgPT4ge1xuICAgICAgY29uc3QgdGFza0RhdGUgPSBuZXcgRGF0ZSh0YXNrLmRhdGUpO1xuICAgICAgcmV0dXJuIHRhc2tEYXRlID49IHRvZGF5ICYmIHRhc2tEYXRlIDw9IHNldmVuRGF5c0Zyb21Ob3c7XG4gIH0pO1xuICByZW5kZXIodGhpc1dlZWtUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pOyAvLyBVc2UgdGhlIG1haW4gcmVuZGVyIGZ1bmN0aW9uIHRvIHJlbmRlciB0aGlzIHdlZWsncyB0YXNrc1xufVxuXG5mdW5jdGlvbiByZW5kZXJQcm9qZWN0cyhwcm9qZWN0cykge1xuICBjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1jb250YWluZXInKTtcbiAgY29uc3QgcHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXNlbGVjdCcpO1xuICBwcm9qZWN0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJzsgLy8gQ2xlYXIgZXhpc3RpbmcgcHJvamVjdHNcbiAgcHJvamVjdFNlbGVjdC5pbm5lckhUTUwgPSAnPHA+U2VsZWN0IFByb2plY3Q8L29wdGlvbj4nOyAvLyBSZXNldCB0aGUgc2VsZWN0IG1lbnVcblxuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgIC8vIFJlbmRlciBwcm9qZWN0IGJ1dHRvbnNcbiAgICBjb25zdCBwcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgcHJvamVjdEJ1dHRvbi5pZCA9IGBwcm9qZWN0LSR7aW5kZXh9YDtcbiAgICBwcm9qZWN0QnV0dG9uLmlubmVySFRNTCA9IGBcbiAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtbGlzdC11bFwiPjwvaT5cbiAgICAgIDxwPiR7cHJvamVjdC50aXRsZX08L3A+XG4gICAgYDtcbiAgICBwcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgcmVuZGVyVGFza3NCeVByb2plY3QocHJvamVjdC50aXRsZSk7XG4gICAgfSk7XG4gICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEJ1dHRvbik7XG5cbiAgICAvLyBBZGQgb3B0aW9ucyB0byB0aGUgc2VsZWN0IG1lbnVcbiAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBvcHRpb24udmFsdWUgPSBwcm9qZWN0LnRpdGxlO1xuICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XG4gICAgcHJvamVjdFNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICB9KTtcbn1cblxuXG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tzQnlQcm9qZWN0KHByb2plY3RUaXRsZSkge1xuICBjb25zdCBwcm9qZWN0ID0gbXlQcm9qZWN0cy5maW5kKHAgPT4gcC50aXRsZSA9PT0gcHJvamVjdFRpdGxlKTtcbiAgaWYgKHByb2plY3QpIHtcbiAgICByZW5kZXIocHJvamVjdC50YXNrcyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5lcnJvcignUHJvamVjdCBub3QgZm91bmQ6JywgcHJvamVjdFRpdGxlKTtcbiAgfVxufVxuXG5leHBvcnQgeyByZW5kZXIsIHJlbmRlclRvZGF5VGFza3MsIHJlbmRlclRoaXNXZWVrVGFza3MsIHJlbmRlclRhc2tzQnlQcm9qZWN0LCByZW5kZXJQcm9qZWN0cyB9O1xuIiwiaW1wb3J0IHsgYWRkVGFzaywgcmVtb3ZlVGFzaywgdXBkYXRlVGFzaywgbXlUYXNrcyB9IGZyb20gJy4vdGFza3MuanMnO1xuaW1wb3J0IHsgcmVuZGVyLCByZW5kZXJUb2RheVRhc2tzLCByZW5kZXJUaGlzV2Vla1Rhc2tzLCByZW5kZXJUYXNrc0J5UHJvamVjdCwgcmVuZGVyUHJvamVjdHMgfSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgeyBhZGRQcm9qZWN0LCBteVByb2plY3RzLCB1cGRhdGVQcm9qZWN0LCBQcm9qZWN0IH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XG5cbmNvbnN0IGV2ZW50cyA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcbiAgICAgICAgY29uc3QgZWRpdFRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1mb3JtJyk7XG4gICAgICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xuICAgICAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrLWJ1dHRvbicpO1xuICAgICAgICBjb25zdCBmb3JtRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tZGlhbG9nJyk7XG4gICAgICAgIGNvbnN0IGVkaXRUYXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1kaWFsb2cnKTtcbiAgICAgICAgY29uc3QgcHJvamVjdERpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWRpYWxvZycpO1xuICAgICAgICBjb25zdCBhbGxUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhbGwtdGFza3MtYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IHRvZGF5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZGF5LWJ1dHRvbicpO1xuICAgICAgICBjb25zdCB0aGlzV2Vla0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aGlzLXdlZWstYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXBsZXRlZC1idXR0b24nKTtcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdC1idXR0b24nKTtcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBuZXcgUHJvamVjdChcIkRlZmF1bHRcIik7XG4gICAgICAgIG15UHJvamVjdHMucHVzaChkZWZhdWx0UHJvamVjdCk7XG4gICAgICAgIFxuICAgICAgICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJykudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eS1zZWxlY3QnKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LXNlbGVjdCcpLnZhbHVlO1xuICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgY29uc3QgdGFza0luZGV4ID0gdGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7XG4gICAgICAgICAgICAgIHVwZGF0ZVRhc2socHJvamVjdFRpdGxlLCB0YXNrSW5kZXgsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgICBkZWxldGUgdGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7IC8vIENsZWFyIHRoZSBlZGl0aW5nIGluZGV4XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgICByZW5kZXJUYXNrc0J5UHJvamVjdChwcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIGZvcm1EaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBcbiAgICAgICAgICBlZGl0VGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHktc2VsZWN0JykudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1zZWxlY3QnKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRUYXNrSW5kZXggPSBlZGl0VGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7XG4gICAgICAgICAgICB1cGRhdGVUYXNrKHByb2plY3RUaXRsZSwgZWRpdFRhc2tJbmRleCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSk7XG4gICAgICAgICAgICBkZWxldGUgZWRpdFRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4OyBcbiAgICAgICAgICAgIHJlbmRlclRhc2tzQnlQcm9qZWN0KHByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBlZGl0VGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIGVkaXRUYXNrRGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtdGl0bGUnKS52YWx1ZTtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0Rm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID0gcHJvamVjdEZvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7XG4gICAgICAgICAgICAgICAgdXBkYXRlUHJvamVjdChwcm9qZWN0SW5kZXgsIHByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHByb2plY3RGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4OyAvLyBDbGVhciB0aGUgZWRpdGluZyBpbmRleFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGRQcm9qZWN0KHByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcmVuZGVyUHJvamVjdHMobXlQcm9qZWN0cyk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgcHJvamVjdERpYWxvZy5jbG9zZSgpO1xuICAgICAgICAgICAgZGVsZXRlIHByb2plY3RGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4O1xuICAgICAgICB9KTtcblxuICAgICAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZm9ybURpYWxvZy5zaG93TW9kYWwoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZvcm1EaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGlhbG9nRGltZW5zaW9ucyA9IGZvcm1EaWFsb2cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZS5jbGllbnRYIDwgZGlhbG9nRGltZW5zaW9ucy5sZWZ0IHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRYID4gZGlhbG9nRGltZW5zaW9ucy5yaWdodCB8fFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSA8IGRpYWxvZ0RpbWVuc2lvbnMudG9wIHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRZID4gZGlhbG9nRGltZW5zaW9ucy5ib3R0b21cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGZvcm1EaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgcHJvamVjdERpYWxvZy5zaG93TW9kYWwoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb2plY3REaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGlhbG9nRGltZW5zaW9ucyA9IHByb2plY3REaWFsb2cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZS5jbGllbnRYIDwgZGlhbG9nRGltZW5zaW9ucy5sZWZ0IHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRYID4gZGlhbG9nRGltZW5zaW9ucy5yaWdodCB8fFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSA8IGRpYWxvZ0RpbWVuc2lvbnMudG9wIHx8XG4gICAgICAgICAgICAgICAgZS5jbGllbnRZID4gZGlhbG9nRGltZW5zaW9ucy5ib3R0b21cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHByb2plY3REaWFsb2cuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGFsbFRhc2tzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcmVuZGVyKG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKSk7XG4gICAgICAgIHRvZGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcmVuZGVyVG9kYXlUYXNrcyhteVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSkpO1xuICAgICAgICB0aGlzV2Vla0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHJlbmRlclRoaXNXZWVrVGFza3MobXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pKTtcbiAgICBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aCgncmVtb3ZlLWJ1dHRvbi0nKSkge1xuICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnRhc2snKS5kYXRhc2V0LnByb2plY3RUaXRsZTtcbiAgICAgICAgICAgICAgY29uc3QgdGFza0luZGV4ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRUYXNrcyA9IHJlbW92ZVRhc2socHJvamVjdFRpdGxlLCB0YXNrSW5kZXgpO1xuICAgICAgICAgICAgICByZW5kZXIodXBkYXRlZFRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSk7IC8vIFJlLXJlbmRlciB3aXRoIHRoZSB1cGRhdGVkIHRhc2tzIGFycmF5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBjb21wbGV0ZWRUYXNrc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tzID0gbXlUYXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLmNvbXBsZXRlZCk7XG4gICAgICAgICAgICByZW5kZXIoY29tcGxldGVkVGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmVuZGVyKG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKTsvLyBJbml0aWFsIHJlbmRlclxuICAgICAgICByZW5kZXJQcm9qZWN0cyhteVByb2plY3RzKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzO1xuIiwiLy8gUHJvamVjdCBjb25zdHJ1Y3RvclxyXG5jbGFzcyBQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgdGhpcy50YXNrcyA9IFtdO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgYWRkVGFzayh0YXNrKSB7XHJcbiAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxuICAgIH1cclxuICBcclxuICAgIHJlbW92ZVRhc2soaW5kZXgpIHtcclxuICAgICAgdGhpcy50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG59XHJcbiAgXHJcbiAgXHJcbi8vIFByb2plY3RzIGFyZSBzdG9yZWQgaW4gdGhlIGZvcm0gb2Ygb2JqZWN0IGFycmF5c1xyXG5jb25zdCBteVByb2plY3RzID0gW107XHJcblxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3RUaXRsZSkge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3RUaXRsZSk7XHJcbiAgICBteVByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICByZXR1cm4gbXlQcm9qZWN0cztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0SW5kZXgpIHtcclxuICAgIG15UHJvamVjdHMuc3BsaWNlKHByb2plY3RJbmRleCwgMSk7XHJcbiAgICByZXR1cm4gbXlQcm9qZWN0cztcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdChwcm9qZWN0SW5kZXgsIHByb2plY3RUaXRsZSkge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IG15UHJvamVjdHNbcHJvamVjdEluZGV4XTtcclxuICAgIHByb2plY3QucHJvamVjdFRpdGxlID0gcHJvamVjdFRpdGxlO1xyXG59XHJcblxyXG5leHBvcnQgeyBhZGRQcm9qZWN0LCByZW1vdmVQcm9qZWN0LCB1cGRhdGVQcm9qZWN0LCBteVByb2plY3RzLCBQcm9qZWN0fTtcclxuICBcclxuICAiLCJpbXBvcnQgeyBteVByb2plY3RzIH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcblxuLy8gVGFzayBjb25zdHJ1Y3RvclxuY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgfVxufVxuXG4vLyBUYXNrcyBhcmUgc3RvcmVkIGluIHRoZSBmb3JtIG9mIG9iamVjdCBhcnJheXNcbmNvbnN0IG15VGFza3MgPSBbXTtcblxuZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0VGl0bGUpIHtcbiAgbGV0IHByb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xuICBpZiAoIXByb2plY3QpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gIHByb2plY3QuYWRkVGFzayhuZXdUYXNrKTtcbn1cblxuXG5mdW5jdGlvbiByZW1vdmVUYXNrKHByb2plY3RUaXRsZSwgdGFza0luZGV4KSB7XG4gIGNvbnN0IHByb2plY3QgPSBteVByb2plY3RzLmZpbmQocCA9PiBwLnRpdGxlID09PSBwcm9qZWN0VGl0bGUpO1xuICBpZiAoIXByb2plY3QpIHtcbiAgICBjb25zb2xlLmVycm9yKCdQcm9qZWN0IG5vdCBmb3VuZDonLCBwcm9qZWN0VGl0bGUpO1xuICAgIHJldHVybjtcbiAgfVxuICBwcm9qZWN0LnRhc2tzLnNwbGljZSh0YXNrSW5kZXgsIDEpO1xuICByZXR1cm4gcHJvamVjdC50YXNrczsgLy8gUmV0dXJuIHRoZSB1cGRhdGVkIHRhc2tzIGFycmF5XG59XG5cblxuZnVuY3Rpb24gdXBkYXRlVGFzayhwcm9qZWN0VGl0bGUsIGVkaXRUYXNrSW5kZXgsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpIHtcbiAgY29uc3QgcHJvamVjdCA9IG15UHJvamVjdHMuZmluZChwID0+IHAudGl0bGUgPT09IHByb2plY3RUaXRsZSk7XG4gIGlmICghcHJvamVjdCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2plY3Qgbm90IGZvdW5kOicsIHByb2plY3RUaXRsZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHRhc2sgPSBwcm9qZWN0LnRhc2tzW2VkaXRUYXNrSW5kZXhdO1xuICBpZiAoIXRhc2spIHtcbiAgICBjb25zb2xlLmVycm9yKCdUYXNrIG5vdCBmb3VuZCBhdCBpbmRleDonLCBlZGl0VGFza0luZGV4KTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFzay50aXRsZSA9IHRpdGxlO1xuICB0YXNrLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIHRhc2suZGF0ZSA9IGRhdGU7XG4gIHRhc2sucHJpb3JpdHkgPSBwcmlvcml0eTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlVGFza0NvbXBsZXRpb24ocHJvamVjdFRpdGxlLCB0YXNrSW5kZXgpIHtcbiAgY29uc3QgcHJvamVjdCA9IG15UHJvamVjdHMuZmluZChwID0+IHAudGl0bGUgPT09IHByb2plY3RUaXRsZSk7XG4gIGlmICghcHJvamVjdCkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1Byb2plY3Qgbm90IGZvdW5kOicsIHByb2plY3RUaXRsZSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHRhc2sgPSBwcm9qZWN0LnRhc2tzW3Rhc2tJbmRleF07XG4gIGlmICghdGFzaykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1Rhc2sgbm90IGZvdW5kIGF0IGluZGV4OicsIHRhc2tJbmRleCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhc2suY29tcGxldGVkID0gIXRhc2suY29tcGxldGVkO1xufVxuXG5leHBvcnQgeyBhZGRUYXNrLCByZW1vdmVUYXNrLCB1cGRhdGVUYXNrLCB0b2dnbGVUYXNrQ29tcGxldGlvbiwgbXlUYXNrcyB9O1xuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBldmVudHMgZnJvbSBcIi4vbW9kdWxlcy9ldmVudHMuanNcIjtcblxuZXZlbnRzKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9