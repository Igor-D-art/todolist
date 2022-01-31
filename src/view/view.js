export const view = (function(){

    const body = document.querySelector('body');

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

    const _clearProjectSection = () =>{
        const projectSection = document.querySelector('.projectSection');
        projectSection.textContent = '';
    };

    const addHeader = (text)=>{
        // creating a header element
        const header = document.createElement('header');
        header.innerHTML = text;
        // adding header with it's HTML content to the page
        body.appendChild(header);
    };

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
    };

    const addBtnSection = (label1, label2)=>{
        const buttonSection = document.createElement('div');
        buttonSection.classList.add("buttonSection");
        const projectSection = document.querySelector('.projectSection');
        projectSection.appendChild(buttonSection);

        const btnSection = document.querySelector('.buttonSection');

        // creating an add task button element
        const taskBtn = document.createElement('button');
        taskBtn.classList.add('.addTask')
        taskBtn.innerHTML = label1;
        // adding task button to the project section
        btnSection.appendChild(taskBtn);
        taskBtn.addEventListener('click', ()=>{
            alert('This button works and ready to be setup')
        });

        // creating an add project button element
        const projectBtn = document.createElement('button');
        projectBtn.classList.add('.addProject')
        projectBtn.innerHTML = label2;

        btnSection.appendChild(projectBtn);
        projectBtn.addEventListener('click', ()=>{
            alert('This button works and ready to be setup')
        });
    };
    
    const addFooter= (text)=>{
        // creating a footer element
        const footer = document.createElement('footer');
        footer.innerHTML = text;
        
        // adding header with it's HTML content to the page
        const body = document.querySelector('body');
        body.appendChild(footer);
    };

    const displayTaskModal = (text)=>{
        // creating a task creation popup
        


        
    };

    return {displayProjects, 
            displayTasks, 
            addHeader, 
            addProjecSection,
            addMain,
            addTaskSection, 
            addBtnSection, 
            addFooter,
            };

})();