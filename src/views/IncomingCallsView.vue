<script>
import { mapActions, mapState } from "pinia";
import { usePatientsStore } from "@/stores/patientStore";
import { useUsersStore } from "@/stores/usersStore";
import { useIncomingCallsStore } from "@/stores/incomingCallsStore";

export default {
    data() {
        return {
            llamadasEntrantes: [],
            search: '',
            patients: [],
        };
    },
    computed: {
        ...mapState(useIncomingCallsStore, ['tiposLlamada']),
        ...mapState(useUsersStore, ['userNames']),
        filteredIncomingCalls() {
            return this.llamadasEntrantes.filter(call => {
                const searchLower = this.search.toLowerCase();
                // Filtra por Nombre del paciente, teleoperador, tipo de llamada, fecha, hora y descripción
                return (
                    this.getPatientName(call.patient_id).toLowerCase().includes(searchLower) ||
                    call.timestamp.includes(searchLower) ||
                    this.userNames(call.user_id).includes(searchLower) ||
                    this.translateTipoLlamada(call.type).toLowerCase().includes(searchLower) ||
                    call.description.toLowerCase().includes(searchLower)
                );
            });
        }
    },
    methods: {
        ...mapActions(useIncomingCallsStore, ["getLlamadasEntrantes", 'removeIncomingCall']),
        ...mapActions(usePatientsStore, ['getPatients']),
        translateTipoLlamada(type) {
            for (let categoria in this.tiposLlamada) {
                if (type in this.tiposLlamada[categoria]) {
                    return this.tiposLlamada[categoria][type];
                }
            }
            return type;
        },
        deleteCall(id) {
            if (confirm("¿Seguro que quieres borrar esta llamada?")) {
                if (this.removeIncomingCall(id)) {
                    this.llamadasEntrantes = this.llamadasEntrantes.filter(llamada => llamada.id != id);
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
            this.$router.push(`/incomingForm/${id}`);
        },
        getPatientName(id) {
            const patient = this.patients.find(patient => patient.id == id);
            return patient ? patient.name + " " + patient.last_name : "Paciente no encontrado";
        }
    },

    async mounted() {
        this.llamadasEntrantes = await this.getLlamadasEntrantes();
        this.patients = await this.getPatients();
    }
};
</script>

<template>
    <div>
        <h2>Historial de Llamadas Entrantes</h2>
        <div class="search-wrapper panel-heading col-sm-12">
            <input type="text" v-model="search" class="form-control mb-3" placeholder="Buscar llamadas...">
        </div>
        <button @click="$router.push('/incomingForm')">+ Llamada Entrante</button>
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Paciente</th>
                    <th>Operador</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="call in filteredIncomingCalls" :key="call.id">
                    <td>{{ formatDateTime(call.timestamp).fecha }}</td>
                    <td>{{ formatDateTime(call.timestamp).hora }}</td>
                    <td>{{ getPatientName(call.patient_id) }}</td>
                    <td>{{ userNames(call.user_id) }}</td>
                    <td>{{ translateTipoLlamada(call.type) }}</td>
                    <td>{{ call.description }}</td>
                <tr>
                    <td>
                        <button @click="edit(call.id)">Editar</button>
                        <button @click="deleteCall(call.id)">Eliminar</button>
                    </td>
                </tr>
                </tr>
            </tbody>
        </table>
    </div>
</template>