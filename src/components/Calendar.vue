<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import esLocale from '@fullcalendar/core/locales/es' // Idioma español

export default defineComponent({
    name: 'Calendar',
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    components: {
        FullCalendar
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin], //Plugins a usar en el calendario
                initialView: 'dayGridMonth', // Muestra la vista mensual por defecto
                editable: true, // Permite mover eventos
                selectable: true, // Permite seleccionar fechas
                locale: esLocale, // Aplicamos el idioma español
                events: [
                    {
                        title: 'Evento Diario',
                        rrule: {
                            freq: 'daily',
                            dtstart: '2025-05-10', // Fecha de inicio
                            until: '2025-05-20' // Fecha final
                        }
                    },
                    {
                        title: 'Evento Importante',
                        start: '2025-02-10', // Evento único en esta fecha
                    }
                ],
                eventClick: this.handleEventClick, // Manejar clics en eventos
                dateClick: this.handleDateClick // Manejar clics en fechas vacías
            }
        }
    },
    methods: {
        handleEventClick(info) {
            alert(`Hiciste clic en el evento: ${info.event.title}`)
        },
        handleDateClick(info) {
            alert(`Hiciste clic en la fecha: ${info.dateStr}`)
        }
    },
    mounted() {
        // Coger el paciente por el id
    },
})
</script>
<template>
    <div>
        <FullCalendar :options="calendarOptions" />
    </div>
</template>
<style scoped>
.fc {
    width: 900px;
    margin: auto;
}

.fc-h-event.no-planificado {
    background-color: rgb(35, 179, 236);
}

.fc-h-event.planificado {
    background-color: rgb(76, 238, 71);
}

.fc-h-event.emergencia {
    background-color: brown;
}


</style>