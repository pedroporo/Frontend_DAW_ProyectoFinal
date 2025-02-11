<script>
import { mapActions, mapState } from 'pinia';
import { usePatientsStore } from '@/stores/patientStore';
import { useContactsStore } from '@/stores/contactStore';
import { useUsersStore } from '@/stores/usersStore';
export default {
    computed: {
        ...mapState(usePatientsStore, ['userNames']),
        ...mapState(useContactsStore, ['contactNames']),
        ...mapState(useUsersStore, ['userNames']),
    },
    methods: {
        ...mapActions(usePatientsStore, ['getPatients', 'createPatient', 'getContactsByPatientId']),
        viewPatient(id) {
            this.$router.push({ name: 'patient', params: { id } });
        },
        createPatient() {
            this.$router.push({ name: 'patientForm' });
        }
    },
    data() {
        return {
            patients: [],
        }
    },
    async mounted() {
        this.patients = await this.getPatients();
    }
}
</script>

<template>
    <div class="content">
        <h2>Lista de Pacientes</h2>
        <input type="text" class="form-control mb-3" placeholder="Buscar paciente...">
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Operador</th>
                    <th>Contacto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="patient in patients" :key="patient.id">
                    <td>{{ patient.name + ' ' + patient.last_name }}</td>
                    <td>{{ "+34 " + patient.phone }}</td>
                    <td>{{ userNames(patient.user_id) || 'Sin asignar' }}</td>
                    <td>
                        {{ contactNames(patient.id).length > 0
                            ? contactNames(patient.id).map(contact => contact.name).join(', ')
                        : 'Sin contacto' }}
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm" @click="viewPatient(patient.id)">Detalles</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="createPatient">Añadir Paciente</button>
    </div>
</template>
