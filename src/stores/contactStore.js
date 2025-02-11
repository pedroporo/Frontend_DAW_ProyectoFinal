import { defineStore } from 'pinia';
import axios from 'axios';

const urlContacts = "http://localhost:3000/contacts";

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    contacts: [],
  }),
  getters: {
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
    async getContacts() {
      try {
        const { data } = await axios.get(urlContacts);
        this.contacts = data;
      } catch (error) {
        alert("Error al obtener contactos:", error);
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
        const { data } = await axios.post(urlContacts, contact);
        this.contacts.push(data);
      } catch (error) {
        alert("Error al crear contacto:", error);
      }
    },
    async updateContact(contact) {
      try {
        const { data } = await axios.put(`${urlContacts}/${contact.id}`, contact);
        this.contacts = this.contacts.map(c => c.id === data.id ? data : c);
      } catch (error) {
        alert("Error al actualizar contacto:", error);
      }
    },
    async deleteContact(id) {
      try {
        await axios.delete(`${urlContacts}/${id}`);
        this.contacts = this.contacts.filter(contact => contact.id !== id);
      } catch (error) {
        alert("Error al eliminar contacto:", error);
      }
    }
  }
});
