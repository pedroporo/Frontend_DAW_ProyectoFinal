import axios from 'axios'
import { defineStore } from 'pinia'
const SERVER = 'http://localhost:3000'
const ALARMS = '/alarms/'
const ALARMS_TYPE = '/alarms/'


export const useAlarmsStore = defineStore('alarms', {
  state: () => ({
    alarms: [],
  }),
  getters: {
    getAlarmById: (state) => (id) => state.alarms.find(alarm => alarm.id == id) || {},
    // getFamilyById: (state) => (id) => state.families.find(family => family.id == id) || {},
    // getGroupById: (state) => (id) => state.groups.find(group => group.id == id) || {},
    //getBookById: (id, book) => book.find(book => book.id == id) || {}
  },
  actions: {
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
        console.log(error);
      }
    },
    async deleteAlarm(id) {
      try {
          const response = await axios.delete(SERVER + ALARMS + id);
          return response.data;
      } catch (error) {
          console.log(error);
      }
  },
      async saveAlarm(alarm) {
        if (alarm.id) {
          try {
            // actualizar alarma
            const response = await axios.put(SERVER + ALARMS + alarm.id, alarm);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        } else {
          // guardar nueva alarma
          try {
            const response = await axios.post(SERVER + ALARMS, alarm);
            return response.data;
          } catch (error) {
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
