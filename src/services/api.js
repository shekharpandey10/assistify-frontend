
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


// FAQ/Admin API

export const getContexts = () => API.get("/faq");
export const uploadContext = (formData) => API.post("/faq", formData);


export default API;
