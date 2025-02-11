import axios from 'axios'
import { defineStore, mapActions } from 'pinia'
import { useMessagesStore } from './messagesStore'
const SERVER = 'http://localhost:3000'
const ALARMS = '/alarms/'
const ALARMS_TYPE = '/alarms/'


export const useAlarmsStore = defineStore('alarms', {
  state: () => ({
    alarms: [],
  }),
  getters: {
    getAlarmById: (state) => (id) => state.alarms.find(alarm => alarm.id == id) || {},
  },
  actions: {
    ...mapActions(useMessagesStore, ['addMessage']),
   async fetchAlarms() {
      try {
        const response = await axios.get(SERVER + ALARMS);
        this.alarms = response.data;
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAlarmsByPatientId(id) {
      try {
        const response = await axios.get(SERVER + ALARMS + '?patient_id=' + id);
        return response.data;
      } catch (error) {
        this.addMessage('Error al obtener las alarmas', 'error');
        console.log(error);
      }
    },
    async deleteAlarm(id) {
      try {
          const response = await axios.delete(SERVER + ALARMS + id);
          this.addMessage('Alarma eliminada correctamente', 'success');
          return response.data;
      } catch (error) {
          this.addMessage('Error al eliminar la alarma', 'error');
          console.log(error);
      }
  },
      async saveAlarm(alarm) {
        if (alarm.id) {
          try {
            // actualizar alarma
            const response = await axios.put(SERVER + ALARMS + alarm.id, alarm);
            this.addMessage('Alarma actualizada correctamente', 'success');
            return response.data;
          } catch (error) {
            this.addMessage('Error al actualizar la alarma', 'error');
            console.log(error);
          }
        } else {
          // guardar nueva alarma
          try {
            const response = await axios.post(SERVER + ALARMS, alarm);
            this.addMessage('Alarma guardada correctamente', 'success');
            return response.data;
          } catch (error) {
            this.addMessage('Error al guardar la alarma', 'error');
            console.log(error);
          }
        }
      },
      async getAlarmTypeById(id){
        try {
            const response = await axios.get(SERVER + ALARMS_TYPE + id);
            return response.data;
          } catch (error) {
            console.log(error);
          }
      },

  }
})
