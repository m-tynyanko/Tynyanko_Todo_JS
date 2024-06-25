let input = document.getElementById("inputId");
const button = document.getElementById("buttonId");

const tasks=[];




function typeNewTasks() {  
    tasks.push(input.value);
    console.log(tasks);
}

button.addEventListener('click', typeNewTasks);

    
