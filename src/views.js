import { getTodos, toggleTodo, removeTodo } from "./todos";
import { getFilters } from "./filters";

// RENDER APPLICATION TODOS BASED ON FILTERS
const renderTodos = () => {
  const todoEl = document.querySelector("#todos");
  const { searchText, hideCompleted } = getFilters();
  let filteredTodos = getTodos().filter(todo =>
    todo.text.toLowerCase().includes(searchText.toLowerCase())
  );

  filteredTodos = filteredTodos.filter(todo => {
    if (hideCompleted) {
      return !todo.completed;
    } else {
      return true;
    }
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  todoEl.innerHTML = "";
  todoEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(todo => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "No to-dos to show";
    todoEl.appendChild(messageEl);
  }
};

// GENERATE THE DOM ELEMENTS FOR AN INDIVIDUAL NOTE
const generateTodoDOM = todo => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  // Setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  // Setup the todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // Setup the remove button
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    renderTodos();
  });

  return todoEl;
};

// GET THE DOM ELEMENTS FOR LIST SUMMARY
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  const plural = incompleteTodos.length === 1 ? " " : "s";
  summary.classList.add("list-title");
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;

  return summary;
};

export { generateTodoDOM, renderTodos, generateSummaryDOM };
