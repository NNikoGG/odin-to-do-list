import { addTask, removeTask } from './tasks.js';
import { render, renderTodayTasks, renderThisWeekTasks } from './dom.js';

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
        addTask(title, description, date, priority);
        render();
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

    allTasksButton.addEventListener('click', render);
    todayButton.addEventListener('click', renderTodayTasks);
    thisWeekButton.addEventListener('click', renderThisWeekTasks);

    document.addEventListener('click', function(event) {
        if (event.target && event.target.className == 'remove-button') {
            const index = event.target.dataset.index;
            removeTask(index);
            render();
        }
    });

    render(); // Initial render
});