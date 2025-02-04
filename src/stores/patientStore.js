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
    contactNames: (state) => (id) => state.contacts.find((contact) => contact.patient_id == id)?.first_name
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
    async createPatient(patient) {
      try {
        const { data } = await axios.post(urlPacientes, patient)
        return data
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
    async deletePatient(id) {
      try {
        const { data } = await axios.delete(`${urlPacientes}/${id}`)
        return data
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
    async getContacts() {
      try {
        const { data } = await axios.get("http://localhost:3000/contacts")
        this.contacts = data
      } catch (error) {
        alert("Error al obtener contactos:", error)
      }
    }
  }
})
