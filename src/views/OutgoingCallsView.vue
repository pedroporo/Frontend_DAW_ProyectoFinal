<script>
import { mapActions, mapState } from "pinia";
import { useDataStore } from "@/stores/store";

export default {
    data() {
        return {
            llamadasSalientes: [],
        };
    },
    computed: {
        ...mapState(useDataStore, ['getAlarmName', "getUserNameSaliente", "getPatientNameSaliente"]),
    },
    methods: {
        ...mapActions(useDataStore, ["getLlamadasSalientes", 'removeOutgoingCall']),

        deleteCall(id) {
            if (confirm("¿Seguro que quieres borrar esta llamada?")) {
                if (this.removeOutgoingCall(id)) {
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
        }
    },
    async mounted() {
        this.llamadasSalientes = await this.getLlamadasSalientes();
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
                    <td>{{ getPatientNameSaliente(call.patient_id) }}</td>
                    <td>{{ getUserNameSaliente(call.user_id) }}</td>
                    <td>{{ call.type === 'planned' ? 'Planificada' : 'No planificada' }}</td>
                    <td>{{ call.description }}</td>
                    <td>{{ getAlarmName(call.alarm_id) }}</td>
                    <td>
                        <button @click="edit(call.id)">Editar</button>
                        <button @click="deleteCall(call.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>