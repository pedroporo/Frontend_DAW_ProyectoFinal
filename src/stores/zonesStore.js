import { defineStore, mapActions } from 'pinia';
import { useMessagesStore } from './messagesStore';
import api from "./api/axiosInstance";

const urlZones = "zones";

export const useZonesStore = defineStore('zones', {
  state: () => ({
    zones: [],
  }),
  getters: {
   /*  zonesNames: (state) => (id) => {
      const zone = state.zones.find(zone => zone.id == id);
      if (zone) {
        return zone.name;
      }
      return 'Zona desconocida';
    } */
  },
  actions: {
    ...mapActions(useMessagesStore, ["addMessage"]),
    async getZones() {
      try {
        const { data } = await api.get(urlZones);
        this.zones = data.data;
        console.log(data);
        return data.data;
      } catch (error) {
        this.addMessage("Error al obtener zonas", "error");
      }
    }
  }
});
