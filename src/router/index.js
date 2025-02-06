import { createRouter, createWebHistory } from 'vue-router'
import PatientsView from '../views/PatientsView.vue'
import Patient from '../components/Patient.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PatientForm from '@/components/PatientForm.vue'

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
  ],
})

export default router
