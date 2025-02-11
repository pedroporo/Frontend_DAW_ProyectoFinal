<script>
import { useIncomingCallsStore } from "@/stores/incomingCallsStore";
import { usePatientsStore } from "@/stores/patientStore";
import { useUsersStore } from "@/stores/usersStore";
import { useAlarmsStore } from "@/stores/alarmsStore";
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
            llamada: {},
            fecha: "",
            hora: "",
            mySchema: yup.object({
                fecha: yup.date().required("La fecha es obligatoria"),
                hora: yup.string().required("La hora es obligatoria"),
                user_id: yup.string().required("Debe seleccionar un operador"),
                patient_id: yup.string().required("Debe seleccionar un paciente"),
                selectedCategory: yup.string().required("Debe seleccionar una categoría"),
                type: yup.string().required("Debe seleccionar un tipo de llamada"),
                description: yup.string().required("La descripción es obligatoria")
            }),
            selectedCategory: "",
            selectedType: "",
        };

    },

    methods: {
        ...mapActions(useIncomingCallsStore, ['getLlamadasEntrantesId', 'addIncomingCall', 'updateIncomingCall']),
        ...mapActions(usePatientsStore, ['getPatients']),
        async loadForm() {
            const llamadaId = this.$route.params.id
            if (llamadaId) {
                this.isEdit = true
                this.llamada = await this.getLlamadasEntrantesId(llamadaId);
                this.formatDateTime(this.llamada.timestamp);
                this.selectedCategory = this.findCategoryByType(this.llamada.type);
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
                await this.updateIncomingCall(this.llamada);
            } else {
                await this.addIncomingCall(this.llamada);
            }
            this.$router.push('/incoming_calls');
        },

        formatDateTime(timestamp) {
            if (!timestamp) return { fecha: "Fecha no disponible", hora: "Hora no disponible" };

            this.fecha = timestamp.split("T")[0];
            this.hora = timestamp.split("T")[1].split(":").slice(0, 2).join(":");
        },

        findCategoryByType(type) {
            for (let categoria in this.tiposLlamada) {
                if (type in this.tiposLlamada[categoria]) {
                    return categoria;
                }
            }
            return null;
        },
    },

    async mounted() {
        this.loadForm();
        this.patients = await this.getPatients();
    },
    computed: {
        ...mapState(useIncomingCallsStore, ['tiposLlamada']),
        ...mapState(useUsersStore, ['users']),
        tiposDisponibles() {
            return this.selectedCategory ? this.tiposLlamada[this.selectedCategory] : {};
        }
    },
};
</script>

<template>
    <h2>{{ isEdit ? "Editar Llamada Entrante" : "Registrar Llamada Entrante" }}</h2>
    <Form @submit="addOrEdit" :validation-schema="mySchema">
        <div v-if="isEdit">
            <label for="id">Id: </label>
            <Field type="text" name="id" v-model="llamada.id" disabled />
        </div>
        <div>
            <label>Fecha: </label>
            <Field type="date" name="fecha" v-model="fecha" />
            <ErrorMessage class="error" name="fecha" />
        </div>

        <div>
            <label>Hora: </label>
            <Field type="time" name="hora" v-model="hora" />
            <ErrorMessage class="error" name="hora" />
        </div>

        <div>
            <label>Operador: </label>
            <Field as="select" name="user_id" v-model="llamada.user_id">
                <option value="" selected disabled>-- Selecciona operador --</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                    {{ user.first_name }}
                </option>
            </Field>
            <ErrorMessage class="error" name="user_id" />
        </div>

        <div>
            <label>Paciente: </label>
            <Field as="select" name="patient_id" v-model="llamada.patient_id">
                <option value="" selected disabled>-- Selecciona paciente --</option>
                <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                    {{ patient.name + " " + patient.last_name }}
                </option>
            </Field>
            <ErrorMessage class="error" name="patient_id" />
        </div>

        <div>
            <label>Tipo:</label>
            <div>
                <label>
                    <Field type="radio" name="selectedCategory" v-model="selectedCategory" value="emergencia" />
                    Emergencia
                </label>
                <label>
                    <Field type="radio" name="selectedCategory" v-model="selectedCategory" value="no_emergencia" /> No
                    emergencia
                </label>
                <ErrorMessage class="error" name="selectedCategory" />
            </div>
        </div>

        <div class="mb-4">
            <Field as="select" name="type" v-model="llamada.type" class="w-full p-2 border rounded" required>
                <option value="" selected disabled>-- Selecciona tipo --</option>
                <option v-for="(label, key) in tiposDisponibles" :key="key" :value="key">
                    {{ label }}
                </option>
            </Field>
            <ErrorMessage class="error" name="type" />
        </div>

        <div>
            <label>Descripció: </label>
            <Field as="textarea" rows="5" name="description" v-model="llamada.description" />
            <ErrorMessage class="error" name="description" />
        </div>
        <button type="submit">{{ isEdit ? "Actualizar" : "Añadir" }}</button>
        <button type="button" class="btn btn-danger" @click="$router.push('/incoming_calls')">Cancelar</button>
    </Form>
</template>

<style scoped>
.error {
    color: red;
}
</style>