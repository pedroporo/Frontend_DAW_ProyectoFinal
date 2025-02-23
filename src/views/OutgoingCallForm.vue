<script>
import { useLoginStore } from "@/stores/loginStore";
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
        },
        currentDate: {
            type: String,
            required: false
        }
    },
    emits: ['cancel'],
    data() {
        return {
            patients: [],
            isEdit: false,
            llamada: {
                patient_id: "",
                user_id: 0,
                is_planned: "",
                description: ""
            },
            alarmas: [],
            fecha: "",
            hora: "",
            mySchema: yup.object({
                alarma: yup.string().required('Selecciona una alarma'),
                fecha: yup.string().required('La fecha es obligatoria'),
                hora: yup.string().required('La hora es obligatoria'),
                /*user_id: yup.string().required('Selecciona un operador'),*/
                patient_id: yup.string().required('Selecciona un paciente'),
                is_planned: yup.string().required('Selecciona el tipo de llamada'),
                description: yup.string(),
            }),
        };
    },
    methods: {
        ...mapActions(useOutgoingCallsStore, ['getCallById', 'addCall', 'updateCall']),
        ...mapActions(usePatientsStore, ['getPatients']),
        ...mapActions(useAlarmsStore, ['getAlarmas']),
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
            const timestamp = `${this.fecha} ${this.hora}`;
            this.llamada.timestamp = timestamp;
            if (this.isEdit) {
                await this.updateCall(this.llamada);
            } else {
                const callToSend = {
                    ...this.llamada,
                    user_id: JSON.parse(localStorage.getItem("userData") || "{}").id,
                };
                await this.addCall(callToSend);
                this.$emit('callCreated');
            }
            this.redirectAfterAction();
        },

        formatDateTime(timestamp) {
            if (!timestamp || typeof timestamp !== "string" || !timestamp.includes(" ")) {
                const now = new Date();
                this.fecha = now.toISOString().split("T")[0];
                this.hora = now.toTimeString().split(":").slice(0, 2).join(":");
                return;
            }

            const parts = timestamp.split(" ");
            this.fecha = parts[0];

            if (parts[1] && parts[1].includes(":")) {
                this.hora = parts[1].split(":").slice(0, 2).join(":");
            } else {
                this.hora = new Date().toTimeString().split(":").slice(0, 2).join(":");
            }
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
        },
        getPatientName(patientId) {
            const patient = this.patients.find(patient => patient.id == patientId);
            return patient ? patient.name + " " + patient.last_name : '';
        }
    },

    async mounted() {
        document.title = 'Registrar Llamada Saliente'
        this.loadForm();
        this.patients = await this.getPatients();
        this.alarmas = await this.getAlarmas();
    },
    computed: {
        ...mapState(useAlarmsStore, ['alarmasTipo', 'translateAlarmType']),
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
            <label for="alarma">Alarma: </label>
            <Field as="select" id="alarma" name="alarma" v-model="llamada.alarm_id" class="form-control">
                <option value="" selected disabled>-- Selecciona alarma --</option>
                <option v-for="alarm in alarmas" :key="alarm.id" :value="alarm.id">
                    {{ "Alarma del dia " + alarm.start_date + " al " + alarm.end_date }}
                </option>
            </Field>
            <ErrorMessage class="error" name="alarma" />
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
                    <Field type="radio" name="is_planned" v-model="llamada.is_planned" :value="0" /> Planificada
                </label>
                <label>
                    <Field type="radio" name="is_planned" v-model="llamada.is_planned" :value="1" /> No planificada
                </label>
                <ErrorMessage class="error" name="is_planned" />
            </div>
        </div>


        <div class="form-group">
            <label for="description">Descripción: </label>
            <Field as="textarea" name="description" rows="5" v-model="llamada.description" class="form-control" />
            <ErrorMessage class="error" name="description" />
        </div>

        <!-- <div class="form-group">
            <label for="alarm_id">Tipo alarma: </label>
            <Field as="select" name="alarm_id" v-model="llamada.alarm_id" class="form-control">
                <option value="" selected disabled>-- Selecciona tipo de alarma --</option>
                <option v-for="alarma in alarmasTipo" :key="alarma.type_id" :value="alarma.type_id">
                    {{ translateAlarmType(alarma.type) }}
                </option>
            </Field>
            <ErrorMessage class="error" name="alarm_id" />
        </div> -->


        <div class="form-buttons">
            <button type="submit" class="btn btn-primary">{{ isEdit ? "Actualizar" : "Añadir" }}</button>
            <button type="button" class="btn btn-danger" @click="$router.back()">Cancelar</button>
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
    height: 40px;
    /* Altura fija para inputs y selects */
}

textarea.form-control {
    height: auto;
    /* Para textarea permitimos auto altura */
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
