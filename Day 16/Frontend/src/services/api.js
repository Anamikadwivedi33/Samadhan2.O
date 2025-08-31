import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

// Products
export const fetchProducts = () => API.get("/products");

// Auth
export const loginUser = (data) => API.post("/login", data);
export const signupUser = (data) => API.post("/signup", data);

export default API;
