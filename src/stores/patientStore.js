import { defineStore } from 'pinia';
import axios from 'axios';

const urlPacientes = "http://localhost:3000/patients";
const urlZones = "http://localhost:3000/zones";
const urlContacts = "http://localhost:3000/contacts";

export const useStore = defineStore('store', {
  state: () => ({
    users: [],
    contacts: [],
    zones: [],
  }),
  getters: {
    userNames: (state) => (id) => state.users.find((user) => user.id == id)?.first_name,
    contactNames: (state) => (id) => {
      return state.contacts
        .filter(contact => contact.patient_id == id)
        .map(contact => ({
          id: contact.id,
          name: `${contact.first_name} ${contact.last_name}`
        }));
    }

  },
  actions: {
    async getPatients() {
      try {
        const { data } = await axios.get(urlPacientes);
        return data;
      } catch (error) {
        alert("Error al obtener pacientes:", error);
      }
    },
    async getPatient(id) {
      try {
        const { data } = await axios.get(`${urlPacientes}/${id}`);
        return data;
      } catch (error) {
        alert("Error al obtener paciente:", error);
      }
    },
    async getContact(id) {
      try {
        const { data } = await axios.get(`${urlContacts}/${id}`);
        return data;
      } catch (error) {
        alert("Error al obtener contacto:", error);
      }
    },
    async addContact(contact) {
      try {
        const newContact = await axios.post(urlContacts, contact);
        this.contacts.push(newContact);
      } catch (error) {
        alert("Error al crear contacto:", error);
      }
    },
    async deleteContact(id) {
      try {
        await axios.delete(`${urlContacts}/${id}`);
        this.contacts = this.contacts.filter(contact => contact.id !== id);
      } catch (error) {
        alert("Error al eliminar contacto:", error);
      }
    },
    async updateContact(contact) {
      try {
        const { data } = await axios.put(`${urlContacts}/${contact.id}`, contact);
        this.contacts = this.contacts.map(contact => contact.id === data.id ? data : contact);
        return data;
      } catch (error) {
        alert("Error al actualizar contacto:", error);
      }
    },
    async addPatient(patient) {
      try {
        await axios.post(urlPacientes, patient);
      } catch (error) {
        alert("Error al crear paciente:", error);
      }
    },
    async updatePatient(patient) {
      try {
        const { data } = await axios.put(`${urlPacientes}/${patient.id}`, patient);
        return data;
      } catch (error) {
        alert("Error al actualizar paciente:", error);
      }
    },
    async removePatient(id) {
      try {
        await axios.delete(`${urlPacientes}/${id}`);
      } catch (error) {
        alert("Error al eliminar paciente:", error);
      }
    },
    async getUsers() {
      try {
        const { data } = await axios.get("http://localhost:3000/users");
        this.users = data;
      } catch (error) {
        alert("Error al obtener usuarios:", error);
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
    },
    async getZones() {
      try {
        const { data } = await axios.get(urlZones);
        this.zones = data;
      } catch (error) {
        alert("Error al obtener zonas:", error);
      }
    },
    async getContacts() {
      try {
        const { data } = await axios.get(urlContacts);
        this.contacts = data;
      } catch (error) {
        alert("Error al obtener contactos:", error);
      }
    }
  }
});
