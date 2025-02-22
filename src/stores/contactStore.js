import { defineStore, mapActions } from 'pinia';
import { useMessagesStore } from './messagesStore';
import api from "./api/axiosInstance";

const urlContacts = "contacts";

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
    ...mapActions(useMessagesStore, ["addMessage"]),
    async getContacts() {
      try {
        const { data } = await api.get(urlContacts);
        this.contacts = data;
        return data;
      } catch (error) {
        this.addMessage("Error al obtener contactos", "error");
      }
    },
    async getContact(id) {
      try {
        const { data } = await api.get(`${urlContacts}/${id}`);
        return data;
      } catch (error) {
        this.addMessage("Error al obtener contacto", "error");
      }
    },
    async addContact(contact) {
      try {
        const { data } = await api.post(urlContacts, contact);
        this.contacts.push(data);
        this.addMessage("Contacto creado correctamente", "success");
      } catch (error) {
        this.addMessage("Error al crear contacto", "error");
      }
    },
    async updateContact(contact) {
      try {
        const { data } = await api.put(`${urlContacts}/${contact.id}`, contact);
        this.contacts = this.contacts.map(c => c.id === data.id ? data : c);
        this.addMessage("Contacto actualizado correctamente", "success");
      } catch (error) {
        this.addMessage("Error al actualizar contacto", "error");
      }
    },
    async deleteContact(id) {
      try {
        await api.delete(`${urlContacts}/${id}`);
        this.contacts = this.contacts.filter(contact => contact.id !== id);
        this.addMessage("Contacto eliminado correctamente", "success");
      } catch (error) {
        this.addMessage("Error al eliminar contacto", "error");
      }
    },
    async deleteContactByPatientId(patientId) {
      try {
        const response = await api.delete(
          `${urlContacts}?patient_id=${patientId}`
        );
        this.contacts = this.contacts.filter(contact => contact.patient_id != patientId);
        this.addMessage("Contactos eliminados correctamente", "success");
        return response.data;
      } catch (error) {
        this.addMessage("Error al eliminar contactos", "error");
      }
    }
  }
});
