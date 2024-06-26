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
        listOfTasksHTML +=  `<li class="task" id="${task.id}"> \
                                <input class="task-checkbox" type="checkbox"> \
                                <input hidden class="task-text" value=${task.text}> \
                                <span class="task-text">${task.text}</span> \
                                <button class="task-button-delete">X</button> \
                            </li>`;
        
    });
    container.innerHTML = listOfTasksHTML;
}



button.addEventListener('click', createNewTask);
button.addEventListener('click', renderAllTasks);
window.addEventListener('load', renderAllTasks);
container.addEventListener('click')


//heckbox.addEventListener('click', checkCheckBox);
