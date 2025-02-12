import { defineStore } from 'pinia'
import axios from 'axios'
const urlIncomingCalls = "http://localhost:3000/incoming_calls";
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
        async getLlamadasEntrantes() {
            const response = await axios.get(urlIncomingCalls);
            return response.data;
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

            const fecha = timestamp.split("T")[0];
            const hora = timestamp.split("T")[1].split(":").slice(0, 2).join(":");

            return { fecha, hora };
        },

        async getLlamadasEntrantesPorPaciente(patientid) {
            try {
                const response = await axios.get(urlIncomingCalls + '?patient_id=' + patientid);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },

        async getLlamadasEntrantesId(id) {
            const response = await axios.get(urlIncomingCalls + '/' + id);
            return response.data;
        },

        async removeIncomingCall(id) {
            await axios.delete(urlIncomingCalls + '/' + id);
            localStorage
            return true;
        },

        async addIncomingCall(call) {
            const response = await axios.post(urlIncomingCalls + '/', call);
            return response.data;
        },

        async updateIncomingCall(call) {
            try {
                const response = await axios.put(urlIncomingCalls + '/' + call.id, call);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        }
    }

})