<script>
import { useDataStore } from "@/stores/store";
import { mapActions, mapState } from "pinia";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";

export default {
    components: {
        Field,
        Form,
        ErrorMessage
    },
    data() {
        return {
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
        ...mapActions(useDataStore, ['getLlamadasSalientesId', 'addOutgoingCall', 'updateOutgoingCall']),

        async loadForm() {
            const llamadaId = this.$route.params.id
            if (llamadaId) {
                this.isEdit = true
                this.llamada = await this.getLlamadasSalientesId(llamadaId);
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
                await this.updateOutgoingCall(this.llamada);
            } else {
                await this.addOutgoingCall(this.llamada);
            }
            this.$router.push('/outgoing_calls');
        },

        formatDateTime(timestamp) {
            if (!timestamp) return { fecha: "Fecha no disponible", hora: "Hora no disponible" };

            this.fecha = timestamp.split("T")[0];
            this.hora = timestamp.split("T")[1].split(":").slice(0, 2).join(":");
        },

    },

    mounted() {
        this.loadForm();
    },
    computed: {
        ...mapState(useDataStore, ['users', 'pacientes', 'alarmas', 'translateAlarmType']),
    },
};
</script>

<template>
    <h2>{{ isEdit ? "Editar Llamada Saliente" : "Registrar Llamada Saliente" }}</h2>
    <Form :validation-schema="mySchema" @submit="addOrEdit">
        <div v-if="isEdit">
            <label for="id">Id: </label>
            <Field type="text" name="id" v-model="llamada.id" disabled />
        </div>

        <div>
            <label>Fecha: </label>
            <Field name="fecha" type="date" v-model="fecha" />
            <ErrorMessage name="fecha" class="error" />
        </div>

        <div>
            <label>Hora: </label>
            <Field name="hora" type="time" v-model="hora" />
            <ErrorMessage name="hora" class="error" />
        </div>

        <div>
            <label>Operador: </label>
            <Field as="select" name="user_id" v-model="llamada.user_id">
                <option value="" selected disabled>-- Selecciona operador --</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.first_name }}
                </option>
            </Field>
            <ErrorMessage name="user_id" class="error" />
        </div>

        <div>
            <label>Paciente: </label>
            <Field as="select" name="patient_id" v-model="llamada.patient_id">
                <option value="" selected disabled>-- Selecciona paciente --</option>
                <option v-for="patient in pacientes" :key="patient.id" :value="patient.id">
                    {{ patient.name + " " + patient.last_name }}
                </option>
            </Field>
            <ErrorMessage name="patient_id" class="error" />
        </div>

        <div>
            <label>Tipo: </label>
            <div>
                <label>
                    <Field name="type" type="radio" value="planned" v-model="llamada.type" /> Planificada
                </label>
                <label>
                    <Field name="type" type="radio" value="unplanned" v-model="llamada.type" /> No planificada
                </label>
                <ErrorMessage name="type" class="error"/>
            </div>
        </div>

        <div>
            <label>Descripción: </label>
            <Field as="textarea" name="description" rows="5" v-model="llamada.description" />
            <ErrorMessage name="description" class="error" />
        </div>

        <div>
            <label>Alarmas: </label>
            <Field as="select" name="alarm_id" v-model="llamada.alarm_id">
                <option value="" selected disabled>-- Selecciona alarma --</option>
                <option v-for="alarma in alarmas" :key="alarma.id" :value="alarma.id">
                    {{ translateAlarmType(alarma.type) }}
                </option>
            </Field>
            <ErrorMessage name="alarm_id" class="error" />
        </div>

        <button type="submit">{{ isEdit ? "Actualizar" : "Añadir" }}</button>
        <button type="button" class="btn btn-danger" @click="$router.push('/outgoing_calls')">Cancelar</button>
    </Form>
</template>

<style scoped>
.error {
    color: red;
}
</style>