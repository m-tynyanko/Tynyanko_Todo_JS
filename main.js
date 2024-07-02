let input = document.getElementById("inputId");
const button = document.getElementById("buttonId");
const container = document.querySelector(".container");
const delButton = document.getElementById("delAll");
const checkBox = document.getElementById("checkAll");


let tasks=[];
let filterMode = "noFilter";
let filterName = "all";
let filteredTasks;


let currentPageNum = 1;
const tasksPerPage = 5;


filterTasks();

function createNewTask() {
    if (input.value == ""){
        alert("Please, type something!");
    } else {
        let newTask = {
            text:escapeRegex(input.value.trim()),
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
// 
function escapeRegex(input) {
    // return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return input.replace(/[&<>"']/g, function(match) {
        switch (match) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#039;';
        }
    });
}


function pagination(tasks){
    pages = Math.ceil(tasks.length / tasksPerPage);

    let firstOnPage = currentPageNum*tasksPerPage-tasksPerPage;
    if (firstOnPage < 0) {
        firstOnPage = 0;
    };

    let lastOnPage = tasksPerPage + firstOnPage;
    if (lastOnPage > tasks.length){
        lastOnPage = tasks.length;
    }
    return {
        pages, 
        firstOnPage, 
        lastOnPage
    };
};

function checkCurrentPage() {
    if (pagination(filteredTasks).lastOnPage - pagination(filteredTasks).firstOnPage < 1 && pagination(filteredTasks).pages > 1) {
        currentPageNum -= 1;
    }
    if (pagination(filteredTasks).lastOnPage - pagination(filteredTasks).firstOnPage < 1 && pagination(filteredTasks).pages == 1) {
        currentPageNum = 1;
    }
    if (pagination(filteredTasks).lastOnPage - pagination(filteredTasks).firstOnPage < 1 && filteredTasks.length > 0) {
        checkCurrentPage();
    }
};

function renderPages(listOfTasksHTML) {
    listOfTasksHTML = '';
    if (filteredTasks.length > tasksPerPage) {
        
        listOfTasksHTML += `<p>`
        for (let i = 1; i < pagination(filteredTasks).pages+1; i++){
            if (currentPageNum == i){
                listOfTasksHTML += `<button class="pressed-page-button">${i}</button>`;
            } else {
                listOfTasksHTML += `<button class="page-button">${i}</button>`;
            }
            
        };
        listOfTasksHTML += `</p>`
    } else {
        currentPageNum = 1;
    }
    return listOfTasksHTML;
};

function renderTabs(listOfTasksHTML){
    listOfTasksHTML = ''; 
    if (tasks.length > 0) {   
        listOfTasksHTML += `<p>`;
        if (filterMode === "noFilter"){
            listOfTasksHTML += `<button id="allId" type="button" class="pressed-filter-button">All(${tasks.length})</button>`;
        } else {
            listOfTasksHTML += `<button id="allId" type="button" class="filter-button">All(${tasks.length})</button>`;
        };
        if (filterMode === true) {
            listOfTasksHTML += `<button id="activeId" type="button" class="pressed-filter-button">Active(${tasks.filter(task => task.check == false).length})</button>`;
        } else {
            listOfTasksHTML += `<button id="activeId" type="button" class="filter-button">Active(${tasks.filter(task => task.check == false).length})</button>`;
        };
        if (filterMode === false) {
            listOfTasksHTML += `<button id="completedId" type="button" class="pressed-filter-button">Completed(${tasks.filter(task => task.check == true).length})</button>`;
        } else {
            listOfTasksHTML += `<button id="completedId" type="button" class="filter-button">Completed(${tasks.filter(task => task.check == true).length})</button>`;
        };
        listOfTasksHTML += `<p>`;
        // <button id="allId" type="button" class="filter-button">All(${tasks.length})</button> \
        // <button id="activeId" type="button" class="filter-button">Active(${tasks.filter(task => task.check == false).length})</button> \
        // <button id="completedId" type="button" class="filter-button">Completed(${tasks.filter(task => task.check == true).length})</button> \
        // </p>`;
    };
    return listOfTasksHTML;
};

function renderAllTasks() {
    let listOfTasksHTML = '';

    filterTasks();

    checkCurrentPage();

    filteredTasks.slice(pagination(filteredTasks).firstOnPage, pagination(filteredTasks).lastOnPage).forEach((task) => {
        let check = "";
        if (task.check){
            check = "checked";
        };
        listOfTasksHTML +=  `<li class="task" id="${task.id}"> \
                                <input class="task-checkbox" type="checkbox" ${check}/>\
                                <span class="task-text">${task.text}</span> \
                                <input hidden class="task-text" id="hiddenInput" maxLength="256" value=${task.text}> \
                                <button class="task-button-delete">X</button> \
                            </li>`;
        
    });
    let pageButtons = renderPages(listOfTasksHTML);
    let tabs = renderTabs(listOfTasksHTML);

    
    listOfTasksHTML += pageButtons;
    listOfTasksHTML += tabs;

    
    container.innerHTML = listOfTasksHTML;
    console.log(currentPageNum);
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
        currentPageNum = 1;
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

    if (event.target.className == "page-button") {
        console.log(event.target);
        currentPageNum = event.target.textContent;
        renderAllTasks();
    }
    
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
};

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
    
    filteredTasks =  tasks.filter(task => task.check !== filterMode);
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
        tasks[targetIndex].text = escapeRegex(event.target.value.trim()); 
    };
};




button.addEventListener('click', createNewTask);
input.addEventListener('keypress', keyPressed);
container.addEventListener('click', changeTask);
container.addEventListener('blur', handleInputBlur, true);
container.addEventListener('keyup', handleInputKey);

delButton.addEventListener('click', clearAll);
checkBox.addEventListener('click', checkAll);

