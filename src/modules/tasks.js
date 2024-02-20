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

export { addTask, removeTask, myTasks };
