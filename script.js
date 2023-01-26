let addBtn = document.getElementById("add-task-btn");
let addInput = document.getElementById("add-task-input");
let taskesList = document.getElementById("tasks-list");
let deleteBtn = document.querySelector(".delete");
let deleteAllBtn = document.querySelector(".delete-all");
let allTasksArray = [];



if(localStorage.getItem("allTasks")){
    allTasksArray = JSON.parse(localStorage.getItem("allTasks"));
    addAlltasksToPage(allTasksArray);
}
// delete all tasks : 
deleteAllBtn.onclick = function (){
    allTasksArray = [];
    addToLocalStorage(allTasksArray);
    addAlltasksToPage(allTasksArray);
    console.log("clickkkkkkkkkkkk")

}

// delet task : 
taskesList.addEventListener("click",(e) => {
    console.log("click")
    if(e.target.parentElement.classList.contains("delete")){
        let taskParent = e.target.parentElement.parentElement.parentElement;
        taskParent.remove();
        console.log("click2")
        deleteTask (taskParent.getAttribute("data-id"));

    }else if (e.target.classList.contains("task-content")){
        togleCopletedStatus(e.target.parentElement.getAttribute("data-id"));
        e.target.classList.toggle("completed");
        console.log(allTasksArray)
    }else if(e.target.classList.contains("edit")){

    }
});

//  function of deleting the task from the localstorage : 
function deleteTask (taskId) {
    console.log(allTasksArray);
    allTasksArray = allTasksArray.filter((task)=> task.id != taskId);
    addToLocalStorage(allTasksArray);
    console.log(allTasksArray);

}
// fun to to change status of a task :
function togleCopletedStatus(id) {
    allTasksArray.forEach(element => {
        if(element.id == id){
            element.completed?
            (element.completed=false)
            :(element.completed=true);
        }
    });
    addToLocalStorage(allTasksArray);
}
// add a task : 
addBtn.onclick = function() {
    if(addInput.value.trim() ===""){
    }else {
        addTask(addInput.value);
        addInput.value = ""
        
    }
}

function addTask(taskValue){
    const task = {
        id : Date.now(),
        value: taskValue,
        completed: false
    };

    allTasksArray.push(task);
    addToLocalStorage(allTasksArray);
    addAlltasksToPage(allTasksArray);
}

function addAlltasksToPage (tasksArray) {
    taskesList.innerHTML="";
    tasksArray.forEach(element => {
        taskesList.innerHTML+= `
        <div class="task" data-id="${element.id}">
        <input type="text" class=" ${element.completed?'task-content completed':'task-content'}" title="task" readonly value="${element.value}">                   
        <div class="actions">
            <div class="edit"><i class="fa-solid fa-pencil"></i></div>
            <div class="delete"><i class="fa-solid fa-trash-can"></i></div>
        </div>
        </div>
        `
    });
}

function addToLocalStorage(tasksArray){
    localStorage.setItem("allTasks",JSON.stringify(tasksArray));
}