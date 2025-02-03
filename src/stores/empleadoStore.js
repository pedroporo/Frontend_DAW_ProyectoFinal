import { defineStore } from "pinia";
import api from "./api.js";

export const useEmpleadoStore = defineStore("empleadoStore", {
  state() {
    return {
      empleado: {},
    };
  },
  getters: {
    getempleado: (state) => async (id) => (await api.empleados.getOne(id)).data,
  },
  actions: {
    populateUser() {
      if (!localStorage.usuario || localStorage.usuario == "{}") {
        localStorage.usuario = JSON.stringify(this.empleado);
      }
      if (localStorage.usuario) {
        this.empleado = JSON.parse(localStorage.usuario);
      }
    },
    async login(usuario, contraseña) {
      try {
        console.log(usuario, contraseña);

        const response = await api.empleados.login(usuario, contraseña);
        this.empleado = response.data[0];
        console.log(this.empleado);

        localStorage.usuario = JSON.stringify(this.empleado);
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
    async logout() {
      try {
        this.empleado = {};
        localStorage.usuario = JSON.stringify(this.empleado);
      } catch (response) {
        console.error("Error: " + response.message);
      }
    },
  },
});
