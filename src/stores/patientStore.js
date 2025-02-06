import { defineStore } from 'pinia'
import axios from 'axios'

const urlPacientes = "http://localhost:3000/patients"

export const useStore = defineStore('store', {
  state: () => ({
    users: [],
    contacts: []
  }),
  getters: {
    userNames: (state) => (id) => state.users.find((user) => user.id == id)?.first_name,
    contactNames: (state) => (id) => state.contacts.find((contact) => contact.patient_id == id)?.first_name ?? "Desconocido" 
  },
  actions: {
    async getPatients() {
      try {
        const { data } = await axios.get(urlPacientes)
        return data
      } catch (error) {
        alert("Error al obtener pacientes:", error)
      }
    },
    async getPatient(id) {
      try {
        const { data } = await axios.get(`${urlPacientes}/${id}`)
        return data
      } catch (error) {
        alert("Error al obtener paciente:", error)
      }
    },
    async addPatient(patient) {
      try {
        await axios.post(urlPacientes, patient)
      } catch (error) {
        alert("Error al crear paciente:", error)
      }
    },
    async updatePatient(patient) {
      try {
        const { data } = await axios.put(`${urlPacientes}/${patient.id}`, patient)
        return data
      } catch (error) {
        alert("Error al actualizar paciente:", error)
      }
    },
    async removePatient(id) {
      try {
        await axios.delete(`${urlPacientes}/${id}`)
      } catch (error) {
        alert("Error al eliminar paciente:", error)
      }
    },
    async getUsers() {
      try {
        const { data } = await axios.get("http://localhost:3000/users")
        this.users = data
      } catch (error) {
        alert("Error al obtener usuarios:", error)
      }
    },
    async getContactsByPatientId(id) {
      try {
        const { data } = await axios.get(`http://localhost:3000/contacts?patient_id=${id}`);
        return data;
      } catch (error) {
        console.error("Error al obtener contactos:", error);
        return [];
      }
    }
  }
})
