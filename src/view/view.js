export const view = (function(){

    const displayTasks = (tasks) =>{
        const taskList = document.createElement('div');
        const addTaskItems = function(){
             for(let i=0; i<tasks.length; i++){
                let task = document.createElement('div');
                let taskTitle = tasks[i].title; 
                task.innerText = taskTitle;
                task.classList.add(`tasks`);
                task.setAttribute('id', `${i}`);
                taskList.appendChild(task);
               };  
        };
        // clearing the taskSection
        _clearTaskSection();    
        // adding list items to the unordered list
        addTaskItems();
        // adding the unordered list to the todo section and nav section to the body section before the content block
        const taskSection = document.querySelector('.taskSection');
        taskSection.appendChild(taskList);
    };

    const displayProjects = function (projects){
        const projectList = document.createElement('div');
        const addProjectItems = function (){
            for(let i=0; i<projects.length; i++){
                let project = document.createElement('div');
                let projectName = projects[i].name; 
                project.innerText = projectName;
                project.classList.add(`projects`);
                project.setAttribute('id', `p${i}`);
                projectList.appendChild(project);
            };
        };
        clearProjectSection();
        addProjectItems();
        const projectSection = document.querySelector('.projectSection');
        projectSection.appendChild(projectList);
    };

    const _clearTaskSection = ()=>{
        const taskSection = document.querySelector('.taskSection');
        taskSection.textContent = '';
    };

    const clearProjectSection = () =>{
        const projectSection = document.querySelector('.projectSection');
        projectSection.textContent = '';
    };

    return {displayProjects, displayTasks};

})();