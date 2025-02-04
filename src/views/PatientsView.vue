<script>
import { mapActions, mapState } from 'pinia';
import { useStore } from '@/stores/patientStore';
export default {
    computed: {
        ...mapState(useStore, ['userNames'])
    },
    methods: {
        ...mapActions(useStore,['getPatients', 'createPatient']),
        updatePatient(patient) {
            this.$router.push({ name: 'patient', params: { id: patient.id } });
        }
    },
    data() {
        return {
            patients: []
        }
    },
    async mounted() {
        this.patients = await this.getPatients()
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
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
                <tr v-for="patient in patients">
                    <td>{{ patient.name + patient.last_name }}</td>
                    <td>{{ patient.phone }}</td>
                    <td>{{ userNames(patient.user_id) }}</td>
                    <td>{{  }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="updatePatient(patient)">Editar</button>
                        <button class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary">Añadir Paciente</button>
    </div>
</template>