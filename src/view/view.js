import { controller } from "../controller/controller";
import { model } from "../model/model";

export const view = (function(){

    
    // defining the active project view 
    let activeProject = 0;

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
            if(i<=2){
                project.innerHTML = `
                <div id="p${i}" class="projName"> ${projects[i].name} </div>`;
                project.classList.add('projects');
                project.setAttribute('id', `pr${i}`);
                projectList.appendChild(project); 
                activateProject(`pr${0}`);

                // const projectName = document.getElementById(`p${i}`);
                project.addEventListener('click', ()=>{
                    controller.getTasks(i);
                    activateProject(`pr${i}`);
                    // setting up an active project view
                    activeProject = i;
                });

            } else {
                project.innerHTML = `
                <div id="p${i}" class="projName"> ${projects[i].name} </div>
                <div id="d${i}"> X </div>`
                project.classList.add('projects');
                project.setAttribute('id', `pr${i}`);
                projectList.appendChild(project); 

                // const projectName = document.getElementById(`p${i}`);
                project.addEventListener('click', ()=>{
                    controller.getTasks(i);
                    activateProject(`pr${i}`);
                    // setting up an active project view
                    activeProject = i;
                });
    
                const projDelBtn = document.getElementById(`d${i}`);
                projDelBtn.addEventListener('click', ()=>{
                    controller.removeProject(i);
                    controller.getTasks(0);
                });
            };
        };
    };

    const activateProject = (projectID)=>{
        console.log(projectID);
        document.querySelectorAll(`.projects`).forEach(project => project.classList.remove('activeProject'));
        console.log(document.getElementById(projectID));
        document.getElementById(projectID).classList.add('activeProject');
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

    const displayTasks = (projectID, projectTasks) =>{
        // creation of task list div 
        const taskList = document.querySelector(".taskList");
        // population of task list with task cards
        const addTaskItems = function(){
            for(let i=0; i<projectTasks.length; i++){
                let taskCard = document.createElement('div');
                taskCard.classList.add('tasks');

                if(projectTasks[i].priority === 'high'){
                    taskCard.classList.add('high');
                } else if (projectTasks[i].priority === 'medium'){
                    taskCard.classList.add('medium');
                } else {
                    taskCard.classList.add('low');
                };

                taskCard.setAttribute(`data-key`, `${projectID + "" + i}`);
                
                taskCard.innerHTML = `
                    <div class="taskDetails">
                        <input id="C${projectID + "" + i}" type="checkbox">
                        <div class="titleDiv">${projectTasks[i].title}</div>
                    </div>
                    
                    <div class="taskControls">
                        <div id="E${projectID + "" + i}" class="taskEdit">Edit</div>
                        <div id="R${projectID + "" + i}" class="taskRemove">X</div>
                    </div>
                `;

                taskList.appendChild(taskCard);

                if(projectTasks[i].isComplete){
                    taskCard.classList.add('completed');
                    document.getElementById(`C${projectID + "" + i}`).checked=true;
                };

                // adding event listeners to task details and controls
                const completeTask = document.getElementById(`C${projectID + "" + i}`);
                completeTask.addEventListener('click', ()=>{
                    controller.completeTask(projectID, i);
                });

                const taskEdit = document.getElementById(`E${projectID + "" + i}`);
                taskEdit.addEventListener('click', ()=>{
                    taskListOverlay();
                    controller.editDetails(projectID, i);
                });

                const taskRemove = document.getElementById(`R${projectID + "" + i}`);
                taskRemove.addEventListener('click', ()=>{
                    controller.removeTask(projectID, i);
                    controller.getTasks(activeProject);
                });
            };  
            
        };
        // adding list items
        addTaskItems();
    };

    const _clearTaskList= ()=>{
        const taskList = document.querySelector('.taskList');
        taskList.textContent = '';
    };

   // adding event listener to create task button
   const taskBtn = document.querySelector(".addTask");
   taskBtn.addEventListener('click', ()=>{
        taskListOverlay();
        displayTaskModal(); 
        taskBtn.disabled = true;
    });

    // adding event listener to create project button
    const projectBtn = document.querySelector(".addProject");
    projectBtn.addEventListener('click', ()=>{
        taskListOverlay();
        displayProjectModal();
        projectBtn.disabled = true;
    });
    
    const displayTaskModal = ()=>{
        // selection of the taskSection where we will put the task creation modal
        const taskList = document.querySelector('.taskList');
        // creation of the task modal itself
        const taskModal = document.createElement('div');
        taskModal.classList.add('taskModal');
        taskModal.innerHTML = `
            <div> Title </div>
            <input id="title" type="text" placeholder="Title"></input>
            <div> Description </div>
            <textarea id="description" type="text" placeholder="Description"></textarea>
            <div> Priority </div>
            <select id="priority" name="priority"></select>
            <div> Due date </div>
            <input id="duedate" type="date" placeholder="Due date"></input>
            <div> Project </div>
            <select id="project" name="project"></select>
            <button id="submitTask">OK</button>
            <button id="cancelTask">Cancel</button>
        `;
        taskList.appendChild(taskModal);
    
        const title = document.querySelector('#title');
        const description = document.querySelector('#description');
        const duedate = document.querySelector('#duedate');
        const priority = document.querySelector('select[name="priority"]');
        const project = document.querySelector('select[name="project"]');
        // limiting priority options to 3 (high, medium, low)
        const prioOptions = ['high', 'medium', 'low'];

        for(let i = 0; i < prioOptions.length; i++) {
            let opt = prioOptions[i];
            let el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            priority.appendChild(el);
        };

        // limiting options in the project dropdown to only porojects that have indexes larger than 2
        const projectOptions = ['occupied','occupied','occupied'];
        for(let i = 3; i < model.projects.length; i++) {
            let opt = model.projects[i].name;
            let el = document.createElement("option");
            projectOptions.push(opt);
            el.textContent = opt;
            el.value = opt;
            project.appendChild(el);
        };

        // submit task button code
        const submitTaskBtn = document.querySelector('#submitTask');
        submitTaskBtn.addEventListener('click', ()=>{
                controller.addTask(title.value, 
                                    description.value, 
                                    priority.value, 
                                    duedate.value, 
                                    projectOptions.indexOf(project.value));
                controller.getTasks(activeProject);
                taskBtn.disabled = false;
                                });

        const cancelTaskBtn = document.querySelector('#cancelTask');
        cancelTaskBtn.addEventListener('click', ()=>{
            controller.getTasks(activeProject);
            taskBtn.disabled = false;
        });               
    };

    const editTaskModal = (task, projectID, taskID)=>{
        // selection of the taskSection where we will put the edit task modal
        const taskList = document.querySelector('.taskList');
        // creation of the edit modal itself
        const editModal = document.createElement('div');
        editModal.classList.add('editModal');
       
        editModal.innerHTML = `
        <div> Title </div>
        <input id="title" type="text" value="${task.title}"></input>
        <div> Description </div>
        <textarea id="description" type="text">${task.description}</textarea>
        <div> Priority </div>
        <select id="priority" name="priority" value="${task.priority}"></select>
        <div> Due date </div>
        <input id="duedate" type="date" value="${task.dueDate}"></input>
        <button id="editTask">OK</button>
        <button id="cancelEdit">Cancel</button>
      `;
      taskList.appendChild(editModal);

      const prioOptions = ['high', 'medium', 'low'];
      const priority = document.querySelector('select[name="priority"]');
        for(let i = 0; i < prioOptions.length; i++) {
            var opt = prioOptions[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            if(el.value == task.priority){
                el.setAttribute('selected','selected');
            }
            priority.appendChild(el);
        };

      const editTaskBtn = document.querySelector('#editTask');
      editTaskBtn.addEventListener('click', ()=>{
            controller.editTask(projectID,
                                taskID,
                                title.value, 
                                description.value, 
                                priority.value, 
                                duedate.value,
                                );
            controller.getTasks(activeProject);
                            });

      const cancelEditBtn = document.querySelector('#cancelEdit');
      cancelEditBtn.addEventListener('click', ()=>{
      controller.getTasks(activeProject);
      });             
    };

    const setComplete = (projectID, taskID)=>{
       const toComplete = document.querySelector(`div[data-key="${projectID + "" + taskID}"]`);
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
            controller.getTasks(activeProject);
            projectBtn.disabled = false;
        });

        const cancelProjectBtn = document.querySelector('#cancelProject');
        cancelProjectBtn.addEventListener('click', ()=>{
            displayProjects(model.projects);
            controller.getTasks(activeProject);
            projectBtn.disabled = false;
        });   
    };



    return {displayProjects, 
            displayTasks, 
            displayTaskModal,
            editTaskModal,
            setComplete,
            _clearTaskList,
            };

})();
