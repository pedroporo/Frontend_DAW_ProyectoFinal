import axios from "axios";
import { mapActions } from "pinia";
import { useMessagesStore } from "../messagesStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor para añadir el token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas con error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const messagesStore = useMessagesStore();
      messagesStore.addMessage("Debes estar autenticado", "error");
    }
    return Promise.reject(error);
  }
);

export default api;
