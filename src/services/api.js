
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// User API functions

export const loginUser = (payload) => API.post("/auth/login", payload);
export const registerUser = (payload) => API.post("/auth/register", payload);


// Chat API functions

export const sendMessage = (userMessage, history = []) =>
  API.post("/chat/", { userMessage, history });

export const getChatHistory = () => API.get("/chat/history");
export const getProfile = () => API.get("/auth/profile");

// FAQ/Admin API

// Fetch all contexts
export const fetchContexts = () => API.get("/faqs");
export const fetchContextById = (id) => API.get(`/faqs/${id}`);
export const createContext = (formData) =>
  API.post("/faqs", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateContext = (id, data) => API.put(`/faqs/${id}`, data);
export const deleteContext = (id) => API.delete(`/faqs/${id}`);


export default API;
