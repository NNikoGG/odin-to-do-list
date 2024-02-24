import { myProjects } from "./projects";

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
  let project = myProjects.find(p => p.title === projectTitle);
  if (!project) {
    console.error('Project not found:', projectTitle);
    return;
  }
  const newTask = new Task(title, description, date, priority, project);
  project.addTask(newTask);
}


function removeTask(projectTitle, taskIndex) {
  const project = myProjects.find(p => p.title === projectTitle);
  if (!project) {
    console.error('Project not found:', projectTitle);
    return;
  }
  project.tasks.splice(taskIndex, 1);
  return project.tasks; // Return the updated tasks array
}


function updateTask(projectTitle, taskIndex, title, description, date, priority) {
  const project = myProjects.find(p => p.title === projectTitle);
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
  const project = myProjects.find(p => p.title === projectTitle);
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

export { addTask, removeTask, updateTask, toggleTaskCompletion, myTasks };

