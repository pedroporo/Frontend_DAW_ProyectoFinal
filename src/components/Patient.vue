<script>
import { mapActions, mapState } from 'pinia';
import { usePatientsStore } from '@/stores/patientStore';
import { useContactsStore } from '@/stores/contactStore';
import { useZonesStore } from '@/stores/zonesStore';
import { useIncomingCallsStore } from '@/stores/incomingCallsStore';
import { useOutgoingCallsStore } from '@/stores/outgoingCallsStore';
import Calendar from './Calendar.vue';
export default {
    components: {
        Calendar
    },
    computed: {
        ...mapState(useContactsStore, ['contactNames']),
        ...mapState(useZonesStore, ['zonesNames']),
        ...mapState(useIncomingCallsStore, ['tiposLlamada']),
    },
    data() {
        return {
            patient: [],
            callsPatient: [],
            outgoingCallsPatient: []
        }
    },
    methods: {
        ...mapActions(usePatientsStore, ['getPatient', 'removePatient']),
        ...mapActions(useIncomingCallsStore, ['getLlamadasEntrantesPorPaciente', 'formatDateTime', 'translateTipoLlamada', 'removeIncomingCall']),
        ...mapActions(useOutgoingCallsStore, ['fetchCallsByPatientId', 'deleteCall', '']),
        addPatient() {
            this.$router.push({ name: 'patientForm' });
        },
        editPatient(id) {
            this.$router.push({ name: 'patientForm', params: { id } });
        },
        async deletePatient(id) {
            if (confirm('Estas seguro de eliminar el paciente?')) {
                await this.removePatient(id);
                this.$router.push({ name: 'patients' });
            }
        },
        getType: callType => callType === 'planned' ? 'Planificada' : 'No planificada',
        editIncomingCall(id) {
            this.$router.push(`/incomingForm/${id}`);
        },
        deleteIncomingCall(id) {
            if (confirm('Estas seguro de eliminar la llamada?')) {
                this.removeIncomingCall(id);
                this.callsPatient = this.callsPatient.filter(call => call.id != id);
            }
        },
        editOutgoingCall(id) {
            this.$router.push(`/outgoingForm/${id}`);
        },
        deleteOutgoingCall(id) {
            if (confirm('Estas seguro de eliminar la llamada?')) {
                this.deleteCall(id);
                this.outgoingCallsPatient = this.outgoingCallsPatient.filter(call => call.id != id);
                this.$emit('update-calendar');
            }
        },
        añadirAlarma(id, zoneId) {
            this.$router.push({ name: 'alarmForm', params: { id, zoneId } });
        }
    },
    async mounted() {
        const id = this.$route.params.id;
        if (id) {
            this.patient = await this.getPatient(id);
            this.callsPatient = await this.getLlamadasEntrantesPorPaciente(id);
            this.outgoingCallsPatient = await this.fetchCallsByPatientId(id);
            document.title = "Paciente " + this.patient.name;
        }
    },
}
</script>

