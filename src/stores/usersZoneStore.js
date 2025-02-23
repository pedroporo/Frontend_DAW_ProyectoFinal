import { defineStore, mapActions } from 'pinia';
import { useMessagesStore } from './messagesStore';
import api from "./api/axiosInstance";

const urlUsersZones = "users_zones";

export const useUserZonesStore = defineStore('usersZones', {
  state: () => ({
    usersZone: [],
  }),
  actions: {
    ...mapActions(useMessagesStore, ["addMessage"]),
    async getUsersZones() {
      try {
        const { data } = await api.get(urlUsersZones);
        this.usersZone = data;
        return data.data;
      } catch (error) {
        this.addMessage("Error al obtener zonas", "error");
      }
    },
  }
});
