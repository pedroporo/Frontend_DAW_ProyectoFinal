import { defineStore, mapActions } from 'pinia';
import { useMessagesStore } from './messagesStore';
import api from "./api/axiosInstance";

const urlIncomingCalls = "incoming-calls";

export const useIncomingCallsStore = defineStore('data', {
    state() {
        return {
            tiposLlamada: {
                emergencia: {
                    social_emergency: "Emergencias sociales",
                    medical_emergency: "Emergencias sanitarias",
                    loneliness_crisis: "Crisis de soledad o angustia",
                    unanswered_alarm: "Alarma sin respuesta"
                },
                no_emergencia: {
                    absence_notification: "Notificar ausencias o retornos",
                    data_update: "Modificar datos personales",
                    accidental: "Llamadas accidentales",
                    info_request: "Petición de información",
                    complaint: "Formulación de sugerencias, quejas o reclamaciones",
                    social_call: "Llamadas sociales (para saludar o hablar con el personal)",
                    medical_appointment: "Registrar citas médicas tras una llamada",
                    other: "Otros tipos de llamadas"
                }
            }
        }
    },

    actions: {
        ...mapActions(useMessagesStore, ["addMessage"]),
        async getLlamadasEntrantes() {
            try {
                const response = await api.get(urlIncomingCalls);
                console.log(response.data);
                return response.data.data;
            } catch (error) {
                this.addMessage("Error al obtener las llamadas entrantes", "error");
            }
        },
        translateTipoLlamada(type) {
            for (let categoria in this.tiposLlamada) {
                if (type in this.tiposLlamada[categoria]) {
                    return this.tiposLlamada[categoria][type];
                }
            }
            return type;
        },
        formatDateTime(timestamp) {
            if (!timestamp) return { fecha: "Fecha no disponible", hora: "Hora no disponible" };

            const fecha = timestamp.split(" ")[0];
            const hora = timestamp.split(" ")[1].split(":").slice(0, 2).join(":");

            return { fecha, hora };
        },

        async getLlamadasEntrantesPorPaciente(patientid) {
            try {
                const response = await api.get(`${urlIncomingCalls}?patient_id=${patientid}`);
                return response.data.data;
            } catch (error) {
                console.error(error);
            }
        },

        async getLlamadasEntrantesId(id) {
            try {
                const response = await api.get(`${urlIncomingCalls}/${id}`);
                return response.data.data;
            } catch (error) {
                this.addMessage("Error al obtener la llamada", "error");
            }
        },

        async removeIncomingCall(id) {
            try {
                await api.delete(`${urlIncomingCalls}/${id}`);
                this.addMessage("Llamada eliminada correctamente", "success");
                return true;
            } catch (error) {
                this.addMessage("Error al eliminar la llamada", "error");
            }
        },
        async removeIncomingCallByPatientId(patientId) {
            try {
                const response = await api.delete(`${urlIncomingCalls}?patient_id=${patientId}`);
                this.addMessage("Llamadas eliminadas correctamente", "success");
                return response.data.data;
            } catch (error) {
                this.addMessage("Error al eliminar las llamadas", "error");
            }
        },
        async addIncomingCall(call) {
            try {
                const response = await api.post(`${urlIncomingCalls}/`, call);
                this.addMessage("Llamada guardada correctamente", "success");
                return response.data.data;
            } catch (error) {
                this.addMessage("Error al guardar la llamada", "error");
            }
        },

        async updateIncomingCall(call) {
            try {
                const response = await api.put(`${urlIncomingCalls}/${call.id}`, call);
                this.addMessage("Llamada actualizada correctamente", "success");
                return response.data.data;
            } catch (error) {
                this.addMessage("Error al actualizar la llamada", "error");
            }
        }
    }
});
