import { defineStore } from 'pinia';
import axios from 'axios';

const urlUsers = "http://localhost:3000/users";

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
  }),
  getters: {
    userNames: (state) => (id) => {
      const user = state.users.find(user => user.id == id);
      if (user) {
        return `${user.first_name}`;
      }
      return 'Desconocido';
    },
  },
  actions: {
    async getUsers() {
      try {
        const { data } = await axios.get(urlUsers);
        this.users = data;
      } catch (error) {
        alert("Error al obtener zonas:", error);
      }
    }
  }
});
