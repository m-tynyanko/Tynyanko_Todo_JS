let input = document.getElementById("inputId");
const button = document.getElementById("buttonId");
const container = document.querySelector(".container");


const tasks=[];


function createNewTask() {
    let newTask = {
        text:input.value,
        check:false,
        id:Date.now()
    };
    tasks.push(newTask);
    console.log(tasks);
};

function renderAllTasks() {
    let listOfTasksHTML = ''
    tasks.forEach((task) => {
        let check = ""
        if (task.check){
            check = "checked"
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
    if (event.target.type == 'checkbox'){
        let targetIndex = tasks.findIndex(task => task.id == event.target.parentNode.id);
        tasks[targetIndex].check = !tasks[targetIndex].check
        console.log(tasks)
    }
}

function delTask(event) {
    
}

button.addEventListener('click', createNewTask);
button.addEventListener('click', renderAllTasks);
// window.addEventListener('load', renderAllTasks);
container.addEventListener('click', (event) => {
    // checkCheckBox(event);
    console.log(event.target.type);
});

//checkbox.addEventListener('click', checkCheckBox);
