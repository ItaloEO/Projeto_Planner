import { renderCalendar } from "./calendar.js";
import { addTask, getTasks, saveTasksToStorage } from "./states/task-state.js";
import { getCurrentView } from "./states/view-state.js";
import { renderKanban } from "./kanban.js";
import { getMonthToRenderTasks, getYearToRenderTasks } from "./states/date-state.js";
import { TasksApi } from "./api.js";

export async function handleFormSubmit(event){
  event.preventDefault();
  const form = event.target;

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser?.id) {
    window.location.href = 'login.html';
    return;
  }

  const formData = new FormData(form);
  const formJson = {};
  formJson["id"] = crypto.randomUUID();
  formJson["status"] = "todo";

  for (const [key, value] of formData) {
    if (key === "entire-day") {
      formJson["entireDay"] = value === "on";
      continue;
    }
    formJson[key] = value;
  }

  formJson["userId"] = currentUser.id;

  const validTitle = validateTitle(formJson["title"]);
  if (!validTitle){
    alert("Title can only contain letters and numbers");
    return;
  }

  await TasksApi.create(formJson);

  addTask(formJson);
  saveTasksToStorage();

  form.reset();
  document.querySelector('.modal-overlay').remove();

  if (getCurrentView() === 'calendar') {
    renderCalendar(getTasks(), getYearToRenderTasks(), getMonthToRenderTasks());
    return;
  }
  if (getCurrentView() === 'kanban') {
    renderKanban(getTasks());
    return;
  }
}

export function handleCheckEntireDay(){
  const timeInput = document.getElementById("task-time-input");
  timeInput.classList.toggle("invisible");
  timeInput.value = null;
}

function validateTitle(title){
  return /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\/\-\_,\.\*\(\)]+$/.test(title);
}
