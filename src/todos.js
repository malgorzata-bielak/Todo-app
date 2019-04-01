import uuidv4 from "uuid/v4";

let todos = [];

// FETCH EXISTING TODOS FROM LOCALSTORAGE
const loadTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    todos = todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    todos = [];
  }
};

// SAVE TODOS TO LOCAL STORAGE
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => todos;

const createTodo = text => {
  todos.push({
    id: uuidv4(),
    text,
    completed: false
  });
  saveTodos();
};

// REMOVE TODO BY ID
const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    saveTodos();
  }
};

// CHECKED = COMPLETED
const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }
};

loadTodos();

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo };
