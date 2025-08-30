// public/js/auth.js
const API_BASE = "http://localhost:5000/api/auth";

// Save token + user in localStorage
export function saveAuth(token, user) {
  localStorage.setItem("authToken", token);
  localStorage.setItem("authUser", JSON.stringify(user));
}

// Get token
export function getToken() {
  return localStorage.getItem("authToken");
}

// Get current user
export function getUser() {
  const user = localStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
}

// Logout
export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
  window.location.href = "login.html";
}

// Register API call
export async function registerUser(name, email, password) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

// Login API call
export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}
