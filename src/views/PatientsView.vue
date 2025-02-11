<script>
import { mapActions, mapState } from 'pinia';
import { useStore } from '@/stores/patientStore';

export default {
    computed: {
        ...mapState(useStore, ['userNames', 'contactNames']),
        filteredPatients() {
            return this.patients.filter(p => {
                const searchLower = this.search.toLowerCase();
                
                return (
                    p.name.toLowerCase().includes(searchLower) ||
                    p.last_name.toLowerCase().includes(searchLower) ||
                    p.birth_date.includes(searchLower) ||
                    p.address.toLowerCase().includes(searchLower) ||
                    p.city.toLowerCase().includes(searchLower) ||
                    p.postal_code.includes(searchLower) ||
                    p.dni.toLowerCase().includes(searchLower) ||
                    p.health_card_number.toString().includes(searchLower) ||
                    p.phone.includes(searchLower) ||
                    p.email.toLowerCase().includes(searchLower) ||
                    p.personal_situation.toLowerCase().includes(searchLower) ||
                    p.health_situation.toLowerCase().includes(searchLower) ||
                    p.housing_situation.toLowerCase().includes(searchLower) ||
                    p.personal_autonomy.toLowerCase().includes(searchLower) ||
                    p.economic_situation.toLowerCase().includes(searchLower)
                );
            });
        }
    },
    methods: {
        ...mapActions(useStore, ['getPatients', 'createPatient', 'getContactsByPatientId']),
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
            search: '',
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
        <div class="search-wrapper panel-heading col-sm-12"> 
            <input type="text" v-model="search" class="form-control mb-3" placeholder="Buscar paciente...">
        </div>
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
                <tr v-for="patient in filteredPatients" :key="patient.id">
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
