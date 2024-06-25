let input = document.getElementById("inputId");
const button = document.getElementById("buttonId");
const container = document.querySelector(".container");

const tasks=[];

function typeNewTasks() {  
    let newTask = {
        text:input.value,
        check:false
    };
    tasks.push(newTask.text);
    console.log(tasks);
};

function createNewTextNode() {
    container.innerHTML = '<p>'+input.value+'</p>';
};

//button.addEventListener('click', typeNewTasks);
button.addEventListener('click', createNewTextNode);
    
