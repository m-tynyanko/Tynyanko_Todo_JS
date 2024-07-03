(function() {

const input = document.querySelector(".input-field");
const button = document.querySelector(".add-task-button");
const container = document.querySelector(".container");
const delButton = document.querySelector(".clear-button");
const checkBox = document.querySelector(".all-checkbox");
const allButton = document.querySelector("div.tabs > p #all-id");
const activeButton = document.querySelector("div.tabs > p #active-id");
const completedButton = document.querySelector("div.tabs > p #completed-id");
const tabs = document.querySelector(".tabs");




let tasks=[];
let filterMode = "noFilter";

let currentPageNum = 1;
const tasksPerPage = 5;

const escapeRegex = (input) => {
    return input.replace(/[&<>"'№%:?*()]/g, function(match) {
        switch(match) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#039;';
            case "№": return '&#x2116;';
            case "%": return '&#x25;';
            case ":": return '&#x3a;';
            case "?": return '&#x3f';
            case "*": return '&#x2a;';
            case "(": return '&#x28;';
            case ")": return '&#x29;';
        }
    });
};

const filterTasks = (id) => {
    if (id === "active-id") {
        filterMode = true;
        
    } else if (id === "all-id") {
        filterMode = "noFilter";
        
    } else if (id ===  "completed-id") {
        filterMode = false;
        
    };
    return tasks.filter(task => task.check !== filterMode);
};

const pagination = (tasks) => {
    let pages = Math.ceil(tasks.length / tasksPerPage);

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

const checkCurrentPage = () => {
    let filteredTasks = filterTasks();
    let isPageEmpty = pagination(filteredTasks).lastOnPage - pagination(filteredTasks).firstOnPage < 1;
    let pages = pagination(filteredTasks).pages;

    if (isPageEmpty && pages > 1) {
        currentPageNum -= 1;
    }
    if (isPageEmpty && pages == 1) {
        currentPageNum = 1;
    }
    if (isPageEmpty && filteredTasks.length > 0) {
        checkCurrentPage();
    }
};

const renderPages = (listOfTasksHTML) => {
    let filteredTasks = filterTasks();
    listOfTasksHTML = '';
    if (filteredTasks.length > tasksPerPage) {
        
        listOfTasksHTML += `<p>`;
        for (let i = 1; i < pagination(filteredTasks).pages+1; i++){
            if (currentPageNum == i){
                listOfTasksHTML += `<button class="pressed-page-button">${i}</button>`;
            } else {
                listOfTasksHTML += `<button class="page-button">${i}</button>`;
            }
            
        };
        listOfTasksHTML += `</p>`;
    } else {
        currentPageNum = 1;
    }
    return listOfTasksHTML;
};

const renderTabs = () => {
    let normalButton = "filter-button";
    let pressedButton = "pressed-filter-button";

    allButton.innerText = 'All(' + tasks.length + ')';
    activeButton.innerText = 'Active(' + tasks.filter(task => task.check == false).length + ')';
    completedButton.innerText = 'Completed(' + tasks.filter(task => task.check == true).length + ')';
    
    if (filterMode === "noFilter") {
        allButton.className = pressedButton;
        activeButton.className = normalButton;
        completedButton.className = normalButton;
    } else if (filterMode === true) {
        allButton.className = normalButton;
        activeButton.className = pressedButton;
        completedButton.className = normalButton;
    } else {
        allButton.className = normalButton;
        activeButton.className = normalButton;
        completedButton.className = pressedButton;
    };
};

const renderAllTasks = () => {
    let listOfTasksHTML = '';

    let filteredTasks = filterTasks();
    checkCurrentPage();

    filteredTasks.slice(pagination(filteredTasks).firstOnPage, pagination(filteredTasks).lastOnPage).forEach((task) => {
        let check = "";
        if (task.check){
            check = "checked";
        };
        listOfTasksHTML +=  `<li class="task" id="${task.id}"> \
                                <input class="task-checkbox" type="checkbox" ${check}/>\
                                <span class="task-text">${task.text}</span> \
                                <input hidden class="task-text" id="hidden-input" maxLength="256" value=${task.text}> \
                                <button class="task-button-delete">X</button> \
                            </li>`;
        
    });
    let pageButtons = renderPages(listOfTasksHTML);

    renderTabs();
    
    listOfTasksHTML += pageButtons;
    container.innerHTML = listOfTasksHTML;
};

const createNewTask = () => {
    if (input.value.trim() === ""  || input.value.trim() === " "){
        input.value = "";
    } else {
        let newTask = {
            text:escapeRegex(input.value.trim()),
            check:false,
            id:Date.now()
        };
        tasks.push(newTask);

        input.value = "";
        input.focus();
        delCheck();
        renderAllTasks();
    };
    
};

const changeTask = (event) => {
    let targetObject = event.target;
    let doubleClick = event.detail == 2;

    let targetIndex = tasks.findIndex(task => task.id == targetObject.parentNode.id);
    
    if (targetObject.type == 'checkbox') {
        
        tasks[targetIndex].check = !tasks[targetIndex].check;
        

        if (tasks.every(task => task.check)){
            checkBox.checked = true;
        };
        renderAllTasks();
    };
    if (targetObject.type == 'submit') {
        tasks = tasks.filter(task => task.id != targetObject.parentNode.id);
        renderAllTasks();
    };
    
    if (targetObject.className == 'task-text' && doubleClick) {
        targetObject.hidden = "true";
        let hiddenInput = targetObject.nextElementSibling;
        hiddenInput.hidden = "";
        hiddenInput.required = "true";
        
        hiddenInput.focus();
    };

    if (targetObject.className == "page-button") {
        currentPageNum = targetObject.textContent;
        renderAllTasks();

    }
    
    delCheck();
};

const delCheck = () => {
    if (tasks.length == 0 || !tasks.every(task => task.check)) {
        checkBox.checked = false;
    };
};

const clearAll = () => {
    let targetId = 0;
    tasks.forEach((task) => {
        if (task.check){
            targetId = task.id;
            tasks = tasks.filter(task => task.id != targetId);
        };
    });
    delCheck();
    renderAllTasks();
};

const checkAll = (event) => {
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
};

const keyPressed = (event) => {
    const enter = "Enter";
    if (event.key === enter && input.value != "") {
        createNewTask();
    };
};

const saveChange = (event) => {
    let targetIndex = tasks.findIndex((task) => task.id == event.target.parentNode.id);
    if (event.target.value.trim() != "" && event.target.value.trim() != " ") {
        tasks[targetIndex].text = escapeRegex(event.target.value.trim()); 
    };
};

const handleInputKey = (event) => {
    const enter = "Enter";
    const escape = "Escape";
    let targetClass = event.target.className === "task-text";

    if (event.key === enter && targetClass) {
        saveChange(event);
        renderAllTasks();
    };
    if (event.key === escape && targetClass) {
        renderAllTasks();
    };
};

const handleInputBlur = (event) => {
    if (event.target.className !== "hidden-input") {
        saveChange(event);
        renderAllTasks();
    };

};

const changeFilterButton = (event) => {
    if (event.target.type == "button") {
        filterTasks(event.target.id);
        currentPageNum = 1;
        renderAllTasks();
    }
};


button.addEventListener('click', createNewTask);
input.addEventListener('keypress', keyPressed);
container.addEventListener('click', changeTask);
container.addEventListener('blur', handleInputBlur, true);
container.addEventListener('keyup', handleInputKey);
delButton.addEventListener('click', clearAll);
checkBox.addEventListener('click', checkAll);
tabs.addEventListener('click', changeFilterButton);


})();