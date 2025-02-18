<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3' // Componente de calendario
import dayGridPlugin from '@fullcalendar/daygrid' // Para vista de día
import timeGridPlugin from '@fullcalendar/timegrid' // Para vista de día y hora
import interactionPlugin from '@fullcalendar/interaction' // Para eventos interactivos
import rrulePlugin from '@fullcalendar/rrule' // Para eventos recurrentes
import esLocale from '@fullcalendar/core/locales/es' // Idioma español
import bootstrapPlugin from "@fullcalendar/bootstrap5";
import { mapActions, mapState } from 'pinia'
import { useOutgoingCallsStore } from '../stores/outgoingCallsStore' // Store de llamadas salientes
import { useAlarmsStore } from '../stores/alarmsStore' // Store de alarmas
import { usePatientsStore } from '@/stores/patientStore'
import OutgoingCallForm from '@/views/OutgoingCallForm.vue'


export default defineComponent({
    name: 'Calendar',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        FullCalendar,
        OutgoingCallForm
    },
    data() {
        return {
            showModal: false, // Controla la visibilidad del modal
            showModalCreate: false, // Controla la visibilidad del modal
            selectedDate: '', // Guarda la fecha seleccionada
            selectedId: '', // Guarda el id seleccionado
            eventsOfDay: [], // Guarda los eventos de ese día
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin, bootstrapPlugin], // Plugins del calendario
                initialView: 'dayGridMonth', // Vista mensual por defecto
                //editable: true, // Permite mover eventos
                //selectable: true, // Permite seleccionar fechas
                locale: esLocale, // Idioma español
                headerToolbar: {
                    left: 'prev today',
                    center: 'title dayGridDay,dayGridWeek,dayGridMonth',
                    right: 'next'
                },
                events: [],
                eventClick: this.handleEventClick, // Manejo de clic en eventos
                dateClick: this.handleDateClick, // Manejo de clic en fechas vacías
                height: 700,
                themeSystem: 'bootstrap5'

            },
            patient: {},
        }
    },
    methods: {
        ...mapActions(useOutgoingCallsStore, ['fetchCallsByPatientId', 'createCall']),
        ...mapActions(useAlarmsStore, ['getAlarmById', 'getAlarmas']),
        ...mapActions(usePatientsStore, ['getPatient']),

        translateDay(day) {
            const days = {
                'mo': 'Lunes',
                'tu': 'Martes',
                'we': 'Miércoles',
                'th': 'Jueves',
                'fr': 'Viernes',
                'sa': 'Sábado',
                'su': 'Domingo'
            };
            return days[day] || day;
        },
        handleEventClick(info) {
            this.selectedDate = info.event.startStr.split('T')[0];
            this.selectedId = info.event.extendedProps.call_id;
            this.eventsOfDay = this.calendarOptions.events.filter(event => event.extendedProps.call_id == this.selectedId);
            this.showModal = true;
        },
        handleDateClick(info) {
            this.selectedDate = info.dateStr.split('T')[0];
            this.showModalCreate = true;
        },
        openCreateModal() {
            this.showModal = false; // Cierra el modal de detalles del día
            this.showModalCreate = true; // Abre el modal de creación de llamada
        },
        closeModalCreate() {
            this.showModalCreate = false;
        },
        async loadCalls() {
            this.outgoingCalls = await this.fetchCallsByPatientId(this.id);

            if (this.outgoingCalls.length > 0) {
                const events = await Promise.all(
                    this.outgoingCalls.map(async (call) => {
                        const alarm = await this.getAlarmById(call.alarm_id);

                        return {
                            title: call.description,
                            start: alarm?.start_date || call.timestamp,
                            end: alarm?.end_date || null,
                            day: call.timestamp.split('T')[0],
                            hour: call.timestamp.split('T')[1].slice(0, 5),
                            rrule: alarm?.weekday && alarm?.end_date !== null
                                ? {
                                    freq: 'weekly',
                                    byweekday: alarm.weekday.slice(0, 2).toLowerCase(),
                                    dtstart: alarm.start_date,
                                    until: alarm.end_date
                                }
                                : undefined,
                            classNames: call.is_planned ? "planned" : "unplanned",
                            extendedProps: {
                                description: call.description || 'Sin descripción',
                                alarm_type: this.translateAlarmType(alarm.type),
                                //user_id: call.user_id,
                                //alarm_id: call.alarm_id,
                                call_id: call.id,
                                is_planned: call.is_planned,
                            }
                        };
                    })
                );
                this.calendarOptions.events = events;
            }
        },
    },
    computed: {
        ...mapState(useAlarmsStore, ['translateAlarmType']),
    },
    async mounted() {
        //await this.getAlarmas()
        await this.loadCalls()
        this.patient = await this.getPatient(this.id)
    },
    watch: {
        id: {
            handler() {
                this.loadCalls() // Recargar llamadas si cambia el ID del paciente
            }
        },
        showModalCreate(newValue) {
            if (newValue && this.showModal) this.showModalCreate = false; // Si se abre el modal de creación, cerrar el de detalles
        }
    }
})
</script>

