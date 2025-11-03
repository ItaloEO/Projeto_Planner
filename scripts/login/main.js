import { handleLogin } from "./handle-login.js";
import { getTasks, initializeTasksLocalStorage, loadTasksFromStorage } from './states/task-state.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  if (!form) {
    console.error('Formulário "#form-login" não encontrado no login.html');
    return;
  }
  form.addEventListener("submit", handleLogin);
});
