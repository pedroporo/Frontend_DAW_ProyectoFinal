import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export const pacientes = {
  getAll: () => apiClient.get(`/pacientes`),
  getAllG: (gestor) => apiClient.get(`/pacientes?gestor=${gestor}`),
  getOne: (id) => apiClient.get(`/pacientes/${id}`),
  create: (paciente) => apiClient.post(`/pacientes`, paciente),
  modify: (paciente) => apiClient.put(`/pacientes/${paciente.id}`, paciente),
  delete: (id) => apiClient.delete(`/pacientes/${id}`),
  
};
export const llamadas = {
  getAll: (paciente) => apiClient.get(`/llamadas?paciente=${paciente}`),
  getOne: (id) => apiClient.get(`/llamadas/${id}`),
  create: (llamada) => apiClient.post(`/llamadas`, llamada),
  modify: (llamada) => apiClient.put(`/llamadas/${llamada.id}`, llamada),
  delete: (id) => apiClient.delete(`/llamadas/${id}`),
};
export const empleados = {
  getAll: () => apiClient.get(`/empleados`),
  getOne: (id) => apiClient.get(`/empleados/${id}`),
  create: (empleado) => apiClient.post(`/empleados`, empleado),
  modify: (empleado) => apiClient.put(`/empleados/${empleado.id}`, empleado),
  delete: (id) => apiClient.delete(`/empleados/${id}`),
  login: (user, passwd) =>
    apiClient.get(`/empleados?user=${user}&passwd=${passwd}`),
};


export default {
  pacientes,
  llamadas,
  empleados,
};
