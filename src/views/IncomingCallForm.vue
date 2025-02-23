<script>
import { useIncomingCallsStore } from "@/stores/incomingCallsStore";
import { usePatientsStore } from "@/stores/patientStore";
import { useUsersStore } from "@/stores/usersStore";
import { mapActions, mapState } from "pinia";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            patients: [],
            isEdit: false,
            llamada: {
                type: '',
            },
            fecha: "",
            hora: "",
            mySchema: yup.object({
                fecha: yup.date().required("La fecha es obligatoria"),
                hora: yup.string().required("La hora es obligatoria"),
                patient_id: yup.string().required("Debe seleccionar un paciente"),
                type: yup.string().required("Debe seleccionar un tipo de llamada"),
                description: yup.string().required("La descripción es obligatoria")
            }),
        };
    },

    methods: {
        ...mapActions(useIncomingCallsStore, ['getLlamadasEntrantesId', 'addIncomingCall', 'updateIncomingCall']),
        ...mapActions(usePatientsStore, ['getPatients']),
        async loadForm() {
            const llamadaId = this.$route.params.id;
            if (llamadaId) {
                this.isEdit = true;
                const loadedCall = await this.getLlamadasEntrantesId(llamadaId);
                if (loadedCall) {
                    this.llamada = { ...loadedCall };
                    this.formatDateTime(this.llamada.timestamp);
                    this.llamada.type = this.normalizeCallType(this.llamada.type);
                } else {
                    console.error("No se pudo cargar la llamada");
                }
            } else {
                this.isEdit = false;
                this.formatDateTime(new Date().toISOString());
            }
        },

        async addOrEdit() {
            const timestamp = `${this.fecha} ${this.hora}:00`;
            this.llamada.timestamp = timestamp;
            if (this.isEdit) {
                await this.updateIncomingCall(this.llamada);
            } else {
                await this.addIncomingCall(this.llamada);
            }
            this.$router.back();
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

        normalizeCallType(type) {
            const normalizedType = type.toLowerCase().replace(/ /g, '_');
            if (this.tiposDisponibles.hasOwnProperty(normalizedType)) {
                return normalizedType;
            }
            console.warn(`Tipo de llamada no reconocido: ${type}`);
            return type;
        },
    },

    async mounted() {
        document.title = "Llamadas Entrantes";
        await this.loadForm();
        this.patients = await this.getPatients();
    },

    computed: {
        ...mapState(useIncomingCallsStore, ['tiposLlamada']),
        ...mapState(useUsersStore, ['users']),
        tiposDisponibles() {
            const tipos = Object.assign({}, ...Object.values(this.tiposLlamada));
            return tipos;
        }
    },
};
</script>

<template>
    <h2>{{ isEdit ? "Editar Llamada Entrante" : "Registrar Llamada Entrante" }}</h2>
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
            <label for="type">Tipo de llamada: </label>
            <Field as="select" name="type" v-model="llamada.type" class="form-control" required>
                <option value="" disabled>-- Selecciona tipo --</option>
                <option v-for="(label, key) in tiposDisponibles" :key="key" :value="key">
                    {{ label }}
                </option>
            </Field>
            <ErrorMessage class="error" name="type" />
        </div>

        <div class="form-group">
            <label for="description">Descripción: </label>
            <Field as="textarea" rows="5" name="description" v-model="llamada.description" class="form-control" />
            <ErrorMessage class="error" name="description" />
        </div>

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

/* Estilos unificados para todos los campos mediante la clase .form-control */
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
    /* Permite que el textarea se expanda */
    min-height: 100px;
    /* Altura mínima para textarea */
}

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

.radio-group {
    margin-bottom: 20px;
}

.radio-buttons {
    display: flex;
    gap: 15px;
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

/* Responsive */
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
