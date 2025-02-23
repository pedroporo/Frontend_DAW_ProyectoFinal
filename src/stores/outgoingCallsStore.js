import { defineStore, mapActions } from "pinia";
import { useMessagesStore } from "./messagesStore";
import api from "./api/axiosInstance";

const CALLS = "outgoing-calls/";

export const useOutgoingCallsStore = defineStore("outgoingCalls", {
  state: () => ({
    outgoingCalls: [],
  }),

  actions: {
    ...mapActions(useMessagesStore, ["addMessage"]),
    async fetchCalls() {
      try {
        const response = await api.get(CALLS);
        this.outgoingCalls = response.data;
        console.log(response.data);
        return response.data;
      } catch (error) {
        this.addMessage("Error al obtener llamadas salientes", "error");
      }
    },
    async fetchCallsByPatientId(patientId) {
      try {
        const response = await api.get(
          `${CALLS}?patient_id=${patientId}`
        );
        return response.data;
      } catch (error) {
        this.addMessage("Error al obtener llamadas del paciente", "error");
      }
    },
    async deleteCall(id) {
      try {
        const response = await api.delete(CALLS + id);
        this.addMessage("Llamada eliminada correctamente", "success");
        return response.data;
      } catch (error) {
        this.addMessage("Error al eliminar la llamada", "error");
      }
    },
    async removeCallByPatientId(patientId) {
      try {
        const response = await api.delete(
          `${CALLS}?patient_id=${patientId}`
        );
        this.addMessage("Llamadas eliminadas correctamente", "success");
        return response.data;
      } catch (error) {
        this.addMessage("Error al eliminar las llamadas", "error");
      }
    },
    async addCall(call) {
      try {
        const response = await api.post(CALLS, call);
        this.addMessage("Llamada guardada correctamente", "success");
        return response.data;
      } catch (error) {
        this.addMessage("Error al guardar la llamada", "error");
      }
    },

    async updateCall(call) {
      try {
        const response = await api.put(CALLS + call.id, call);
        this.addMessage("Llamada actualizada correctamente", "success");
        return response.data;
      } catch (error) {
        this.addMessage("Error al actualizar la llamada", "error");
      }
    },
    async getCallById(id) {
      try {
        const response = await api.get(CALLS + id);
        return response.data;
      } catch (error) {
        this.addMessage("Error al obtener la llamada", "error");
      }
    },
  },
});
