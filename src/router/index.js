import InformeList from '@/components/InformeList.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PatientsView from '../views/PatientsView.vue'
import Patient from '../components/Patient.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import InformeView from '@/views/InformeView.vue'
import IncomingCallsView from '@/views/IncomingCallsView.vue'
import OutgoingCallsView from '@/views/OutgoingCallsView.vue'
import IncomingCallForm from '@/views/IncomingCallForm.vue'
import OutgoingCallForm from '@/views/OutgoingCallForm.vue'
import Contact from '@/components/Contact.vue'

import PatientForm from '@/components/PatientForm.vue'
import ContactForm from '@/components/ContactForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/patients',
      name: 'patients',
      component: PatientsView,
    },
    {
      path: '/patient/:id',
      name: 'patient',
      component: Patient
    },
    {
      path: '/patientForm/:id?',
      name: 'patientForm',
      component: PatientForm
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/informes',
      name: 'informes',
      component: InformeList
    },
    {
      path: '/informe/:tipo',
      name: 'informe',
      component: InformeView,
      props: true
    },
    {
      path: '/incoming_calls',
      name: 'incoming_calls',
      component: IncomingCallsView
    },
    {
      path: '/outgoing_calls',
      name: 'outgoing_calls',
      component: OutgoingCallsView
    },
    {
      path: '/incomingForm/:id?',
      name: 'incomingForm',
      component: IncomingCallForm
    },
    {
      path: '/outgoingForm/:id?',
      name: 'outgoingForm',
      component: OutgoingCallForm
    },
      {
        path: '/contactForm/:id?/:edit?',
      name: 'contactForm',
      component: ContactForm
    },
    {
      path: '/contact/:id?',
      name: 'contact',
      component: Contact
    }
  ],
})

export default router
