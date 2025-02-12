<script>
import { mapActions, mapState } from 'pinia';
import { useStore } from '@/stores/patientStore';

export default {
    computed: {
        ...mapState(useStore, ['userNames', 'contactNames'])
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
        <button class="btn btn-primary" @click="createPatient">Añadir Paciente</button>
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
    </div>
</template>


<style scoped>
/* Contenedor principal */
.content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
}

/* Título */
.content h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 2rem;
    color: #333;
}

/* Input de búsqueda */
.form-control {
    width: 100%;
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

/* Margen inferior para separar elementos */
.mb-3 {
    margin-bottom: 1rem;
}

/* Estilos de la tabla */
.table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.table th,
.table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
    font-size: 16px;
}

.table th {
    background-color: #f1f1f1;
    font-weight: bold;
}

.table tr:nth-child(even) {
    background-color: #fafafa;
}

.table tr:hover {
    background-color: #f5f5f5;
}

/* Botones */
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

/* Botón pequeño (por ejemplo, en acciones) */
.btn-sm {
    padding: 5px 10px;
    font-size: 14px;
}

/* Botón de peligro (rojo) */
.btn-danger {
    background-color: #d9534f;
    color: #fff;
}

.btn-danger:hover {
    background-color: #c9302c;
}

/* Botón primario (azul) */
.btn-primary {
    background-color: #007bff;
    color: #fff;
}

.btn-primary:hover {
    background-color: #0056b3;
}

/* Responsive */
@media (max-width: 768px) {

    .table th,
    .table td {
        padding: 8px 10px;
        font-size: 14px;
    }
}
</style>
