import { controller } from "../controller/controller";
import { model } from "../model/model";

export const view = (function(){

    const body = document.querySelector('body');

    body.innerHTML = `
        <div class="header"> HEADER </div>
        <div class="main">
            <div class="navSection">
                <div class="projectSection">
                    <div class="projectList"></div>
                </div>
                <div class="buttonSection">
                    <button class="addTask">Add task</button>
                    <button class="addProject">Add project</button>
                </div>
            </div>

            <div class="taskSection">
                <div class="taskList"></div>
            </div>
        </div>
        <div class="footer"> FOOTER </div>
    `;

    const displayProjects = function(projects){
        _clearProjectList();
        const projectList = document.querySelector('.projectList');
        for (let i=0; i<projects.length; i++) {
            let project = document.createElement('div');
            project.classList.add('projects');
            project.setAttribute('id', `p${i}`);
            let projectName = projects[i].name;
            project.innerText = projectName;
            projectList.appendChild(project); 

            project.addEventListener('click', ()=>{
                controller.getTasks(i);
            });
        };
    };

   const _clearProjectList = () =>{
        const projectList = document.querySelector('.projectList');
        projectList.innerHTML = '';
    };

    const taskListOverlay = ()=>{
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        const taskList = document.querySelector(".taskList");
        taskList.appendChild(overlay);
    };

    const displayTasks = (tasks) =>{
        // creation of task list div 
        const taskList = document.querySelector(".taskList");
        // population of task list with task cards
        const addTaskItems = function(){
            for(let i=0; i<tasks.length; i++){
                let taskCard = document.createElement('div');
                taskCard.classList.add('tasks');
                taskCard.setAttribute(`data-key`, `${i}`);
                taskCard.innerHTML = `
                    <div class="taskDetails">
                        <input id="C${i}" type="checkbox">
                        <div class="titleDiv">${tasks[i].title}</div>
                    </div>
                    
                    <div class="taskControls">
                        <div id="E${i}" class="taskEdit">Edit</div>
                        <div id="R${i}" class="taskRemove">X</div>
                    </div>
                `;
                taskList.appendChild(taskCard);
               
                // adding event listeners to task details and controls
                const completeTask = document.getElementById(`C${i}`);
                completeTask.addEventListener('click', ()=>{
                    console.log(i);
                    controller.completeTask(i);
                });

                const taskEdit = document.getElementById(`E${i}`);
                taskEdit.addEventListener('click', ()=>{
                    taskListOverlay();
                    controller.editDetails(i);
                });

                const taskRemove = document.getElementById(`R${i}`);
                taskRemove.addEventListener('click', ()=>{
                    controller.removeTask(i)
                });
            };  
        };
        // clearing the taskSection
        _clearTaskList();    
        // adding list items to the unordered list
        addTaskItems();
    };

    const _clearTaskList= ()=>{
        const taskList = document.querySelector('.taskList');
        taskList.textContent = '';
    };

   // adding event listener to create task button
   const taskBtn = document.querySelector(".addTask");
   taskBtn.addEventListener('click', ()=>{
        controller.updateTaskList();
        displayTaskModal(); 
    });

    // adding event listener to create project button
    const projectBtn = document.querySelector(".addProject");
    projectBtn.addEventListener('click', ()=>{
        controller.updateProjectList();
        taskListOverlay();
        displayProjectModal();
    });
    
    const displayTaskModal = ()=>{
        // selection of the taskSection where we will put the task creation modal
        const taskList = document.querySelector('.taskList');
        // creation of the task modal itself
        const taskModal = document.createElement('div');
        taskModal.classList.add('taskModal');
        taskModal.innerHTML = `
            <input id="title" type="text" placeholder="Title"></input>
            <textarea id="description" type="text" placeholder="Description""></textarea>
            <input id="priority" type="text" placeholder="Priority"></input>
            <input id="duedate" type="date" placeholder="Due date"></input>
            <input id="project" type="text" placeholder="Project"></input>
            <button id="submitTask">OK</button>
            <button id="cancelTask">Cancel</button>
        `;
        taskList.appendChild(taskModal);
    
        const title = document.querySelector('#title');
        const description = document.querySelector('#description');
        const priority = document.querySelector('#priority');
        const duedate = document.querySelector('#duedate');
        const project = document.querySelector('#project');

        // submit task button code
        const submitTaskBtn = document.querySelector('#submitTask');
        submitTaskBtn.addEventListener('click', ()=>{
                controller.addTask(title.value, 
                                    description.value, 
                                    priority.value, 
                                    duedate.value, 
                                    project.value);
                                });

        const cancelTaskBtn = document.querySelector('#cancelTask');
        cancelTaskBtn.addEventListener('click', ()=>{
            controller.updateTaskList();
        });               
    };

    const editTaskModal = (task, id)=>{
        // selection of the taskSection where we will put the edit task modal
        const taskList = document.querySelector('.taskList');
        // creation of the edit modal itself
        const editModal = document.createElement('div');
        editModal.classList.add('editModal');
       
        editModal.innerHTML = `
        <input id="title" type="text" value="${task.title}"></input>
        <textarea id="description">${task.description}</textarea>
        <input id="priority" type="text" value="${task.priority}"></input>
        <input id="duedate" type="date" value="${task.dueDate}"></input>
        <input id="project" type="text" value="${task.project}"></input>
        <button id="editTask">OK</button>
        <button id="cancelEdit">Cancel</button>
      `;
      taskList.appendChild(editModal);
      console.log(title.value);
      const editTaskBtn = document.querySelector('#editTask');
      editTaskBtn.addEventListener('click', ()=>{
            controller.editTask(id, 
                                title.value, 
                                description.value, 
                                priority.value, 
                                duedate.value, 
                                project.value);
                            });

      const cancelEditBtn = document.querySelector('#cancelEdit');
      cancelEditBtn.addEventListener('click', ()=>{
        controller.updateTaskList();
      });             
    };

    const setComplete = (id)=>{
       const toComplete = document.querySelector(`div[data-key="${id}"]`);
       toComplete.classList.toggle('completed');
    };

    const displayProjectModal = ()=>{
        // selection of the taskSection where we will put the project creation modal
        const projectList = document.querySelector('.projectList');
        // creation of the project modal itself
        const projectModal = document.createElement('div');
        projectModal.classList.add('projectModal');
        projectModal.innerHTML = `
            <input id="title" type="text" placeholder="Title"></input>
            <button id="submitProject">OK</button>
            <button id="cancelProject">Cancel</button>
        `;
        projectList.appendChild(projectModal);
    
        const title = document.querySelector('#title');

        // submit task button code
        const submitProjectBtn = document.querySelector('#submitProject');
        submitProjectBtn.addEventListener('click', ()=>{
                controller.addProject(title.value);
        });

        const cancelProjectBtn = document.querySelector('#cancelProject');
        cancelProjectBtn.addEventListener('click', ()=>{
            controller.updateProjectList();
        });   
    };



    return {displayProjects, 
            displayTasks, 
            displayTaskModal,
            editTaskModal,
            setComplete,
            };

})();
