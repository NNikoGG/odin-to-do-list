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

function renderTodayTasks() {
    let taskList = document.querySelector(".task-container");
    taskList.innerHTML = '';
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    const todayTasks = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks.filter(task => task.date === today);
    for (let i = 0; i < todayTasks.length; i++) {
      let task = todayTasks[i];
      let taskWrapper = document.createElement('div');
      taskWrapper.className = "task";
      taskList.appendChild(taskWrapper);
      let toggleButton = document.createElement('i');
      toggleButton.className = "fa-regular fa-circle";
      taskWrapper.appendChild(toggleButton);
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
    const thisWeekTasks = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate >= today && taskDate <= sevenDaysFromNow;
    });

    for (let i = 0; i < thisWeekTasks.length; i++) {
      let task = thisWeekTasks[i];
      let taskWrapper = document.createElement('div');
      taskWrapper.className = "task";
      taskList.appendChild(taskWrapper);
      let toggleButton = document.createElement('i');
      toggleButton.className = "fa-regular fa-circle";
      taskWrapper.appendChild(toggleButton);
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
/*!******************************!*\
  !*** ./src/modules/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/modules/events.js");


(0,_events__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEU7QUFDMUU7Ozs7Ozs7VUN2Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044QjtBQUM5QjtBQUNBLG1EQUFNLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL21vZHVsZXMvZXZlbnRzLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2tzLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG15VGFza3MsIHRvZ2dsZVRhc2tDb21wbGV0aW9uIH0gZnJvbSAnLi90YXNrcy5qcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gcmVuZGVyKHRhc2tzID0gbXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pIHtcclxuICAgIGxldCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XHJcbiAgICB0YXNrTGlzdC5pbm5lckhUTUwgPSAnJztcclxuICAgIFxyXG4gICAgLy8gU29ydCB0YXNrcyBieSBkYXRlIHVzaW5nIG5hdGl2ZSBKYXZhU2NyaXB0IERhdGUgcGFyc2luZ1xyXG4gICAgY29uc3Qgc29ydGVkVGFza3MgPSB0YXNrcy5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShhLmRhdGUpIC0gbmV3IERhdGUoYi5kYXRlKSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvcnRlZFRhc2tzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBsZXQgdGFzayA9IHNvcnRlZFRhc2tzW2ldO1xyXG4gICAgICAgIGxldCB0YXNrV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmNsYXNzTmFtZSA9IFwidGFza1wiO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmRhdGFzZXQuaW5kZXggPSBpO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdGFzayBpcyBjb21wbGV0ZWQgYW5kIGFkZCB0aGUgJ2NvbXBsZXRlZCcgY2xhc3MgYWNjb3JkaW5nbHlcclxuICAgICAgICBpZiAodGFzay5jb21wbGV0ZWQpIHtcclxuICAgICAgICAgIHRhc2tXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0YXNrV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgdGFza0xpc3QuYXBwZW5kQ2hpbGQodGFza1dyYXBwZXIpO1xyXG5cclxuICAgICAgICBsZXQgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5pZCA9IGB0b2dnbGUtYnV0dG9uLSR7aX1gO1xyXG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc05hbWUgPSB0YXNrLmNvbXBsZXRlZCA/IFwiZmEtc29saWQgZmEtY2lyY2xlLWNoZWNrXCIgOiBcImZhLXJlZ3VsYXIgZmEtY2lyY2xlXCI7XHJcbiAgICAgICAgdG9nZ2xlQnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpO1xyXG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudCB0aGUgZXZlbnQgZnJvbSBidWJibGluZyB1cCB0byB0aGUgdGFza1dyYXBwZXJcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4O1xyXG4gICAgICAgICAgdG9nZ2xlVGFza0NvbXBsZXRpb24oaW5kZXgpO1xyXG4gICAgICAgICAgcmVuZGVyKHRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSk7IC8vIFJlLXJlbmRlciB0aGUgdGFza3NcclxuICAgICAgICB9KTsgICAgICBcclxuICAgICAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgdGFza05hbWUuaWQgPSAndGFzay10aXRsZSc7XHJcbiAgICAgICAgdGFza05hbWUuaW5uZXJUZXh0ID0gdGFzay50aXRsZTtcclxuICAgICAgICBsZXQgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbi5pZCA9ICd0YXNrLWRlc2NyaXB0aW9uJztcclxuICAgICAgICB0YXNrRGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gdGFzay5kZXNjcmlwdGlvbjtcclxuICAgICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgdGFza0RhdGUuaWQgPSAndGFzay1kYXRlJztcclxuICAgICAgICB0YXNrRGF0ZS5pbm5lclRleHQgPSB0YXNrLmRhdGU7XHJcbiAgICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICB0YXNrUHJpb3JpdHkuaWQgPSAndGFzay1wcmlvcml0eSc7XHJcbiAgICAgICAgdGFza1ByaW9yaXR5LmlubmVyVGV4dCA9IHRhc2sucHJpb3JpdHk7XHJcbiAgICAgICAgbGV0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgZWRpdEJ1dHRvbi5pZCA9IGBlZGl0LWJ1dHRvbi0ke2l9YDtcclxuICAgICAgICBlZGl0QnV0dG9uLmNsYXNzTmFtZSA9IFwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiO1xyXG4gICAgICAgIGVkaXRCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XHJcbiAgICAgICAgbGV0IHJlbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICByZW1vdmVCdXR0b24uaWQgPSBgcmVtb3ZlLWJ1dHRvbi0ke2l9YDtcclxuICAgICAgICByZW1vdmVCdXR0b24uY2xhc3NOYW1lID0gXCJmYS1zb2xpZCBmYS1jaXJjbGUteG1hcmtcIjtcclxuICAgICAgICByZW1vdmVCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XHJcblxyXG4gICAgICAgIHRhc2tXcmFwcGVyLmluc2VydEJlZm9yZSh0b2dnbGVCdXR0b24sIHRhc2tXcmFwcGVyLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcclxuICAgICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcclxuICAgICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHJlbW92ZUJ1dHRvbik7XHJcblxyXG4gICAgICAgIC8vIEluIHRoZSByZW5kZXIgZnVuY3Rpb24gaW4gZG9tLmpzXHJcbiAgICAgICAgdGFza1dyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4O1xyXG4gICAgICAgICAgY29uc3QgdGFzayA9IG15VGFza3NbaW5kZXhdO1xyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykudmFsdWUgPSB0YXNrLnRpdGxlO1xyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJykudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKS52YWx1ZSA9IHRhc2suZGF0ZTtcclxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eS1zZWxlY3QnKS52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XHJcbiAgICAgICAgICBmb3JtRGlhbG9nLnNob3dNb2RhbCgpO1xyXG5cclxuICAgICAgICAgIC8vIFN0b3JlIHRoZSBpbmRleCBvZiB0aGUgdGFzayBiZWluZyBlZGl0ZWQgaW4gdGhlIGZvcm1cclxuICAgICAgICAgIHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclRvZGF5VGFza3MoKSB7XHJcbiAgICBsZXQgdGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stY29udGFpbmVyXCIpO1xyXG4gICAgdGFza0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7IC8vIEdldCB0b2RheSdzIGRhdGUgaW4gWVlZWS1NTS1ERCBmb3JtYXRcclxuICAgIGNvbnN0IHRvZGF5VGFza3MgPSBteVRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suZGF0ZSA9PT0gdG9kYXkpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2RheVRhc2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCB0YXNrID0gdG9kYXlUYXNrc1tpXTtcclxuICAgICAgbGV0IHRhc2tXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHRhc2tXcmFwcGVyLmNsYXNzTmFtZSA9IFwidGFza1wiO1xyXG4gICAgICB0YXNrTGlzdC5hcHBlbmRDaGlsZCh0YXNrV3JhcHBlcik7XHJcbiAgICAgIGxldCB0b2dnbGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc05hbWUgPSBcImZhLXJlZ3VsYXIgZmEtY2lyY2xlXCI7XHJcbiAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRvZ2dsZUJ1dHRvbik7XHJcbiAgICAgIGxldCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgdGFza05hbWUuaW5uZXJUZXh0ID0gdGFzay50aXRsZTtcclxuICAgICAgbGV0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgdGFza0Rlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHRhc2suZGVzY3JpcHRpb247XHJcbiAgICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgdGFza0RhdGUuaW5uZXJUZXh0ID0gdGFzay5kYXRlO1xyXG4gICAgICBsZXQgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICB0YXNrUHJpb3JpdHkuaW5uZXJUZXh0ID0gdGFzay5wcmlvcml0eTtcclxuICAgICAgbGV0IHJlbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICByZW1vdmVCdXR0b24uaW5uZXJUZXh0ID0gXCJYXCI7XHJcbiAgICAgIHJlbW92ZUJ1dHRvbi5jbGFzc05hbWUgPSBcInJlbW92ZS1idXR0b25cIjtcclxuICAgICAgcmVtb3ZlQnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpO1xyXG4gIFxyXG4gICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrTmFtZSk7XHJcbiAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XHJcbiAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcclxuICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5KTtcclxuICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQocmVtb3ZlQnV0dG9uKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyVGhpc1dlZWtUYXNrcygpIHtcclxuICAgIGxldCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XHJcbiAgICB0YXNrTGlzdC5pbm5lckhUTUwgPSAnJztcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IHNldmVuRGF5c0Zyb21Ob3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgc2V2ZW5EYXlzRnJvbU5vdy5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDcpOyBcclxuICAgIGNvbnN0IHRoaXNXZWVrVGFza3MgPSBteVRhc2tzLmZpbHRlcih0YXNrID0+IHtcclxuICAgICAgY29uc3QgdGFza0RhdGUgPSBuZXcgRGF0ZSh0YXNrLmRhdGUpO1xyXG4gICAgICByZXR1cm4gdGFza0RhdGUgPj0gdG9kYXkgJiYgdGFza0RhdGUgPD0gc2V2ZW5EYXlzRnJvbU5vdztcclxuICAgIH0pO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpc1dlZWtUYXNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgdGFzayA9IHRoaXNXZWVrVGFza3NbaV07XHJcbiAgICAgIGxldCB0YXNrV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0YXNrV3JhcHBlci5jbGFzc05hbWUgPSBcInRhc2tcIjtcclxuICAgICAgdGFza0xpc3QuYXBwZW5kQ2hpbGQodGFza1dyYXBwZXIpO1xyXG4gICAgICBsZXQgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICB0b2dnbGVCdXR0b24uY2xhc3NOYW1lID0gXCJmYS1yZWd1bGFyIGZhLWNpcmNsZVwiO1xyXG4gICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0b2dnbGVCdXR0b24pO1xyXG4gICAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIHRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGl0bGU7XHJcbiAgICAgIGxldCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIHRhc2tEZXNjcmlwdGlvbi5pbm5lclRleHQgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG4gICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIHRhc2tEYXRlLmlubmVyVGV4dCA9IHRhc2suZGF0ZTtcclxuICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgdGFza1ByaW9yaXR5LmlubmVyVGV4dCA9IHRhc2sucHJpb3JpdHk7XHJcbiAgICAgIGxldCByZW1vdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgcmVtb3ZlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xyXG4gICAgICByZW1vdmVCdXR0b24uY2xhc3NOYW1lID0gXCJyZW1vdmUtYnV0dG9uXCI7XHJcbiAgICAgIHJlbW92ZUJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcclxuICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza05hbWUpO1xyXG4gICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xyXG4gICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XHJcbiAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eSk7XHJcbiAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHJlbW92ZUJ1dHRvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyByZW5kZXIsIHJlbmRlclRvZGF5VGFza3MsIHJlbmRlclRoaXNXZWVrVGFza3MgfTtcclxuIiwiaW1wb3J0IHsgYWRkVGFzaywgcmVtb3ZlVGFzaywgdXBkYXRlVGFzaywgbXlUYXNrcyB9IGZyb20gJy4vdGFza3MuanMnO1xyXG5pbXBvcnQgeyByZW5kZXIsIHJlbmRlclRvZGF5VGFza3MsIHJlbmRlclRoaXNXZWVrVGFza3MgfSBmcm9tICcuL2RvbS5qcyc7XHJcblxyXG5jb25zdCBldmVudHMgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xyXG4gICAgICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2stYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3QgZm9ybURpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLWRpYWxvZycpO1xyXG4gICAgICAgIGNvbnN0IGFsbFRhc2tzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FsbC10YXNrcy1idXR0b24nKTtcclxuICAgICAgICBjb25zdCB0b2RheUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2RheS1idXR0b24nKTtcclxuICAgICAgICBjb25zdCB0aGlzV2Vla0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aGlzLXdlZWstYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3QgY29tcGxldGVkVGFza3NCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tcGxldGVkLWJ1dHRvbicpO1xyXG5cclxuICAgICAgICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHktc2VsZWN0JykudmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0YXNrRm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4O1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlVGFzayhpbmRleCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7IC8vIENsZWFyIHRoZSBlZGl0aW5nIGluZGV4XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHJlbmRlcihteVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSk7XHJcbiAgICAgICAgICAgIHRhc2tGb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGZvcm1EaWFsb2cuY2xvc2UoKTtcclxuICAgICAgICAgICAgZGVsZXRlIHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4O1xyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZm9ybURpYWxvZy5zaG93TW9kYWwoKTtcclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIGZvcm1EaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkaWFsb2dEaW1lbnNpb25zID0gZm9ybURpYWxvZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgZS5jbGllbnRYIDwgZGlhbG9nRGltZW5zaW9ucy5sZWZ0IHx8XHJcbiAgICAgICAgICAgICAgICBlLmNsaWVudFggPiBkaWFsb2dEaW1lbnNpb25zLnJpZ2h0IHx8XHJcbiAgICAgICAgICAgICAgICBlLmNsaWVudFkgPCBkaWFsb2dEaW1lbnNpb25zLnRvcCB8fFxyXG4gICAgICAgICAgICAgICAgZS5jbGllbnRZID4gZGlhbG9nRGltZW5zaW9ucy5ib3R0b21cclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtRGlhbG9nLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgIGFsbFRhc2tzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcmVuZGVyKG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKSk7XHJcbiAgICAgICAgdG9kYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiByZW5kZXJUb2RheVRhc2tzKG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKSk7XHJcbiAgICAgICAgdGhpc1dlZWtCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiByZW5kZXJUaGlzV2Vla1Rhc2tzKG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKSk7XHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmlkLnN0YXJ0c1dpdGgoJ3JlbW92ZS1idXR0b24tJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVUYXNrKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIHJlbmRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29tcGxldGVkVGFza3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlZFRhc2tzID0gbXlUYXNrcy5maWx0ZXIodGFzayA9PiB0YXNrLmNvbXBsZXRlZCk7XHJcbiAgICAgICAgICAgIHJlbmRlcihjb21wbGV0ZWRUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZW5kZXIoKTsgLy8gSW5pdGlhbCByZW5kZXJcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudHM7XHJcbiIsIi8vIFRhc2sgY29uc3RydWN0b3JcclxuY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSkge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgdGhpcy5kYXRlID0gZGF0ZTtcclxuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBUYXNrcyBhcmUgc3RvcmVkIGluIHRoZSBmb3JtIG9mIG9iamVjdCBhcnJheXNcclxuY29uc3QgbXlUYXNrcyA9IFtdO1xyXG5cclxuZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSB7XHJcbiAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpO1xyXG4gIG15VGFza3MucHVzaChuZXdUYXNrKTtcclxuICByZXR1cm4gbXlUYXNrcztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlVGFzayhpbmRleCkge1xyXG4gIG15VGFza3Muc3BsaWNlKGluZGV4LCAxKTtcclxuICByZXR1cm4gbXlUYXNrcztcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVGFzayhpbmRleCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSkge1xyXG4gIGNvbnN0IHRhc2sgPSBteVRhc2tzW2luZGV4XTtcclxuICB0YXNrLnRpdGxlID0gdGl0bGU7XHJcbiAgdGFzay5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gIHRhc2suZGF0ZSA9IGRhdGU7XHJcbiAgdGFzay5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVUYXNrQ29tcGxldGlvbihpbmRleCkge1xyXG4gIGNvbnN0IHRhc2sgPSBteVRhc2tzW2luZGV4XTtcclxuICB0YXNrLmNvbXBsZXRlZCA9ICF0YXNrLmNvbXBsZXRlZDtcclxufVxyXG5cclxuZXhwb3J0IHsgYWRkVGFzaywgcmVtb3ZlVGFzaywgdXBkYXRlVGFzaywgdG9nZ2xlVGFza0NvbXBsZXRpb24sIG15VGFza3MgfTtcclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGV2ZW50cyBmcm9tIFwiLi9ldmVudHNcIjtcclxuXHJcbmV2ZW50cygpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==