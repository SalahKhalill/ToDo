let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let tasksDiv = document.querySelector(".tasks")



 
// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if There is Tasks In local Storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}


// Trigger Get Data From Local Storage Function
getDateFromLocalStorage()


//Submit TASK
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); //Add Task To Array
        input.value = ""; //Empty The Input Field After we Click Submit 
    }
}
//Click On Task Element 
tasksDiv.addEventListener("click", (e) => {
    //Delete Button 
    if (e.target.classList.contains("del")) {
        //REmove ELement From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //REmove ELement From PAge
        e.target.parentElement.remove();
    }
    // done TAsk Element
    if(e.target.classList.contains("task")) {
        //Toggle Completed For The Task 
        toggleStatusTskWith(e.target.getAttribute("data-id"))
        //Toggle Done Class
        e.target.classList.toggle("done")
    }
});
function addTaskToArray(taskText) {
   //Task Data
   const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
   };
   //Push Task To Array Of Tasks 
   arrayOfTasks.push(task)
   //Add Tasks TO Page
   addElementsToPageFrom(arrayOfTasks);
      //Add Tasks TO Local Storage
      addDataToLocalStorageFrom(arrayOfTasks);
   
}
function addElementsToPageFrom(arrayOfTasks) {
    //Empty Tasks Div
    tasksDiv.innerHTML = "";
    //Looping On Array Of Tasks  
    arrayOfTasks.forEach(task => {
        //Create Main Div
        let div = document.createElement("div")
        div.className = "task";
        //Check If Task is Done
        if(task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create Delete Butto
        let span = document.createElement("span")
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"))
        // Append Button TO Main Div
        div.appendChild(span);
        // Append Task Div To Tasks container
        tasksDiv.appendChild(div);


    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}
function getDateFromLocalStorage () {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}
function deleteTaskWith(taskId) {
    //FOR EXPLAIN ONLY
    // for (let i = 0; i < arrayOfTasks.length; i++) {
        // console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  //  }

  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks)
}


function toggleStatusTskWith (taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == taskId) {
        arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true ) : (arrayOfTasks[i].completed = false)
      }
   }
   addDataToLocalStorageFrom(arrayOfTasks)
}

function deleteAll(){
    tasksDiv.innerHTML = '';
    window.localStorage.removeItem("tasks");
}
