import css from "/src/index.css";
import { model } from "./model/model";
import { view } from "./view/view";
import { controller } from "./controller/controller";

// adding the main UI sections to the page

view.addHeader("Header");
view.addMain();
view.addProjecSection();
view.addTaskSection();
view.addBtnSection('Add project', 'Add task');
view.addFooter('Footer text');

// 

model.createTask('Task 1', 'Content 1', 'high', 'today', 'Inbox');
model.createTask('Task 2', 'Content 2', 'high', 'today', 'Inbox');
model.createTask('Task 3', 'Content 3', 'high', 'today', 'Ahaha');
model.createTask('Task 4', 'Content 4', 'high', 'today', 'Ahaha');
model.taskList[0].setComplete();
console.log(model.taskList[0].isComplete)
console.log(model.inbox.getTasks());


// model.createProject('Alloha');


console.log(model.ahaha.getTasks())
console.log(model.customProjects)









