<script>
import { mapActions, mapState } from 'pinia';
import { useStore } from '@/stores/patientStore';

export default {
    computed: {
        ...mapState(useStore, ['userNames', 'contactNames'])
    },
    methods: {
        ...mapActions(useStore,['getPatients', 'createPatient', 'getContactsByPatientId']),
        async loadContacts() {
            for (const patient of this.patients) {
                const contacts = await this.getContactsByPatientId(patient.id);
                this.patientContacts[patient.id] = contacts;
            }
        },
        viewPatient(id) {
            this.$router.push({ name: 'patient', params: { id } });
        },
        createPatient() {
            this.$router.push({ name: 'patientForm' });
        },
        getContactName(patientId) {
            const contacts = this.patientContacts[patientId];
            if (contacts && contacts.length > 0) {
                const contact = contacts[0];
                return `${contact.first_name} ${contact.last_name}`;
            }
            return 'Desconocido';
        }
    },
    data() {
        return {
            patients: [],
            patientContacts: {}
        }
    },
    async mounted() {
        this.patients = await this.getPatients();
        await this.loadContacts();
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
                    <th>Operador Asignado</th>
                    <th>Contacto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="patient in patients" :key="patient.id">
                    <td>{{ patient.name + ' ' + patient.last_name }}</td>
                    <td>{{ patient.phone }}</td>
                    <td>{{ userNames(patient.user_id) }}</td>
                    <td>{{ getContactName(patient.id) }}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" @click="viewPatient(patient.id)">Detalles</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="createPatient">Añadir Paciente</button>
    </div>
</template>

