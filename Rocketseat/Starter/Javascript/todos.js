var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");

var taskList = JSON.parse(localStorage.getItem("list_tasks")) || [];

function renderTaskList() {
  listElement.innerHTML = "";

  for ([i, task] of taskList.entries()) {
    var taskElement = document.createElement("li");
    var taskText = document.createTextNode(task + " ");

    var linkElement = document.createElement("a");
    var linkText = document.createTextNode("Excluir");

    linkElement.setAttribute("href", "#");
    linkElement.setAttribute("data-pos", i);
    linkElement.appendChild(linkText);

    taskElement.appendChild(taskText);
    taskElement.appendChild(linkElement);
    listElement.appendChild(taskElement);
  }
}

function addTask() {
  var taskText = inputElement.value;

  taskList.push(taskText);
  inputElement.value = "";
  renderTaskList();
  saveToStorage();
}

function removeTask(pos) {
  taskList.splice(pos, 1);
  renderTaskList();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("list_tasks", JSON.stringify(taskList));
}

// Bind events
document.addEventListener("DOMContentLoaded", renderTaskList);
buttonElement.addEventListener("click", addTask);
listElement.addEventListener("click", e => {
  if (e.target.nodeName == "A") {
    removeTask(e.target.dataset.pos);
  }
});
