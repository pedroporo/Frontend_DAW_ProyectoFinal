<script>
import { mapActions, mapState } from 'pinia';
import { useAlarmsStore } from '@/stores/alarmsStore';
import * as yup from 'yup';
import { ErrorMessage, Field, Form } from 'vee-validate';

export default {
    components: {
        Field,
        ErrorMessage,
        Form
    },
    name: 'AlarmForm',
    data() {
        const schema = yup.object({
            type: yup.string().required('El tipo es requerido'),
            start_date: yup.string().required('La fecha de inicio es requerida'),
            end_date: yup.string().required('La fecha de fin es requerida'),
            weekday: yup.string().required('El día de la semana es requerido')
        });

        return {
            alarm: {
                patient_id: null,
                type: '',
                start_date: '',
                end_date: '',
                weekday: ''
            },
            schema
        };
    },
    computed: {
        ...mapState(useAlarmsStore, ['alarmasTipo', 'translateAlarmType']),
    },
    methods: {
        ...mapActions(useAlarmsStore, ['addAlarm']),

        async addNewAlarm() {
            await this.addAlarm(this.alarm);
            this.$router.push({ name: 'patients' });
        }
    },
    async mounted() {
        const patientId = this.$route.params.id;
        if (patientId) {
            this.alarm.patient_id = patientId;
        }
    }
};
</script>

<template>
    <div class="content">
        <h2>Nueva Alarma</h2>
        <Form @submit="addNewAlarm" :validation-schema="schema">
            <div class="form-group">
                <label for="type">Tipo</label>
                <Field as="select" id="type" name="type" v-model="alarm.type" class="form-control">
                    <option value="" selected disabled>-- Selecciona alarma --</option>
                    <option v-for="alarma in alarmasTipo" :key="alarma.id" :value="alarma.type">
                        {{ translateAlarmType(alarma.type) }}
                    </option>
                </Field>
                <ErrorMessage name="type" class="error-message" />
            </div>
            <div class="form-group">
                <label for="start_date">Fecha de inicio</label>
                <Field type="date" id="start_date" name="start_date" v-model="alarm.start_date" class="form-control" />
                <ErrorMessage name="start_date" class="error-message" />
            </div>
            <div class="form-group">
                <label for="end_date">Fecha de fin</label>
                <Field type="date" id="end_date" name="end_date" v-model="alarm.end_date" class="form-control" />
                <ErrorMessage name="end_date" class="error-message" />
            </div>
            <div class="form-group">
                <label for="weekday">Día de la semana</label>
                <Field type="text" id="weekday" name="weekday" v-model="alarm.weekday" class="form-control" />
                <ErrorMessage name="weekday" class="error-message" />
            </div>
            <div class="form-buttons">
                <button type="submit" class="btn btn-primary">Añadir alarma</button>
                <button type="button" @click="$router.back()" class="btn btn-danger">Cancelar</button>
            </div>
        </Form>
    </div>
</template>

<style scoped>
.content {
    padding: 20px;
    max-width: 900px;
    margin: 85px auto;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.8rem;
    color: #333;
}

.form-buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
}

input,
button {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

input:focus {
    border-color: #007bff;
}

.form-control {
    width: 100%;
    box-sizing: border-box;
}

.btn-primary,
.btn-danger {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    margin-top: 10px;
}

.btn-danger {
    background-color: #f44336;
    color: white;
}

.btn-danger:hover {
    background-color: #d32f2f;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
}

@media (max-width: 768px) {
    .content {
        padding: 15px;
        max-width: 100%;
    }

    .btn-primary,
    .btn-danger {
        width: 100%;
    }
}
</style>
