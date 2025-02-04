import { createRouter, createWebHistory } from 'vue-router'
import PatientsView from '../views/PatientsView.vue'
import Patient from '../components/Patient.vue'
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
    }
  ],
})

export default router
