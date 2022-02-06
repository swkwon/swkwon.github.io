const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

const TODO_KEY = "todos";

let todos = [];

function saveToDos() {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function loadToDos() {
    const data = localStorage.getItem(TODO_KEY);
    const parsed = JSON.parse(data);
    if (parsed === null) {
        return;
    }
    todos = parsed;
    parsed.forEach(element => {
        paintToDo(element);
    });
}

function handleSubmitTodoForm(event) {
    event.preventDefault();
    const newTodo = todoInput.value; 
    todoInput.value = "";
    const newTodoObj = {
        text:newTodo,
        id: Date.now(),
    }
    todos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    todos = todos.filter(function(ele){
        return ele.id !== parseInt(li.id);
    });
    saveToDos();
}

function paintToDo(newTodoObj) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    btn.addEventListener("click", deleteToDo);
    btn.innerText = "❌";
    btn.classList.add("delete_todo");
    span.innerText = newTodoObj.text;
    span.classList.add("todo_margin")
    li.id = newTodoObj.id;
    li.appendChild(btn);
    li.appendChild(span);
    todoList.appendChild(li);
}

todoForm.addEventListener("submit", handleSubmitTodoForm); 
loadToDos();