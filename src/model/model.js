import { view } from "../view/view";

export const model = (function(){

    const customProjects = [];
    const taskList = [];
    const tasksComplete = [];
    const date = new Date;
 

    class CustomProject {
        constructor (name){
            this.name = name;
        }

        getTasks() {
            let tasks = taskList.filter(task => task.project === this.name);
            return tasks;
        }

        displayTasks
    };

    class DateProject extends CustomProject {
        constructor(name, dateRange) {
            super(name);
            this.dataRange = dateRange;
        }

        getTasks () {
            // method that filters tasks if tasks' duedates matche the project's dateRange 
        }
    };

    class InboxProject extends CustomProject {
        getTasks () {
            return taskList;
        };
    };

    class Task {
        constructor(title, description, priority, dueDate, project) {
            this.title = title,
            this.description = description;
            this.priority = priority;
            this.dueDate = dueDate;
            this.project = project; 
            this.isComplete = false;
        }
        
        setComplete(){
            if(!this.isComplete){
                this.isComplete=true;
            };
        };

    };

    const createProject = function(name){
        const project = new CustomProject (name);
        customProjects.push(project);
        view.displayProjects(customProjects);
    }

    const createTask = function(title, description, priority, dueDate, project){

        const task = new Task (title, description, priority, dueDate, project);

        taskList.push(task);

        view.displayTasks(taskList);
    }




    const inbox = new InboxProject('Inbox');

    const today = new DateProject('Today');

    const thisWeek = new DateProject('This week');

    const ahaha = new CustomProject('Ahaha');

    

    return {inbox, today, thisWeek, customProjects, taskList, tasksComplete, ahaha, createTask, createProject}

})();