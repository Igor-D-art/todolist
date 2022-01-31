import css from "./todo.css";

export const todo = (function(){
   
    const body = document.querySelector('body');

    // main section as a home for navigation and task window
    const addMain = ()=>{
        const mainSection = document.createElement('div');
        mainSection.classList.add('main');
        body.appendChild(mainSection);
   };
 
    const addProjecSection = function(){
        // creating project section
        const projectSection = document.createElement('div');
        projectSection.classList.add('projectSection');
        const main = document.querySelector('.main')
        main.appendChild(projectSection);
    };

    const addTaskSection = function(){
        const taskSection = document.createElement('div');
        taskSection.classList.add('taskSection');
        const main = document.querySelector('.main')
        main.appendChild(taskSection);
    }
 
    return {addProjecSection, addMain, addTaskSection};

})();
