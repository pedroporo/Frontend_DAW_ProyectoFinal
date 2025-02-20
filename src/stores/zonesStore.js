import { defineStore, mapActions } from 'pinia';
import axios from 'axios';
import { useMessagesStore } from './messagesStore';

const urlZones = import.meta.env.VITE_API_BASE_URL + "zones";

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
