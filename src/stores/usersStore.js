import { defineStore, mapActions } from 'pinia';
import { useMessagesStore } from './messagesStore';
import api from "./api/axiosInstance";

const urlUsers = "users";

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
    ...mapActions(useMessagesStore, ["addMessage"]),
    async getUsers() {
      try {
        const { data } = await api.get(urlUsers);
        this.users = data;
      } catch (error) {
        this.addMessage("Error al obtener los usuarios", "error");
      }
    },

    async getUsersById(id) {
      try {
        const response = await api.get(urlUsers + '/' + id);
        return response.data;
      } catch (error) {
        this.addMessage("Error al obtener el usuario", "error");
      }
    },

    async removeUser(id) {
      try {
        await api.delete(urlUsers + '/' + id);
        this.addMessage("Usuario eliminado correctamente", "success");
        return true;
      } catch (error) {
        this.addMessage("Error al eliminar el usuario", "error");
      }

    },

    async addUser(user) {
      try {
        const response = await api.post(urlUsers + '/', user);
        this.addMessage("Usuario creado correctamente", "success");
        return response.data;
      } catch (error) {
        this.addMessage("Error al crear el usuario", "error");
      }

    },

    async updateUser(user) {
      try {
        const response = await api.put(urlUsers + '/' + user.id, user);
        this.addMessage("Usuario actualizado correctamente", "success");
        return response.data;
      } catch (error) {
        this.addMessage("Error al actualizar el usuario", "error");
      }
    }
  }
});
