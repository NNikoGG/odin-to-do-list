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

export { addProject, removeProject, updateProject, myProjects, Project};
  
  