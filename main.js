let input = document.getElementById("inputId");
const button = document.getElementById("buttonId");
const container = document.querySelector(".container");
//const checkbox = document.getElementById("checkId");

/*const tasks=[];
tasks[0] = {text:0,
    check:0,
    id:0
}
*/
let n = 0;

function layout() {
    
}

function createNewTask() {
    n += 1;
    let newTask = {
        text:input.value,
        check:false,
        id:Date.now()
    };
    tasks.push(newTask);
    console.log(tasks);
};



function renderAllTasks() {
    for (let i = 1; i <= n; i++) {
        let currentTask = tasks[i];
        newTaskHTML = '<p><input type="checkbox" id="'+ currentTask.id +'" name="check" />'+
        '<label for="check">'+' '+currentTask.text+'</label></p>';
        container.innerHTML += newTaskHTML;
    }
}

function renderLastTask() {
    let currentTask = tasks[n];
    newTaskHTML = '<p><input type="checkbox" id="'+ currentTask.id +'" name="check" />'+
    '<label for="check">'+' '+currentTask.text+'</label></p>';
    container.innerHTML += newTaskHTML;
}



function checkCheckBox() {
    console.log('click!')
}

button.addEventListener('click', createNewTask);
button.addEventListener('click', renderLastTask);
//heckbox.addEventListener('click', checkCheckBox);
