import { model } from "../model/model";
import { view } from "../view/view";

export const controller = (function(){

    const addTask = (...theArgs)=>{
        model.createTask(...theArgs);
    }; 

    const removeTask = (id)=>{
        model.taskList[id].removeSelf(id);
    };

   const editDetails = (id)=>{
    model.taskList[id].editDetails(id);
   };

   const updateTaskList = ()=>{
     model.updateTaskList();
   };

   const editTask = (id, title, description, priority, dueDate, project)=>{
        model.taskList[id].updateDetails(title, description, priority, dueDate, project);
   };

   const completeTask = (id)=>{
    model.taskList[id].setComplete(id);
   };

   const updateProjectList = ()=>{
    model.updateProjectList();
  };

   const addProject = (name)=>{
       if (name==""){
         return
       } else {
        model.createProject(name);
       };
   };

   const getTasks = (id)=>{
       model.projects[id].getTasks();
   }

   return {addTask, removeTask, editDetails, updateTaskList, editTask, completeTask, addProject, updateProjectList, getTasks}

})();