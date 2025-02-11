import { defineStore } from 'pinia';
import axios from 'axios';

const urlZones = "http://localhost:3000/zones";

export const useZonesStore = defineStore('zones', {
  state: () => ({
    zones: [],
  }),
  actions: {
    async getZones() {
      try {
        const { data } = await axios.get(urlZones);
        this.zones = data;
      } catch (error) {
        alert("Error al obtener zonas:", error);
      }
    }
  }
});
