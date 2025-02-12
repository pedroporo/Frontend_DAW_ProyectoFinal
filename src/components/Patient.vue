<script>
import { mapActions, mapState } from 'pinia';
import { usePatientsStore } from '@/stores/patientStore';
import { useContactsStore } from '@/stores/contactStore';
import { useZonesStore } from '@/stores/zonesStore';
import { useIncomingCallsStore } from '@/stores/incomingCallsStore';
export default {
    computed: {
        ...mapState(useContactsStore, ['contactNames']),
        ...mapState(useZonesStore, ['zonesNames']),
        ...mapState(useIncomingCallsStore, ['tiposLlamada']),
    },
    data() {
        return {
            patient: [],
            callsPatient: [],
        }
    },
    methods: {
        ...mapActions(usePatientsStore, ['getPatient', 'removePatient']),
        ...mapActions(useIncomingCallsStore, ['getLlamadasEntrantesPorPaciente', 'formatDateTime', 'translateTipoLlamada']),
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
    },
    async mounted() {
        const id = this.$route.params.id;
        if (id) {
            this.patient = await this.getPatient(id);
            this.callsPatient = await this.getLlamadasEntrantesPorPaciente(id);
        }
    }
}
</script>

<template>
    <div class="main-content">
        <div class="patient-container">
            <h2>📋 Información del Paciente</h2>
            <div class="patient-details">
                <div class="detail"><strong>Nombre:</strong> {{ patient.name + " " + patient.last_name }}</div>
                <div class="detail"><strong>Fecha de Nacimiento:</strong> {{ patient.birth_date }}</div>
                <div class="detail"><strong>Dirección:</strong> {{ patient.address }}</div>
                <div class="detail"><strong>Ciudad:</strong> {{ patient.city }}</div>
                <div class="detail"><strong>Código Postal:</strong> {{ patient.postal_code }}</div>
                <div class="detail"><strong>DNI:</strong> {{ patient.dni }}</div>
                <div class="detail"><strong>Número tarjeta sanitaria:</strong> {{ patient.health_card_number }}</div>
                <div class="detail"><strong>Teléfono:</strong> {{ patient.phone }}</div>
                <div class="detail"><strong>Email:</strong> {{ patient.email }}</div>
                <div class="detail">
                    <strong>Contacto:</strong>
                    {{ contactNames(patient.id).length > 0
                        ? contactNames(patient.id).map(contact => contact.name).join(', ')
                        : 'Sin contacto' }}
                </div>
                <div class="detail"><strong>Zona:</strong> {{ zonesNames(patient.zone_id) }}</div>
                <div class="detail"><strong>Situación personal:</strong> {{ patient.personal_situation }}</div>
                <div class="detail"><strong>Estado de salud:</strong> {{ patient.health_situation }}</div>
                <div class="detail"><strong>Situación Vivienda:</strong> {{ patient.housing_situation }}</div>
                <div class="detail"><strong>Autonomía:</strong> {{ patient.personal_autonomy }}</div>
                <div class="detail"><strong>Situación económica:</strong> {{ patient.economic_situation }}</div>
            </div>

            <div class="buttons">
                <button class="btn btn-primary" @click="editPatient(patient.id)">Editar</button>
                <button class="btn btn-danger" @click="deletePatient(patient.id)">Eliminar</button>
                <button class="btn btn-secondary" @click="$router.push({ name: 'patients' })">Volver</button>
            </div>
        </div>
        <div class="patient-calls">
    <h3>📞 Llamadas Entrantes</h3>
    <table v-if="callsPatient.length">
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Tipo</th>
                <th>Descripción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="call in callsPatient" :key="call.id">
                <td>{{ formatDateTime(call.timestamp).fecha }}</td>
                <td>{{ formatDateTime(call.timestamp).hora }}</td>
                <td>{{ translateTipoLlamada(call.type) }}</td>
                <td>{{ call.description }}</td>
            </tr>
        </tbody>
    </table>
    <p v-else>No hay llamadas registradas para este paciente.</p>
</div>

    </div>
</template>

<style scoped>
/* Ajuste del contenido para que encaje con el sidebar */
.main-content {
    margin-left: 250px;
    /* Ajuste según el ancho del sidebar */
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

.detail {
    padding: 10px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Botones */
.buttons {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.btn {
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    text-align: center;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-danger:hover {
    background-color: #c82333;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

/* Responsividad */
@media (max-width: 1024px) {
    .main-content {
        margin-left: 0;
        /* En pantallas pequeñas, sin margen */
    }

    .patient-container {
        width: 100%;
        padding: 15px;
    }
}
</style>
