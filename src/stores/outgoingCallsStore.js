import axios from "axios";
import { defineStore, mapActions } from "pinia";

const SERVER = "http://localhost:3000";
const CALLS = "/outgoing_calls/";

export const useOutgoingCallsStore = defineStore("outgoingCalls", {
  state: () => ({
    outgoingCalls: [],
  }),
  actions: {
    ...mapActions(useMessagesStore, ["addMessage"]),
    async fetchCalls() {
      try {
        const response = await axios.get(SERVER + CALLS);
        this.outgoingCalls = response.data;
        return response.data;
      } catch (error) {
        this.addMessage("Error al obtener llamadas", "error");
        console.error("Error al obtener llamadas:", error);
      }
    },
    async fetchCallsByPatientId(patientId) {
      try {
        const response = await axios.get(
          `${SERVER + CALLS}?patient_id=${patientId}`
        );
        return response.data;
      } catch (error) {
        this.addMessage("Error al obtener llamadas del paciente", "error");
        console.error("Error al obtener llamadas del paciente:", error);
      }
    },
    async deleteCall(id) {
      try {
        const response = await axios.delete(SERVER + CALLS + id);
        this.addMessage("Llamada eliminada correctamente", "success");
        return response.data;
      } catch (error) {
        this.addMessage("Error al eliminar la llamada", "error");
        console.error("Error al eliminar la llamada:", error);
      }
    },
    async saveCall(call) {
      try {
        if (call.id) {
          // Actualizar llamada existente
          const response = await axios.put(SERVER + CALLS + call.id, call);
          this.addMessage("Llamada actualizada correctamente", "success");
          return response.data;
        } else {
          // Guardar nueva llamada
          const response = await axios.post(SERVER + CALLS, call);
          this.addMessage("Llamada guardada correctamente", "success");
          return response.data;
        }
      } catch (error) {
        this.addMessage("Error al guardar la llamada", "error");
        console.error("Error al guardar la llamada:", error);
      }
    },
    async getCallById(id) {
      try {
        const response = await axios.get(SERVER + CALLS + id);
        return response.data;
      } catch (error) {
        console.error("Error al obtener la llamada:", error);
      }
    },
  },
});
