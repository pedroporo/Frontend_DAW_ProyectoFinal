import { defineStore } from "pinia";
import api from "./api.js";

export const useLlamadaStore = defineStore("llamadaStore", {
  state() {
    return {
      llamadas: [],
    };
  },
  getters: {
    getLlamada: (state) => async (id) => (await api.llamadas.getOne(id)).data,
  },
  actions: {
    async populateLlamadas(paciente) {
      try {
        const response = await api.llamadas.getAll(paciente);
        this.llamadas = response.data;
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    async addLlamada(llamada) {
      try {
        const response = await api.llamadas.create(llamada);
        if (response) {
          this.llamadas.push(llamada);
        }
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    async modLlamada(llamada) {
      try {
        const response = await api.llamadas.modify(llamada);
        if (response) {
          this.llamadas.push(llamada);
        }
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    async delLlamada(index) {
      try {
        const indice = this.llamadas.findIndex(
          (llamada) => llamada.id === index
        );
        const response = await api.llamadas.delete(index.id);
        if (response) {
          this.llamadas.splice(indice, 1);
        }
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
  },
});
