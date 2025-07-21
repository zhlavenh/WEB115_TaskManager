
let taskArray = [];

// Get form information upon submit
document.getElementById("taskForm").addEventListener("submit", function(e){
    e.preventDefault();
    let form = document.forms[0];
    let taskValue = form.taskText.value;
    let taskPriority = form.taskPriority.value;
    let importance = form.importance.checked;
    let dateAdded = new Date().toDateString();

    let taskObj = {id: "", name: taskValue, priority: taskPriority, isImportant: importance, isCompleted: false, date: dateAdded};
    addItem(taskObj);
    updateList();
});

// Add item to list
function addItem(taskObj){
    taskArray.push(taskObj);
    for (let i=0; i<taskArray.length; i++){
        taskArray[i].id = i;
    }
}


// Display list under taskManager
function updateList(){
    document.getElementById("taskTable").innerHTML = "<thead><tr><th>Task Title</th><th>Date Added</th><th>Priority Level</th><th>Mark Completed</th></tr></thead>";
    if (taskArray.length == 0){document.getElementById("taskTable").innerHTML += "<tr>No task!</tr>"}
    else{
        for (i=0; i<taskArray.length; i++){
            document.getElementById("taskTable").innerHTML += ('<tr class="task' + taskArray[i].id + '"><td>' + taskArray[i].name + '</td><td>' + taskArray[i].date + '</td><td>' + taskArray[i].priority + '</td><td><input type="checkbox" class="completedTask" name="' + taskArray[i].id + '"></td><td><button type="button" class="deleteTask" name="' + taskArray[i].id + '">Delete</button></td></tr>');
            if (taskArray[i].isImportant){document.querySelector(".task" + i).setAttribute("style", "color: red;");}
        }
    }

    
    let deleteButtons = document.querySelectorAll(".deleteTask");
    let completedTask = document.querySelectorAll(".completedTask");
    deleteButtons.forEach(deleteButtons => {deleteButtons.addEventListener("click", removeTask)});
    completedTask.forEach(completedTask => {completedTask.addEventListener("change", strikeTasks)});

    console.log(JSON.stringify(taskArray));
}

// Remove from list
function removeTask(e){
    if (taskArray.length > 1){taskArray.splice(e.target.name,1);}
    else{taskArray = [];}
    updateList();
}

// Highlight important task in red


// Strike through completed tasks
function strikeTasks(e){
    let currentTask = taskArray[e.target.name];
    if (e.target.checked){
        currentTask.isCompleted = true;
        if (taskArray[currentTask.id].isImportant){document.querySelector(".task" + currentTask.id).setAttribute("style", "color: red; text-decoration: line-through;");}
        else{document.querySelector(".task" + currentTask.id).setAttribute("style", "text-decoration: line-through;");}
    }
    else {
        currentTask.isCompleted = false;
        if (taskArray[currentTask.id].isImportant){document.querySelector(".task" + currentTask.id).setAttribute("style", "color: red; text-decoration: ;");}
        else{
        document.querySelector(".task" + currentTask.id).setAttribute("style", "text-decoration: ;");}
        
    }
}


