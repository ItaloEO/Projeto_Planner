import { renderCalendar } from './calendar.js';
import { setupDatePicker } from './date.picker.js';
import { initializeKanbanColunsInLocalStoage, renderKanban } from './kanban.js';
import { setupMenu } from './menu-setup.js';
import { getMonthToRenderTasks, getYearToRenderTasks, initializeCalendarDateLocalStorage } from './states/date-state.js';
import { setTasks, getTasksFromCache } from './states/task-state.js';
import { getCurrentView, loadCurrentViewFromLocalStorage } from './states/view-state.js';
import { setupCreateTaskButton } from './task-modal-setup.js';
import { loadSavedTheme, setupTheme } from './theme.js';
import { TasksApi } from './api.js';

let logged = document.cookie.split(';').find(cookie => cookie.trim().startsWith('loggedInUser='));
if (!logged) {
  window.location.href = 'login.html';
}
console.log('User is logged in as: ', logged.split('=')[1]);

initializeKanbanColunsInLocalStoage();
loadSavedTheme();
initializeCalendarDateLocalStorage();

async function syncTasks() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser?.id) return;
  const list = await TasksApi.list(currentUser.id);
  setTasks(list);
}

document.addEventListener('DOMContentLoaded', async () => {
  setupTheme();
  setupDatePicker();
  setupCreateTaskButton();
  setupMenu();

  await syncTasks();

  loadCurrentViewFromLocalStorage();
  const view = getCurrentView();

  if (view === 'calendar') {
    renderCalendar(getTasksFromCache(), getYearToRenderTasks(), getMonthToRenderTasks());
  } else if (view === 'kanban') {
    renderKanban(getTasksFromCache());
  }
});

export { syncTasks };
