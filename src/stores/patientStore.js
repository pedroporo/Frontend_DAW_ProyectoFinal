import { defineStore } from 'pinia';
import axios from 'axios';

const urlPacientes = "http://localhost:3000/patients";

export const usePatientsStore = defineStore('patients', {
  state: () => ({
  }),
  getters: {
  },
  actions: {
    async getPatients() {
      try {
        const { data } = await axios.get(urlPacientes);
        return data;
      } catch (error) {
        alert("Error al obtener pacientes:", error);
      }
    },
    async getPatient(id) {
      try {
        const { data } = await axios.get(`${urlPacientes}/${id}`);
        return data;
      } catch (error) {
        alert("Error al obtener paciente:", error);
      }
    },
    async addPatient(patient) {
      try {
        await axios.post(urlPacientes, patient);
      } catch (error) {
        alert("Error al crear paciente:", error);
      }
    },
    async updatePatient(patient) {
      try {
        const { data } = await axios.put(`${urlPacientes}/${patient.id}`, patient);
        return data;
      } catch (error) {
        alert("Error al actualizar paciente:", error);
      }
    },
    async removePatient(id) {
      try {
        await axios.delete(`${urlPacientes}/${id}`);
      } catch (error) {
        alert("Error al eliminar paciente:", error);
      }
    }
  }
});
