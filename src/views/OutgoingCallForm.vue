<script>
import { useAlarmsStore } from "@/stores/alarmsStore";
import { useUsersStore } from "@/stores/usersStore";
import { usePatientsStore } from "@/stores/patientStore";
import { mapActions, mapState } from "pinia";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
import { useOutgoingCallsStore } from "@/stores/outgoingCallsStore";

export default {
    components: {
        Field,
        Form,
        ErrorMessage
    },
    props: {
        id: {
            type: String,
            required: false
        }
    },
    emits: ['cancel'],
    data() {
        return {
            patients: [],
            isEdit: false,
            llamada: {},
            fecha: "",
            hora: "",
            mySchema: yup.object({
                fecha: yup.string().required('La fecha es obligatoria'),
                hora: yup.string().required('La hora es obligatoria'),
                user_id: yup.string().required('Selecciona un operador'),
                patient_id: yup.string().required('Selecciona un paciente'),
                type: yup.string().required('Selecciona el tipo de llamada'),
                description: yup.string().required('La descripción es obligatoria'),
                alarm_id: yup.string().required('Selecciona una alarma'),
            }),
        };
    },

    methods: {
        ...mapActions(useOutgoingCallsStore, ['getCallById', 'addCall', 'updateCall']),
        ...mapActions(usePatientsStore, ['getPatients']),
        async loadForm() {
            const llamadaId = this.id;
            if (llamadaId) {
                this.isEdit = true
                this.llamada = await this.getCallById(llamadaId);
                this.formatDateTime(this.llamada.timestamp);
            } else {
                this.isEdit = false
                this.formatDateTime(new Date().toISOString());
                this.llamada = {}
            }
        },

        async addOrEdit() {
            const timestamp = `${this.fecha}T${this.hora}:00`;
            this.llamada.timestamp = timestamp;
            if (this.isEdit) {
                await this.updateCall(this.llamada);
            } else {
                await this.addCall(this.llamada);
            }
            this.redirectAfterAction();
        },

        formatDateTime(timestamp) {
            if (!timestamp) return { fecha: "Fecha no disponible", hora: "Hora no disponible" };

            this.fecha = timestamp.split("T")[0];
            this.hora = timestamp.split("T")[1].split(":").slice(0, 2).join(":");
        },

        handleCancel() {
            this.redirectAfterAction();
        },

        redirectAfterAction() {
            const currentRoute = this.$route.path;
            if (currentRoute.startsWith('/patient/')) {
                this.$router.push(currentRoute);
                this.$emit('cancel')
            } else {
                this.$router.push('/outgoing_calls');
            }
        }
    },

    async mounted() {
        this.loadForm();
        this.patients = await this.getPatients();
    },
    computed: {
        ...mapState(useAlarmsStore, ['alarmas', 'translateAlarmType']),
        ...mapState(useUsersStore, ['users']),
    },
};
</script>

<template>
    <h2>{{ isEdit ? "Editar Llamada Saliente" : "Registrar Llamada Saliente" }}</h2>
    <Form @submit="addOrEdit" :validation-schema="mySchema" class="llamada-form">
        <div v-if="isEdit" class="form-group">
            <label for="id">Id: </label>
            <Field type="text" name="id" v-model="llamada.id" disabled class="form-control" />
        </div>

        <div class="form-group">
            <label for="fecha">Fecha: </label>
            <Field type="date" name="fecha" v-model="fecha" class="form-control" />
            <ErrorMessage class="error" name="fecha" />
        </div>

        <div class="form-group">
            <label for="hora">Hora: </label>
            <Field type="time" name="hora" v-model="hora" class="form-control" />
            <ErrorMessage class="error" name="hora" />
        </div>

        <div class="form-group">
            <label for="user_id">Operador: </label>
            <Field as="select" name="user_id" v-model="llamada.user_id" class="form-control">
                <option value="" selected disabled>-- Selecciona operador --</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.first_name }}
                </option>
            </Field>
            <ErrorMessage class="error" name="user_id" />
        </div>

        <div class="form-group">
            <label for="patient_id">Paciente: </label>
            <Field as="select" name="patient_id" v-model="llamada.patient_id" class="form-control">
                <option value="" selected disabled>-- Selecciona paciente --</option>
                <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                    {{ patient.name + " " + patient.last_name }}
                </option>
            </Field>
            <ErrorMessage class="error" name="patient_id" />
        </div>

        <div class="form-group">
            <label>Tipo: </label>
            <div class="radio-buttons">
                <label>
                    <Field type="radio" name="type" v-model="llamada.type" value="planned" /> Planificada
                </label>
                <label>
                    <Field type="radio" name="type" v-model="llamada.type" value="unplanned" /> No planificada
                </label>
                <ErrorMessage class="error" name="type" />
            </div>
        </div>

        <div class="form-group">
            <label for="description">Descripción: </label>
            <Field as="textarea" name="description" rows="5" v-model="llamada.description" class="form-control" />
            <ErrorMessage class="error" name="description" />
        </div>

        <div class="form-group">
            <label for="alarm_id">Alarmas: </label>
            <Field as="select" name="alarm_id" v-model="llamada.alarm_id" class="form-control">
                <option value="" selected disabled>-- Selecciona alarma --</option>
                <option v-for="alarma in alarmas" :key="alarma.id" :value="alarma.id">
                    {{ translateAlarmType(alarma.type) }}
                </option>
            </Field>
            <ErrorMessage class="error" name="alarm_id" />
        </div>

        <div class="form-buttons">
            <button type="submit" class="btn btn-primary">{{ isEdit ? "Actualizar" : "Añadir" }}</button>
            <button type="button" class="btn btn-danger" @click="handleCancel">Cancelar</button>
        </div>
    </Form>
</template>



<style scoped>
/* Estilo general */
h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.8rem;
    color: #333;
}

.llamada-form {
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 8px;
    color: #555;
}

/* Aplicamos estilos unificados a todos los campos mediante la clase .form-control */
.form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    height: 40px; /* Altura fija para inputs y selects */
}

textarea.form-control {
    height: auto; /* Para textarea permitimos auto altura */
    min-height: 100px;
}

/* Eliminar reglas duplicadas para inputs, textarea y select */
input:focus,
textarea:focus,
select:focus {
    border-color: #007bff;
}

.error {
    color: red;
    font-size: 0.875rem;
    margin-top: 5px;
}

.radio-buttons {
    display: flex;
    gap: 20px;
    margin-top: 10px;
}

.radio-buttons label {
    font-size: 16px;
}

.form-buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
}

button {
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    transition: background 0.3s ease-in-out;
    width: 48%;
}

button[type="submit"] {
    background-color: #007bff;
    color: white;
}

button[type="submit"]:hover {
    background-color: #0056b3;
}

button[type="button"].btn-danger {
    background-color: #f44336;
    color: white;
}

button[type="button"].btn-danger:hover {
    background-color: #d32f2f;
}

/* Estilo Responsive */
@media (max-width: 768px) {
    .form-buttons {
        flex-direction: column;
    }
    button {
        width: 100%;
    }
    .radio-buttons {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
