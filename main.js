let input = document.getElementById("inputId");
const button = document.getElementById("buttonId");
const container = document.querySelector(".container");
const delButton = document.getElementById("delAll");
const checkBox = document.getElementById("checkAll");

let tasks=[];

function createNewTask() {
    if (input.value == ""){
        alert("Please, type something!");
    } else {
        let newTask = {
            text:input.value,
            check:false,
            id:Date.now()
        };
        tasks.push(newTask);

        console.log(tasks);
        input.value = "";
        input.focus();
        renderAllTasks();
    }
    
};

function renderAllTasks() {
    let listOfTasksHTML = ''
    tasks.forEach((task) => {
        let check = ""
        if (task.check){
            check = "checked";
        }
        listOfTasksHTML +=  `<li class="task" id="${task.id}"> \
                                <input class="task-checkbox" type="checkbox" ${check}/> \
                                <input hidden class="task-text" value=${task.text}> \
                                <span class="task-text">${task.text}</span> \
                                <button class="task-button-delete">X</button> \
                            </li>`;
        
    });
    container.innerHTML = listOfTasksHTML;

}


function changeTask(event) {
    if (event.target.type == 'checkbox') {
        let targetIndex = tasks.findIndex(task => task.id == event.target.parentNode.id);
        tasks[targetIndex].check = !tasks[targetIndex].check;
        console.log(tasks);
    }
    if (event.target.type == 'submit') {
        tasks = tasks.filter(task => task.id != event.target.parentNode.id);
        renderAllTasks();
    }
    console.log(event.target.type+":"+event.target.parentNode.id);
}

function keyPressed(event) {
    if (event.key === "Enter") {
        createNewTask();
    }
}

function clearAll() {
    tasks = tasks.splice(0, tasks, length);
    renderAllTasks();
    console.log("cleared");
}

function checkAll(event) {
    if (tasks.every() && event.target.checked){
        tasks.forEach((task) => {
            task.check = false;
        });
    }
    else {
        tasks.forEach((task) => {
            if (!task.check){
                task.check = !task.check;
                console.log(event.target.checked);
            }
        });
    }
    
function allTrue(element, index, array) {
    return element == true;
}

    renderAllTasks();
    console.log("all check")
}

button.addEventListener('click', createNewTask);
input.addEventListener("keypress", (event) => {keyPressed(event)});
container.addEventListener('click', (event) => {changeTask(event)});
delButton.addEventListener('click', clearAll);
checkBox.addEventListener('click', (event) => checkAll(event));




