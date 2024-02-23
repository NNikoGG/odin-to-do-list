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
/*!******************************!*\
  !*** ./src/modules/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/modules/events.js");


(0,_events__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044QjtBQUM5QjtBQUNBLG1EQUFNLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3QvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL21vZHVsZXMvZXZlbnRzLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2tzLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG15VGFza3MsIHRvZ2dsZVRhc2tDb21wbGV0aW9uIH0gZnJvbSAnLi90YXNrcy5qcyc7XHJcblxyXG5cclxuZnVuY3Rpb24gcmVuZGVyKHRhc2tzID0gbXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pIHtcclxuICAgIGxldCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XHJcbiAgICB0YXNrTGlzdC5pbm5lckhUTUwgPSAnJztcclxuICAgIFxyXG4gICAgLy8gU29ydCB0YXNrcyBieSBkYXRlIHVzaW5nIG5hdGl2ZSBKYXZhU2NyaXB0IERhdGUgcGFyc2luZ1xyXG4gICAgY29uc3Qgc29ydGVkVGFza3MgPSB0YXNrcy5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShhLmRhdGUpIC0gbmV3IERhdGUoYi5kYXRlKSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvcnRlZFRhc2tzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBsZXQgdGFzayA9IHNvcnRlZFRhc2tzW2ldO1xyXG4gICAgICAgIGxldCB0YXNrV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmNsYXNzTmFtZSA9IFwidGFza1wiO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmRhdGFzZXQuaW5kZXggPSBpO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdGFzayBpcyBjb21wbGV0ZWQgYW5kIGFkZCB0aGUgJ2NvbXBsZXRlZCcgY2xhc3MgYWNjb3JkaW5nbHlcclxuICAgICAgICBpZiAodGFzay5jb21wbGV0ZWQpIHtcclxuICAgICAgICAgIHRhc2tXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0YXNrV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZWQnKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgdGFza0xpc3QuYXBwZW5kQ2hpbGQodGFza1dyYXBwZXIpO1xyXG5cclxuICAgICAgICBsZXQgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5pZCA9IGB0b2dnbGUtYnV0dG9uLSR7aX1gO1xyXG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5jbGFzc05hbWUgPSB0YXNrLmNvbXBsZXRlZCA/IFwiZmEtc29saWQgZmEtY2lyY2xlLWNoZWNrXCIgOiBcImZhLXJlZ3VsYXIgZmEtY2lyY2xlXCI7XHJcbiAgICAgICAgdG9nZ2xlQnV0dG9uLmRhdGFzZXQuaW5kZXggPSBpO1xyXG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgLy8gUHJldmVudCB0aGUgZXZlbnQgZnJvbSBidWJibGluZyB1cCB0byB0aGUgdGFza1dyYXBwZXJcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4O1xyXG4gICAgICAgICAgdG9nZ2xlVGFza0NvbXBsZXRpb24oaW5kZXgpO1xyXG4gICAgICAgICAgcmVuZGVyKHRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSk7IC8vIFJlLXJlbmRlciB0aGUgdGFza3NcclxuICAgICAgICB9KTsgICAgICBcclxuICAgICAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgdGFza05hbWUuaWQgPSAndGFzay10aXRsZSc7XHJcbiAgICAgICAgdGFza05hbWUuaW5uZXJUZXh0ID0gdGFzay50aXRsZTtcclxuICAgICAgICBsZXQgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbi5pZCA9ICd0YXNrLWRlc2NyaXB0aW9uJztcclxuICAgICAgICB0YXNrRGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gdGFzay5kZXNjcmlwdGlvbjtcclxuICAgICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgdGFza0RhdGUuaWQgPSAndGFzay1kYXRlJztcclxuICAgICAgICB0YXNrRGF0ZS5pbm5lclRleHQgPSB0YXNrLmRhdGU7XHJcbiAgICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICB0YXNrUHJpb3JpdHkuaWQgPSAndGFzay1wcmlvcml0eSc7XHJcbiAgICAgICAgdGFza1ByaW9yaXR5LmlubmVyVGV4dCA9IHRhc2sucHJpb3JpdHk7XHJcbiAgICAgICAgbGV0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAgICAgZWRpdEJ1dHRvbi5pZCA9IGBlZGl0LWJ1dHRvbi0ke2l9YDtcclxuICAgICAgICBlZGl0QnV0dG9uLmNsYXNzTmFtZSA9IFwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiO1xyXG4gICAgICAgIGVkaXRCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XHJcbiAgICAgICAgbGV0IHJlbW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICByZW1vdmVCdXR0b24uaWQgPSBgcmVtb3ZlLWJ1dHRvbi0ke2l9YDtcclxuICAgICAgICByZW1vdmVCdXR0b24uY2xhc3NOYW1lID0gXCJmYS1zb2xpZCBmYS1jaXJjbGUteG1hcmtcIjtcclxuICAgICAgICByZW1vdmVCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XHJcblxyXG4gICAgICAgIHRhc2tXcmFwcGVyLmluc2VydEJlZm9yZSh0b2dnbGVCdXR0b24sIHRhc2tXcmFwcGVyLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcclxuICAgICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcclxuICAgICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKGVkaXRCdXR0b24pO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHJlbW92ZUJ1dHRvbik7XHJcblxyXG4gICAgICAgIC8vIEluIHRoZSByZW5kZXIgZnVuY3Rpb24gaW4gZG9tLmpzXHJcbiAgICAgICAgdGFza1dyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRhc2V0LmluZGV4O1xyXG4gICAgICAgICAgY29uc3QgdGFzayA9IG15VGFza3NbaW5kZXhdO1xyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykudmFsdWUgPSB0YXNrLnRpdGxlO1xyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJykudmFsdWUgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RhdGUnKS52YWx1ZSA9IHRhc2suZGF0ZTtcclxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eS1zZWxlY3QnKS52YWx1ZSA9IHRhc2sucHJpb3JpdHk7XHJcbiAgICAgICAgICBmb3JtRGlhbG9nLnNob3dNb2RhbCgpO1xyXG5cclxuICAgICAgICAgIC8vIFN0b3JlIHRoZSBpbmRleCBvZiB0aGUgdGFzayBiZWluZyBlZGl0ZWQgaW4gdGhlIGZvcm1cclxuICAgICAgICAgIHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclRvZGF5VGFza3ModGFza3MgPSBteVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSkge1xyXG4gIGxldCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XHJcbiAgdGFza0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApOyAvLyBHZXQgdG9kYXkncyBkYXRlIGluIFlZWVktTU0tREQgZm9ybWF0XHJcbiAgY29uc3QgdG9kYXlUYXNrcyA9IHRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suZGF0ZSA9PT0gdG9kYXkpO1xyXG4gIHJlbmRlcih0b2RheVRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSk7IC8vIFVzZSB0aGUgbWFpbiByZW5kZXIgZnVuY3Rpb24gdG8gcmVuZGVyIHRvZGF5J3MgdGFza3NcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyVGhpc1dlZWtUYXNrcyh0YXNrcyA9IG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKSB7XHJcbiAgbGV0IHRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKTtcclxuICB0YXNrTGlzdC5pbm5lckhUTUwgPSAnJztcclxuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XHJcbiAgY29uc3Qgc2V2ZW5EYXlzRnJvbU5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgc2V2ZW5EYXlzRnJvbU5vdy5zZXREYXRlKHRvZGF5LmdldERhdGUoKSArIDcpO1xyXG4gIGNvbnN0IHRoaXNXZWVrVGFza3MgPSB0YXNrcy5maWx0ZXIodGFzayA9PiB7XHJcbiAgICAgIGNvbnN0IHRhc2tEYXRlID0gbmV3IERhdGUodGFzay5kYXRlKTtcclxuICAgICAgcmV0dXJuIHRhc2tEYXRlID49IHRvZGF5ICYmIHRhc2tEYXRlIDw9IHNldmVuRGF5c0Zyb21Ob3c7XHJcbiAgfSk7XHJcbiAgcmVuZGVyKHRoaXNXZWVrVGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKTsgLy8gVXNlIHRoZSBtYWluIHJlbmRlciBmdW5jdGlvbiB0byByZW5kZXIgdGhpcyB3ZWVrJ3MgdGFza3NcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IHJlbmRlciwgcmVuZGVyVG9kYXlUYXNrcywgcmVuZGVyVGhpc1dlZWtUYXNrcyB9O1xyXG4iLCJpbXBvcnQgeyBhZGRUYXNrLCByZW1vdmVUYXNrLCB1cGRhdGVUYXNrLCBteVRhc2tzIH0gZnJvbSAnLi90YXNrcy5qcyc7XHJcbmltcG9ydCB7IHJlbmRlciwgcmVuZGVyVG9kYXlUYXNrcywgcmVuZGVyVGhpc1dlZWtUYXNrcyB9IGZyb20gJy4vZG9tLmpzJztcclxuXHJcbmNvbnN0IGV2ZW50cyA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XHJcbiAgICAgICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1idXR0b24nKTtcclxuICAgICAgICBjb25zdCBmb3JtRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tZGlhbG9nJyk7XHJcbiAgICAgICAgY29uc3QgYWxsVGFza3NCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWxsLXRhc2tzLWJ1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IHRvZGF5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZGF5LWJ1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IHRoaXNXZWVrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RoaXMtd2Vlay1idXR0b24nKTtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZWRUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wbGV0ZWQtYnV0dG9uJyk7XHJcblxyXG4gICAgICAgIHRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJykudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGF0ZScpLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eS1zZWxlY3QnKS52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRhc2tGb3JtLmRhdGFzZXQuZWRpdGluZ0luZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVUYXNrKGluZGV4LCB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0YXNrRm9ybS5kYXRhc2V0LmVkaXRpbmdJbmRleDsgLy8gQ2xlYXIgdGhlIGVkaXRpbmcgaW5kZXhcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFkZFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgcmVuZGVyKG15VGFza3MsIGZvcm1EaWFsb2csIHRhc2tGb3JtKTtcclxuICAgICAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgZm9ybURpYWxvZy5jbG9zZSgpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGFza0Zvcm0uZGF0YXNldC5lZGl0aW5nSW5kZXg7XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBmb3JtRGlhbG9nLnNob3dNb2RhbCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgZm9ybURpYWxvZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZ0RpbWVuc2lvbnMgPSBmb3JtRGlhbG9nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBlLmNsaWVudFggPCBkaWFsb2dEaW1lbnNpb25zLmxlZnQgfHxcclxuICAgICAgICAgICAgICAgIGUuY2xpZW50WCA+IGRpYWxvZ0RpbWVuc2lvbnMucmlnaHQgfHxcclxuICAgICAgICAgICAgICAgIGUuY2xpZW50WSA8IGRpYWxvZ0RpbWVuc2lvbnMudG9wIHx8XHJcbiAgICAgICAgICAgICAgICBlLmNsaWVudFkgPiBkaWFsb2dEaW1lbnNpb25zLmJvdHRvbVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIGZvcm1EaWFsb2cuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgYWxsVGFza3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiByZW5kZXIobXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pKTtcclxuICAgICAgICB0b2RheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHJlbmRlclRvZGF5VGFza3MobXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pKTtcclxuICAgICAgICB0aGlzV2Vla0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHJlbmRlclRoaXNXZWVrVGFza3MobXlUYXNrcywgZm9ybURpYWxvZywgdGFza0Zvcm0pKTtcclxuICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aCgncmVtb3ZlLWJ1dHRvbi0nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBldmVudC50YXJnZXQuZGF0YXNldC5pbmRleDtcclxuICAgICAgICAgICAgICAgIHJlbW92ZVRhc2soaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBjb21wbGV0ZWRUYXNrc0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY29tcGxldGVkVGFza3MgPSBteVRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suY29tcGxldGVkKTtcclxuICAgICAgICAgICAgcmVuZGVyKGNvbXBsZXRlZFRhc2tzLCBmb3JtRGlhbG9nLCB0YXNrRm9ybSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlbmRlcigpOyAvLyBJbml0aWFsIHJlbmRlclxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50cztcclxuIiwiLy8gVGFzayBjb25zdHJ1Y3RvclxyXG5jbGFzcyBUYXNrIHtcclxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB0aGlzLmRhdGUgPSBkYXRlO1xyXG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFRhc2tzIGFyZSBzdG9yZWQgaW4gdGhlIGZvcm0gb2Ygb2JqZWN0IGFycmF5c1xyXG5jb25zdCBteVRhc2tzID0gW107XHJcblxyXG5mdW5jdGlvbiBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpIHtcclxuICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSk7XHJcbiAgbXlUYXNrcy5wdXNoKG5ld1Rhc2spO1xyXG4gIHJldHVybiBteVRhc2tzO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVUYXNrKGluZGV4KSB7XHJcbiAgbXlUYXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gIHJldHVybiBteVRhc2tzO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUYXNrKGluZGV4LCB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSB7XHJcbiAgY29uc3QgdGFzayA9IG15VGFza3NbaW5kZXhdO1xyXG4gIHRhc2sudGl0bGUgPSB0aXRsZTtcclxuICB0YXNrLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgdGFzay5kYXRlID0gZGF0ZTtcclxuICB0YXNrLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVRhc2tDb21wbGV0aW9uKGluZGV4KSB7XHJcbiAgY29uc3QgdGFzayA9IG15VGFza3NbaW5kZXhdO1xyXG4gIHRhc2suY29tcGxldGVkID0gIXRhc2suY29tcGxldGVkO1xyXG59XHJcblxyXG5leHBvcnQgeyBhZGRUYXNrLCByZW1vdmVUYXNrLCB1cGRhdGVUYXNrLCB0b2dnbGVUYXNrQ29tcGxldGlvbiwgbXlUYXNrcyB9O1xyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZXZlbnRzIGZyb20gXCIuL2V2ZW50c1wiO1xyXG5cclxuZXZlbnRzKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9