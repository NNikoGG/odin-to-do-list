import { myProjects } from './projects.js';
import { myTasks } from './tasks.js';
import { Project } from './projects.js';
import { Task } from './tasks.js';

function saveToLocalStorage() {
  const data = {
      projects: myProjects.map(project => ({
          title: project.title,
          tasks: project.tasks.map(task => ({
              title: task.title,
              description: task.description,
              date: task.date,
              priority: task.priority,
              completed: task.completed
          }))
      }))
  };
  localStorage.setItem('todoData', JSON.stringify(data));
}

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('todoData'));
  if (data) {
      myProjects.length = 0; // Clear existing projects
      myProjects.push(...data.projects.map(projectData => {
          const project = new Project(projectData.title);
          project.tasks = projectData.tasks.map(taskData => {
              const task = new Task(taskData.title, taskData.description, taskData.date, taskData.priority, projectData.title);
              task.completed = taskData.completed;
              return task;
          });
          return project;
      }));
  }
}

export { saveToLocalStorage, loadFromLocalStorage };
