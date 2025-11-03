// scripts/states/task-state.js

let _tasks = [];

// ===== API de estado =====
export function getTasks() {
  return _tasks;
}

// Compatibilidade com código antigo (main.js/kanban etc.)
export function getTasksFromCache() {
  return _tasks;
}

export function setTasks(list) {
  _tasks = Array.isArray(list) ? list : [];
  localStorage.setItem('tasks', JSON.stringify(_tasks));
}

export function addTask(task) {
  _tasks.push(task);
}

export function updateTask(id, updatedTask) {
  _tasks = _tasks.map(t => t.id === id ? { ...t, ...updatedTask } : t);
}

export function deleteTask(id) {
  _tasks = _tasks.filter(t => t.id !== id);
}

export function findTaskById(id) {
  return _tasks.find(t => t.id === id);
}

// ===== Persistência (localStorage) =====
export function saveTasksToStorage() {
  localStorage.setItem('tasks', JSON.stringify(_tasks));
}

export function loadTasksFromStorage() {
  const stored = JSON.parse(localStorage.getItem('tasks')) || [];
  setTasks(stored);
}

export function initializeTasksLocalStorage() {
  if (localStorage.getItem('tasks') === null) {
    localStorage.setItem('tasks', JSON.stringify([]));
  }
  // carrega na memória
  loadTasksFromStorage();
}
