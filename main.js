let input = document.getElementById("inputId");
const button = document.getElementById("buttonId");
const container = document.querySelector(".container");
const checkbox = document.getElementById("checkId");

const tasks=[];
let n = 0;

function createNewTask() {
    n += 1;
    let newTask = {
        text:input.value,
        check:false,
        id:n
    };
    tasks.push(newTask)
    newTaskHTML = '<p><input type="checkbox" id="checkId" name="check" />'+
    '<label for="check">'+' '+newTask.text+'</label></p>';
    container.innerHTML += newTaskHTML;
    console.log(tasks);
};

function checkCheckBox() {
    console.log('click!')
}


button.addEventListener('click', createNewTask);
checkbox.addEventListener('click', checkCheckBox);
