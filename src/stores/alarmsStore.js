import axios from 'axios'
import { defineStore, mapActions } from 'pinia'
import { useMessagesStore } from './messagesStore'
const urlAlarms = 'http://localhost:3000/alarms/'
export const useAlarmsStore = defineStore('alarms', {
  state: () => ({
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
  }),
  getters: {
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
    ...mapActions(useMessagesStore, ['addMessage']),
    async getAlarmas() {
      try {
        const response = await axios.get(urlAlarms);
        //this.alarmas = response.data;
        return response.data;
      } catch (error) {
        this.addMessage("Error al obtener las alarmas", "error");
      }
    },
    async getAlarmById(id) {
      try {
        const response = await axios.get(urlAlarms + id);
        return response.data;
      } catch (error) {
        this.addMessage("Error al obtener la alarma", "error");
      }
    },
  }
})
