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
        ...mapActions(useIncomingCallsStore, ["getLlamadasEntrantes", 'removeIncomingCall', 'formatDateTime', 'translateTipoLlamada']),
        ...mapActions(usePatientsStore, ['getPatients']),
        deleteCall(id) {
            if (confirm("¿Seguro que quieres borrar esta llamada?")) {
                if (this.removeIncomingCall(id)) {
                    this.llamadasEntrantes = this.llamadasEntrantes.filter(llamada => llamada.id != id);
                }
            }
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
    <div class="calls-history">
        <h2>Historial de Llamadas Entrantes</h2>
        <button @click="$router.push('/incomingForm')" class="btn btn-primary">+ Llamada Entrante</button>
        <table class="calls-table">
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
                    <td>
                        <button @click="edit(call.id)" class="btn btn-secondary btn-sm">Editar</button>
                        <button @click="deleteCall(call.id)" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
/* Contenedor principal */
.calls-history {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
}

/* Título */
.calls-history h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 2rem;
    color: #333;
}

/* Botón principal */
.btn {
    display: inline-block;
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
    margin-bottom: 10px;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

/* Tabla */
.calls-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.calls-table th,
.calls-table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
    font-size: 16px;
}

.calls-table th {
    background-color: #f1f1f1;
    font-weight: bold;
}

.calls-table tr:nth-child(even) {
    background-color: #fafafa;
}

.calls-table tr:hover {
    background-color: #f5f5f5;
}

/* Botones de acción en la tabla */
.btn-sm {
    padding: 5px 10px;
    font-size: 14px;
    margin-right: 10px;
}

.btn-secondary {
    background-color: #f0ad4e;
    color: #fff;
}

.btn-secondary:hover {
    background-color: #ec971f;
}

.btn-danger {
    background-color: #d9534f;
    color: #fff;
}

.btn-danger:hover {
    background-color: #c9302c;
}

/* Responsive */
@media (max-width: 768px) {

    .calls-table th,
    .calls-table td {
        padding: 8px 10px;
        font-size: 14px;
    }
}
</style>
