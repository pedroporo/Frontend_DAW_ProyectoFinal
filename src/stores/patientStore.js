import { defineStore, mapActions } from "pinia";
import { useMessagesStore } from "./messagesStore";
import api from "./api/axiosInstance";

const urlPacientes = "patients";

export const usePatientsStore = defineStore("patients", {
  state: () => ({}),
  getters: {},
  actions: {
    ...mapActions(useMessagesStore, ["addMessage"]),
    async getPatients() {
      try {
        const { data } = await api.get(urlPacientes);
        console.log(data);

        return data.data;
      } catch (error) {
        this.addMessage("Error al obtener pacientes", "error");
      }
    },
    async getPatientName(id) {
      try {
        const { data } = await api.get(`${urlPacientes}/${id}`);
        return data.data.name;
      } catch (error) {
        this.addMessage("Error al obtener paciente", "error");
      }
    },
    async getPatient(id) {
      try {
        const { data } = await api.get(`${urlPacientes}/${id}`);
        console.log(data);
        return data.data;
      } catch (error) {
        this.addMessage("Error al obtener paciente", "error");
      }
    },
    async addPatient(patient) {
      try {
        const { data } = await axios.post(urlPacientes, patient);
        this.addMessage("Paciente creado correctamente", "success");
        return data;
      } catch (error) {
        this.addMessage("Error al crear paciente", "error");
      }
    },
    async updatePatient(patient) {
      try {
        const { data } = await api.put(
          `${urlPacientes}/${patient.id}`,
          patient
        );
        this.addMessage("Paciente actualizado correctamente", "success");
        return data.data;
      } catch (error) {
        this.addMessage("Error al actualizar paciente", "error");
      }
    },
    async removePatient(id) {
      try {
        await api.delete(`${urlPacientes}/${id}`);
        this.addMessage("Paciente eliminado correctamente", "success");
      } catch (error) {
        this.addMessage("Error al eliminar paciente", "error");
      }
    },
  },
});
