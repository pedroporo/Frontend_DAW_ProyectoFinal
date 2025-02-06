<script>
import { mapActions, mapState } from 'pinia';
import { useStore } from '@/stores/patientStore';
export default {
    computed: {
        ...mapState(useStore, [])
    },
    data() {
        return {
            patient: [],
        }
    },
    methods: {
        ...mapActions(useStore, ['getPatient', 'removePatient']),
        addPatient() {
            this.$router.push({ name: 'patientForm' });
        },
        editPatient(id) {
            this.$router.push({ name: 'patientForm', params: { id } });
        },
        async deletePatient(id) {
            await this.removePatient(id);
            this.$router.push({ name: 'patients' });
        }
    },
    async mounted() {
        const id = this.$route.params.id;
        if (id) {
            this.patient = await this.getPatient(id);
        }
    }
}
</script>

<template>
    <div class="content">
        <h2>Paciente </h2>
        <input type="text" class="form-control mb-3" placeholder="Buscar paciente...">
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Dirección</th>
                    <th>Ciudad</th>
                    <th>Coódigo Postal</th>
                    <th>DNI</th>
                    <th>Número tarjeta sanitaria</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Zona</th>
                    <th>Situación personal</th>
                    <th>Estado de salud</th>
                    <th>Situacion Vivienda</th>
                    <th>Autonomía</th>
                    <th>Situacion económica</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ patient.name + " " +patient.last_name}}</td>
                    <td>{{ patient.birth_date }}</td>
                    <td>{{ patient.address }}</td>
                    <td>{{ patient.city }}</td>
                    <td>{{ patient.postal_code }}</td>
                    <td>{{ patient.dni }}</td>
                    <td>{{ patient.health_card_number }}</td>
                    <td>{{ patient.phone }}</td>
                    <td>{{ patient.email }}</td>
                    <td>{{ patient.zone_id }}</td>
                    <td>{{ patient.personal_situation }}</td>
                    <td>{{ patient.health_situation }}</td>
                    <td>{{ patient.housing_situation }}</td>
                    <td>{{ patient.personal_autonomy }}</td>
                    <td>{{ patient.economic_situation }}</td>
                    <td>
                        <button @click="deletePatient(patient.id)">Eliminar</button>
                        <button @click="editPatient(patient.id)">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="addPatient">Añadir Paciente</button>
        <button class="btn btn-secondary" @click="$router.push({ name: 'patients' })">Volver</button>
    </div>
</template>