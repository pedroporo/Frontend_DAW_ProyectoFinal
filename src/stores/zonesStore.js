import { defineStore, mapActions } from 'pinia';
import axios from 'axios';
import { useMessagesStore } from './messagesStore';

const urlZones = "http://localhost:3000/zones";

export const useZonesStore = defineStore('zones', {
  state: () => ({
    zones: [],
  }),
  actions: {
    ...mapActions(useMessagesStore, ["addMessage"]),
    async getZones() {
      try {
        const { data } = await axios.get(urlZones);
        this.zones = data;
        return data;
      } catch (error) {
        this.addMessage("Error al obtener zonas", "error");
      }
    }
  }
});
