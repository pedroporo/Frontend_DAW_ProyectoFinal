<script>
import { mapActions, mapState } from "pinia";
import { useAlarmsStore } from "@/stores/alarmsStore";
import { useUsersStore } from "@/stores/usersStore";
import { usePatientsStore } from "@/stores/patientStore";
import { useOutgoingCallsStore } from "@/stores/outgoingCallsStore";
export default {
    data() {
        return {
            llamadasSalientes: [],
            patients: [],
        };
    },
    computed: {
        ...mapState(useUsersStore, ['userNames']),
        ...mapState(useAlarmsStore, ['getAlarmName']),
    },
    methods: {
        ...mapActions(useOutgoingCallsStore, ['fetchCalls', 'deleteCall']),
        ...mapActions(usePatientsStore, ['getPatients']),
        deleteOutgoingCall(id) {
            if (confirm("¿Seguro que quieres borrar esta llamada?")) {
                if (this.deleteCall(id)) {
                    this.llamadasSalientes = this.llamadasSalientes.filter(llamada => llamada.id != id);
                }
            }
        },

        formatDateTime(timestamp) {
            if (!timestamp) return { fecha: "Fecha no disponible", hora: "Hora no disponible" };

            const fecha = timestamp.split("T")[0];
            const hora = timestamp.split("T")[1].split(":").slice(0, 2).join(":");

            return { fecha, hora };
        },

        edit(id) {
            this.$router.push(`/outgoingForm/${id}`);
        },
        getPatientName(id) {
            const patient = this.patients.find(patient => patient.id == id);
            return patient ? patient.name + " " + patient.last_name : "Paciente no encontrado";
        }
    },
    async mounted() {
        this.llamadasSalientes = await this.fetchCalls();
        this.patients = await this.getPatients();
    }
};
</script>

<template>
    <div>
        <h2>Historial de Llamadas Salientes</h2>
        <button @click="$router.push('/outgoingForm')">+ Llamada Saliente</button>
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Paciente</th>
                    <th>Operador</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Alarmas</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="call in llamadasSalientes" :key="call.id">
                    <td>{{ formatDateTime(call.timestamp).fecha }}</td>
                    <td>{{ formatDateTime(call.timestamp).hora }}</td>
                    <td>{{ getPatientName(call.patient_id) }}</td>
                    <td>{{ userNames(call.user_id) }}</td>
                    <td>{{ call.type === 'planned' ? 'Planificada' : 'No planificada' }}</td>
                    <td>{{ call.description }}</td>
                    <td>{{ getAlarmName(call.alarm_id) }}</td>
                    <td>
                        <button @click="edit(call.id)">Editar</button>
                        <button @click="deleteOutgoingCall(call.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>