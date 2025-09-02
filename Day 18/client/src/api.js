import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

let token = null;
export function setToken(t) { token = t; }
function headers() { return token ? { Authorization: `Bearer ${token}` } : {}; }

export const api = {
  async register(name, email, password) {
    const { data } = await axios.post(`${API_BASE}/api/auth/register`, { name, email, password });
    setToken(data.token);
    return data;
  },
  async login(email, password) {
    const { data } = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
    setToken(data.token);
    return data;
  },
  async createProject(name) {
    const { data } = await axios.post(`${API_BASE}/api/projects`, { name }, { headers: headers() });
    return data;
  },
  async listProjects() {
    const { data } = await axios.get(`${API_BASE}/api/projects`, { headers: headers() });
    return data;
  },
  async getProject(id) {
    const { data } = await axios.get(`${API_BASE}/api/projects/${id}`, { headers: headers() });
    return data;
  },
  async listTasks(projectId) {
    const { data } = await axios.get(`${API_BASE}/api/tasks/project/${projectId}`, { headers: headers() });
    return data;
  },
  async createTask(task) {
    const { data } = await axios.post(`${API_BASE}/api/tasks`, task, { headers: headers() });
    return data;
  },
  async updateTask(id, patch) {
    const { data } = await axios.put(`${API_BASE}/api/tasks/${id}`, patch, { headers: headers() });
    return data;
  },
  async deleteTask(id) {
    const { data } = await axios.delete(`${API_BASE}/api/tasks/${id}`, { headers: headers() });
    return data;
  }
};