<template>
    <div class="main-content">
        <div class="row">
            <div class="col-md-12 col-lg-5">
                <div class="patient-container">
                    <h2>📋 Información del Paciente</h2>
                    <div class="patient-details">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="detail"><strong>Nombre:</strong> {{ patient.name + " " + patient.last_name
                                }}</div>
                                <div class="detail"><strong>Fecha de Nacimiento:</strong> {{ patient.birth_date }}</div>
                                <div class="detail"><strong>Dirección:</strong> {{ patient.address }}</div>
                                <div class="detail"><strong>Ciudad:</strong> {{ patient.city }}</div>
                                <div class="detail"><strong>Código Postal:</strong> {{ patient.postal_code }}</div>
                                <div class="detail"><strong>DNI:</strong> {{ patient.dni }}</div>
                                <div class="detail"><strong>Número tarjeta sanitaria:</strong> {{
                                    patient.health_card_number }}</div>
                                <div class="detail"><strong>Teléfono:</strong> {{ patient.phone }}</div>
                                <div class="detail"><strong>Email:</strong> {{ patient.email }}</div>
                            </div>
                            <div class="col-md-6">
                                <div class="detail">
                                    <strong>Contacto:</strong>
                                    {{contactNames(patient.id).length > 0
                                        ? contactNames(patient.id).map(contact => contact.name).join(', ')
                                        : 'Sin contacto'}}
                                </div>
                                <div class="detail"><strong>Zona:</strong> {{ patient.zone ? patient.zone.name : 'Sin zona' }}</div>
                                <div class="detail"><strong>Situación personal:</strong> {{ patient.personal_situation
                                }}</div>
                                <div class="detail"><strong>Estado de salud:</strong> {{ patient.health_situation }}
                                </div>
                                <div class="detail"><strong>Situación Vivienda:</strong> {{ patient.housing_situation }}
                                </div>
                                <div class="detail"><strong>Autonomía:</strong> {{ patient.personal_autonomy }}</div>
                                <div class="detail"><strong>Situación económica:</strong> {{ patient.economic_situation
                                }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="buttons">
                        <div class="button-row">
                            <button class="btn btn-primary full-width" @click="editPatient(patient.id)">Editar</button>
                            <button class="btn btn-danger full-width"
                                @click="deletePatient(patient.id)">Eliminar</button>
                        </div>
                        <div class="button-row">
                            <button class="btn btn-quaternary full-width" @click="añadirAlarma(patient.id, patient.zone?.id)">Añadir
                                alarma</button>
                            <button class="btn btn-tertiary full-width"
                                @click="$router.push({ name: 'patients' })">Volver</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-lg-7">
                <calendar :id="this.$route.params.id" @update-calendar="loadCalls"/>
            </div>

            <div class="col-md-12 col-lg-6">
                <div class="patient-calls">
                    <h3>📞 Llamadas Entrantes</h3>
                    <table v-if="callsPatient.length">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="call in callsPatient" :key="call.id">
                                <td>{{ formatDateTime(call.timestamp).fecha }}</td>
                                <td>{{ formatDateTime(call.timestamp).hora }}</td>
                                <td>{{ translateTipoLlamada(call.type) }}</td>
                                <td>{{ call.description }}</td>
                                <td>
                                    <button @click="editIncomingCall(call.id)" class="btn btn-secondary btn-sm"><i
                                            class="bi bi-pencil-square"></i></button>
                                    <button @click="deleteIncomingCall(call.id)" class="btn btn-danger btn-sm"><i
                                            class="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-else>No hay llamadas registradas para este paciente.</p>
                </div>
            </div>
            <div class="col-md-12 col-lg-6">
                <div class="patient-calls">
                    <h3>📞 Llamadas Salientes</h3>
                    <table v-if="outgoingCallsPatient.length">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="call in outgoingCallsPatient" :key="call.id">
                                <td>{{ formatDateTime(call.timestamp).fecha }}</td>
                                <td>{{ formatDateTime(call.timestamp).hora }}</td>
                                <td>{{ call.is_planned ? 'Planificada' : 'No planificada' }}</td>
                                <td>{{ call.description }}</td>
                                <td>
                                    <button @click="editOutgoingCall(call.id)" class="btn btn-secondary btn-sm"><i
                                            class="bi bi-pencil-square"></i></button>
                                    <button @click="deleteOutgoingCall(call.id)" class="btn btn-danger btn-sm"><i
                                            class="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-else>No hay llamadas registradas para este paciente.</p>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
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

.btn-tertiary {
    background-color: #817f7d;
    color: #fff;
}

.btn-tertiary:hover {
    background-color: #b1afad;
}

.btn-danger {
    background-color: #d9534f;
    color: #fff;
}

.btn-danger:hover {
    background-color: #c9302c;
}

.btn-quaternary {
    background-color: #f0ad4e;
    color: #fff;
}

.btn-quaternary:hover {
    background-color: #ec971f;
}

.main-content {
    padding: 20px;
}

/* Contenedor principal */
.patient-container {
    max-width: 600px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

/* Título */
h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

/* Información del paciente */
.patient-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #ddd;
}

.patient-calls {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
    overflow: hidden;
}

.patient-calls table {
    width: 100%;
    border-collapse: collapse;
}

.patient-calls th,
.patient-calls td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.patient-calls th {
    background-color: #f2f2f2;
}

.patient-calls tr:hover {
    background-color: #f1f1f1;
}

.detail {
    padding: 10px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.buttons {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* Espacio entre las filas */
}

.button-row {
    display: flex;
    gap: 10px;
    /* Espacio entre los botones */
    width: 100%;
}

.full-width {
    flex: 1;
    /* Hace que los botones ocupen el mismo espacio dentro de la fila */
    text-align: center;
    padding: 10px;
}

@media (max-width: 1024px) {
    .main-content {
        padding: 10px;
    }

    .patient-container {
        max-width: 100%;
        padding: 15px;
    }

    .patient-details {
        flex-direction: column;
        gap: 8px;
    }

    .patient-details .row {
        flex-direction: column;
    }

    .detail {
        padding: 8px;
        font-size: 14px;
    }

    .buttons {
        flex-direction: column;
    }

    .button-row {
        flex-direction: column;
        gap: 5px;
    }

    .btn {
        font-size: 14px;
        padding: 8px 10px;
    }

    .btn-sm {
        font-size: 12px;
        padding: 6px 8px;
    }

    .patient-calls {
        padding: 15px;
    }

    .patient-calls h3 {
        font-size: 1.5rem;
    }

    .patient-calls table {
        font-size: 14px;
    }

    .patient-calls th,
    .patient-calls td {
        padding: 8px;
    }
}

@media (max-width: 768px) {
    .row {
        flex-direction: column;
    }

    .patient-container,
    .patient-calls {
        width: 100%;
    }

    .patient-calls table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }
}

</style>
