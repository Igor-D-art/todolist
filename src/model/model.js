import { view } from "../view/view";

export const model = (function(){

    const taskList = [];
    const tasksComplete = [];
    const date = new Date;
 
    class CustomProject {
        constructor (name){
            this.name = name;
        }
        getTasks() {
            // let tasks = taskList.filter(task => task.project === this.name);
            // view.displayTasks(tasks);

            const targetIndexes = [];
            let index = task => task.project === this.name;
            let indexes = ()=>{
                for (let i=0; i<taskList.length; i++){
                targetIndexes.push(taskList.findIndex(index));
               };
            };

            indexes();

            console.log(targetIndexes);

        };
    };

    class DateProject extends CustomProject {
        constructor(name, dateRange) {
            super(name);
            this.dataRange = dateRange;
        }
        getTasks () {
            // method that filters tasks if tasks' duedates matche the project's dateRange 
            alert("to be implemented")
        }
    };

    class InboxProject extends CustomProject {
        getTasks () {
            view.displayTasks(taskList);
        };
    };

    const inbox = new InboxProject('Inbox');
    const today = new DateProject('Today');
    const thisWeek = new DateProject('This week');
   

    // home for all of the projects
    const projects = [inbox, today, thisWeek];

    class Task {
        constructor(title, description, priority, dueDate, project) {
            this.title = title,
            this.description = description;
            this.priority = priority;
            this.dueDate = dueDate;
            this.project = project; 
            this.isComplete = false;
        }
        setComplete(id){
            if(!this.isComplete){
                this.isComplete=true;
                view.setComplete(id);
            } else {
                this.isComplete=false;
                tasksComplete.splice(id, 1);
                view.setComplete(id);
            }
        };
        removeSelf(id){
           taskList.splice(id, 1);
           view.displayTasks(taskList);
        };
        editDetails(id){
            view.editTaskModal(taskList[id], id);
        };
        updateDetails(titleUpd, descriptionUpd, priorityUpd, dueDateUpd, projectUpd){
            this.title = titleUpd;
            this.description = descriptionUpd;
            this.priority = priorityUpd;
            this.dueDate = dueDateUpd;
            this.project = projectUpd;
            view.displayTasks(taskList);
        };

    };

    const createProject = function(name){
        const project = new CustomProject (name);
        projects.push(project);
        view.displayProjects(projects);
    };

    const createTask = function(...args){
        const task = new Task (...args);
        taskList.push(task);
        view.displayTasks(taskList);
    };

    const updateTaskList = ()=>{
        view.displayTasks(taskList);
    };

    const updateProjectList = ()=>{
        view.displayProjects(projects);
    };

    return {inbox, today, thisWeek, projects, taskList, tasksComplete, createTask, createProject, updateTaskList, updateProjectList}

})();