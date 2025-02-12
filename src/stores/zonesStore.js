import { defineStore } from 'pinia';
import axios from 'axios';

const urlZones = "http://localhost:3000/zones";

export const useZonesStore = defineStore('zones', {
  state: () => ({
    zones: [],
  }),
  getters: {
    zonesNames: (state) => (id) => {
      const zone = state.zones.find(zone => zone.id == id);
      if (zone) {
        return zone.name;
      }
      return 'Zona desconocida';
    }
  },
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
