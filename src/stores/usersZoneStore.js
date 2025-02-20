import { defineStore, mapActions } from 'pinia';
import axios from 'axios';
import { useMessagesStore } from './messagesStore';

const urlUsersZones = import.meta.env.VITE_API_BASE_URL + "users_zones";

export const useUserZonesStore = defineStore('usersZones', {
  state: () => ({
    usersZone: [],
  }),
  actions: {
    ...mapActions(useMessagesStore, ["addMessage"]),
    async getUsersZones() {
      try {
        const { data } = await axios.get(urlUsersZones);
        this.usersZone = data;
        return data;
      } catch (error) {
        this.addMessage("Error al obtener zonas", "error");
      }
    },
  }
});