<template>
    <div>
        <p v-if="calendarOptions.events <= 0">No hay ningún registro para este paciente</p>
        <FullCalendar ref="fullCalendar" :options="calendarOptions" class="custom-calendar" />
        <div class="info-calendar">
            <p class="info-color-planned">• Planeado</p>
            <p class="info-color-unplanned">• No Planeado</p>
        </div>

        <!-- Modal de detalles del día -->
        <div v-if="showModal" class="modal fade show" tabindex="-1" @click="showModal = false">
            <div class="modal-dialog modal-dialog-centered" @click.stop>
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Detalles del evento</h5>
                        <button type="button" class="btn-close" @click="showModal = false"></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="eventsOfDay.length > 0">
                            <ul v-for="(event, index) in eventsOfDay" :key="index">
                                <p class="m-0"><strong>Fecha:</strong> {{ event.day }} <span v-if="event.end">hasta el
                                        {{
                                            event.end.split('T')[0] }}</span></p>
                                <p class="m-0" v-if="event.rrule"><strong>Se repite cada:</strong> {{
                                    translateDay(event.rrule.byweekday) }}</p>
                                <li class="mb-1"><strong>Hora:</strong> {{ event.hour }}</li>

                                <h5 class="mb-0">Evento:</h5>
                                <li><strong>Descripción:</strong> {{ event.extendedProps.description }}</li>
                                <li><strong>Alarma por:</strong> {{ event.extendedProps.alarm_type }}</li>
                                <li><strong>Tipo:</strong> {{ event.extendedProps.is_planned ? "Planeada" : "No Planeada" }}</li>
                                <li><strong>Paciente:</strong> {{ this.patient.name }} {{ this.patient.last_name }}
                                    <ul><strong>Teléfono:</strong> {{ this.patient.phone }}</ul>
                                    <ul><strong>Email:</strong> {{ this.patient.email }}</ul>
                                    <ul><strong>DNI:</strong> {{ this.patient.dni }}</ul>
                                    <ul><strong>Fecha de nacimiento:</strong> {{ this.patient.birth_date }}</ul>
                                    <ul><strong>Dirección:</strong> {{ this.patient.address }}, {{ this.patient.city }},
                                        {{
                                            this.patient.postal_code }}</ul>
                                    <ul><strong>Tarjeta sanitaria:</strong> {{ this.patient.health_card_number }}</ul>
                                    <ul><strong>Zona ID:</strong> {{ this.patient.zone_id }}</ul>
                                    <ul><strong>Usuario ID:</strong> {{ this.patient.user_id }}</ul>
                                    <ul><strong>Situación personal:</strong> {{ this.patient.personal_situation }}</ul>
                                    <ul><strong>Situación de salud:</strong> {{ this.patient.health_situation }}</ul>
                                    <ul><strong>Situación de vivienda:</strong> {{ this.patient.housing_situation }}
                                    </ul>
                                    <ul><strong>Autonomía personal:</strong> {{ this.patient.personal_autonomy }}</ul>
                                    <ul><strong>Situación económica:</strong> {{ this.patient.economic_situation }}</ul>
                                </li>
                            </ul>
                        </div>
                        <p v-else>No hay eventos en este día.</p>
                    </div>
                    <div class="modal-footer pb-0 d-flex justify-content-center">
                        <button type="button" class="btn btn-primary" @click="openCreateModal">Crear nuevo evento</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de creación de llamada -->
        <div v-if="showModalCreate" class="modal fade show" tabindex="-1" @click="closeModalCreate">
            <div class="modal-dialog modal-dialog-centered" @click.stop>
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Crear Llamada</h5>
                        <button type="button" class="btn-close" @click="closeModalCreate"></button>
                    </div>
                    <div class="modal-body">
                        <OutgoingCallForm :id="null" @cancel="closeModalCreate" :currentDate="selectedDate"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* .fc {
    width: 900px;
    margin: auto;
} */

::v-deep(.fc-bg-event.planned) {
    background-color: rgb(73, 219, 60);
}

::v-deep(.fc-bg-event.unplanned) {
    background-color: rgb(35, 179, 236);
}

::v-deep(.fc-event.planned) {
    background-color: rgb(78, 196, 67);
    border-color: rgb(73, 219, 60);
}

::v-deep(.fc-event.unplanned) {
    background-color: rgb(35, 179, 236);
    border-color: rgb(35, 179, 236);
}

.info-calendar {
    display: flex;
    gap: 10px;
}

.info-color-planned {
    color: rgb(73, 219, 60);
}

.info-color-unplanned {
    color: rgb(35, 179, 236);
}

.modal {
    display: block;
}

.modal.fade.show {
    background-color: rgba(0, 0, 0, 0.5);
}

.exit-modal {
    font-weight: bolder;
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #333;
}

.modal-content {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 300px;
    max-height: 80vh;
    overflow-y: auto;
}

li,
ul {
    list-style: none;
    padding: 0;
}

li ul {
    padding-left: 20px;
}
</style>
