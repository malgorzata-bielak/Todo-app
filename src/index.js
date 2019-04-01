import { renderTodos } from "./views";
import { setFilters } from "./filters";
import { createTodo, loadTodos } from "./todos";

renderTodos();

document.querySelector("#search-text").addEventListener("input", e => {
  setFilters({
    searchText: e.target.value
  });
  renderTodos();
});

document.querySelector("#new-todo").addEventListener("submit", e => {
  e.preventDefault();
  const text = e.target.elements.inputText.value.trim();
  if (text.length > 0) {
    createTodo(text);
    renderTodos();
    e.target.elements.inputText.value = "";
  }
});

document.querySelector("#hide-completed").addEventListener("change", e => {
  setFilters({
    hideCompleted: e.target.checked
  });
  renderTodos();
});

window.addEventListener("storage", e => {
  if (e.key === "todos") {
    loadTodos();
    renderTodos();
  }
});
