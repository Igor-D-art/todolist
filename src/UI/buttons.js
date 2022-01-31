// import css from "./taskBtn.css";

export const buttons =(function(){

    const buttonSection = document.createElement('div');
    buttonSection.classList.add("buttonSection");
    const projectSection = document.querySelector('.projectSection');
    

    const addTaskBtn = (text)=>{
        // creating an add task button element
        const taskBtn = document.createElement('button');
        taskBtn.classList.add('.addTask')
        taskBtn.innerHTML = text;
        
        // adding task button with to the nav section
        const projectSection = document.querySelector('.projectSection');
        projectSection.appendChild(taskBtn);

        taskBtn.addEventListener('click', ()=>{
            alert('This button works and ready to be setup')
        });
    };

    const addProjectBtn = (text)=>{

        // creating an add project button element
        const projectBtn = document.createElement('button');
        projectBtn.classList.add('.addProject')
        projectBtn.innerHTML = text;
        
        // adding task button with to the nav section
        const projectSection = document.querySelector('.projectSection');
        projectSection.appendChild(projectBtn);

        projectBtn.addEventListener('click', ()=>{
            alert('This button works and ready to be setup')
        });
    };


    return {addTaskBtn, addProjectBtn};
})();