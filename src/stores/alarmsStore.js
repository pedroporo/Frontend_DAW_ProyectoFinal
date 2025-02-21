import axios from 'axios'
import { defineStore, mapActions } from 'pinia'
import { useMessagesStore } from './messagesStore'
const urlAlarms = "alarms/";

export const useAlarmsStore = defineStore('alarms', {
  state: () => ({
    alarmasTipo: [
      { type_id: 1, type: 'medication' },
      { type_id: 2, type: 'special_alert' },
      { type_id: 3, type: 'emergency_followup' },
      { type_id: 4, type: 'bereavement' },
      { type_id: 5, type: 'hospital_discharge' },
      { type_id: 6, type: 'absence_suspension' },
      { type_id: 7, type: 'return_from_absence' }
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
      const alarm = state.alarmasTipo.find(alarm => alarm.type_id == id);
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
    async addAlarm(alarm) {
      try {
        const response = await axios.post(urlAlarms, alarm);
        this.addMessage("Alarma guardada correctamente", "success");
        return response.data;
      } catch (error) {
        this.addMessage("Error al guardar la alarma", "error");
      }
    },
    async updateAlarm(alarm) {
      try {
        const response = await axios.put(urlAlarms + alarm.id, alarm);
        this.addMessage("Alarma actualizada correctamente", "success");
        return response.data;
      } catch (error) {
        this.addMessage("Error al actualizar la alarma", "error");
      }
    }
  }
})
