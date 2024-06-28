let input = document.getElementById("inputId");
const button = document.getElementById("buttonId");
const container = document.querySelector(".container");
const delButton = document.getElementById("delAll");
const checkBox = document.getElementById("checkAll");


let tasks=[];
let filterMode = "noFilter";

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
        delCheck();
        renderAllTasks();
    };
    
};


function renderAllTasks() {
    let listOfTasksHTML = '';
    let pages = Math.ceil(tasks.length / 5);
    tasks.filter(task => task.check !== filterMode).forEach((task) => {
        let check = "";
        if (task.check){
            check = "checked";
        };
        listOfTasksHTML +=  `<li class="task" id="${task.id}"> \
                                <input class="task-checkbox" type="checkbox" ${check}/>\
                                <span class="task-text">${task.text}</span> \
                                <input hidden class="task-text" id="hiddenInput" value=${task.text}> \
                                <button class="task-button-delete">X</button> \
                            </li>`;
        
    });
    if (tasks.length > 5) {
        
        listOfTasksHTML += `<p>`
        for (let i = 1; i < pages; i++){
            listOfTasksHTML += `<button class="page-button">${i}</button>`
        };
        listOfTasksHTML += `</p>`
    };


    if (tasks.length > 0) {        
        listOfTasksHTML += `<p> \
        <button id="allId" type="button">All(${tasks.length})</button> \
        <button id="activeId" type="button">Active(${tasks.filter(task => task.check == false).length})</button> \
        <button id="completedId" type="button">Completed(${tasks.filter(task => task.check == true).length})</button> \
        </p>`;
    };
    container.innerHTML = listOfTasksHTML;

};


function changeTask(event) {
    let targetIndex = tasks.findIndex(task => task.id == event.target.parentNode.id);
    if (event.target.type == 'checkbox') {
        
        tasks[targetIndex].check = !tasks[targetIndex].check;
        
        console.log(tasks);

        if (tasks.every(task => task.check)){
            checkBox.checked = true;
        };
        renderAllTasks();
    };
    if (event.target.type == 'submit') {
        tasks = tasks.filter(task => task.id != event.target.parentNode.id);
        renderAllTasks();
    };
    if (event.target.type == 'button') {
        filterTasks(event.target.id);
        renderAllTasks();
    };
    
    if (event.target.className == 'task-text' && event.detail == 2) {
        event.target.hidden = "true";
        let hiddenInput = event.target.nextElementSibling;
        hiddenInput.hidden = "";
        hiddenInput.required = "true";
        
        hiddenInput.focus();
    };
    console.log(event.target)
    delCheck();
};

function clearAll() {
    let targetId = 0;
    tasks.forEach((task) => {
        if (task.check){
            targetId = task.id;
            tasks = tasks.filter(task => task.id != targetId);
        };
    });
    delCheck();
    renderAllTasks();
    console.log("cleared");
}

function checkAll(event) {
    if (tasks.every(task => task.check) && !event.target.checked){
        tasks.forEach((task) => {
            task.check = !task.check;
        });
    }
    else {
        tasks.forEach((task) => {
            if (!task.check){
                task.check = !task.check;
            };
        });
    };
    renderAllTasks();
    console.log("all check");
};

function delCheck() {
    if (tasks.length == 0 || !tasks.every(task => task.check)) {
        checkBox.checked = false;
    };
};

function filterTasks(id) {
    if (id === "activeId") {
        filterMode = true;
    } else if (id === "allId") {
        filterMode = "noFilter";
    } else if (id ===  "completedId") {
        filterMode = false;
    };
};

function keyPressed(event) {
    if (event.key === "Enter" && input.value != "") {
        createNewTask();
    };
};

function handleInputKey(event) {
    console.log(event);
    if (event.key === "Enter" && event.target.className == "task-text") {
        saveChange(event);
        renderAllTasks();
    };
    if (event.key === "Escape" && event.target.className == "task-text") {
        renderAllTasks();
    };
};

function handleInputBlur(event) {
    if (event.target.className != "hiddenInput") {
        saveChange(event);
        renderAllTasks();
    };

};

function saveChange(event) {
    let targetIndex = tasks.findIndex(task => task.id == event.target.parentNode.id);
    if (event.target.value != "") {
        tasks[targetIndex].text = event.target.value; 
    };
};



button.addEventListener('click', createNewTask);
input.addEventListener('keypress', keyPressed);
container.addEventListener('click', changeTask);
container.addEventListener('blur', handleInputBlur, true);
container.addEventListener('keyup', handleInputKey);

delButton.addEventListener('click', clearAll);
checkBox.addEventListener('click', checkAll);

