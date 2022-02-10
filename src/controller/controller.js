import { parseISO } from "date-fns";
import { model } from "../model/model";
import { view } from "../view/view";

export const controller = (function(){

    const addTask = (title, description, priority, date, projectID)=>{
         model.projects[projectID].createTask(title, description, priority, date);
    }; 

    const removeTask = (projectID, taskID)=>{
        model.projects[projectID].removeTask(taskID);
    };

   const editDetails = (projectID, taskID)=>{
     model.projects[projectID].tasks[taskID].editDetails(projectID, taskID);
   };

   const editTask = (projectID, taskID, title, description, priority, dueDate)=>{
        model.projects[projectID].tasks[taskID].updateDetails(title, description, priority, dueDate);
   };

   const completeTask = (projectID, taskID)=>{
    model.projects[projectID].tasks[taskID].setComplete(projectID, taskID);
   };

   const addProject = (name)=>{
       if (name==""){
           return
       } else {
        model.createProject(name);
       };
   };

   const getTasks = (id)=>{
       console.log('Im in get tasks with project index ' + id);
       if(model.projects[id]==undefined){
        model.projects[0].getTasks(id);
       } else {
        model.projects[id].getTasks(id);
       };   
   };

   const removeProject = (projectID)=>{
        model.removeProject(projectID);
   };

   return {addTask, 
            removeProject,
            removeTask, 
            editDetails, 
            editTask, 
            completeTask, 
            addProject, 
            getTasks}

})();