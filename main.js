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


function render(tasks = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks) {
    let taskList = document.querySelector(".task-container");
    taskList.innerHTML = '';
    // Sort tasks by date using native JavaScript Date parsing
    const sortedTasks = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
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
  
    const todayTasks = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks.filter(task => task.date === today);
  
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
  
    const thisWeekTasks = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.myTasks.filter(task => {
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
/* harmony export */   removeTask: () => (/* binding */ removeTask)
/* harmony export */ });
// Task constructor
class Task {
  constructor(title, description, date, priority) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.priority = priority;
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
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ "./src/modules/tasks.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./src/modules/dom.js");



document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.querySelector('#task-form');
    const addTaskButton = document.querySelector('#add-task-button');
    const formDialog = document.querySelector('#form-dialog');
    const allTasksButton = document.querySelector('#all-tasks-button');
    const todayButton = document.querySelector('#today-button');
    const thisWeekButton = document.querySelector('#this-week-button');

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const date = document.querySelector('#date').value;
        const priority = document.querySelector('#priority-select').value;
        (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.addTask)(title, description, date, priority);
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)();
        taskForm.reset();
        formDialog.close();
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

    allTasksButton.addEventListener('click', _dom_js__WEBPACK_IMPORTED_MODULE_1__.render);
    todayButton.addEventListener('click', _dom_js__WEBPACK_IMPORTED_MODULE_1__.renderTodayTasks);
    thisWeekButton.addEventListener('click', _dom_js__WEBPACK_IMPORTED_MODULE_1__.renderThisWeekTasks);

    document.addEventListener('click', function(event) {
        if (event.target && event.target.className == 'remove-button') {
            const index = event.target.dataset.index;
            (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.removeTask)(index);
            (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)();
        }
    });

    (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.render)(); // Initial render
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFxQztBQUNyQztBQUNBLHdCQUF3Qiw4Q0FBTztBQUMvQjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsOENBQU87QUFDL0Isb0JBQW9CLHdCQUF3QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0EsdUJBQXVCLDhDQUFPO0FBQzlCO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsOENBQU87QUFDakM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLG9CQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDeUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUd6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDd0M7Ozs7Ozs7VUN4QnhDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmlEO0FBQ3dCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsa0RBQU87QUFDZixRQUFRLCtDQUFNO0FBQ2Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDZDQUE2QywyQ0FBTTtBQUNuRCwwQ0FBMEMscURBQWdCO0FBQzFELDZDQUE2Qyx3REFBbUI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHFEQUFVO0FBQ3RCLFlBQVksK0NBQU07QUFDbEI7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJLCtDQUFNLElBQUk7QUFDZCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10by1kby1saXN0Ly4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2tzLmpzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG15VGFza3MgfSBmcm9tICcuL3Rhc2tzLmpzJztcclxuXHJcbmZ1bmN0aW9uIHJlbmRlcih0YXNrcyA9IG15VGFza3MpIHtcclxuICAgIGxldCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XHJcbiAgICB0YXNrTGlzdC5pbm5lckhUTUwgPSAnJztcclxuICAgIC8vIFNvcnQgdGFza3MgYnkgZGF0ZSB1c2luZyBuYXRpdmUgSmF2YVNjcmlwdCBEYXRlIHBhcnNpbmdcclxuICAgIGNvbnN0IHNvcnRlZFRhc2tzID0gbXlUYXNrcy5zb3J0KChhLCBiKSA9PiBuZXcgRGF0ZShhLmRhdGUpIC0gbmV3IERhdGUoYi5kYXRlKSk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvcnRlZFRhc2tzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBsZXQgdGFzayA9IHNvcnRlZFRhc2tzW2ldO1xyXG4gICAgICAgIGxldCB0YXNrV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmNsYXNzTmFtZSA9IFwidGFza1wiO1xyXG4gICAgICAgIHRhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2tXcmFwcGVyKTtcclxuICAgICAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgdGFza05hbWUuaW5uZXJUZXh0ID0gdGFzay50aXRsZTtcclxuICAgICAgICBsZXQgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbi5pbm5lclRleHQgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICB0YXNrRGF0ZS5pbm5lclRleHQgPSB0YXNrLmRhdGU7XHJcbiAgICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICB0YXNrUHJpb3JpdHkuaW5uZXJUZXh0ID0gdGFzay5wcmlvcml0eTtcclxuICAgICAgICBsZXQgcmVtb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgcmVtb3ZlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xyXG4gICAgICAgIHJlbW92ZUJ1dHRvbi5jbGFzc05hbWUgPSBcInJlbW92ZS1idXR0b25cIjtcclxuICAgICAgICByZW1vdmVCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XHJcbiAgXHJcbiAgICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza05hbWUpO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xyXG4gICAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eSk7XHJcbiAgICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQocmVtb3ZlQnV0dG9uKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyVG9kYXlUYXNrcygpIHtcclxuICAgIGxldCB0YXNrTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XHJcbiAgICB0YXNrTGlzdC5pbm5lckhUTUwgPSAnJztcclxuICBcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKTsgLy8gR2V0IHRvZGF5J3MgZGF0ZSBpbiBZWVlZLU1NLUREIGZvcm1hdFxyXG4gIFxyXG4gICAgY29uc3QgdG9kYXlUYXNrcyA9IG15VGFza3MuZmlsdGVyKHRhc2sgPT4gdGFzay5kYXRlID09PSB0b2RheSk7XHJcbiAgXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvZGF5VGFza3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IHRhc2sgPSB0b2RheVRhc2tzW2ldO1xyXG4gICAgICBsZXQgdGFza1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdGFza1dyYXBwZXIuY2xhc3NOYW1lID0gXCJ0YXNrXCI7XHJcbiAgICAgIHRhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2tXcmFwcGVyKTtcclxuICAgICAgbGV0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICB0YXNrTmFtZS5pbm5lclRleHQgPSB0YXNrLnRpdGxlO1xyXG4gICAgICBsZXQgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICB0YXNrRGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gdGFzay5kZXNjcmlwdGlvbjtcclxuICAgICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICB0YXNrRGF0ZS5pbm5lclRleHQgPSB0YXNrLmRhdGU7XHJcbiAgICAgIGxldCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIHRhc2tQcmlvcml0eS5pbm5lclRleHQgPSB0YXNrLnByaW9yaXR5O1xyXG4gICAgICBsZXQgcmVtb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgIHJlbW92ZUJ1dHRvbi5pbm5lclRleHQgPSBcIlhcIjtcclxuICAgICAgcmVtb3ZlQnV0dG9uLmNsYXNzTmFtZSA9IFwicmVtb3ZlLWJ1dHRvblwiO1xyXG4gICAgICByZW1vdmVCdXR0b24uZGF0YXNldC5pbmRleCA9IGk7XHJcbiAgXHJcbiAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcclxuICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcclxuICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xyXG4gICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHkpO1xyXG4gICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZChyZW1vdmVCdXR0b24pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJUaGlzV2Vla1Rhc2tzKCkge1xyXG4gICAgbGV0IHRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWNvbnRhaW5lclwiKTtcclxuICAgIHRhc2tMaXN0LmlubmVySFRNTCA9ICcnO1xyXG4gIFxyXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3Qgc2V2ZW5EYXlzRnJvbU5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICBzZXZlbkRheXNGcm9tTm93LnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpICsgNyk7XHJcbiAgXHJcbiAgICBjb25zdCB0aGlzV2Vla1Rhc2tzID0gbXlUYXNrcy5maWx0ZXIodGFzayA9PiB7XHJcbiAgICAgIGNvbnN0IHRhc2tEYXRlID0gbmV3IERhdGUodGFzay5kYXRlKTtcclxuICAgICAgcmV0dXJuIHRhc2tEYXRlID49IHRvZGF5ICYmIHRhc2tEYXRlIDw9IHNldmVuRGF5c0Zyb21Ob3c7XHJcbiAgICB9KTtcclxuICBcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpc1dlZWtUYXNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgdGFzayA9IHRoaXNXZWVrVGFza3NbaV07XHJcbiAgICAgIGxldCB0YXNrV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB0YXNrV3JhcHBlci5jbGFzc05hbWUgPSBcInRhc2tcIjtcclxuICAgICAgdGFza0xpc3QuYXBwZW5kQ2hpbGQodGFza1dyYXBwZXIpO1xyXG4gICAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIHRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGl0bGU7XHJcbiAgICAgIGxldCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIHRhc2tEZXNjcmlwdGlvbi5pbm5lclRleHQgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG4gICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIHRhc2tEYXRlLmlubmVyVGV4dCA9IHRhc2suZGF0ZTtcclxuICAgICAgbGV0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgdGFza1ByaW9yaXR5LmlubmVyVGV4dCA9IHRhc2sucHJpb3JpdHk7XHJcbiAgICAgIGxldCByZW1vdmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgcmVtb3ZlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xyXG4gICAgICByZW1vdmVCdXR0b24uY2xhc3NOYW1lID0gXCJyZW1vdmUtYnV0dG9uXCI7XHJcbiAgICAgIHJlbW92ZUJ1dHRvbi5kYXRhc2V0LmluZGV4ID0gaTtcclxuICBcclxuICAgICAgdGFza1dyYXBwZXIuYXBwZW5kQ2hpbGQodGFza05hbWUpO1xyXG4gICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xyXG4gICAgICB0YXNrV3JhcHBlci5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XHJcbiAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eSk7XHJcbiAgICAgIHRhc2tXcmFwcGVyLmFwcGVuZENoaWxkKHJlbW92ZUJ1dHRvbik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbmRlciwgcmVuZGVyVG9kYXlUYXNrcywgcmVuZGVyVGhpc1dlZWtUYXNrcyB9O1xyXG4iLCIvLyBUYXNrIGNvbnN0cnVjdG9yXHJcbmNsYXNzIFRhc2sge1xyXG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIHRoaXMuZGF0ZSA9IGRhdGU7XHJcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBUYXNrcyBhcmUgc3RvcmVkIGluIHRoZSBmb3JtIG9mIG9iamVjdCBhcnJheXNcclxuY29uc3QgbXlUYXNrcyA9IFtdO1xyXG5cclxuZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KSB7XHJcbiAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHkpO1xyXG4gIG15VGFza3MucHVzaChuZXdUYXNrKTtcclxuICByZXR1cm4gbXlUYXNrcztcclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlVGFzayhpbmRleCkge1xyXG4gIG15VGFza3Muc3BsaWNlKGluZGV4LCAxKTtcclxuICByZXR1cm4gbXlUYXNrcztcclxufVxyXG5cclxuZXhwb3J0IHsgYWRkVGFzaywgcmVtb3ZlVGFzaywgbXlUYXNrcyB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGFkZFRhc2ssIHJlbW92ZVRhc2sgfSBmcm9tICcuL3Rhc2tzLmpzJztcclxuaW1wb3J0IHsgcmVuZGVyLCByZW5kZXJUb2RheVRhc2tzLCByZW5kZXJUaGlzV2Vla1Rhc2tzIH0gZnJvbSAnLi9kb20uanMnO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xyXG4gICAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzay1idXR0b24nKTtcclxuICAgIGNvbnN0IGZvcm1EaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS1kaWFsb2cnKTtcclxuICAgIGNvbnN0IGFsbFRhc2tzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FsbC10YXNrcy1idXR0b24nKTtcclxuICAgIGNvbnN0IHRvZGF5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZGF5LWJ1dHRvbicpO1xyXG4gICAgY29uc3QgdGhpc1dlZWtCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGhpcy13ZWVrLWJ1dHRvbicpO1xyXG5cclxuICAgIHRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkYXRlJykudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHktc2VsZWN0JykudmFsdWU7XHJcbiAgICAgICAgYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5KTtcclxuICAgICAgICByZW5kZXIoKTtcclxuICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xyXG4gICAgICAgIGZvcm1EaWFsb2cuY2xvc2UoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgZm9ybURpYWxvZy5zaG93TW9kYWwoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZvcm1EaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRpYWxvZ0RpbWVuc2lvbnMgPSBmb3JtRGlhbG9nLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgZS5jbGllbnRYIDwgZGlhbG9nRGltZW5zaW9ucy5sZWZ0IHx8XHJcbiAgICAgICAgICAgIGUuY2xpZW50WCA+IGRpYWxvZ0RpbWVuc2lvbnMucmlnaHQgfHxcclxuICAgICAgICAgICAgZS5jbGllbnRZIDwgZGlhbG9nRGltZW5zaW9ucy50b3AgfHxcclxuICAgICAgICAgICAgZS5jbGllbnRZID4gZGlhbG9nRGltZW5zaW9ucy5ib3R0b21cclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgZm9ybURpYWxvZy5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGFsbFRhc2tzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVuZGVyKTtcclxuICAgIHRvZGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVuZGVyVG9kYXlUYXNrcyk7XHJcbiAgICB0aGlzV2Vla0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbmRlclRoaXNXZWVrVGFza3MpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT0gJ3JlbW92ZS1idXR0b24nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XHJcbiAgICAgICAgICAgIHJlbW92ZVRhc2soaW5kZXgpO1xyXG4gICAgICAgICAgICByZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZW5kZXIoKTsgLy8gSW5pdGlhbCByZW5kZXJcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==