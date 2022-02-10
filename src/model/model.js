import { isThisWeek, isToday, parseISO } from "date-fns";
import { controller } from "../controller/controller";
import { view } from "../view/view";

export const model = (function () {
  class Project {
    constructor(name) {
      this.name = name;
      this.tasks = [];
    }
    getTasks(id) {
      if (id == 0) {
        view._clearTaskList();
        for (let i = 0; i < projects.length; i++) {
          view.displayTasks(i, projects[i].tasks);
        }
      } else if (id == 1) {
        view._clearTaskList();
        for (let i = 0; i < projects.length; i++) {
          for (let j = 0; j < projects[i].tasks.length; j++) {
            if (isToday(parseISO(projects[i].tasks[j].dueDate))) {
              view.displayTasks(i, [projects[i].tasks[j]]);
            }
          }
        }
      } else if (id == 2) {
        view._clearTaskList();
        for (let i = 0; i < projects.length; i++) {
          for (let j = 0; j < projects[i].tasks.length; j++) {
            if (isThisWeek(parseISO(projects[i].tasks[j].dueDate))) {
              view.displayTasks(i, [projects[i].tasks[j]]);
            }
          }
        }
      } else {
        view._clearTaskList();
        view.displayTasks(id, this.tasks);
      }
    }
    removeTask(taskID) {
      this.tasks.splice(taskID, 1);
      _saveToLocal(projects);
    }

    createTask(...args) {
      const task = new Task(...args);
      this.tasks.push(task);
      _saveToLocal(projects);
    }

    alert() {
      alert("It works! The method is on prototype!");
    }
  }

  // home for all of the projects
  const projects = [
    new Project("Inbox"),
    new Project("Today"),
    new Project("This week"),
  ];

  class Task {
    constructor(title, description, priority, dueDate) {
      (this.title = title), (this.description = description);
      this.priority = priority;
      this.dueDate = dueDate;
      this.isComplete = false;
    }
    setComplete(projectID, taskID) {
      if (!this.isComplete) {
        this.isComplete = true;
        _saveToLocal(projects);
        view.setComplete(projectID, taskID);
      } else {
        this.isComplete = false;
        _saveToLocal(projects);
        view.setComplete(projectID, taskID);
      }
    }
    editDetails(projectID, taskID) {
      view.editTaskModal(projects[projectID].tasks[taskID], projectID, taskID);
    }
    updateDetails(titleUpd, descriptionUpd, priorityUpd, dueDateUpd) {
      this.title = titleUpd;
      this.description = descriptionUpd;
      this.priority = priorityUpd;
      this.dueDate = dueDateUpd;
      _saveToLocal(projects);
    }
  }

  const createProject = function (name) {
    const project = new Project(name);
    projects.push(project);
    _saveToLocal(projects);
    view.displayProjects(projects);
  };

  const removeProject = (projectID) => {
    projects.splice(projectID, 1);
    _saveToLocal(projects);
    view.displayProjects(projects);
  };

  const _saveToLocal = (projectsData) => {
    localStorage.setItem("projects", JSON.stringify(projectsData));
  };

  const retrieveData = () => {
    const projectsData = JSON.parse(localStorage.getItem("projects"));
    for (let i = 0; i < projectsData.length; i++) {
      projects[i] = Object.assign(new Project(), projectsData[i]);
      for (let j = 0; j < projectsData[i].tasks.length; j++) {
        projects[i].tasks[j] = Object.assign(
          new Task(),
          projectsData[i].tasks[j]
        );
      }
    }

    console.table(model.projects);
    view.displayProjects(model.projects);
    controller.getTasks(0);
  };

  return { projects, createProject, removeProject, retrieveData };
})();
