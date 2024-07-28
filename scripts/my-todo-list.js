let todoList = [];

// Load to-do list from localStorage when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
  loadTodoList();
  renderTodoList();
});

function handleOnkeydown(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}

function renderTodoList() {
  let todoListHtml = ``;

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const doneClass = todoObject.done ? 'done-clicked' : '';
    const html = `
        <div id = "js-input-text-${i}" class = "${doneClass}" >&bull; ${todoObject.name} 
        </div>
        <div id = "js-date-text-${i}" class = "${doneClass}">due: ${todoObject.dueDate} 
        </div>
        <button onclick = "
          addClassToText(${i});
          " class = "done-todo-button">
          <img class = "done-icon" src="icons/check-green.png">
        </button>
        <button onclick = "
          todoList.splice(${i}, 1);
          renderTodoList();  
        " class = "delete-todo-button">
          <img class = "delete-icon" src="icons/delete-brown.png">
        </button>
    `;
    todoListHtml += html;
  }
  document.querySelector(".js-todo-list").innerHTML = todoListHtml;
  saveTodoList();
}

function addClassToText(index) {
  todoList[index].done = !todoList[index].done;
  renderTodoList();
}

// Save to-do list to localStorage
function saveTodoList() {
  const todoListJson = JSON.stringify(todoList);
  localStorage.setItem('todoList', todoListJson);
}

// Load to-do list from localStorage
function loadTodoList() {
  const todoListJson = localStorage.getItem('todoList');
  if (todoListJson) {
    todoList = JSON.parse(todoListJson);
  } else {
    todoList = [];
  }
}

function addTodo() {
  const nameInputElement = document.querySelector(".js-name-input");
  const name = nameInputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  // Check if name is empty
  if (name.trim() !== "") {
    const todo = {
      name: name,
      dueDate: dueDate,
      done: false
    };
    todoList.push(todo);
    console.log(todoList);

    // Clear the input fields after adding the todo
    nameInputElement.value = "";
    dateInputElement.value = "";

    renderTodoList();
  } else {
    alert("Please enter a name for the todo.");
  }
}
