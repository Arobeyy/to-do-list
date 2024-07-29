let todoListTitle = ``;
let todoList = [];

// Load to-do list from localStorage when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
  loadTodoListTitle();
  loadTodoList();
  renderTodoList();
});

function dropDownTitleBox () {
  const html = `
    <input class="js-title-input" placeholder="Search" />
    <button class="js-save-title-button" onclick="
      addTitle();
      removeAddInputBox ();
    ">
      save
    </button>
  `;
  document.querySelector('.js-add-title-container').innerHTML = html;
}

function removeAddInputBox () {
  document.querySelector('.js-add-title-container').innerHTML = ``;
}

function addTitle () {
  const inputElement = document.querySelector('.js-title-input');
  const title = inputElement.value;

  const html = `
    <div>
      <div>${title}</div>
      <button onclick = "
        editTitleBox();
      ">Edit</button>
    </div>
  `;

  document.querySelector('.todo-title').innerHTML = html;
  todoListTitle = title;
  saveTitle();
}


function editTitleBox() {
  const html = `
    <input class="js-edit-title-input" placeholder="add title" />
    <button class="js-save-edited-title" onclick="
      editTitle();
      removeEditInputBox();
    ">
      save
    </button>
  `;
  document.querySelector('.js-edit-title-container').innerHTML = html;
}

function removeEditInputBox () {
  document.querySelector('.js-edit-title-container').innerHTML = ``;
}

function editTitle () {
  const inputElement = document.querySelector('.js-edit-title-input');
  const title = inputElement.value;

  const html = `
    <div>
      <div>${title}</div>
      <button onclick = "
        editTitleBox();
      ">Edit</button>
    </div>
  `;

  document.querySelector('.todo-title').innerHTML = html;
  todoListTitle = title;
  saveTitle();
}

function saveTitle() {
  const todoListTitleJson = JSON.stringify(todoListTitle);
  localStorage.setItem('todoListTitle', todoListTitleJson);
}

// Load to-do list title from localStorage
function loadTodoListTitle() {
  const todoListTitleJson = localStorage.getItem('todoListTitle');
  if (todoListTitleJson) {
    todoListTitle = JSON.parse(todoListTitleJson);
  } else {
    todoListTitle = ``;
  }
}

/* 

*/

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
