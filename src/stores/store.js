import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useDataStore = defineStore('data', {
    state() {
        return {
            users: [],
            pacientes: [],
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
            },
            alarmas: [
                { id: 1, type: 'medication' },
                { id: 2, type: 'special_alert' },
                { id: 3, type: 'emergency_followup' },
                { id: 4, type: 'bereavement' },
                { id: 5, type: 'hospital_discharge' },
                { id: 6, type: 'absence_suspension' },
                { id: 7, type: 'return_from_absence' }
            ],
            alarmasTraduccion: {
                medication: 'Medicación',
                special_alert: 'Alerta Especial',
                emergency_followup: 'Seguimiento de Emergencia',
                bereavement: 'Duelo',
                hospital_discharge: 'Alta Hospitalaria',
                absence_suspension: 'Suspensión por Ausencia',
                return_from_absence: 'Regreso de Ausencia',
            }

        }
    },

    getters: {
        getUserNameEntrante: (state) => (id) => state.users.find(user => user.id == id)?.first_name,

        getPatientNameEntrante: (state) => (id) => {
            const paciente = state.pacientes.find(paciente => paciente.id == id);
            if (paciente) {
                return paciente.name + " " + paciente.last_name;
            }
            return 'Desconocido';
        },


        getUserNameSaliente: (state) => (id) => state.users.find(user => user.id == id)?.first_name,

        getPatientNameSaliente: (state) => (id) => {
            const paciente = state.pacientes.find(paciente => paciente.id == id);
            if (paciente) {
                return paciente.name + " " + paciente.last_name;
            }
            return 'Desconocido';
        },

        getAlarmName: (state) => (id) => {
            const alarm = state.alarmas.find(alarm => alarm.id == id);
            if (alarm) {
                return state.alarmasTraduccion[alarm.type] || alarm.type;
            }
            return 'Alarma desconocida';
        },

        translateAlarmType: (state) => (alarmType) => {
            return state.alarmasTraduccion[alarmType] || alarmType;
        }

    },

    actions: {
        async getLlamadasEntrantes() {
            const response = await axios.get('http://localhost:3000/incoming_calls');
            return response.data;
        },

        async getLlamadasEntrantesId(id) {
            const response = await axios.get('http://localhost:3000/incoming_calls/' + id);
            return response.data;
        },

        async getLlamadasSalientes() {
            const response = await axios.get('http://localhost:3000/outgoing_calls');
            return response.data;
        },

        async getLlamadasSalientesId(id) {
            const response = await axios.get('http://localhost:3000/outgoing_calls/' + id);
            return response.data;
        },

        async getUsers() {
            const response = await axios.get('http://localhost:3000/users');
            this.users = response.data;
            return response.data;
        },

        async getPatients() {
            const response = await axios.get('http://localhost:3000/patients');
            this.pacientes = response.data;
            return response.data;
        },

        async getAlarmas() {
            const response = await axios.get('http://localhost:3000/alarms');
            this.alarmas = response.data;
            return response.data;
        },

        async removeIncomingCall(id) {
            await axios.delete(`http://localhost:3000/incoming_calls/${id}`);
            localStorage
            return true;
        },

        async addIncomingCall(call) {
            const response = await axios.post('http://localhost:3000/incoming_calls', call);
            return response.data;
        },

        async updateIncomingCall(call) {
            try {
                const response = await axios.put(`http://localhost:3000/incoming_calls/${call.id}`, call);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },

        async removeOutgoingCall(id) {
            await axios.delete(`http://localhost:3000/outgoing_calls/${id}`);
            localStorage
            return true;
        },

        async addOutgoingCall(call) {
            const response = await axios.post('http://localhost:3000/outgoing_calls', call);
            return response.data;
        },

        async updateOutgoingCall(call) {
            try {
                const response = await axios.put(`http://localhost:3000/outgoing_calls/${call.id}`, call);
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },

    }

})