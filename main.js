let input = document.getElementById("inputId");
const button = document.getElementById("buttonId");
const container = document.querySelector(".container");

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

function checkCheckBox(event) {
    if (event.target.type == 'checkbox') {
        let targetIndex = tasks.findIndex(task => task.id == event.target.parentNode.id);
        tasks[targetIndex].check = !tasks[targetIndex].check;
        console.log(tasks);
    }
}

function delTask(event) {
    if (event.target.type == 'submit') {
        tasks = tasks.filter(task => task.id != event.target.parentNode.id);
        renderAllTasks();
    }
}



button.addEventListener('click', () => {
    createNewTask();
    renderAllTasks();
});

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        createNewTask();
        renderAllTasks();
    }
});

container.addEventListener('click', (event) => {
    console.log(event.target.type+":"+event.target.parentNode.id)
    checkCheckBox(event);
    delTask(event);
});
// window.addEventListener('load', renderAllTasks);


