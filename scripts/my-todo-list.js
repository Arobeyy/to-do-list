let todoListTitle = localStorage.getItem("todoListTitle") || null;
let todoList = [];

// Load to-do list from localStorage when the page loads
document.addEventListener("DOMContentLoaded", (event) => {
  loadTodoListTitle();
  loadTodoList();
  renderTodoList();
});

function dropDownTitleBox() {
  const html = `
    <input class="js-title-input title-input-box" placeholder=" add title" />
    <button class="js-save-title-button title-save-button" onclick="
      addTitle();
      renderTodoInput();
      saveTitle ();
      saveTodoList ();
      removeAddInputBox (); 
    ">
      <img class = "save-img" src = "icons/check_circle.png">
    </button>
  `;
  document.querySelector(".js-add-title-container").innerHTML = html;
}

function removeAddInputBox() {
  document.querySelector(".js-add-title-container").innerHTML = ``;
}

function addTitle() {
  const inputElement = document.querySelector(".js-title-input");
  const title = inputElement.value;

  if (!title) {
    alert("add title for your to-do list.");
  }

  renderTodoTitle(title);
  todoListTitle = title;
  saveTitle();
}

function renderTodoTitle(title) {
  const html = `
    <div class = "edit-grid">
      <button class = "edit-title-button" onclick = "
        editTitleBox();
      ">
        <img class = "edit-title" src = "icons/edit_square_brown.png">
      </button>
      <div class = "edit-title-input-box">${title}</div>
    </div>
  `;

  document.querySelector(".todo-title").innerHTML = html;
}

function editTitleBox() {
  const html = `
    <input class="js-edit-title-input" placeholder="add title" />
    <button class="js-save-edited-title" onclick="
      editTitle();
      saveTitle ();
      removeEditInputBox();
    ">
      save
    </button>
  `;
  document.querySelector(".js-edit-title-container").innerHTML = html;
}

function removeEditInputBox() {
  document.querySelector(".js-edit-title-container").innerHTML = ``;
}

function editTitle() {
  const inputElement = document.querySelector(".js-edit-title-input");
  const title = inputElement.value;

  renderTodoTitle(title);
  todoListTitle = title;
  saveTitle();
}

function saveTitle() {
  const todoListTitleJson = JSON.stringify(todoListTitle);
  localStorage.setItem("todoListTitle", todoListTitleJson);
}

// Load to-do list title from localStorage
function loadTodoListTitle() {
  const todoListTitleJson = localStorage.getItem("todoListTitle");
  if (todoListTitleJson) {
    todoListTitle = JSON.parse(todoListTitleJson);
  } else {
    todoListTitle = ``;
  }
}

function renderTodoInput() {
  const html = `
    <div class="todo-input-grid">
      <input
        class="js-name-input name-input"
        placeholder="Enter your todos"
        onkeydown="handleOnkeydown(event);"
      />
      <input class="js-due-date-input due-date-input" type="date" />
      <button class="add-todo-button" onclick="addTodo();">
        <img class="add-icon" src="icons/add-light-brown.png" />
      </button>
    </div>
  `;
  document.querySelector(".js-created-todo").innerHTML = html;
}

function handleOnkeydown(event) {
  if (event.key === "Enter") {
    addTodo();
  }
}

function renderTodoList() {
  let todoListHtml = ``;

  if (todoListTitle) {
    renderTodoTitle(todoListTitle);
    renderTodoInput();
  }

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const doneClass = todoObject.done ? "done-clicked" : "";
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
  localStorage.setItem("todoList", todoListJson);
}

// Load to-do list from localStorage
function loadTodoList() {
  const todoListJson = localStorage.getItem("todoList");
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
      done: false,
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
