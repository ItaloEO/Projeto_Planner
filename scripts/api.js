//API Front
const BASE_URL = 'http://127.0.0.1:5175';
const jsonHeaders = { 'Content-Type': 'application/json' };

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers: jsonHeaders });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export const UsersApi = {
  async findByEmail(email) {
    const data = await request(`/users?email=${encodeURIComponent(email)}`);
    return data[0] || null;
  },
  async create(payload) {
    return request('/users', { method: 'POST', body: JSON.stringify(payload) });
  }
};

export const TasksApi = {
  async list(userId) {
    const q = userId ? `?userId=${encodeURIComponent(userId)}` : '';
    return request(`/tasks${q}`);
  },
  async create(payload) {
    return request('/tasks', { method: 'POST', body: JSON.stringify(payload) });
  },
  async update(id, payload) {
    return request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
  },
  async remove(id) {
    return request(`/tasks/${id}`, { method: 'DELETE' });
  }
};

