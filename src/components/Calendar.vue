<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3' // Componente de calendario
import dayGridPlugin from '@fullcalendar/daygrid' // Para vista de día
import timeGridPlugin from '@fullcalendar/timegrid' // Para vista de día y hora
import interactionPlugin from '@fullcalendar/interaction' // Para eventos interactivos
import rrulePlugin from '@fullcalendar/rrule' // Para eventos recurrentes
import esLocale from '@fullcalendar/core/locales/es' // Idioma español
import { mapActions } from 'pinia'
import { useOutgoingCallsStore } from '../stores/outgoingCallsStore' // Store de llamadas salientes
import { useAlarmsStore } from '../stores/alarmsStore' // Store de alarmas
import axios from 'axios'


export default defineComponent({
    name: 'Calendar',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        FullCalendar
    },
    data() {
        return {
            showModal: false, // Controla la visibilidad del modal
            showModalCreate: false, // Controla la visibilidad del modal
            selectedDate: '', // Guarda la fecha seleccionada
            selectedId: '', // Guarda el id seleccionado
            eventsOfDay: [], // Guarda los eventos de ese día
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin], // Plugins del calendario
                initialView: 'dayGridMonth', // Vista mensual por defecto
                //editable: true, // Permite mover eventos
                //selectable: true, // Permite seleccionar fechas
                locale: esLocale, // Aplicamos el idioma español
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridDay,dayGridMonth,dayGridWeek'
                },
                events: [],
                eventClick: this.handleEventClick, // Manejo de clic en eventos
                dateClick: this.handleDateClick, // Manejo de clic en fechas vacías
                height: 700,
                //contentHeight: ,


            },
            patient: {},
        }
    },
    methods: {
        ...mapActions(useOutgoingCallsStore, ['fetchCallsByPatientId', 'createCall']),
        ...mapActions(useAlarmsStore, ['getAlarmById', 'fetchAlarms']),

        handleEventClick(info) {
            this.selectedDate = info.event.startStr.split('T')[0];
            this.selectedId = info.event.extendedProps.call_id;
            this.eventsOfDay = this.calendarOptions.events.filter(event => event.extendedProps.call_id == this.selectedId);
            this.showModal = true; // Mostrar el modal
        },
        handleDateClick(info) {
            this.selectedDate = info.dateStr.split('T')[0];
            this.showModalCreate = true; // Mostrar el modal
        },
        createCall() {
            // Aquí puedes implementar la lógica para crear una llamada
            console.log("Creando llamada para:", this.selectedDate);

            // Cierra el modal después de la creación
            this.showModalCreate = false;
        },
        openCreateModal() {
            this.showModal = false; // Cierra el modal de detalles del día
            this.showModalCreate = true; // Abre el modal de creación de llamada
        },
        async loadCalls() {
            this.outgoingCalls = await this.fetchCallsByPatientId(this.id)

            if (this.outgoingCalls.length > 0) {
                this.calendarOptions.events = this.outgoingCalls.map(call => {
                    const alarm = this.getAlarmById(call.alarm_id)

                    return {
                        title: call.description,
                        // this.getTypeCall(call.is_planned) === 'planned' ?
                        //     'Llamada Saliente Planeada' : 'Llamada Saliente No Planeada',
                        start: alarm.start_date,
                        end: alarm.end_date,
                        day: call.timestamp.split('T')[0],
                        //display: 'background',  // Mostrar como fondo
                        rrule: alarm.weekday ? {
                            freq: 'weekly',
                            byweekday: alarm.weekday,
                            dtstart: alarm.start_date,
                            until: alarm.end_date
                        } : undefined,
                        classNames: call.is_planned, // Agregar clase CSS según tipo
                        extendedProps: {
                            description: call.description || 'Sin descripción',
                            user_id: call.user_id,
                            alarm_id: call.alarm_id,
                            call_id: call.id,
                            is_planned: call.is_planned,
                        }
                    }



                })
            }
        },
        async fetchPatient() {
            try {
                const response = await axios.get('http://localhost:3000' + '/patients/?id=' + this.id);
                this.patient = response.data || {};
                //return response.data;
            } catch (error) {
                console.error('Error al obtener el paciente:', error);
            }
        },

    },
    async mounted() {
        await this.fetchAlarms()
        await this.loadCalls()
        await this.fetchPatient()

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
        <FullCalendar ref="fullCalendar" :options="calendarOptions" />

        <!-- Modal de detalles del día -->
        <div v-if="showModal" class="modal-overlay" @click="showModal = false">
            <div class="modal-content" @click.stop>
                <button class="exit-modal" @click="showModal = false">x</button>
                <h3>Detalles del evento</h3>
                <p><strong>Fecha:</strong> {{ selectedDate }}</p>
                <div v-if="eventsOfDay.length > 0">
                    <h4>Evento:</h4>
                    <ul v-for="(event, index) in eventsOfDay" :key="index">
                        <!-- <li>{{ event.title }}</li> -->
                        <li><strong>Descripción:</strong> {{ event.extendedProps.description }}</li>
                        <li><strong>Tipo:</strong> {{ event.extendedProps.is_planned ? "Planeada" : "No Planeada" }}</li>
                        <li><strong>Paciente:</strong> {{ this.patient[0].name }} {{ this.patient[0].last_name }}
                            <ul><strong>Teléfono:</strong> {{ this.patient[0].phone }}</ul>
                            <ul><strong>Email:</strong> {{ this.patient[0].email }}</ul>
                            <ul><strong>DNI:</strong> {{ this.patient[0].dni }}</ul>
                            <ul><strong>Fecha de nacimiento:</strong> {{ this.patient[0].birth_date }}</ul>
                            <ul><strong>Dirección:</strong> {{ this.patient[0].address }}, {{ this.patient[0].city }}, {{
                                this.patient[0].postal_code }}</ul>
                            <ul><strong>Tarjeta sanitaria:</strong> {{ this.patient[0].health_card_number }}</ul>
                            <ul><strong>Zona ID:</strong> {{ this.patient[0].zone_id }}</ul>
                            <ul><strong>Usuario ID:</strong> {{ this.patient[0].user_id }}</ul>
                            <ul><strong>Situación personal:</strong> {{ this.patient[0].personal_situation }}</ul>
                            <ul><strong>Situación de salud:</strong> {{ this.patient[0].health_situation }}</ul>
                            <ul><strong>Situación de vivienda:</strong> {{ this.patient[0].housing_situation }}</ul>
                            <ul><strong>Autonomía personal:</strong> {{ this.patient[0].personal_autonomy }}</ul>
                            <ul><strong>Situación económica:</strong> {{ this.patient[0].economic_situation }}</ul>
                        </li>
                    </ul>
                </div>
                <p v-else>No hay eventos en este día.</p>
                <button @click="openCreateModal">Crear</button>
            </div>
        </div>

        <!-- Modal de creación de llamada -->
        <div v-if="showModalCreate" class="modal-overlay" @click="showModalCreate = false">
            <div class="modal-content" @click.stop>
                <button class="exit-modal" @click="showModalCreate = false">x</button>
                <h3>Crear Nueva Llamada</h3>
                <p><strong>Paciente:</strong> {{ this.patient[0].name }} {{ this.patient[0].last_name }}</p>
                <p><strong>Fecha:</strong> {{ selectedDate }}</p>

                <!--  <label for="callType">Tipo de Llamada:</label> Al crearse desde la agenda siempre será planeada
                <select id="callType">
                    <option value="planned">Planeada</option>
                    <option value="unplanned">No Planeada</option>
                </select> -->

                <label for="description">Descripción:</label>
                <textarea id="description" placeholder="Ingrese una descripción"></textarea>

                <button @click="createCall">Guardar</button>
                <button @click="showModalCreate = false">Cancelar</button>
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
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 300px;
    /* text-align: center; */
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

li, ul{
    list-style: none;
    padding: 0;
}

li ul{
    padding-left: 20px;
}
</style>
