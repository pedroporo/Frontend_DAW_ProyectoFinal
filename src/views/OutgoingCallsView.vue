<script>
import { mapActions, mapState } from "pinia";
import { useDataStore } from "@/stores/store";

export default {
    data() {
        return {
            llamadasSalientes: [],
            search: '',
            sortKey: '',
            sortOrder: 1,
            sortableColumns: ["fecha", "hora", "patient", "operator", "type", "description", "alarm"],
            columnNames: {
                fecha: "Fecha",
                hora: "Hora",
                patient: "Paciente",
                operator: "Operador",
                type: "Tipo",
                description: "Descripción",
                alarm: "Alarmas"
            }

        };
    },
    computed: {
        ...mapState(useDataStore, ['getAlarmName', "getUserNameSaliente", "getPatientNameSaliente"]),
        filteredOutgoingCalls() {
            let filtered = this.llamadasSalientes.filter(call => {
                const searchLower = this.search.toLowerCase();
                return (
                    this.getPatientNameSaliente(call.patient_id).toLowerCase().includes(searchLower) ||
                    call.timestamp.includes(searchLower) ||
                    this.getUserNameSaliente(call.user_id).includes(searchLower) ||
                    this.getAlarmName(call.alarm_id).toLowerCase().includes(searchLower) ||
                    call.description.toLowerCase().includes(searchLower) ||
                    this.getType(call.type).toLowerCase().includes(searchLower)
                );
            });

            if (this.sortKey) {
                filtered.sort((a, b) => {
                    let valueA, valueB;

                    switch (this.sortKey) {
                        case "fecha":
                            valueA = a.timestamp.split("T")[0];
                            valueB = b.timestamp.split("T")[0];
                            break;
                        case "hora":
                            valueA = a.timestamp.split("T")[1];
                            valueB = b.timestamp.split("T")[1];
                            break;
                        case "patient":
                            valueA = this.getPatientNameSaliente(a.patient_id).toLowerCase();
                            valueB = this.getPatientNameSaliente(b.patient_id).toLowerCase();
                            break;
                        case "operator":
                            valueA = this.getUserNameSaliente(a.user_id).toLowerCase();
                            valueB = this.getUserNameSaliente(b.user_id).toLowerCase();
                            break;
                        case "type":
                            valueA = this.getType(a.type).toLowerCase();
                            valueB = this.getType(b.type).toLowerCase();
                            break;
                        case "description":
                            valueA = a.description.toLowerCase();
                            valueB = b.description.toLowerCase();
                            break;
                        case "alarm":
                            valueA = this.getAlarmName(a.alarm_id).toLowerCase();
                            valueB = this.getAlarmName(b.alarm_id).toLowerCase();
                            break;
                        default:
                            return 0;
                    }

                    return valueA.localeCompare(valueB) * this.sortOrder;
                });
            }

            return filtered;
        }

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

        getType: call => call ? 'Planificada' : 'No planificada',

        edit(id) {
            this.$router.push(`/outgoingForm/${id}`);
        },
        
        sortBy(key) {
            if (this.sortKey === key) {
                if (this.sortOrder === 1) {
                    this.sortOrder = -1;
                } else if (this.sortOrder === -1) {
                    this.sortKey = '';
                    this.sortOrder = 1;
                }
            } else {
                this.sortKey = key;
                this.sortOrder = 1;
            }
        },

        changeIconSortOrder(){
            return (this.sortOrder === 1 ? '🔼' : (this.sortOrder === -1 ? '🔽' : ''));
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
        <div class="search-wrapper panel-heading col-sm-12"> 
            <input type="text" v-model="search" class="form-control mb-3" placeholder="Buscar llamadas...">
        </div>
        <button @click="$router.push('/outgoingForm')">+ Llamada Saliente</button>
        <table>
            <thead>
                <tr>
                    <th v-for="key in sortableColumns" :key="key" @click="sortBy(key)" class="click-order">
                        {{ columnNames[key] }}
                        <span v-if="sortKey === key">{{ changeIconSortOrder() }}</span>
                    </th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="call in filteredOutgoingCalls" :key="call.id">
                    <td>{{ formatDateTime(call.timestamp).fecha }}</td>
                    <td>{{ formatDateTime(call.timestamp).hora }}</td>
                    <td>{{ getPatientNameSaliente(call.patient_id) }}</td>
                    <td>{{ getUserNameSaliente(call.user_id) }}</td>
                    <td>{{ getType(call.type) }}</td>
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