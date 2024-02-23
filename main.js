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
/* harmony export */   renderThisWeekTasks: () => (/* binding */ renderThisWeekTasks),
/* harmony export */   renderTodayTasks: () => (/* binding */ renderTodayTasks)
/* harmony export */ });
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ "./src/modules/tasks.js");



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
          (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.toggleTaskCompletion)(index);
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
          const task = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks[index];
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



const events = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const taskForm = document.querySelector('#task-form');
        const addTaskButton = document.querySelector('#add-task-button');
        const formDialog = document.querySelector('#form-dialog');
        const allTasksButton = document.querySelector('#all-tasks-button');
        const todayButton = document.querySelector('#today-button');
        const thisWeekButton = document.querySelector('#this-week-button');
        const completedTasksButton = document.querySelector('#completed-button');

        taskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.querySelector('#title').value;
            const description = document.querySelector('#description').value;
            const date = document.querySelector('#date').value;
            const priority = document.querySelector('#priority-select').value;
            if (taskForm.dataset.editingIndex !== undefined) {
                const index = taskForm.dataset.editingIndex;
                (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.updateTask)(index, title, description, date, priority);
                delete taskForm.dataset.editingIndex; // Clear the editing index
            } else {
                (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.addTask)(title, description, date, priority);
            }
        
            (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(_tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm);
            taskForm.reset();
            formDialog.close();
            delete taskForm.dataset.editingIndex;
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
    
        allTasksButton.addEventListener('click', () => (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(_tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm));
        todayButton.addEventListener('click', () => (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderTodayTasks)(_tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm));
        thisWeekButton.addEventListener('click', () => (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.renderThisWeekTasks)(_tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks, formDialog, taskForm));
    
        document.addEventListener('click', function(event) {
            if (event.target && event.target.id.startsWith('remove-button-')) {
                const index = event.target.dataset.index;
                (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.removeTask)(index);
                (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)();
            }
        });
        
        completedTasksButton.addEventListener('click', () => {
            const completedTasks = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks.filter(task => task.completed);
            (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(completedTasks, formDialog, taskForm);
        });

        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(); // Initial render
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (events);


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
// Task constructor
class Task {
  constructor(title, description, date, priority) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.completed = false;
  }
}

// Tasks are stored in the form of object arrays
const myTasks = [];

function addTask(title, description, date, priority) {
  const newTask = new Task(title, description, date, priority);
  myTasks.push(newTask);
  return myTasks;
}

function removeTask(index) {
  myTasks.splice(index, 1);
  return myTasks;
}

function updateTask(index, title, description, date, priority) {
  const task = myTasks[index];
  task.title = title;
  task.description = description;
  task.date = date;
  task.priority = priority;
}

function toggleTaskCompletion(index) {
  const task = myTasks[index];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUEyRDs7O0FBRzNELHdCQUF3Qiw4Q0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdCQUF3QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDJDQUEyQyxFQUFFO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBLFVBQVUsK0RBQW9CO0FBQzlCLCtDQUErQztBQUMvQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsRUFBRTtBQUN6QztBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsRUFBRTtBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qiw4Q0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQSxrQ0FBa0MsOENBQU87QUFDekM7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDtBQUNBLDRDQUE0QztBQUM1Qzs7QUFFQSxxQ0FBcUMsOENBQU87QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCwrQ0FBK0M7QUFDL0M7OztBQUd5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyR2E7QUFDRzs7QUFFekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IscURBQVU7QUFDMUIsc0RBQXNEO0FBQ3RELGNBQWM7QUFDZCxnQkFBZ0Isa0RBQU87QUFDdkI7QUFDQTtBQUNBLFlBQVksK0NBQU0sQ0FBQyw4Q0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1REFBdUQsK0NBQU0sQ0FBQyw4Q0FBTztBQUNyRSxvREFBb0QseURBQWdCLENBQUMsOENBQU87QUFDNUUsdURBQXVELDREQUFtQixDQUFDLDhDQUFPO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHFEQUFVO0FBQzFCLGdCQUFnQiwrQ0FBTTtBQUN0QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsbUNBQW1DLDhDQUFPO0FBQzFDLFlBQVksK0NBQU07QUFDbEIsU0FBUzs7QUFFVCxRQUFRLCtDQUFNLElBQUk7QUFDbEIsS0FBSztBQUNMOztBQUVBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RFdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUUwRTs7Ozs7Ozs7VUN0QzFFO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUM7O0FBRXpDLDhEQUFNLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL21vZHVsZXMvZXZlbnRzLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2tzLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBteVRhc2tzLCB0b2dnbGVUYXNrQ29tcGxldGlvbiB9IGZyb20gJy4vdGFza3MuanMnO1xuXG5cbmZ1bmN0aW9uIHJlbmRlcih0YXNrcyA9IG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKSB7XG4gICAgbGV0IHRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKTtcbiAgICB0YXNrTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICBcbiAgICAvLyBTb3J0IHRhc2tzIGJ5IGRhdGUgdXNpbmcgbmF0aXZlIEphdmFTY3JpcHQgRGF0ZSBwYXJzaW5nXG4gICAgY29uc3Qgc29ydGVkVGFza3MgPSB0YXNrcy5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShhLmRhdGUpIC0gbmV3IERhdGUoYi5kYXRlKSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0ZWRUYXNrcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCB0YXNrID0gc29ydGVkVGFza3NbaV07XG4gICAgICAgIGxldCB0YXNrV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0YXNrV3JhcHBlci5jbGFzc05hbWUgPSBcInRhc2tcIjtcbiAgICAgICAgdGFza1dyYXBwZXIuZGF0YXNldC5pbmRleCA9IGk7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHRhc2sgaXMgY29tcGxldGVkIGFuZCBhZGQgdGhlICdjb21wbGV0ZWQnIGNsYXNzIGFjY29yZGluZ2x5XG4gICAgICAgIGlmICh0YXNrLmNvbXBsZXRlZCkge1xuICAgICAgICAgIHRhc2tXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xuICAgICAgICB9ICAgICAgICBcblxuICAgICAgICB0YXNrTGlzdC5hcHBlbmRDaGlsZCh0YXNrV3JhcHBlcik7XG5cbiAgICAgICAgbGV0IHRvZ2dsZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgdG9nZ2xlQnV0dG9uLmlkID0gYHRvZ2dsZS1idXR0b24tJHtpfWA7XG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc05hbWUgPSB0YXNrLmNvbXBsZXRlZCA/IFwiZmEtc29saWQgZmEtY2lyY2xlLWNoZWNrXCIgOiBcImZhLXJlZ3VsYXIgZmEtY2lyY2xlXCI7XG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICAgICAgdG9nZ2xlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudCB0aGUgZXZlbnQgZnJvbSBidWJibGluZyB1cCB0byB0aGUgdGFza1dyYXBwZXJcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZGF0YXNldC5pbmRleDtcbiAgICAgICAgICB0b2dnbGVUYXNrQ29tcGxldGlvbihpbmRleCk7XG4gICAgICAgICAgcmVuZGVyKHRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSk7IC8vIFJlLXJlbmRlciB0aGUgdGFza3NcbiAgICAgICAgfSk7ICAgICAgXG4gICAgICAgIGxldCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgdGFza05hbWUuaWQgPSAndGFzay10aXRsZSc7XG4gICAgICAgIHRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGl0bGU7XG4gICAgICAgIGxldCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbi5pZCA9ICd0YXNrLWRlc2NyaXB0aW9uJztcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRhc2suZGVzY3JpcHRpb247XG4gICAgICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgdGFza0RhdGUuaWQgPSAndGFzay1kYXRlJztcbiAgICAgICAgdGFza0RhdGUuaW5uZXJUZXh0ID0gdGFzay5kYXRlO1xuICAgICAgICBsZXQgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICB0YXNrUHJpb3JpdHkuaWQgPSAndGFzay1wcmlvcml0eSc7XG4gICAgICAgIHRhc2tQcmlvcml0eS5pbm5lclRleHQgPSB0YXNrLnByaW9yaXR5O1xuICAgICAgICBsZXQgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgZWRpdEJ1dHRvbi5pZCA9IGBlZGl0LWJ1dHRvbi0ke2l9YDtcbiAgICAgICAgZWRpdEJ1dHRvbi5jbGFzc05hbWUgPSBcImZhLXNvbGlkIGZhLXBlbi10by1zcXVhcmVcIjtcbiAgICAgICAgZWRpdEJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcbiAgICAgICAgbGV0IHJlbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgcmVtb3ZlQnV0dG9uLmlkID0gYHJlbW92ZS1idXR0b24tJHtpfWA7XG4gICAgICAgIHJlbW92ZUJ1dHRvbi5jbGFzc05hbWUgPSBcImZhLXNvbGlkIGZhLWNpcmNsZS14bWFya1wiO1xuICAgICAgICByZW1vdmVCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XG5cbiAgICAgICAgdGFza1dyYXBwZXIuaW5zZXJ0QmVmb3JlKHRvZ2dsZUJ1dHRvbiwgdGFza1dyYXBwZXIuZmlyc3RDaGlsZCk7XG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcbiAgICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xuICAgICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpO1xuICAgICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKTtcbiAgICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQocmVtb3ZlQnV0dG9uKTtcblxuICAgICAgICAvLyBJbiB0aGUgcmVuZGVyIGZ1bmN0aW9uIGluIGRvbS5qc1xuICAgICAgICB0YXNrV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4O1xuICAgICAgICAgIGNvbnN0IHRhc2sgPSBteVRhc2tzW2luZGV4XTtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKS52YWx1ZSA9IHRhc2sudGl0bGU7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJykudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJykudmFsdWUgPSB0YXNrLmRhdGU7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5LXNlbGVjdCcpLnZhbHVlID0gdGFzay5wcmlvcml0eTtcbiAgICAgICAgICBmb3JtRGlhbG9nLnNob3dNb2RhbCgpO1xuXG4gICAgICAgICAgLy8gU3RvcmUgdGhlIGluZGV4IG9mIHRoZSB0YXNrIGJlaW5nIGVkaXRlZCBpbiB0aGUgZm9ybVxuICAgICAgICAgIHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4ID0gaW5kZXg7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyVG9kYXlUYXNrcyh0YXNrcyA9IG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKSB7XG4gIGxldCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XG4gIHRhc2tMaXN0LmlubmVySFRNTCA9ICcnO1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7IC8vIEdldCB0b2RheSdzIGRhdGUgaW4gWVlZWS1NTS1ERCBmb3JtYXRcbiAgY29uc3QgdG9kYXlUYXNrcyA9IHRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suZGF0ZSA9PT0gdG9kYXkpO1xuICByZW5kZXIodG9kYXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pOyAvLyBVc2UgdGhlIG1haW4gcmVuZGVyIGZ1bmN0aW9uIHRvIHJlbmRlciB0b2RheSdzIHRhc2tzXG59XG5cbmZ1bmN0aW9uIHJlbmRlclRoaXNXZWVrVGFza3ModGFza3MgPSBteVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSkge1xuICBsZXQgdGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpO1xuICB0YXNrTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBzZXZlbkRheXNGcm9tTm93ID0gbmV3IERhdGUoKTtcbiAgc2V2ZW5EYXlzRnJvbU5vdy5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDcpO1xuICBjb25zdCB0aGlzV2Vla1Rhc2tzID0gdGFza3MuZmlsdGVyKHRhc2sgPT4ge1xuICAgICAgY29uc3QgdGFza0RhdGUgPSBuZXcgRGF0ZSh0YXNrLmRhdGUpO1xuICAgICAgcmV0dXJuIHRhc2tEYXRlID49IHRvZGF5ICYmIHRhc2tEYXRlIDw9IHNldmVuRGF5c0Zyb21Ob3c7XG4gIH0pO1xuICByZW5kZXIodGhpc1dlZWtUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pOyAvLyBVc2UgdGhlIG1haW4gcmVuZGVyIGZ1bmN0aW9uIHRvIHJlbmRlciB0aGlzIHdlZWsncyB0YXNrc1xufVxuXG5cbmV4cG9ydCB7IHJlbmRlciwgcmVuZGVyVG9kYXlUYXNrcywgcmVuZGVyVGhpc1dlZWtUYXNrcyB9O1xuIiwiaW1wb3J0IHsgYWRkVGFzaywgcmVtb3ZlVGFzaywgdXBkYXRlVGFzaywgbXlUYXNrcyB9IGZyb20gJy4vdGFza3MuanMnO1xuaW1wb3J0IHsgcmVuZGVyLCByZW5kZXJUb2RheVRhc2tzLCByZW5kZXJUaGlzV2Vla1Rhc2tzIH0gZnJvbSAnLi9kb20uanMnO1xuXG5jb25zdCBldmVudHMgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XG4gICAgICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2stYnV0dG9uJyk7XG4gICAgICAgIGNvbnN0IGZvcm1EaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS1kaWFsb2cnKTtcbiAgICAgICAgY29uc3QgYWxsVGFza3NCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWxsLXRhc2tzLWJ1dHRvbicpO1xuICAgICAgICBjb25zdCB0b2RheUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RheS1idXR0b24nKTtcbiAgICAgICAgY29uc3QgdGhpc1dlZWtCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhpcy13ZWVrLWJ1dHRvbicpO1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wbGV0ZWQtYnV0dG9uJyk7XG5cbiAgICAgICAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHktc2VsZWN0JykudmFsdWU7XG4gICAgICAgICAgICBpZiAodGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7XG4gICAgICAgICAgICAgICAgdXBkYXRlVGFzayhpbmRleCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4OyAvLyBDbGVhciB0aGUgZWRpdGluZyBpbmRleFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHJlbmRlcihteVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSk7XG4gICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgZm9ybURpYWxvZy5jbG9zZSgpO1xuICAgICAgICAgICAgZGVsZXRlIHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4O1xuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGZvcm1EaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBmb3JtRGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZ0RpbWVuc2lvbnMgPSBmb3JtRGlhbG9nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WCA8IGRpYWxvZ0RpbWVuc2lvbnMubGVmdCB8fFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WCA+IGRpYWxvZ0RpbWVuc2lvbnMucmlnaHQgfHxcbiAgICAgICAgICAgICAgICBlLmNsaWVudFkgPCBkaWFsb2dEaW1lbnNpb25zLnRvcCB8fFxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSA+IGRpYWxvZ0RpbWVuc2lvbnMuYm90dG9tXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBmb3JtRGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICBhbGxUYXNrc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHJlbmRlcihteVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSkpO1xuICAgICAgICB0b2RheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHJlbmRlclRvZGF5VGFza3MobXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pKTtcbiAgICAgICAgdGhpc1dlZWtCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiByZW5kZXJUaGlzV2Vla1Rhc2tzKG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKSk7XG4gICAgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoJ3JlbW92ZS1idXR0b24tJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgICAgICAgICAgIHJlbW92ZVRhc2soaW5kZXgpO1xuICAgICAgICAgICAgICAgIHJlbmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbXBsZXRlZFRhc2tzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29tcGxldGVkVGFza3MgPSBteVRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suY29tcGxldGVkKTtcbiAgICAgICAgICAgIHJlbmRlcihjb21wbGV0ZWRUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZW5kZXIoKTsgLy8gSW5pdGlhbCByZW5kZXJcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXZlbnRzO1xuIiwiLy8gVGFzayBjb25zdHJ1Y3RvclxuY2xhc3MgVGFzayB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XG4gIH1cbn1cblxuLy8gVGFza3MgYXJlIHN0b3JlZCBpbiB0aGUgZm9ybSBvZiBvYmplY3QgYXJyYXlzXG5jb25zdCBteVRhc2tzID0gW107XG5cbmZ1bmN0aW9uIGFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSkge1xuICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSk7XG4gIG15VGFza3MucHVzaChuZXdUYXNrKTtcbiAgcmV0dXJuIG15VGFza3M7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVRhc2soaW5kZXgpIHtcbiAgbXlUYXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICByZXR1cm4gbXlUYXNrcztcbn1cblxuZnVuY3Rpb24gdXBkYXRlVGFzayhpbmRleCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSkge1xuICBjb25zdCB0YXNrID0gbXlUYXNrc1tpbmRleF07XG4gIHRhc2sudGl0bGUgPSB0aXRsZTtcbiAgdGFzay5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICB0YXNrLmRhdGUgPSBkYXRlO1xuICB0YXNrLnByaW9yaXR5ID0gcHJpb3JpdHk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVRhc2tDb21wbGV0aW9uKGluZGV4KSB7XG4gIGNvbnN0IHRhc2sgPSBteVRhc2tzW2luZGV4XTtcbiAgdGFzay5jb21wbGV0ZWQgPSAhdGFzay5jb21wbGV0ZWQ7XG59XG5cbmV4cG9ydCB7IGFkZFRhc2ssIHJlbW92ZVRhc2ssIHVwZGF0ZVRhc2ssIHRvZ2dsZVRhc2tDb21wbGV0aW9uLCBteVRhc2tzIH07XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9tb2R1bGVzL2V2ZW50cy5qc1wiO1xuXG5ldmVudHMoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=