<template>
    <div class="reports">
      <h1>Informes</h1>
  
      <!-- <div class="section">
        <h2>Pacientes</h2>
        <button @click="getPatientsList">Obtener Pacientes</button>
        <ul v-if="patients.length">
          <li v-for="patient in patients" :key="patient.dni">
            {{ patient.name }} {{ patient.last_name }}
          </li>
        </ul>
        <button @click="downloadPatientsPDF">Generar PDF de Pacientes</button>
      </div> -->
  
    <div v-if="tipoInforme === 'calls_done'" class="section">
      <h2>Llamadas Realizadas</h2>
      <input v-model="doneCallsDate" placeholder="Fecha" type="date" />
      <button @click="getDoneCalls(doneCallsDate)">Obtener Llamadas Realizadas</button>
      <table v-if="doneCalls && doneCalls.outgoing_calls && doneCalls.outgoing_calls.length > 0">
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Paciente</th>
            <th>Descripción</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="call in doneCalls.outgoing_calls" :key="call.id">
            <td>{{ call.timestamp.slice(0, -3) }}</td>
            <td>{{ call.patient.name }} {{ call.patient.last_name }}</td>
            <td>{{ call.description }}</td>
            <td>{{ call.patient.address }}</td>
            <td>{{ call.patient.city }}</td>
            <td>{{ call.patient.phone }}</td>
            <td>{{ call.patient.email }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="downloadDoneCallsPDF(doneCallsDate)">Generar PDF de Llamadas Realizadas</button>
    </div>
  
    <div class="section" v-if="tipoInforme === 'calls_to_do'">
      <h2>Llamadas Planificadas</h2>
      <input v-model="scheduledCallsDate" placeholder="Fecha" type="date" />
      <button @click="getScheduledCalls(scheduledCallsDate)">Obtener Llamadas Planificadas</button>
      <table v-if="scheduledCalls.length">
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Paciente</th>
            <th>Descripción</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="call in scheduledCalls" :key="call.id">
            <td>{{ call.timestamp.slice(0, -3) }}</td>
            <td>{{ call.patient.name }} {{ call.patient.last_name }}</td>
            <td>{{ call.description }}</td>
            <td>{{ call.patient.address }}</td>
            <td>{{ call.patient.city }}</td>
            <td>{{ call.patient.phone }}</td>
            <td>{{ call.patient.email }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="downloadScheduledCallsPDF(scheduledCallsDate)">Generar PDF de Llamadas Planificadas</button>
    </div>
    <div class="section" v-if="tipoInforme === 'calls_by_user'">
      <h2>Llamadas del Usuario</h2>
      <button @click="getUserCalls">Obtener Llamadas del Operador actual</button>
    <table v-if="userCalls.incoming_calls.length || userCalls.outgoing_calls.length">
      <thead>
        <tr>
        <th>Tipo de Llamada</th>
        <th>Fecha y Hora</th>
        <th>Descripción</th>
        <th>Tipo</th>
        <!-- <th>Paciente</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="call in userCalls.incoming_calls" :key="call.id">
        <td>Entrante</td>
        <td>{{ call.timestamp.slice(0, -3) }}</td>
        <td>{{ call.description }}</td>
        <td>{{ call.type }}</td>
        <!-- <td>{{getPatientFullName(call.patient_id) }}</td> -->
        </tr>
        <tr v-for="call in userCalls.outgoing_calls" :key="call.id">
        <td>Saliente</td>
        <td>{{ call.timestamp.slice(0, -3) }}</td>
        <td>{{ call.description }}</td>
        <td>{{ call.type }}</td>
        <!-- <td>{{ getPatientFullName(call.patient_id) }}</td> -->
        </tr>
      </tbody>
    </table>
    <button @click="downloadUserCallsPDF">Generar PDF de Llamadas del Usuario</button>
    </div>
    <div class="section" v-if="tipoInforme === 'pacient_history'">
      <h2>Historial de Llamadas de Paciente</h2>
      <input v-model="patientId" placeholder="ID del Paciente" type="number" />
      <button @click="getPatientCallHistory">Obtener Historial de Llamadas del Paciente</button>
      <div v-if="patientCallHistory.patient">
        <p class="m-0"><strong>Nombre:</strong> {{ patientCallHistory.patient.name }} {{ patientCallHistory.patient.last_name }}</p>
      </div>
      <table v-if="patientCallHistory.incoming_calls.length || patientCallHistory.outgoing_calls.length">
        <thead>
        <tr>
          <th>Tipo de Llamada</th>
          <th>Fecha y Hora</th>
          <th>Descripción</th>
          <th>Tipo</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="call in patientCallHistory.incoming_calls" :key="call.id">
          <td>Entrante</td>
          <td>{{ call.timestamp }}</td>
          <td>{{ call.description }}</td>
          <td>{{ call.type }}</td>
        </tr>
        <tr v-for="call in patientCallHistory.outgoing_calls" :key="call.id">
          <td>Saliente</td>
          <td>{{ call.timestamp }}</td>
          <td>{{ call.description }}</td>
          <td>{{ call.type }}</td>
        </tr>
        </tbody>
      </table>
      <button @click="downloadPatientCallHistoryPDF">Generar PDF del Historial de Llamadas del Paciente</button>
    </div>
      <div class="section" v-if="tipoInforme === 'zone_info'">
        <h2>Emergencias por Zona</h2>
        <input v-model="zoneIds" placeholder="ID de Zona" type="text" />
        <button @click="getEmergencies(zoneIds)">Obtener Emergencias</button>
        <table v-if="emergencies.emergencies.length > 0">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Fecha y Hora</th>
              <th>Paciente</th>
              <th>Dirección</th>
              <th>Ciudad</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Tipo de emergencia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emergency in emergencies.emergencies" :key="emergency.id">
              <td>{{ emergency.description }}</td>
              <td>{{ emergency.timestamp }}</td>
              <td>{{ emergency.patient.name }} {{ emergency.patient.last_name }}</td>
              <td>{{ emergency.patient.address }}</td>
              <td>{{ emergency.patient.city }}</td>
              <td>{{ emergency.patient.phone }}</td>
              <td>{{ emergency.patient.email }}</td>
              <td>{{ emergency.type }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="downloadEmergenciesPDF(zoneIds)">Generar PDF de Emergencias</button>
      </div>
    </div>
  </template>
  
  <script>
import { useReportsStore } from "@/stores/reportsStore";
import { mapActions } from "pinia";
  
  export default {
    props: {
      tipoInforme: {
        type: String,
        required: false,
      },
    },
    data() {
      return {
        patientId: null,
        doneCallsDate: "",
        scheduledCallsDate: "",
        patients: [],
        doneCalls: {},
        scheduledCalls: {},
        userCalls: { incoming_calls: [], outgoing_calls: [] },
        patientCallHistory: { patient: [], incoming_calls: [], outgoing_calls: [] },
        zoneIds: [],
        emergencies: { zones:[], emergencies: [] },
      };
    },
    methods: {
        ...mapActions(useReportsStore, [
            "fetchPatients",
            "fetchPatientsPDF",
            "fetchDoneCalls",
            "fetchDoneCallsPDF",
            "fetchScheduledCallsDate",
            "fetchScheduledCallsPDF",
            "fetchUserCalls",
            "fetchUserCallsPDF",
            "fetchPatientCallHistory",
            "fetchPatientCallHistoryPDF",
            "fetchEmergencies",
            "fetchEmergenciesPDF",
        ]),
      async downloadPatientsPDF() {
        const pdf = await this.fetchPatientsPDF();
        this.downloadFile(pdf, "patients_list.pdf");
      },
      async getDoneCalls(date) {
        this.doneCalls = await this.fetchDoneCalls(date);
      },
      async downloadDoneCallsPDF(date) {
        const pdf = await this.fetchDoneCallsPDF(date);
        this.downloadFile(pdf, `done_calls_in_${date}.pdf`);
      },
      async getScheduledCalls(date) {
        this.scheduledCalls = await this.fetchScheduledCallsDate(date);
      },
      async downloadScheduledCallsPDF(date) {
        const pdf = await this.fetchScheduledCallsPDF(date);
        this.downloadFile(pdf, `scheduled_calls_in_${date}.pdf`);
      },
      async getUserCalls() {
        this.userCalls = await this.fetchUserCalls();
      },
      async downloadUserCallsPDF() {
        const pdf = await this.fetchUserCallsPDF();
        this.downloadFile(pdf, "user_calls.pdf");
      },
      async getPatientCallHistory() {
        if (this.patientId) {
          this.patientCallHistory = await this.fetchPatientCallHistory(this.patientId);
        }
      },
      async downloadPatientCallHistoryPDF() {
        if (this.patientId) {
          const pdf = await this.fetchPatientCallHistoryPDF(this.patientId);
          this.downloadFile(pdf, `patient_${this.patientId}_call_history.pdf`);
        }
      },
    async getEmergencies(zoneIds) {
        const zonesArray = zoneIds.split(',').map(id => parseInt(id.trim()));
      console.log(zonesArray);
      this.emergencies = await this.fetchEmergencies(zonesArray);
    },
    async downloadEmergenciesPDF(zoneIds) {
      const zonesArray = zoneIds.split(',').map(id => parseInt(id.trim()));
      const pdf = await this.fetchEmergenciesPDF(zonesArray);
      this.downloadFile(pdf, "emergencies.pdf");
    },
      downloadFile(data, filename) {
        if (data instanceof Blob) {
            const url = URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            console.error("Error: No se recibió un archivo PDF válido.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .reports {
    font-family: Arial, sans-serif;
  }
  
  .section {
    margin-bottom: 20px;
  }
  
  button {
    margin-top: 10px;
  }
  
  input {
    padding: 5px;
    margin-top: 10px;
  }
  </style>  