import { defineStore, mapActions } from "pinia";
import { useMessagesStore } from "./messagesStore";
import api from "./api/axiosInstance";

export const useReportsStore = defineStore("reports", {
  state: () => ({}),
  getters: {},
  actions: {
    ...mapActions(useMessagesStore, ["addMessage"]),

    async fetchPatients() {
      try {
        const { data } = await api.get("reports/patients");
        console.log("getPatients:", data.data);
        return data.data;
      } catch (error) {
        this.addMessage("Error al obtener pacientes" + error, "error");
      }
    },
    async fetchPatientsPDF() {
      try {
        const response = await api.get("reports/patients/pdf", {
          responseType: "blob",
        });
        console.log("getPatientsPDF:", response.data);
        return response.data;
      } catch (error) {
        this.addMessage("Error al generar PDF de pacientes " + error, "error");
      }
    },
    async fetchDoneCalls(date) {
      try {
        const { data } = await api.get(`reports/done-calls?date=${date}`);
        console.log("getDoneCalls:", data.outgoing_calls);
        return data;
      } catch (error) {
        this.addMessage(
          "Error al obtener las llamadas realizadas " + error,
          "error"
        );
        return [];
      }
    },
    async fetchDoneCallsPDF(date) {
      try {
        const response = await api.get("reports/done-calls/pdf?date=" + date, {
          responseType: "blob",
        });
        console.log("getDoneCallsPDF:", response.data);
        return response.data;
      } catch (error) {
        this.addMessage(
          "Error al generar PDF de llamadas realizadas " + error,
          "error"
        );
      }
    },
    async fetchScheduledCallsDate(date) {
      try {
        const response = await api.get(
          "reports/scheduled-calls-date?date=" + date
        );
        console.log("getScheduledCallsDate:", response.data.scheduled_calls);
        return response.data.scheduled_calls;
      } catch (error) {
        this.addMessage(
          "Error al obtener llamadas planificadas " + error,
          "error"
        );
      }
    },
    async fetchScheduledCallsPDF(date) {
      try {
        const response = await api.get(
          "reports/scheduled-calls-date-pdf?date=" + date,
          { responseType: "blob" }
        );
        console.log("getScheduledCallsPDF:", response.data);
        return response.data;
      } catch (error) {
        this.addMessage(
          "Error al generar PDF de llamadas planificadas " + error,
          "error"
        );
      }
    },
    async fetchUserCalls() {
      try {
        const { data } = await api.get("reports/callsUser");
        console.log("getUserCalls:", data);
        return data;
      } catch (error) {
        this.addMessage(
          "Error al obtener llamadas del usuario " + error,
          "error"
        );
      }
    },
    async fetchUserCallsPDF() {
      try {
        const response = await api.get("reports/callsUser/pdf", {
          responseType: "blob",
        });
        console.log("getUserCallsPDF:", response.data);
        return response.data;
      } catch (error) {
        this.addMessage(
          "Error al generar PDF de llamadas del usuario " + error,
          "error"
        );
      }
    },
    async fetchPatientCallHistory(id) {
      try {
        const { data } = await api.get(`reports/patients/${id}/call-history`);
        console.log("getPatientCallHistory:", data);
        return data;
      } catch (error) {
        this.addMessage(
          "Error al obtener historial de llamadas del paciente " + error,
          "error"
        );
      }
    },
    async fetchPatientCallHistoryPDF(id) {
      try {
        const response = await api.get(
          `reports/patients/${id}/call-history/pdf`,
          { responseType: "blob" }
        );
        console.log("getPatientCallHistoryPDF:", response.data);
        return response.data;
      } catch (error) {
        this.addMessage(
          "Error al generar PDF del historial de llamadas " + error,
          "error"
        );
      }
    },
    async fetchEmergencies(zones) {
      try {
        const zoneParams = Array.isArray(zones) ? zones.join(",") : zones;
        console.log("fetchEmergencies:", zoneParams);
        const { data } = await api.get(
          `reports/emergencies?zone=${zoneParams}`
        );
        console.log("getEmergencies:", data);
        return data;
      } catch (error) {
        this.addMessage("Error al obtener emergencias " + error, "error");
      }
    },
    async fetchEmergenciesPDF(zones) {
      try {
        const zoneParams = Array.isArray(zones) ? zones.join(",") : zones;
        const response = await api.get(
          `reports/emergencies/pdf?zone=${zoneParams}`,
          { responseType: "blob" }
        );
        console.log("getEmergenciesPDF:", response.data);
        return response.data;
      } catch (error) {
        this.addMessage(
          "Error al generar PDF de emergencias " + error,
          "error"
        );
      }
    },
  },
});
