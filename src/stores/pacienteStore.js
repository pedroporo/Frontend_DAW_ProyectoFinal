import { defineStore } from "pinia";
import api from "./api.js";

export const usePacientesStore = defineStore("pacienteStore", {
  state() {
    return {
      pacientes: [],
    };
  },
  getters: {
    getPaciente: (state) => async (pacienteId) =>
      (await api.pacientes.getOne(pacienteId)).data,
  },
  actions: {
    async populatePacientes() {
      try {
        const response = await api.pacientes.getAll();
        this.pacientes = response.data;
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    async populatePacientesG(gestor) {
      try {
        const response = await api.pacientes.getAllG(gestor);
        this.pacientes = response.data;
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    async addPaciente(paciente) {
      try {
        const response = await api.pacientes.create(paciente);
        if (response) {
          this.pacientes.push(paciente);
        }
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    async modPaciente(paciente) {
      try {
        const response = await api.pacientes.modify(paciente);
        if (response) {
          this.pacientes.push(paciente);
        }
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    async delPaciente(index) {
      try {
        const indice = this.pacientes.findIndex(
          (paciente) => paciente.id === index
        );
        const response = await api.pacientes.delete(index.id);
        if (response) {
          this.pacientes.splice(indice, 1);
        }
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
  },
});
