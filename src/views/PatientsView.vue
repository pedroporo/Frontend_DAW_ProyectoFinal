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
        filteredPatients() {
            let filtered = this.patients.filter(p => {
                const searchLower = this.search.toLowerCase();
                //Filtra por nombre completo, cumpleaños, ubicación, dni, tarjeta sanitaria, telefono, e-mail y sus situaciones
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
            if (this.sortKey) {
                filtered.sort((a, b) => {
                    let valueA, valueB;

                    switch (this.sortKey) {
                        case "name":
                            valueA = (a.name).toLowerCase();
                            valueB = (b.name).toLowerCase();
                            break;
                        case "operator":
                            valueA = this.userNames(a.user_id).toLowerCase();
                            valueB = this.userNames(b.user_id).toLowerCase();
                            break;
                        case "phone":
                            valueA = a.phone.toLowerCase();
                            valueB = b.phone.toLowerCase();
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
        ...mapActions(usePatientsStore, ['getPatients', 'createPatient', 'getContactsByPatientId']),
        viewPatient(id) {
            this.$router.push({ name: 'patient', params: { id } });
        },
        createPatient() {
            this.$router.push({ name: 'patientForm' });
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
            return (this.sortOrder === 1 ? '^' : (this.sortOrder === -1 ? 'v' : ''));
        },
    },
    data() {
        return {
            patients: {},
            search: '',
            sortKey: '',
            sortOrder: 1,
            sortableColumns: ["name", "phone", "operator"],
            columnNames: {
                name: "Nombre",
                phone: "Teléfono",
                operator: "Operador",
            }
        }
    },
    async mounted() {
        document.title = "Listado de Pacientes";
        this.patients.data = await this.getPatients();
    }
}
</script>

<template>
    <div class="content">
        <h2>Lista de Pacientes</h2>
        <input type="text" v-model="search" class="form-control mb-3" placeholder="Buscar paciente...">
        <button class="btn btn-primary" @click="createPatient">Añadir Paciente</button>
        <table class="table">
            <thead>
                <tr>
                    <th v-for="key in sortableColumns" :key="key" @click="sortBy(key)" class="click-order">
                        {{ columnNames[key] }}
                        <span v-if="sortKey === key">
                            <i v-if="changeIconSortOrder() === 'v'" class="bi bi-caret-down-fill"></i>
                            <i v-if="changeIconSortOrder() === '^'" class="bi bi-caret-up-fill"></i>
                        </span>
                    </th>
                    <th>Contactos</th>
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

.click-order{
    cursor: pointer; 
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
