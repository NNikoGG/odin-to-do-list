import { addTask, removeTask, updateTask, myTasks } from './tasks.js';
import { render, renderTodayTasks, renderThisWeekTasks, renderTasksByProject, renderProjects } from './dom.js';
import { addProject, myProjects, updateProject, Project } from './projects.js';

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
        const defaultProject = new Project("Default");
        myProjects.push(defaultProject);
        
        taskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.querySelector('#title').value;
            const description = document.querySelector('#description').value;
            const date = document.querySelector('#date').value;
            const priority = document.querySelector('#priority-select').value;
            const projectTitle = document.querySelector('#project-select').value;
          
            if (taskForm.dataset.editingIndex !== undefined) {
              const taskIndex = taskForm.dataset.editingIndex;
              updateTask(projectTitle, taskIndex, title, description, date, priority, newProjectTitle);
              delete taskForm.dataset.editingIndex; // Clear the editing index
            } else {
              addTask(title, description, date, priority, projectTitle);
            }
          
            renderTasksByProject(projectTitle);
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
          
            updateTask(projectTitle, taskIndex, title, description, date, priority, newProjectTitle);
            renderTasksByProject(newProjectTitle); // Or render all tasks if needed
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
                updateProject(projectIndex, projectTitle);
                delete projectForm.dataset.editingIndex; // Clear the editing index
            } else {
                addProject(projectTitle);
            }
        
            renderProjects(myProjects);
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
    
        allTasksButton.addEventListener('click', () => render(myTasks, formDialog, taskForm));
        todayButton.addEventListener('click', () => renderTodayTasks(myTasks, formDialog, taskForm));
        thisWeekButton.addEventListener('click', () => renderThisWeekTasks(myTasks, formDialog, taskForm));
    
        document.addEventListener('click', function(event) {
            if (event.target && event.target.id.startsWith('remove-button-')) {
              const projectTitle = event.target.closest('.task').dataset.projectTitle;
              const taskIndex = event.target.dataset.index;
              const updatedTasks = removeTask(projectTitle, taskIndex);
              render(updatedTasks, formDialog, taskForm); // Re-render with the updated tasks array
            }
          });
          
        
        completedTasksButton.addEventListener('click', () => {
            const completedTasks = myTasks.filter(task => task.completed);
            render(completedTasks, formDialog, taskForm);
        });
        
        addProjectButton.addEventListener('click', () => {
            
        })

        render(myTasks, formDialog, taskForm, editTaskForm, editTaskDialog);// Initial render
        renderProjects(myProjects);
    });
}

export default events;
