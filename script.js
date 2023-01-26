let addBtn = document.getElementById("add-task-btn");
let addInput = document.getElementById("add-task-input");
let taskesList = document.getElementById("tasks-list");
let deleteBtn = document.querySelector(".delete");
let deleteAllBtn = document.querySelector(".delete-all");
let allTasksArray = [];
let contentttttttt = document.querySelector(".content") ;
let checkbox = document.querySelector(".checkbox-input") ;
// localStorage.clear();

contentttttttt.addEventListener("click", (e)=>{
})

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

    }else if (e.target.classList.contains("task-content") || e.target.classList.contains("checkbox") ){
        togleCopletedStatus(e.target.parentElement.parentElement.getAttribute("data-id"));
    }else if(e.target.classList.contains("edit")){

    }
    addAlltasksToPage (allTasksArray);
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
addBtn.addEventListener("click", (event)=>{
    if(addInput.value.trim() ===""){
    }else {
        addTask(addInput.value);
        addInput.value = ""
        
    }
    event.preventDefault();
})

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
                    <div class="${element.completed?'content done':'content'}">
                    <input type="checkbox" class="checkbox-input" ${element.completed?"checked":""}>
                    <div class="checkbox"></div>
                    <input type="text" class="task-content" title="task" readonly value="${element.value}">                   
                    </div>
                    <div class="actions">
                        <div class="edit"><i class="fa-solid fa-pencil"></i></div>
                        <div class="delete"><i class="fa-solid fa-trash-can"></i></div>
                    </div>
                </div>`
        
        // `
        // <div class="task" data-id="${element.id}">
        // <input type="text" class=" ${element.completed?'task-content completed':'task-content'}" title="task" readonly value="${element.value}">                   
        // <div class="actions">
        //     <div class="edit"><i class="fa-solid fa-pencil"></i></div>
        //     <div class="delete"><i class="fa-solid fa-trash-can"></i></div>
        // </div>
        // </div>
        // `
    });
}

function addToLocalStorage(tasksArray){
    localStorage.setItem("allTasks",JSON.stringify(tasksArray));
}
